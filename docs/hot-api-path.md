# Hot API Path

The hot API path is NeedleStart's performance path for selected API routes.

## Goal

Selected API routes should avoid generic framework overhead through generated matchers, validators, serializers, and optional micro-caches.

## Public API Draft

```ts
import { apiHot, schema } from "needlestart"

export const render = apiHot({
  validate: true,
  serialize: "generated",
  cache: {
    ttl: "100ms",
    key: ({ params }) => `user:${params.id}`,
  },
})

export const params = schema.object({
  id: schema.uint64(),
})

export const response = schema.object({
  id: schema.uint64(),
  name: schema.string(),
})

export async function GET({ params }) {
  return {
    id: params.id,
    name: "Ada",
  }
}
```

## Generated Behavior

The compiler may generate:

- Specialized route matcher.
- Params parser.
- Query parser.
- JSON body validator.
- Response serializer.
- Micro-cache lookup.
- OpenAPI schema.
- Typed client.

## Schema Scope

Initial schema DSL:

- `string`
- `number`
- `boolean`
- `enum`
- `array`
- `object`
- `uint64`
- optional fields
- default values

## Definition of Done

- Params, query, and body schemas validate.
- Response schema serializes.
- Invalid input returns 400 with structured errors.
- Hot API route avoids generic JSON path where possible.
- OpenAPI file emits for API routes.
- Benchmarks compare normal API route and hot API route in the same app.

## Out of Scope Initially

- Full Zod compatibility.
- Arbitrary custom runtime validators.
- Cross-language client generation.
- Distributed cache.
