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
interface MappedStaffRoles {
  [StaffRoles.Director]: DisplayStaffRole;
  [StaffRoles.Scenario]: DisplayStaffRole;
  [StaffRoles.Artist]: DisplayStaffRole;
  [StaffRoles.CharacterDesign]: DisplayStaffRole;
  [StaffRoles.Music]: DisplayStaffRole;
  [StaffRoles.Songs]: DisplayStaffRole;
  [StaffRoles.Staff]: DisplayStaffRole;
}

/** Object to display staff roles. */
export const STAFF_ROLES: MappedStaffRoles = {
  [StaffRoles.Director]: { title: 'Director' },
  [StaffRoles.Scenario]: { title: 'Scenario' },
  [StaffRoles.Artist]: { title: 'Artist' },
  [StaffRoles.CharacterDesign]: { title: 'Character Designers' },
  [StaffRoles.Music]: { title: 'Music', showNote: true },
  [StaffRoles.Songs]: { title: 'Songs', showNote: true },
  [StaffRoles.Staff]: { title: 'Staff', showNote: true },
};
