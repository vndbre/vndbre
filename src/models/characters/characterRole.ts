/** Character role types. */
export enum CharacterRole {
  Main = 'main',
  Primary = 'primary',
  Appears = 'appears',
  Side = 'side',
}

export namespace CharacterRole {

  const TO_READABLE_MAP: Record<CharacterRole, string> = {
    [CharacterRole.Main]: 'Protagonist',
    [CharacterRole.Primary]: 'Main character',
    [CharacterRole.Appears]: 'Appears',
    [CharacterRole.Side]: 'Side character',
  };

  /**
   * Converts a certain character role to readable equivalent.
   * @param role Unformatted role.
   */
  export function toReadable(role: CharacterRole): string {
    return TO_READABLE_MAP[role];
  }
}
