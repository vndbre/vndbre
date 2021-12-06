/* eslint-disable @typescript-eslint/naming-convention */
// eslint-disable-next-line spaced-comment
/// <reference types="vite/client" />

interface ImportMetaEnv {

  /**
   * Backend baseurl.
   */
  readonly VITE_VNDBRE_PROXY_BASEURL: string;
}

interface ImportMeta {

  /**
   * Vite imprort dot env buzzword meta code review typing.
   */
  readonly env: ImportMetaEnv;
}
