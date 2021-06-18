export const create = (list: any[], item: any) => {
  if (list.length > 0) {
    const max = list.reduce(function (p, v) {
      return (p.id > v.id ? p : v);
    });
    if (max) {
      item.id = max.id + 1;
    }
  }

  list.push(item);
}

export const bulkUpdate = (list: any[], input: any, ids: number[]) => {
  const updated: any[] = [];
  list = list.map((item: any) => {
    if (ids.includes(item.id)) {
      item = Object.assign(item, { ...input, id: item.id });
      updated.push(item);
    }
    return item;
  });
  return {list, updated};
}

export const bulkDelete = (list: any[], ids: number[]) => {
  const deleted = list.filter((item) => {
    return ids.includes(item.id);
  })
  list = list.filter((item) => {
    return !ids.includes(item.id);
  })
  return {list, deleted};
}

export const pagination = (array: any[], offset: number, limit: number): any[] => {
  if (!offset) offset = 0;
  if (!limit) limit = 0;
  
  if (limit === 0) {
    return array.slice(offset, array.length)
  }
  return array.slice(offset, offset + limit);

}