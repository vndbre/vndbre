/**
 * Represents staff roles.
 */
export enum StaffRoles {
  Artist = 'art',
  Staff = 'staff',
  Scenario = 'scenario',
  Director = 'director',
  Music = 'music',
  Songs = 'songs',
  CharacterDesign = 'chardesign',
}

interface DisplayStaffRole {

  /**
   * Display title.
   */
  readonly title: string;

  /**
   * Flag to show note or not.
   */
  readonly showNote?: boolean;
}

/** Object to display staff roles. */
export const STAFF_ROLES: Record<StaffRoles, DisplayStaffRole> = {
  [StaffRoles.Director]: { title: 'Director' },
  [StaffRoles.Scenario]: { title: 'Scenario' },
  [StaffRoles.Artist]: { title: 'Artist' },
  [StaffRoles.CharacterDesign]: { title: 'Character Designers' },
  [StaffRoles.Music]: { title: 'Music', showNote: true },
  [StaffRoles.Songs]: { title: 'Songs', showNote: true },
  [StaffRoles.Staff]: { title: 'Staff', showNote: true },
};
