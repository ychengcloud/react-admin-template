
export const flatListToTree = (
    data: any[] = [],
    { idKey = 'key', parentKey = 'parentId', childrenKey = 'children' } = {}
) => {
    const tree: any = [];
    const childrenOf: any = {};
    data.forEach((item: any) => {
        const newItem = { ...item };
        const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;
        childrenOf[id] = childrenOf[id] || [];
        newItem[childrenKey] = childrenOf[id];
        parentId
            ? (
                childrenOf[parentId] = childrenOf[parentId] || []
            ).push(newItem)
            : tree.push(newItem);
    });
    return tree;
};

export const transform = (list: any[], selectable: boolean = false) => {
    const result = list.map((item: any) => {
        const notIsLeaf = list.some((node: any) => node.parentId === item.id);
        return {
            title: item.name,
            key: String(item.id),
            isLeaf: !notIsLeaf,
            selectable: selectable ? selectable : notIsLeaf,
            parentId: item.parentId === "" || item.parentId === 0 ? undefined : item.parentId,
            value: item.id,
        };
    });
    return result;
}
