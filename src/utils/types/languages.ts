/** Represents encoded languages. */
export enum LanguagesEncoded {
  English = 'en',
  Chinese = 'zh',
  Japanese = 'ja',
  Russian = 'ru',
  Korean = 'ko',
}

/** Represents languages. */
// eslint-disable-next-line import/export
export enum Languages {
  English = 'english',
  Chinese = 'chinese',
  Japanese = 'japanese',
  Russian = 'russian',
  Korean = 'korean',
  Unknown = 'unknown',
}

// eslint-disable-next-line import/export
export namespace Languages {

  /** Converts to array. */
  export function toArray(): Languages[] {
    const enumType = typeof Languages.English;
    return Object.values(Languages)
      .filter(status => typeof status === enumType)
      .map(status => status as Languages);
  }
}
