/** Visual novel overview info. */
export interface VnOverviewDto {

  /** Main title as displayed on the site, typically romanized from the original script.. */
  readonly title: string;

  /** Image. */
  readonly image: {

    /** Url. */
    readonly url: string;
  };
}
