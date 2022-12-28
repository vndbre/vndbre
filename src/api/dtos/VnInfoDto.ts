/** Visual novel brief info. */
export interface VnInfoDto {

  /** Main title as displayed on the site, typically romanized from the original script.. */
  readonly title: string;

  /** Alternative title, typically the same as title but in the original script. */
  readonly alttitle: string;

  /** Image. */
  readonly image: {

    /** Url. */
    readonly url: string;
  };
}
