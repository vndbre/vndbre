import { createVndbClient } from "./client";
import { stripVndbFormatting } from "./formatting";
import type { VndbApiResponse, VndbQueryRequest, VndbVisualNovel } from "./types";

export const visualNovelDetailFields = [
  "title",
  "alttitle",
  "titles{lang,title,latin,official,main}",
  "aliases",
  "olang",
  "devstatus",
  "released",
  "languages",
  "platforms",
  "image{id,url,dims,sexual,violence,votecount}",
  "length",
  "length_minutes",
  "length_votes",
  "description",
  "average",
  "rating",
  "votecount",
  "screenshots{id,url,dims,sexual,violence,votecount}",
  "relations{id,title,alttitle,released,rating,relation,relation_official}",
  "tags{id,name,category,rating,spoiler,lie}",
  "developers{id,name,original,lang,type}",
  "editions{eid,lang,name,official}",
  "staff{id,name,original,lang,gender,eid,role,note}",
  "va{note,staff{id,name,original,lang,gender},character{id,name,original,image{id,url,dims,sexual,violence,votecount}}}",
  "extlinks{url,label,name,id}",
].join(",");

export function normalizeVisualNovelId(id: string) {
  const trimmedId = id.trim().toLowerCase();

  if (/^\d+$/.test(trimmedId)) {
    return `v${trimmedId}`;
  }

  if (/^v\d+$/.test(trimmedId)) {
    return trimmedId;
  }

  throw new Error(`Invalid visual novel id: ${id}`);
}

export async function getVisualNovelById(id: string) {
  const visualNovelId = normalizeVisualNovelId(id);
  const client = createVndbClient();
  const request: VndbQueryRequest = {
    filters: ["id", "=", visualNovelId],
    fields: visualNovelDetailFields,
    results: 1,
  };

  const response = await client.post<VndbApiResponse<VndbVisualNovel>>("/vn", request);
  const visualNovel = response.results[0];

  if (visualNovel === undefined) {
    throw new Error(`Visual novel not found: ${visualNovelId}`);
  }

  return {
    ...visualNovel,
    plainDescription: stripVndbFormatting(visualNovel.description),
  };
}
