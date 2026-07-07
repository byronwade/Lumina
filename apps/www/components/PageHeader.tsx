import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Badge } from "./ui/badge";
import { buttonVariants } from "./ui/button";

export function PageHeader({
  eyebrow,
  title,
  description,
  facts = [],
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  facts?: Array<{
    label: string;
    value: string;
    href?: string;
  }>;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <Badge variant="success">{eyebrow}</Badge>
      <div className="page-hero-copy">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children ? <div className="page-hero-actions">{children}</div> : null}
      {facts.length ? (
        <div className="page-proof-rail" aria-label={`${title} page evidence`}>
          {facts.map((fact) => {
            const content = (
              <>
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
              </>
            );

            return fact.href ? (
              <a href={fact.href} key={`${fact.label}:${fact.value}`}>
                {content}
              </a>
            ) : (
              <div key={`${fact.label}:${fact.value}`}>{content}</div>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}

export function DocsCta() {
  return (
    <a className={buttonVariants({ size: "lg" })} href="/docs">
      Read the docs
      <ArrowRight aria-hidden="true" size={16} />
    </a>
  );
}
