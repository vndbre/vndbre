/* eslint-disable import/export */
/** Role types. */
export enum Roles {
  Main = 'main',
  Primary = 'primary',
  Appears = 'appears',
  Side = 'side',
}

/** Role types in readable form. */
export enum ReadableRoles {
  Protagonist = 'Protagonist',
  Main = 'Main character',
  Side = 'Side character',
  Appears = 'Appears',
}

export namespace Roles {

  /**
   * Formats to readable.
   * @param role Unformatted role.
   */
  export const toReadable = (role: Roles): ReadableRoles => {
    switch (role) {
      case Roles.Main:
        return ReadableRoles.Protagonist;
      case Roles.Primary:
        return ReadableRoles.Main;
      case Roles.Appears:
        return ReadableRoles.Appears;
      case Roles.Side:
        return ReadableRoles.Side;
      default:
        return ReadableRoles.Appears;
    }
  };
}
