import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <main className="shell">
      <section className="intro">
        <p className="eyebrow">VNDBRE</p>
        <h1>Fresh workspace initialized.</h1>
        <p className="lede">
          The web app now starts from TanStack Start, with shared API and hook foundations living in
          the core package.
        </p>
      </section>

      <section className="workspace-grid" aria-label="Workspace structure">
        <article>
          <span>Core</span>
          <h2>Shared runtime</h2>
          <p>API client primitives, query setup, domain helpers, and reusable hooks.</p>
        </article>
        <article>
          <span>Web</span>
          <h2>TanStack Start</h2>
          <p>Fresh React app with Router, Query, SSR integration, and React Compiler.</p>
        </article>
        <article>
          <span>Mobile</span>
          <h2>Planned later</h2>
          <p>The monorepo leaves room for a future mobile workspace.</p>
        </article>
      </section>
    </main>
  );
}
