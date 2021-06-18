
import {
    atom, atomFamily, selector, selectorFamily,
} from 'recoil';

import { IRoute, routes as RoutesInCfg } from "@/routes/config";

import { User } from '@/models/user';
import { PermissionEnum } from '@/types';
import { userState } from './user';

const hasPermission = (permission: PermissionEnum, user: User) =>
    user.permissions?.map((perm) => perm?.code).includes(permission);

const hasPermissionRoutes = (routes: IRoute[], user: User): IRoute[] => {
    let filterRoutes = routes.filter((route) => {

        const hasPermissions =
            !route.permissions ||
            route.permissions
                .map((permission) => hasPermission(permission, user))
                .reduce((prev, curr) => prev && curr);

        return hasPermissions;
    });

    filterRoutes = filterRoutes.map((item) => {
        let routes = undefined;
        if (item.routes && item.routes.length > 0) {
            routes = hasPermissionRoutes(item.routes, user);

        }
        return {
            ...item,
            routes
        }
    })


    return filterRoutes;
}

export const routesState = atom({
    key: 'routesState',
    default: selector({
        key: 'routesState/Default',
        get: ({ get }) => {
            const user = get(userState)
            const result = hasPermissionRoutes(RoutesInCfg, user);
            return result;
        }
    })
});

