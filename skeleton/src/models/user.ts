import { Device, Settings } from '@/models';
import { Permission } from '@/generated/graphql';
import { Locale } from '@/LocaleProvider';

export interface User {
  username: string;

  /** login status */
  logged: boolean;

  /** user's device */
  device: Device;
  locale: Locale;
  /** menu collapsed status */
  collapsed: boolean;

  /** notification count */
  noticeCount: number;

  /** Is first time to view the site ? */
  newUser: boolean;

  settings: Settings;
  avatar: string;
  permissions: (Permission|undefined)[];
}
