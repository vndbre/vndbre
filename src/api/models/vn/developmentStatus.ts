export const VN_DEV_STATUSES = ['finished', 'developing', 'cancelled'] as const;

export type VnDevelopmentStatus = typeof VN_DEV_STATUSES[number];

const DEVSTATUS_READABLE_MAP: Readonly<Record<VnDevelopmentStatus, string>> = {
  cancelled: 'Cancelled',
  developing: 'In development',
  finished: 'Finished',
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export namespace DevelopmentStatus {
  export function toReadable(value: VnDevelopmentStatus): string {
    return DEVSTATUS_READABLE_MAP[value] ?? 'Unknown';
  }
}
