import { visit } from 'unist-util-visit';
import type { Root, Element, Text, Node } from 'hast';

const isElement = (node: Node): node is Element =>
    typeof (node as Element).tagName === 'string' && Array.isArray((node as Element).children);

const hasKoreanClass = (el: Element): boolean => {
    const className = el.properties?.className;
    if (typeof className === 'string') return className.includes('korean');
    if (Array.isArray(className)) return className.includes('korean');
    return false;
};

export default function rehypeSpanKorean() {
    return (tree: Root) => {
        visit(tree, 'text', (node: Text, index: number | undefined, parent: Node | undefined) => {
            if (
                isElement(parent as Node) &&
                typeof index === 'number' &&
                (parent as Element).tagName !== 'span' &&
                !hasKoreanClass(parent as Element)
            ) {
                const regex = /([\uAC00-\uD7AF\u3130-\u318F\s]+)/g;
                if (regex.test(node.value)) {
                    const segments = node.value.split(regex).filter(Boolean);
                    const newNodes = segments.map(segment =>
                        /[\uAC00-\uD7AF\u3130-\u318F]/.test(segment)
                            ? {
                                type: 'element' as const,
                                tagName: 'span',
                                properties: { lang: 'ko' }, // <-- set lang instead of class
                                children: [{ type: 'text' as const, value: segment }]
                            }
                            : { type: 'text' as const, value: segment }
                    );
                    (parent as Element).children.splice(index, 1, ...newNodes);
                }
            }
        });
    };
}
