import { visualNovelDetailQueryOptions } from "@vndbre/core";
import { useVisualNovel } from "@vndbre/core/react";
import { createFileRoute } from "@tanstack/react-router";
import { ClockIcon, ExternalLinkIcon, LanguagesIcon, StarIcon, UsersIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { VndbExternalLink, VndbProducer, VndbVisualNovel } from "@vndbre/core";

export const Route = createFileRoute("/vn/$id")({
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(visualNovelDetailQueryOptions(params.id));
  },
  errorComponent: VisualNovelError,
  pendingComponent: VisualNovelPending,
  component: VisualNovelPage,
});

function VisualNovelPage() {
  const { id } = Route.useParams();
  const { data: visualNovel } = useVisualNovel(id);
  const titleAliases = visualNovel.aliases.slice(0, 8);
  const primaryTags = visualNovel.tags
    .filter((tag) => !tag.lie)
    .toSorted((first, second) => second.rating - first.rating)
    .slice(0, 24);
  const officialLinks = visualNovel.extlinks.slice(0, 8);

  return (
    <main className="min-h-svh bg-background">
      <section className="border-b bg-muted/40">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-8">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{visualNovel.id.toUpperCase()}</Badge>
              <Badge variant="outline">{formatDevStatus(visualNovel.devstatus)}</Badge>
              {visualNovel.released ? (
                <Badge variant="outline">{visualNovel.released}</Badge>
              ) : null}
            </div>
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl leading-tight font-semibold tracking-normal md:text-6xl">
                  {visualNovel.title}
                </h1>
                {visualNovel.alttitle ? (
                  <p className="text-xl text-muted-foreground">{visualNovel.alttitle}</p>
                ) : null}
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm md:min-w-96">
                <Metric icon={StarIcon} label="Rating" value={formatRating(visualNovel.rating)} />
                <Metric
                  icon={UsersIcon}
                  label="Votes"
                  value={formatNumber(visualNovel.votecount)}
                />
                <Metric icon={ClockIcon} label="Length" value={formatLength(visualNovel)} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 md:px-8 lg:grid-cols-[300px_1fr]">
        <aside className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-lg border bg-card">
            {visualNovel.image ? (
              <img
                src={visualNovel.image.url}
                alt={visualNovel.title}
                className="aspect-[2/3] w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[2/3] items-center justify-center bg-muted text-sm text-muted-foreground">
                No cover
              </div>
            )}
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Availability</CardTitle>
              <CardDescription>Languages, platforms, and original language.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Fact label="Original language" value={visualNovel.olang.toUpperCase()} />
              <BadgeList
                label="Languages"
                values={visualNovel.languages.map((lang) => lang.toUpperCase())}
              />
              <BadgeList
                label="Platforms"
                values={visualNovel.platforms.map((platform) => platform.toUpperCase())}
              />
            </CardContent>
          </Card>
          {officialLinks.length > 0 ? <ExternalLinks links={officialLinks} /> : null}
        </aside>

        <section className="flex min-w-0 flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>
                {visualNovel.developers.map((developer) => developer.name).join(", ") ||
                  "Developer unknown"}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <p className="max-w-4xl whitespace-pre-line text-base leading-7">
                {visualNovel.plainDescription || "No description is available for this entry."}
              </p>
              {titleAliases.length > 0 ? (
                <div className="flex flex-col gap-2">
                  <h2 className="text-sm font-medium">Also known as</h2>
                  <p className="text-sm text-muted-foreground">{titleAliases.join(", ")}</p>
                </div>
              ) : null}
              {primaryTags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {primaryTags.map((tag) => (
                    <Badge key={tag.id} variant={tag.spoiler > 0 ? "outline" : "secondary"}>
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Tabs defaultValue="details">
            <TabsList variant="line" className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="people">People</TabsTrigger>
              <TabsTrigger value="relations">Relations</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="pt-4">
              <DetailsPanel visualNovel={visualNovel} />
            </TabsContent>
            <TabsContent value="media" className="pt-4">
              <MediaPanel visualNovel={visualNovel} />
            </TabsContent>
            <TabsContent value="people" className="pt-4">
              <PeoplePanel visualNovel={visualNovel} />
            </TabsContent>
            <TabsContent value="relations" className="pt-4">
              <RelationsPanel visualNovel={visualNovel} />
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </main>
  );
}

function DetailsPanel({ visualNovel }: { visualNovel: VndbVisualNovel }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Facts</CardTitle>
          <CardDescription>Core database fields from VNDB.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <Fact label="Released" value={visualNovel.released ?? "Unknown"} />
          <Fact label="Development status" value={formatDevStatus(visualNovel.devstatus)} />
          <Fact label="Raw average" value={formatRating(visualNovel.average)} />
          <Fact label="Bayesian rating" value={formatRating(visualNovel.rating)} />
          <Fact label="Vote count" value={formatNumber(visualNovel.votecount)} />
          <Fact label="Length votes" value={formatNumber(visualNovel.length_votes)} />
          <Fact label="Play time" value={formatLength(visualNovel)} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Titles</CardTitle>
          <CardDescription>Official and localized titles.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {visualNovel.titles.map((title) => (
            <div
              key={`${title.lang}-${title.title}`}
              className="flex flex-col gap-1 rounded-md border p-3"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium">{title.title}</span>
                <Badge variant={title.main ? "default" : "outline"}>
                  {title.lang.toUpperCase()}
                </Badge>
              </div>
              {title.latin ? (
                <span className="text-sm text-muted-foreground">{title.latin}</span>
              ) : null}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function MediaPanel({ visualNovel }: { visualNovel: VndbVisualNovel }) {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Screenshots</CardTitle>
          <CardDescription>
            {visualNovel.screenshots.length} images attached to this entry.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {visualNovel.screenshots.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {visualNovel.screenshots.slice(0, 12).map((screenshot) => (
                <a
                  key={screenshot.id}
                  href={screenshot.url}
                  target="_blank"
                  rel="noreferrer"
                  className="overflow-hidden rounded-lg border bg-card"
                >
                  <img
                    src={screenshot.url}
                    alt=""
                    className="aspect-video w-full object-cover"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No screenshots are available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function PeoplePanel({ visualNovel }: { visualNovel: VndbVisualNovel }) {
  const staff = visualNovel.staff.slice(0, 20);
  const voiceActors = visualNovel.va.slice(0, 20);

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <CreditCard title="Developers" description="Release-linked developer credits">
        {visualNovel.developers.map((developer) => (
          <NameRow
            key={developer.id}
            name={developer.name}
            detail={formatProducerDetail(developer)}
          />
        ))}
      </CreditCard>
      <CreditCard title="Staff" description="Main staff credits">
        {staff.map((credit) => (
          <NameRow
            key={`${credit.id}-${credit.role}-${credit.eid ?? "main"}`}
            name={credit.name}
            detail={[credit.role, credit.note].filter(Boolean).join(" · ")}
          />
        ))}
      </CreditCard>
      <CreditCard title="Voice Cast" description="Voice actors and their characters">
        {voiceActors.map((credit) => (
          <NameRow
            key={`${credit.staff.id}-${credit.character.id}-${credit.note ?? "voice"}`}
            name={credit.staff.name}
            detail={`${credit.character.name}${credit.note ? ` · ${credit.note}` : ""}`}
          />
        ))}
      </CreditCard>
    </div>
  );
}

function RelationsPanel({ visualNovel }: { visualNovel: VndbVisualNovel }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Related Visual Novels</CardTitle>
        <CardDescription>Directly linked entries and relation types.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {visualNovel.relations.length > 0 ? (
          visualNovel.relations.map((relation) => (
            <div
              key={`${relation.id}-${relation.relation}`}
              className="flex flex-col gap-2 rounded-md border p-3 md:flex-row md:items-center md:justify-between"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">{relation.title}</p>
                {relation.alttitle ? (
                  <p className="truncate text-sm text-muted-foreground">{relation.alttitle}</p>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{relation.relation}</Badge>
                {relation.relation_official ? <Badge variant="outline">Official</Badge> : null}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No direct relations are available.</p>
        )}
      </CardContent>
    </Card>
  );
}

function CreditCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {children || <p className="text-sm text-muted-foreground">No credits are available.</p>}
      </CardContent>
    </Card>
  );
}

function ExternalLinks({ links }: { links: VndbExternalLink[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Links</CardTitle>
        <CardDescription>External references from VNDB.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {links.map((link) => (
          <Button
            key={`${link.name}-${link.url}`}
            variant="outline"
            className="justify-between"
            render={<a href={link.url} target="_blank" rel="noreferrer" />}
            nativeButton={false}
          >
            {link.label}
            <ExternalLinkIcon data-icon="inline-end" />
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof StarIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1 rounded-lg border bg-background p-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon data-icon="inline-start" />
        <span>{label}</span>
      </div>
      <span className="truncate text-lg font-semibold">{value}</span>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

function BadgeList({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="flex items-center gap-1.5 text-sm font-medium">
        <LanguagesIcon data-icon="inline-start" />
        {label}
      </h2>
      <div className="flex flex-wrap gap-2">
        {values.length > 0 ? (
          values.map((value) => (
            <Badge key={value} variant="secondary">
              {value}
            </Badge>
          ))
        ) : (
          <span className="text-sm text-muted-foreground">Unknown</span>
        )}
      </div>
    </div>
  );
}

function NameRow({ name, detail }: { name: string; detail: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-md border p-3">
      <span className="font-medium">{name}</span>
      {detail ? <span className="text-sm text-muted-foreground">{detail}</span> : null}
    </div>
  );
}

function VisualNovelPending() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-8">
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <div className="aspect-[2/3] rounded-lg bg-muted" />
        <div className="flex flex-col gap-4">
          <div className="h-12 rounded-lg bg-muted" />
          <div className="h-48 rounded-lg bg-muted" />
        </div>
      </div>
    </main>
  );
}

function VisualNovelError({ error }: { error: Error }) {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-3xl items-center px-4 py-12">
      <Alert variant="destructive">
        <AlertTitle>Unable to load visual novel</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    </main>
  );
}

function formatDevStatus(status: number) {
  if (status === 0) {
    return "Finished";
  }

  if (status === 1) {
    return "In development";
  }

  if (status === 2) {
    return "Cancelled";
  }

  return "Unknown";
}

function formatLength(visualNovel: VndbVisualNovel) {
  if (visualNovel.length_minutes !== null) {
    const hours = visualNovel.length_minutes / 60;

    return `${hours.toFixed(hours >= 10 ? 0 : 1)}h`;
  }

  if (visualNovel.length !== null) {
    return (
      ["Very short", "Short", "Medium", "Long", "Very long"][visualNovel.length - 1] ?? "Unknown"
    );
  }

  return "Unknown";
}

function formatRating(value: number | null) {
  if (value === null) {
    return "N/A";
  }

  return (value / 10).toFixed(2);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatProducerDetail(producer: VndbProducer) {
  return [producer.original, producer.lang.toUpperCase(), producer.type]
    .filter(Boolean)
    .join(" · ");
}
