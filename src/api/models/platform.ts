import type { PlatformIconName } from 'src/components/Icon/Icon';

/** List of available platforms. */
const PLATFORMS = [
  'and',
  'bdp',
  'dos',
  'drc',
  'dvd',
  'fm7',
  'fm8',
  'fmt',
  'gba',
  'gbc',
  'ios',
  'lin',
  'mac',
  'mob',
  'msx',
  'n3d',
  'nds',
  'nes',
  'p88',
  'p98',
  'pce',
  'pcf',
  'ps1',
  'ps2',
  'ps3',
  'ps4',
  'ps5',
  'psp',
  'psv',
  'sat',
  'scd',
  'sfc',
  'smd',
  'swi',
  'tdo',
  'vnd',
  'web',
  'wii',
  'win',
  'wiu',
  'x1s',
  'x68',
  'xb1',
  'xb3',
  'xbo',
  'xxs',
  'oth',
] as const;

export type Platform = typeof PLATFORMS[number];

const PLATFORM_READABLE_MAP: Record<Platform, string> = {
  win: 'Windows',
  lin: 'Linux',
  ios: 'iOS',
  and: 'Android',
  mac: 'macOS',
  gba: 'Game Boy Advance',
  gbc: 'Game Boy Color',
  p88: 'PC-88',
  p98: 'PC-98',
  x1s: 'Sharp X1',
  msx: 'MSX',
  x68: 'Sharp X68000',
  tdo: '3D0',
  fmt: 'FM Towns',
  fm7: 'FM-7',
  fm8: 'FM-8',
  sat: 'Sega Saturn',
  sfc: 'Super Famicon',
  drc: 'Sega Dreamcast',
  dvd: 'DVD',
  bdp: 'Blue-ray',
  dos: 'DOS',
  pce: 'PC Engine',
  pcf: 'PC-FX',
  scd: 'Sega Mega-CD',
  smd: 'Sega Mega Drive',
  psv: 'Playstation Vita',
  ps1: 'Playstation 1',
  ps2: 'Playstation 2',
  ps3: 'Playstation 3',
  ps4: 'Playstation 4',
  ps5: 'Playstation 5',
  psp: 'Playstation Portable',
  nds: 'Nintendo DS',
  n3d: 'Nintendo 3DS',
  wiu: 'Wii U',
  swi: 'Nintendo Switch',
  nes: 'NES',
  wii: 'Wii',
  xb1: 'Xbox',
  xb3: 'Xbox 360',
  xbo: 'Xbox One',
  xxs: 'Xbox Series',
  mob: 'Mobile',
  web: 'Web',
  vnd: 'VNDS',
  oth: 'Other platform',
};

const PLATFORM_ICON_MAP: Record<Platform, PlatformIconName> = {
  win: 'windows',
  lin: 'linux',
  ios: 'ios',
  and: 'android',
  mac: 'macos',
  gba: 'gameboy',
  gbc: 'gameboy',
  p88: 'pc',
  p98: 'pc',
  x1s: 'pc',
  msx: 'pc',
  x68: 'pc',
  tdo: 'gamepad',
  fmt: 'pc',
  fm7: 'pc',
  fm8: 'pc',
  sat: 'sega',
  sfc: 'gamepad',
  drc: 'sega',
  dvd: 'disk',
  bdp: 'disk',
  dos: 'pc',
  pce: 'pc',
  pcf: 'pc',
  scd: 'sega',
  smd: 'sega',
  psv: 'playstaion-vita',
  ps1: 'playstation',
  ps2: 'playstation-2',
  ps3: 'playstation-3',
  ps4: 'playstation-4',
  ps5: 'playstation-5',
  psp: 'playstation',
  nds: 'nintendo-3ds',
  n3d: 'nintendo-3ds',
  wiu: 'wiiu',
  swi: 'nintendo-switch',
  nes: 'nintendo',
  wii: 'wii',
  xb1: 'xbox',
  xb3: 'xbox',
  xbo: 'xbox',
  xxs: 'xbox',
  mob: 'smartphone',
  web: 'chrome',
  vnd: 'question-mark',
  oth: 'question-mark',
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export namespace Platform {

  export const list = PLATFORMS;

  /**
   * Gets readable equivalent of platform abbreviation.
   * @param platform Platform.
   */
  export function toReadable(platform: Platform): string {
    return PLATFORM_READABLE_MAP[platform] ?? 'Other platform';
  }

  /**
   * Gets flag icon name.
   * @param platform Language code (ISO-639).
   */
  export function getPlatformIconName(platform: Platform): PlatformIconName {
    return PLATFORM_ICON_MAP[platform] ?? 'question-mark';
  }
}
