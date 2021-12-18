/** Platform. */
export enum Platform {
  Windows = 'win',
  Linux = 'lin',
  IOS = 'ios',
  Web = 'web',
  GameBoyAdvance = 'gba',
  GameBoyColor = 'gbc',
  VNDS = 'vnd',
  Android = 'and',
  MacOs = 'mac',
  PC88 = 'p88',
  PC98 = 'p98',
  Sharp1X = 'x1s',
  MSX = 'msx',
  SharpX68000 = 'x68',
  TDO = 'tdo',
  FMTowns = 'fmt',
  FM7 = 'fm7',
  FM8 = 'fm8',
  SegaSaturn = 'sat',
  Famicon = 'nes',
  SuperFamicon = 'sfc',
  Dreamcast = 'drc',
  DVD = 'dvd',
  BluRay = 'bdp',
  DOS = 'dos',
  PCEngine = 'pce',
  PCFX = 'pcf',
  SegaMegaCD = 'scd',
  SegaMegaDrive = 'smd',
  PlayStationVita = 'psv',
  PlayStation1 = 'ps1',
  PlayStation2 = 'ps2',
  PlayStation3 = 'ps3',
  PlayStation4 = 'ps4',
  PlayStation5 = 'ps5',
  PlayStationPortable = 'psp',
  NintendoDS = 'nds',
  Nintendo3DS = 'n3d',
  NintendoWii = 'wii',
  NintendoWiiU = 'wiu',
  NintendoSwitch = 'swi',
  Xbox = 'xb1',
  Xbox360 = 'xb3',
  XboxOne = 'xbo',
  XboxXS = 'xxs',
  Other = 'oth',
  OtherMobile = 'mob',
}

interface PlatformInfo {

  /** Platform's name. */
  name: string;

  /** Suffix for platform icon. */
  iconSuffix?: string;
}

export namespace PlatformService {

  const DEFAULT_PLATFORM_ICON = 'bi:question-square';
  const PLATFORM_ICON_BASE = 'simple-icons:';

  const MAP_PLATFORM_INFO: Record<Platform, PlatformInfo> = {
    [Platform.Windows]: { name: 'Windows', iconSuffix: 'windows' },
    [Platform.Linux]: { name: 'Linux', iconSuffix: 'linux' },
    [Platform.IOS]: { name: 'IOS', iconSuffix: 'ios' },
    [Platform.Web]: { name: 'Website', iconSuffix: 'googlechrome' },
    [Platform.Android]: { name: 'Android', iconSuffix: 'android' },
    [Platform.MacOs]: { name: 'Mac OS', iconSuffix: 'apple' },
    [Platform.GameBoyAdvance]: { name: 'Game Boy Advance' },
    [Platform.GameBoyColor]: { name: 'Game Boy Color' },
    [Platform.PC88]: { name: 'PC-88' },
    [Platform.PC98]: { name: 'PC-98' },
    [Platform.Sharp1X]: { name: 'Sharp X1' },
    [Platform.MSX]: { name: 'MSX' },
    [Platform.SharpX68000]: { name: 'Sharp X68000' },
    [Platform.TDO]: { name: '3DO' },
    [Platform.VNDS]: { name: 'VNDS' },
    [Platform.FMTowns]: { name: 'FM Towns' },
    [Platform.FM7]: { name: 'FM-7' },
    [Platform.FM8]: { name: 'FM-8' },
    [Platform.SegaSaturn]: { name: 'Sega Saturn' },
    [Platform.Famicon]: { name: 'Famicon' },
    [Platform.SuperFamicon]: { name: 'Super Famicon' },
    [Platform.Dreamcast]: { name: 'Dreamcast' },
    [Platform.DVD]: { name: 'DVD Player' },
    [Platform.BluRay]: { name: 'Blu-ray Player' },
    [Platform.DOS]: { name: 'DOS' },
    [Platform.PCEngine]: { name: 'PC Engine' },
    [Platform.PCFX]: { name: 'PC-FX' },
    [Platform.SegaMegaCD]: { name: 'Sega Mega-CD' },
    [Platform.SegaMegaDrive]: { name: 'Sega Mega Drive' },
    [Platform.PlayStationVita]: { name: 'Playstation Vita', iconSuffix: 'playstationvita' },
    [Platform.PlayStation1]: { name: 'Playstation 1', iconSuffix: 'playstation' },
    [Platform.PlayStation2]: { name: 'Playstation 2', iconSuffix: 'playstation2' },
    [Platform.PlayStation3]: { name: 'Playstation 3', iconSuffix: 'playstation3' },
    [Platform.PlayStation4]: { name: 'Playstation 4', iconSuffix: 'playstation4' },
    [Platform.PlayStation5]: { name: 'Playstation 5', iconSuffix: 'playstation5' },
    [Platform.PlayStationPortable]: { name: 'Playstation Portable', iconSuffix: 'playstation' },
    [Platform.NintendoDS]: { name: 'Nintendo DS', iconSuffix: 'nintendo3ds' },
    [Platform.Nintendo3DS]: { name: 'Nintendo 3DS', iconSuffix: 'nintendo3ds' },
    [Platform.NintendoWii]: { name: 'Wii', iconSuffix: 'nintendowii' },
    [Platform.NintendoWiiU]: { name: 'Wii U', iconSuffix: 'nintendowiiu' },
    [Platform.NintendoSwitch]: { name: 'Nintendo Switch', iconSuffix: 'nintendoswitch' },
    [Platform.Xbox]: { name: 'Xbox', iconSuffix: 'xbox' },
    [Platform.Xbox360]: { name: 'Xbox 360', iconSuffix: 'xbox' },
    [Platform.XboxOne]: { name: 'Xbox One', iconSuffix: 'xbox' },
    [Platform.XboxXS]: { name: 'Xbox X/S', iconSuffix: 'xbox' },
    [Platform.Other]: { name: 'Other' },
    [Platform.OtherMobile]: { name: 'Other Mobile' },
  };

  /**
   * Converts a certain platform to readable equivalent.
   * @param value Platform.
   */
  export const toReadable = (value: Platform): string => MAP_PLATFORM_INFO[value].name;

  /**
   * Convert string value to value of Platform type.
   * @param value Value.
   */
  export const toPlatform = (value: string): Platform => {
    const platform = value as Platform;
    return MAP_PLATFORM_INFO[platform] ? platform : Platform.Other;
  };

  /**
   * Gets icon name for platform.
   * @param value Platform.
   */
  export const getPlatformIcon = (value: Platform): string => {
    const iconSuffix = MAP_PLATFORM_INFO[value]?.iconSuffix;

    if (iconSuffix) {
      return PLATFORM_ICON_BASE + iconSuffix;
    }

    return DEFAULT_PLATFORM_ICON;
  };
}
