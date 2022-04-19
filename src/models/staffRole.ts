/**
 * Represents staff roles.
 */
export enum StaffRole {
  Artist = 'art',
  Staff = 'staff',
  Scenario = 'scenario',
  Director = 'director',
  Music = 'music',
  Songs = 'songs',
  CharacterDesign = 'chardesign',
}

interface StaffRoleInfo {

  /**
   * Display title.
   */
  readonly title: string;

  /**
   * Flag to show note or not.
   */
  readonly shouldNoteBeDisplayed?: boolean;
}

export namespace StaffRole {

  const TO_STAFF_ROLE_INFO_MAP: Readonly<Record<StaffRole, StaffRoleInfo>> = {
    [StaffRole.Director]: { title: 'Director' },
    [StaffRole.Scenario]: { title: 'Scenario' },
    [StaffRole.Artist]: { title: 'Artist' },
    [StaffRole.CharacterDesign]: { title: 'Character Designers' },
    [StaffRole.Music]: { title: 'Music', shouldNoteBeDisplayed: true },
    [StaffRole.Songs]: { title: 'Songs', shouldNoteBeDisplayed: true },
    [StaffRole.Staff]: { title: 'Staff', shouldNoteBeDisplayed: true },
  };

  /**
   * Obtains object with information about staff roles.
   */
  export function getStaffRolesInformation(): Record<StaffRole, StaffRoleInfo> {
    return TO_STAFF_ROLE_INFO_MAP;
  }

  /**
   * Convert string value to value of Staff type.
   * @param value Value.
   */
  export function toStaffRole(value: string): StaffRole {
    const staffRole = value as StaffRole;
    return TO_STAFF_ROLE_INFO_MAP[staffRole] ? staffRole : StaffRole.Staff;
  }

  /**
   * Converts a certain staff role to readable equivalent.
   * @param value Staff role.
   */
  export function toReadable(value: StaffRole): string {
    return TO_STAFF_ROLE_INFO_MAP[value].title;
  }

  /**
   * Obtains information about a specific staff role.
   * @param staffRole Staff role.
   */
  export function getStaffRoleInfo(staffRole: StaffRole): StaffRoleInfo {
    return TO_STAFF_ROLE_INFO_MAP[staffRole];
  }
}
