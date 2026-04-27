import { createFileRoute, Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-5xl flex-col justify-center gap-8 px-6 py-16">
      <section className="flex max-w-3xl flex-col gap-4">
        <p className="text-sm font-medium tracking-normal text-muted-foreground uppercase">
          VNDBRE
        </p>
        <h1 className="text-4xl leading-tight font-semibold tracking-normal md:text-6xl">
          Visual novel discovery with a dense, modern reader.
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          The first API-backed page is a reusable visual novel detail view powered by TanStack Query
          and shadcn/Base UI.
        </p>
      </section>
      <div className="flex flex-wrap gap-3">
        <Button render={<Link to="/vn" />}>Browse visual novels</Button>
        <Button render={<Link to="/vn/$id" params={{ id: "v17" }} />}>Open sample VN</Button>
        <Button
          variant="outline"
          render={<a href="https://vndb.org" target="_blank" rel="noreferrer" />}
          nativeButton={false}
        >
          Visit VNDB
        </Button>
      </div>
    </main>
  );
}
