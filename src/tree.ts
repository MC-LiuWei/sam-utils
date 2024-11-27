import { cloneDeep, get, omit } from "lodash";

export function findNodeFormKey<D = any>(key: string, nodes: D[], id: string) {
    if(!id) return undefined;
    const tree = cloneDeep(nodes);
    const queue = [...tree];

    while (queue.length > 0) {
      const node = queue.shift() as D;
      const children = get(node, 'children', []) as D[];
      if (node[key] === id) {
        return node;
      }
      if (children.length > 0) {
        queue.push(...children);
      }
    }
    return undefined;
}

export function updateNodeFormKey<D = any>(key: string, nodes: D[], id: string, value: any) {
    const tree = cloneDeep(nodes);
    const queue = [...tree];
    while (queue.length > 0) {
        const node = queue.shift() as D;
        const children = get(node, 'children', []) as D[];
        if (node[key] === id) {
          Object.assign(node, value);
          return tree;
        }
        if (children.length > 0) {
          queue.push(...children);
        }
      }
      return null;
}

export function toList<D = any>(nodes: D[]) {
  const tree = cloneDeep(nodes);
  const result = [];
  const queue = [...tree];
  while (queue.length > 0) {
    const node = queue.shift() as D;
    const children = get(node, 'children', []) as D[];
    result.push(omit(node as any, 'children'));
    if (children.length) {
      queue.push(...children);
    }
  }
  return result;
}