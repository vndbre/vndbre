/** Platform. */
export enum Platform {
  Windows = 'win',
  Linux = 'lin',
  IOS = 'ios',
  Web = 'web',
  Android = 'and',
  MacOs = 'mac',
  PlayStationVita = 'psv',
  PlayStation1 = 'ps1',
  PlayStation2 = 'ps2',
  PlayStation3 = 'ps3',
  PlayStation4 = 'ps4',
  PlayStation5 = 'ps5',
  PlayStationPortable = 'psp',
  Nintendo3DS = 'n3d',
  NintendoWii = 'wii',
  NintendoWiiU = 'wiu',
  NintendoSwitch = 'swi',
  Xbox = 'xb1',
  Xbox360 = 'xb3',
  XboxOne = 'xbo',
  XboxXS = 'xxs',
}

interface PlatformInfo {

  /** Platform's name. */
  name: string;

  /** Platform's name for icon. */
  iconSuffix?: string;
}

export namespace PlatformService {

  const PLATFORM_ICON_BASE = 'simple-icons:';

  const MAP_PLATFORM_INFO: Record<Platform, PlatformInfo> = {
    [Platform.Windows]: { name: 'Windows' },
    [Platform.Linux]: { name: 'Linux' },
    [Platform.IOS]: { name: 'IOS' },
    [Platform.Web]: { name: 'Website', iconSuffix: 'googlechrome' },
    [Platform.Android]: { name: 'Android' },
    [Platform.MacOs]: { name: 'Mac OS', iconSuffix: 'apple' },
    [Platform.PlayStationVita]: { name: 'Playstation Vita' },
    [Platform.PlayStation1]: { name: 'Playstation 1', iconSuffix: 'playstation' },
    [Platform.PlayStation2]: { name: 'Playstation 2' },
    [Platform.PlayStation3]: { name: 'Playstation 3' },
    [Platform.PlayStation4]: { name: 'Playstation 4' },
    [Platform.PlayStation5]: { name: 'Playstation 5' },
    [Platform.PlayStationPortable]: { name: 'Playstation Portable', iconSuffix: 'playstation' },
    [Platform.Nintendo3DS]: { name: 'Nintendo 3DS' },
    [Platform.NintendoWii]: { name: 'Wii' },
    [Platform.NintendoWiiU]: { name: 'Wii U' },
    [Platform.NintendoSwitch]: { name: 'Nintendo Switch' },
    [Platform.Xbox]: { name: 'Xbox' },
    [Platform.Xbox360]: { name: 'Xbox 360', iconSuffix: 'xbox' },
    [Platform.XboxOne]: { name: 'Xbox One', iconSuffix: 'xbox' },
    [Platform.XboxXS]: { name: 'Xbox X/S', iconSuffix: 'xbox' },
  };

  /**
   * Converts a certain platform to readable equivalent.
   * @param value Platform.
   */
  export const toReadable = (value: Platform): string => MAP_PLATFORM_INFO[value]?.name ?? '';

  /**
   * Gets name of icon for platform.
   * @param value Platform.
   */
  export const getPlatformIcon = (value: Platform): string => {
    const suffix = MAP_PLATFORM_INFO[value]?.iconSuffix ?? toReadable(value)
      .toLowerCase()
      .split(' ')
      .join('');

    return PLATFORM_ICON_BASE + suffix;
  };
}
