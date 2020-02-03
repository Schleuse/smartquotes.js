import string from './string';

// @ts-ignore
const TEXT_NODE = typeof Element !== 'undefined' && Element.TEXT_NODE || 3;


export default function (root: Node) {
  handleElement(root);
  return root;
}

type TextNodeInfo = [Node, number];


function handleElement(el: Node) {
  if (['CODE', 'PRE', 'SCRIPT', 'STYLE'].indexOf(el.nodeName.toUpperCase()) !== -1) {
    return;
  }

  let i, node, nodeInfo;
  let text = '';
  const childNodes = el.childNodes;
  const textNodes: TextNodeInfo[] = [];

  // compile all text first so we handle working around child nodes
  for (i = 0; i < childNodes.length; i++) {
    node = childNodes[i];

    if (node.nodeType === TEXT_NODE || node.nodeName === '#text') {
      textNodes.push([node, text.length]);
      text += node.nodeValue;
    } else if (node.childNodes && node.childNodes.length) {
      text += handleElement(node);
    }

  }
  text = string(text, { retainLength: true });
  for (i in textNodes) {
    nodeInfo = textNodes[i];
    if (nodeInfo[0].nodeValue) {
      nodeInfo[0].nodeValue = substring(text, nodeInfo[0].nodeValue, nodeInfo[1]);
    }
  }
  return text;
}

function substring(text: string, value: string, position: number) {
  return text.substr(position, value.length).replace('\u2063', '');
}
