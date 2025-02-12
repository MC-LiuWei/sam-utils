import { LinkNode } from "./node";


export default class Link<V = any> {
  constructor(id: string | number, value: V) {
    this.head = new LinkNode(id, value);
  }
  head: LinkNode<V>;

  /**
   * 插入
   * @param value 值
   * @param head 是否头插入
   */
  insert(value: LinkNode, head = false) {
    const node = value;
    if (head) {
      node.next = this.head;
      this.head = node;
      return this.head;
    } else {
      let next = this.head.next;
      if (!next) {
        this.head.next = node;
        return this.head;
      }
      while (next.next) {
        next = next.next;
      }
      next.next = node;
    }
    return this.head;
  }
  /**
   * 指定节点插入
   * @param value
   * @param callback
   * @param head
   * @returns
   */
  nodeInsert(id: string | number, value: LinkNode, head = false) {
    const node = value;
    let headNode = this.head;
    let current = headNode.next;
    let status = headNode.id === id;
    if (head) {
      if (status) {
        node.next = headNode;
        this.head = node;
        return this.head;
      }
      while (!status && current) {
        status = current.id === id;
        if (!status) {
          headNode = current;
          current = current.next;
        }
      }
      if (status && current) {
        node.next = current;
        headNode.next = node;
      }
      return this.head;
    } else {
      if (status) {
        node.next = current;
        headNode.next = node;
        return this.head;
      }
      while (!status && current) {
        status = current.id === id;
        if (!status) {
          headNode = current;
          current = current.next;
        }
      }
      if (status && current) {
        headNode = current;
        current = current.next;
        headNode.next = node;
        node.next = current;
      }
      return this.head;
    }
  }
  /**
   * 删除指定节点
   * @param id
   * @returns
   */
  remove(id: string | number) {
    let head = this.head;
    let current = head.next;
    let status = head.id === id;
    if (status) {
      this.head = this.head.next as any;
      return this.head;
    }
    while (!status && current) {
      status = current.id === id;
      if (!status) {
        head = current;
        current = current.next;
      }
    }
    if (status && current) {
      current = current.next;
      head.next = current;
    }
    return this.head;
  }
  /**
   * 获取指定节点
   * @param id
   * @returns
   */
  get(id: string | number) {
    let node = this.head;
    let status = false;
    while (!status && node) {
      status = node.id === id;
      if (!status) {
        node = node.next as any;
      }
    }
    if (status && node) {
      return node;
    }
    return null;
  }
}