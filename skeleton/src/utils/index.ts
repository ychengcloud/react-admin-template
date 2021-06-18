import isArray from "lodash-es/isArray";

export const getParentNode = (list: any[], id: any): any => {
    console.log("getParentNode: ", id);
    for (let item of list || []) {
        if (item.id === id) return item;
        const pitem = getParentNode(item.children, id);
        if (pitem) return pitem;
    }
    return undefined;
};


export function getArrayQueryParam(param: string | string[] | undefined): string[] | undefined {
  if (!param) {
    return undefined;
  }

  if (isArray(param)) {
    return param;
  }

  return [param];
}

export const transformFilters = (filters: any) => {
  if (!filters) return;
  let result: any = {};
  for (let key in filters) {
      if (!filters[key] || filters[key] === null) continue;
      result[key] = {Eq: filters[key]};
  }
  return result;
}

export function capitalize(s: string) {
  return s.charAt(0).toLocaleUpperCase() + s.slice(1);
}
