import { Settings as LayoutSettings } from '@ant-design/pro-layout';

/** user's device */
enum DeviceList {
  /** telephone */
  MOBILE = 'MOBILE',
  /** computer */
  DESKTOP = 'DESKTOP'
}

export enum ThemeType {
  DARK = 'dark',
  LIGHT = 'light'
}

export type Device = keyof typeof DeviceList;

export interface Settings extends LayoutSettings {
  pwa?: boolean;
  logo?: string;
  navTheme: ThemeType;
  headerTheme: ThemeType;
  // 拂晓蓝
  primaryColor: string;
  fixedHeader: boolean;
  fixSiderbar: boolean;
  colorWeak: boolean;
  title: string;
} 


