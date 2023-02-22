export const CHARACTER_ROLES = ['protagonist', 'main', 'side', 'appears'] as const;

export type CharacterRole = typeof CHARACTER_ROLES[number];

const CHARACTER_READABLE_MAP: Readonly<Record<CharacterRole, string>> = {
  protagonist: 'Protagonist',
  main: 'Main character',
  side: 'Side character',
  appears: 'Appears',
};

export namespace CharacterRole {

  /**
   * Gets readable equivalent for role.
   * @param role Role.
   */
  export function toReadable(role: CharacterRole): string {
    return CHARACTER_READABLE_MAP[role];
  }
}
