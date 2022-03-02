import { StaffRole } from '../staffRole';

/**
 * Represents visual novel staff.
 */
export interface VisualNovelStaff {

  /**
   * Staff id.
   */
  readonly staffId: number;

  /**
   * Alias id.
   */
  readonly aliasId: number;

  /**
   * Staff member name.
   */
  readonly name: string;

  /**
   * Original staff member name.
   */
  readonly originalName: string | null;

  /**
   * Staff member role.
   */
  readonly role: StaffRole;

  /**
   * Additional notes.
   */
  readonly note: string | null;
}
