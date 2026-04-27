import {
  visualNovelListQueryOptions,
  type SortOrder,
  type VnDevelopmentStatus,
  type VnLength,
  type VnListItem,
  type VnListOptions,
  type VnSortField,
} from "@vndbre/core";
import { useSuspenseVisualNovelList } from "@vndbre/core/react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SearchIcon, SlidersHorizontalIcon, StarIcon } from "lucide-react";
import { useId, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const defaultSortField = "popularity" satisfies VnSortField;
const defaultSortOrder = "desc" satisfies SortOrder;

type VnListSearch = {
  q?: string;
  lang?: string;
  olang?: string;
  platform?: string;
  tag?: string;
  releasedFrom?: number;
  releasedTo?: number;
  popularityFrom?: number;
  popularityTo?: number;
  ratingFrom?: number;
  ratingTo?: number;
  length?: VnLength;
  devstatus?: VnDevelopmentStatus;
  sort?: VnSortField;
  order?: SortOrder;
};

export const Route = createFileRoute("/vn/")({
  validateSearch: (search): VnListSearch => ({
    q: parseString(search.q),
    lang: parseString(search.lang),
    olang: parseString(search.olang),
    platform: parseString(search.platform),
    tag: parseString(search.tag),
    releasedFrom: parseNumber(search.releasedFrom),
    releasedTo: parseNumber(search.releasedTo),
    popularityFrom: parseNumber(search.popularityFrom),
    popularityTo: parseNumber(search.popularityTo),
    ratingFrom: parseNumber(search.ratingFrom),
    ratingTo: parseNumber(search.ratingTo),
    length: parseNumberUnion(search.length, [1, 2, 3, 4, 5]),
    devstatus: parseNumberUnion(search.devstatus, [0, 1, 2]),
    sort: parseStringUnion(search.sort, [
      "title",
      "released",
      "popularity",
      "rating",
      "votecount",
      "length",
    ]),
    order: parseStringUnion(search.order, ["asc", "desc"]),
  }),
  loaderDeps: ({ search }) => search,
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(
      visualNovelListQueryOptions(searchToListOptions(deps)),
    );
  },
  component: VisualNovelListPage,
});

function VisualNovelListPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const searchInputId = useId();
  const [query, setQuery] = useState(search.q ?? "");
  const options = useMemo(() => searchToListOptions(search), [search]);
  const { data } = useSuspenseVisualNovelList(options);

  return (
    <main className="min-h-svh bg-background">
      <section className="border-b bg-muted/40">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 md:px-8">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium tracking-normal text-muted-foreground uppercase">
              Visual novels
            </p>
            <h1 className="text-4xl leading-tight font-semibold tracking-normal md:text-6xl">
              Browse the database
            </h1>
            <p className="max-w-3xl text-muted-foreground">
              Initial list search uses AND-only filter composition, backed by a recursive query
              builder that already supports nested AND and OR groups.
            </p>
          </div>
          <form
            className="flex flex-col gap-3 md:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              void navigate({
                search: (previous) => ({
                  ...previous,
                  q: query.trim().length > 0 ? query.trim() : undefined,
                }),
              });
            }}
          >
            <label className="sr-only" htmlFor={searchInputId}>
              Search visual novels
            </label>
            <div className="relative min-w-0 flex-1">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
              <Input
                id={searchInputId}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search titles, aliases, descriptions..."
                className="pl-9"
              />
            </div>
            <Button type="submit">
              <SearchIcon data-icon="inline-start" />
              Search
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setQuery("");
                void navigate({ search: {} });
              }}
            >
              Clear
            </Button>
          </form>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{data.count ?? data.results.length} matches</Badge>
            <Badge variant="outline">Sort: {options.sort?.field ?? defaultSortField}</Badge>
            <Badge variant="outline">Mode: AND</Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                void navigate({
                  search: (previous) => ({
                    ...previous,
                    sort: previous.sort === "rating" ? "popularity" : "rating",
                    order: "desc",
                  }),
                });
              }}
            >
              <SlidersHorizontalIcon data-icon="inline-start" />
              Toggle rating sort
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-6 md:grid-cols-2 md:px-8 xl:grid-cols-3">
        {data.results.map((visualNovel) => (
          <VisualNovelCard key={visualNovel.id} visualNovel={visualNovel} />
        ))}
      </section>
    </main>
  );
}

