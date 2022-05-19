/** Stats dto. */
export interface StatsDto {

  readonly data: {

    /** Releases amount. */
    readonly releases: number;

    /** Producers amount. */
    readonly producers: number;

    /** Characters amount. */
    readonly chars: number;

    /** Tags amount. */
    readonly tags: number;

    /** Visual novels amount. */
    readonly vn: number;

    /** Traits amount. */
    readonly traits: number;
  };
}
