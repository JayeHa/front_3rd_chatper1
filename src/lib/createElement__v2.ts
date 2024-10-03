import type { VNode, VNodeChildren, VNodeProps } from './createVNode';
import { addEvent } from './eventManager';

function setAttributes($element: HTMLElement, props: NonNullable<VNodeProps>) {
  Object.entries(props).forEach(([key, value]) => {
    if (typeof value === 'function' && key.toLowerCase() in $element) {
      const eventType = key.replace(/^on/, '').toLowerCase();
      addEvent($element, eventType as keyof HTMLElementTagNameMap, value);
    } else if (key === 'className') {
      $element.className = value;
    } else {
      $element.setAttribute(key, value);
    }
  });
}

function appendChildren($element: HTMLElement, children: VNodeChildren) {
  for (const child of children) {
    $element.appendChild(createElement__v2(child));
  }
}

/**
 * 주어진 가상 DOM 노드(vNode)를 실제 DOM 노드로 변환하여 반환합니다.
 *
 * @param {VNode} vNode - 가상 DOM 노드
 * @returns {Node} 변환된 DOM 노드
 */
export function createElement__v2(vNode: VNode): Node {
  if (!vNode) return document.createTextNode('');

  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(String(vNode));
  }

  if (Array.isArray(vNode)) {
    const $fragment = document.createDocumentFragment();
    vNode.forEach((child) => $fragment.appendChild(createElement__v2(child)));
    return $fragment;
  }

  if (typeof vNode.type === 'function') {
    return createElement__v2(
      vNode.type({ ...vNode.props, children: vNode.children })
    );
  }

  const $element = document.createElement(vNode.type);

  if (vNode.props) {
    setAttributes($element, vNode.props);
  }

  if (vNode.children) {
    appendChildren($element, vNode.children);
  }

  return $element;
}
