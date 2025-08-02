import { visit } from 'unist-util-visit';
import type { Root, Element, Text, Node } from 'hast';

const isElement = (node: Node): node is Element =>
  typeof (node as Element).tagName === 'string' && Array.isArray((node as Element).children);

export default function rehypeSpanKorean() {
  return (tree: Root) => {
    visit(tree, 'text', (node: Text, index: number | undefined, parent: Node | undefined) => {
      if (
        isElement(parent as Node) &&
        typeof index === 'number' &&
        (parent as Element).tagName !== 'span'
      ) {
        const regex = /([\uAC00-\uD7AF\u3130-\u318F\s.,!?'"“”‘’\-—…·:;(){}\[\]<>~`@#$%^&*_+=|\\/]+)/g;
        if (regex.test(node.value)) {
          const segments = node.value.split(regex).filter(Boolean);
          const newNodes = segments.flatMap(segment => {
            // Check if segment is Korean (with punctuation)
            if (/[\uAC00-\uD7AF\u3130-\u318F.,!?'"“”‘’\-—…·:;(){}\[\]<>~`@#$%^&*_+=|\\/]/.test(segment)) {
              // Extract leading and trailing spaces
              const leadingSpaces = segment.match(/^\s+/)?.[0] ?? '';
              const trailingSpaces = segment.match(/\s+$/)?.[0] ?? '';
              const core = segment.trim();
              const nodes = [];
              if (leadingSpaces) nodes.push({ type: 'text' as const, value: leadingSpaces });
              if (core) {
                nodes.push({
                  type: 'element' as const,
                  tagName: 'span',
                  properties: { lang: 'ko' },
                  children: [{ type: 'text' as const, value: core }]
                });
              }
              if (trailingSpaces) nodes.push({ type: 'text' as const, value: trailingSpaces });
              return nodes;
            } else {
              return { type: 'text' as const, value: segment };
            }
          });
          (parent as Element).children.splice(index, 1, ...newNodes);
        }
      }
    });
  };
}
