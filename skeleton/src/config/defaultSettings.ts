import { Settings, ThemeType } from '@/models';
import logoUrl from '@/assets/logo/react.svg?url'

const defaultSettings: Settings = {
  logo: logoUrl,
  navTheme: ThemeType.DARK,
  headerTheme: ThemeType.LIGHT,
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '项目管理',
  pwa: false,
};

export function getGlobalState() {
  const device = /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) ? 'MOBILE' : 'DESKTOP';
  const collapsed = device !== 'DESKTOP';
  const settings: Settings = {...defaultSettings};
  return {
    device,
    collapsed,
    settings,
  } as const;
}


export default defaultSettings;