function VisualNovelCard({ visualNovel }: { visualNovel: VnListItem }) {
  const topTags = visualNovel.tags
    .filter((tag) => !tag.lie && tag.spoiler === 0)
    .toSorted((first, second) => second.rating - first.rating)
    .slice(0, 4);

  return (
    <Card className="overflow-hidden">
      <div className="grid grid-cols-[112px_1fr]">
        <Link to="/vn/$id" params={{ id: visualNovel.id }} className="block bg-muted">
          {visualNovel.image ? (
            <img
              src={visualNovel.image.url}
              alt={visualNovel.title}
              className="aspect-[2/3] size-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex aspect-[2/3] items-center justify-center text-sm text-muted-foreground">
              No cover
            </div>
          )}
        </Link>
        <div className="flex min-w-0 flex-col">
          <CardHeader className="gap-2">
            <div className="flex flex-wrap items-center gap-2">
              {visualNovel.released ? (
                <Badge variant="outline">{visualNovel.released}</Badge>
              ) : null}
              <Badge variant="secondary">
                {formatLength(visualNovel.length, visualNovel.length_minutes)}
              </Badge>
            </div>
            <CardTitle className="line-clamp-2">
              <Link to="/vn/$id" params={{ id: visualNovel.id }}>
                {visualNovel.title}
              </Link>
            </CardTitle>
            {visualNovel.alttitle ? (
              <CardDescription className="truncate">{visualNovel.alttitle}</CardDescription>
            ) : null}
          </CardHeader>
          <CardContent className="mt-auto flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="inline-flex items-center gap-1 font-medium">
                <StarIcon data-icon="inline-start" />
                {formatRating(visualNovel.rating)}
              </span>
              <span className="text-muted-foreground">
                {formatNumber(visualNovel.votecount)} votes
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {topTags.map((tag) => (
                <Badge key={tag.id} variant="outline">
                  {tag.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

function searchToListOptions(search: VnListSearch): VnListOptions {
  return {
    search: search.q,
    languages: splitFilter(search.lang),
    originalLanguage: search.olang,
    platforms: splitFilter(search.platform),
    tags: splitFilter(search.tag),
    released: createRange(search.releasedFrom, search.releasedTo),
    popularity: createRange(search.popularityFrom, search.popularityTo),
    rating: createRange(search.ratingFrom, search.ratingTo),
    length: search.length,
    developmentStatus: search.devstatus,
    sort: {
      field: search.sort ?? defaultSortField,
      order: search.order ?? defaultSortOrder,
    },
    page: 1,
    results: 24,
  };
}

function createRange(start: number | undefined, end: number | undefined) {
  if (start === undefined || end === undefined) {
    return undefined;
  }

  return { start, end };
}

function splitFilter(value: string | undefined) {
  if (value === undefined) {
    return undefined;
  }

  const values = value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  return values.length === 0 ? undefined : { mode: "and" as const, values };
}

function parseString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function parseNumber(value: unknown) {
  if (typeof value !== "string" && typeof value !== "number") {
    return undefined;
  }

  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) ? parsedValue : undefined;
}

function parseStringUnion<const Value extends string>(
  value: unknown,
  allowedValues: readonly Value[],
) {
  return typeof value === "string" && allowedValues.includes(value as Value)
    ? (value as Value)
    : undefined;
}

function parseNumberUnion<const Value extends number>(
  value: unknown,
  allowedValues: readonly Value[],
) {
  const parsedValue = parseNumber(value);

  return parsedValue !== undefined && allowedValues.includes(parsedValue as Value)
    ? (parsedValue as Value)
    : undefined;
}

function formatLength(length: VnLength | null, minutes: number | null) {
  if (minutes !== null) {
    const hours = minutes / 60;

    return `${hours.toFixed(hours >= 10 ? 0 : 1)}h`;
  }

  if (length !== null) {
    return ["Very short", "Short", "Medium", "Long", "Very long"][length - 1] ?? "Unknown";
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
