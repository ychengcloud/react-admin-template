import {
    atom,
} from 'recoil';

import { User } from '@/models/user';
import { getGlobalState } from '@/config/defaultSettings';
import { Locale } from '@/LocaleProvider';

const initialState: User = {
    ...getGlobalState(),
    noticeCount: 0,
    locale: (
        localStorage.getItem('locale')! 
        || (navigator.languages && navigator.languages[0]) 
        || navigator.language ||'en-us') as Locale,
    newUser: JSON.parse(localStorage.getItem('newUser')!) ?? true,
    logged: false,

    username: localStorage.getItem('username') || '',

    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    permissions: [],

};

export const userState = atom({
    key: 'userState',
    default: initialState,
});

