export type VndbOperator = "=" | "!=" | ">" | "<" | ">=" | "<=";

export type VndbFilterCondition<Field extends string = string, Value = unknown> = readonly [
  field: Field,
  operator: VndbOperator,
  value: Value,
];

export type VndbFilterExpression<Condition = VndbFilterCondition> =
  | Condition
  | readonly ["and" | "or", ...VndbFilterExpression<Condition>[]];

export type VndbQueryRequest = {
  filters?: VndbFilterExpression | string;
  fields: string;
  sort?: string;
  reverse?: boolean;
  results?: number;
  page?: number;
  count?: boolean;
};

export type VndbApiResponse<T> = {
  results: T[];
  more: boolean;
  count?: number;
};

export type VndbImage = {
  id: string;
  url: string;
  dims: readonly [number, number];
  sexual: number;
  violence: number;
  votecount: number;
};

export type VndbTitle = {
  lang: string;
  title: string;
  latin: string | null;
  official: boolean;
  main: boolean;
};

export type VndbTag = {
  id: string;
  name: string;
  category: string;
  rating: number;
  spoiler: number;
  lie: boolean;
};

export type VndbProducer = {
  id: string;
  name: string;
  original: string | null;
  lang: string;
  type: string;
};

export type VndbStaff = {
  id: string;
  name: string;
  original: string | null;
  lang: string;
  gender: string | null;
};

export type VndbVisualNovelStaffCredit = VndbStaff & {
  eid: number | null;
  role: string;
  note: string | null;
};

export type VndbCharacter = {
  id: string;
  name: string;
  original: string | null;
  image: VndbImage | null;
};

export type VndbVoiceActorCredit = {
  note: string | null;
  staff: VndbStaff;
  character: VndbCharacter;
};

export type VndbEdition = {
  eid: number;
  lang: string | null;
  name: string;
  official: boolean;
};

export type VndbExternalLink = {
  url: string;
  label: string;
  name: string;
  id: string | number | null;
};

export type VndbVisualNovelRelation = {
  id: string;
  title: string;
  alttitle: string | null;
  released: string | null;
  rating: number | null;
  relation: string;
  relation_official: boolean;
};

export type VndbScreenshot = VndbImage;

export type VndbVisualNovel = {
  id: string;
  title: string;
  alttitle: string | null;
  titles: VndbTitle[];
  aliases: string[];
  olang: string;
  devstatus: number;
  released: string | null;
  languages: string[];
  platforms: string[];
  image: VndbImage | null;
  length: number | null;
  length_minutes: number | null;
  length_votes: number;
  description: string | null;
  plainDescription: string | null;
  average: number | null;
  rating: number | null;
  votecount: number;
  screenshots: VndbScreenshot[];
  relations: VndbVisualNovelRelation[];
  tags: VndbTag[];
  developers: VndbProducer[];
  editions: VndbEdition[];
  staff: VndbVisualNovelStaffCredit[];
  va: VndbVoiceActorCredit[];
  extlinks: VndbExternalLink[];
};
