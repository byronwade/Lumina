# Schema DSL Contract

NeedleStart's schema DSL is planned. It provides validation, serialization, route param typing, hot API contracts, OpenAPI generation, and structured diagnostics without making the framework depend on a large external validator as its core contract.

The first schema system should be intentionally small and compiler-friendly.

## Goals

- Validate route params, query strings, request bodies, and responses.
- Generate fast validators and serializers for hot API routes.
- Support OpenAPI generation for API routes.
- Give Needle Map high-confidence schema edges.
- Keep JSON output stable and agent-readable.
- Avoid full arbitrary runtime validation complexity in the first prototype.

## Non-Goals

Initially out of scope:

- Full Zod compatibility.
- Arbitrary custom validators.
- Cross-language client generation.
- Recursive schemas.
- Complex transforms.
- Database ORM integration.
- Runtime schema reflection for every TypeScript type.

## Public API Draft

```ts
import { schema } from "needlestart"

export const UserPublic = schema.object({
  id: schema.uint64(),
  name: schema.string(),
  plan: schema.enum(["free", "pro", "enterprise"]),
  email: schema.string().optional(),
})
```

## Initial Primitives

| Helper | Purpose |
| --- | --- |
| `schema.string()` | String value. |
| `schema.number()` | Number value. |
| `schema.boolean()` | Boolean value. |
| `schema.enum([...])` | Fixed string or number values. |
| `schema.array(item)` | Array of values. |
| `schema.object(shape)` | Object with named fields. |
| `schema.uint64()` | Unsigned 64-bit integer represented safely. |
| `.optional()` | Optional field. |
| `.default(value)` | Default value when missing. |

## Scalar Semantics

### `string()`

```ts
schema.string()
```

Validates JavaScript strings.

Planned refinements later:

- `min(length)`
- `max(length)`
- `pattern(regex)`
- `url()`
- `email()`

### `number()`

```ts
schema.number()
```

Validates JavaScript numbers.

Rules:

- `NaN` is invalid.
- `Infinity` and `-Infinity` are invalid.
- Integer-only validation should use a refinement later or a dedicated helper.

### `boolean()`

```ts
schema.boolean()
```

Validates booleans. Query string coercion may parse `true` and `false`, but body validation should not silently coerce unless configured.

### `uint64()`

```ts
schema.uint64()
```

`uint64` is intended for IDs that may exceed JavaScript safe integer range.

Initial recommendation:

- Accept string input for route params and query strings.
- Validate decimal unsigned integer format.
- Keep value as string unless a future `bigint` policy is explicitly documented.

Do not silently convert unsafe integer strings to JavaScript `number`.

### `enum()`

```ts
schema.enum(["free", "pro", "enterprise"])
```

Rules:

- Enum values must be serializable.
- Empty enums are invalid.
- Duplicate values are invalid.

## Objects

```ts
schema.object({
  id: schema.uint64(),
  name: schema.string(),
  plan: schema.enum(["free", "pro"]),
})
```

Rules:

- Required fields must exist.
- Optional fields may be missing.
- Default fields are filled before handler input is provided.
- Unknown fields should be rejected by default for API inputs in the first prototype.
- Response serialization should include only declared fields for generated serializers.

## Arrays

```ts
schema.array(schema.string())
```

Rules:

- Input must be an array.
- Every item validates against the item schema.
- Array item errors should include index path.

## Optional and Default Fields

```ts
schema.string().optional()
schema.enum(["compact", "full"]).default("compact")
```

Rules:

- A default field is effectively optional at input time.
- Default value must pass the schema.
- Defaults must be serializable.
- `optional().default()` ordering should normalize to one consistent internal representation.

## Request Validation

Hot API routes may declare:

```ts
export const params = schema.object({
  id: schema.uint64(),
})

export const query = schema.object({
  include: schema.enum(["profile", "billing"]).optional(),
})

export const body = schema.object({
  name: schema.string(),
})
```

Handler input should receive validated values:

```ts
export async function GET({ params, query }) {
  return { id: params.id, include: query.include }
}
```

Rules:

- Params come from route matching.
- Query comes from URL search params.
- Body comes from parsed request body for methods that allow a body.
- Invalid input returns 400 with structured errors.
- Validation errors must be stable JSON.

## Response Serialization

```ts
export const response = schema.object({
  id: schema.uint64(),
  name: schema.string(),
})
```

Rules:

- Development may validate responses and produce helpful errors.
- Production hot API routes may use generated serializers for speed.
- Generated serializers should output only declared fields for object schemas.
- Invalid handler output should produce a controlled 500 in production and readable diagnostics in development.

## Error Shape

Draft validation error:

```ts
export type SchemaIssue = {
  path: Array<string | number>
  code: string
  message: string
  expected?: string
  received?: string
}
```

Draft 400 response:

```json
{
  "error": {
    "code": "NS_SCHEMA_VALIDATION_FAILED",
    "message": "Request validation failed.",
    "issues": [
      {
        "path": ["params", "id"],
        "code": "invalid_uint64",
        "message": "Expected unsigned 64-bit integer string.",
        "expected": "uint64",
        "received": "abc"
      }
    ]
  }
}
```

Rules:

- Error output must not expose secrets.
- Machine logic should depend on codes and paths.
- Human messages should be readable but not the source of truth.

## Compiler Representation

The compiler should extract schema exports into IR nodes.

```ts
export type SchemaNode = {
  id: string
  name: string
  file: string
  kind: "string" | "number" | "boolean" | "enum" | "array" | "object" | "uint64"
  fields?: SchemaField[]
  item?: string
  enumValues?: unknown[]
}
```

Rules:

- Schema IDs must be stable.
- Schema nodes feed OpenAPI output, validators, serializers, Needle Map, and agent context.
- Unsupported schema expressions should produce diagnostics instead of partial lies.

## OpenAPI Generation

API and hot API routes should eventually emit OpenAPI output.

Rules:

- Params, query, body, and response schemas map to OpenAPI where possible.
- Unsupported schema features should produce clear diagnostics.
- OpenAPI output should include route paths, methods, request schemas, response schemas, and tags.
- Generated OpenAPI should be deterministic.

Initial OpenAPI output can be limited to hot API routes.

## Needle Map Integration

Schemas should create graph nodes and edges.

Planned edges:

- `validatesWithSchema`
- `serializesWithSchema`
- `usesProps`
- `documentedBy`

Examples:

- API route validates params with `UserParams`.
- API route serializes response with `UserPublic`.
- Component contract references `ProductPublic`.

Every edge must include `source`, `confidence`, and `why`.

## Agent Context

Route context may include schema summaries:

```json
{
  "route": "/api/users/:id",
  "schemas": {
    "params": "UserParams",
    "response": "UserPublic"
  },
  "checks": ["schema", "api", "map"]
}
```

Agents should be able to ask:

- Which APIs use this schema?
- Which routes are affected if this schema changes?
- Which response fields are public?
- Which tests should run after a schema edit?

## Diagnostics

| Code | Meaning |
| --- | --- |
| `NS_SCHEMA_INVALID_EXPORT` | Schema export is malformed. |
| `NS_SCHEMA_UNSUPPORTED_EXPRESSION` | Schema uses unsupported runtime expression. |
| `NS_SCHEMA_DUPLICATE_FIELD` | Object schema has duplicate fields. |
| `NS_SCHEMA_EMPTY_ENUM` | Enum has no values. |
| `NS_SCHEMA_DUPLICATE_ENUM_VALUE` | Enum has duplicate values. |
| `NS_SCHEMA_INVALID_DEFAULT` | Default value does not satisfy schema. |
| `NS_SCHEMA_VALIDATION_FAILED` | Runtime input validation failed. |
| `NS_SCHEMA_RESPONSE_INVALID` | Handler output failed response schema. |
| `NS_SCHEMA_OPENAPI_UNSUPPORTED` | Schema cannot be represented in initial OpenAPI output. |

## Testing Requirements

Schema tests should cover:

- Every primitive.
- Optional fields.
- Default fields.
- Object unknown field rejection.
- Array item path errors.
- `uint64` string validation.
- Enum duplicate rejection.
- Request validation 400 output.
- Response serialization.
- OpenAPI output for supported schemas.
- Stable JSON diagnostics.
- Secret redaction in validation errors.

## Out of Scope Initially

- Full Zod compatibility.
- Arbitrary custom validators.
- Recursive schemas.
- Branded TypeScript types.
- Transform pipelines.
- Cross-language clients.
- Runtime reflection of arbitrary TypeScript interfaces.
