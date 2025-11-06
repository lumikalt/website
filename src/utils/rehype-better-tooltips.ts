import { visit } from "unist-util-visit";
import type { Root, Text, Element, Node } from "hast";

const TOOLTIP_REGEX = /\{\{([^}]+)\}([cpf])?(?:\s*([^}]+))?\}/g;

const typeMap: Record<string, string> = {
  c: "casual",
  p: "polite/neutral",
  f: "formal"
};

export default function rehypeBetterTooltips() {
  return (tree: Root) => {
    visit(
      tree,
      "text",
      (node: Text, index: number | undefined, parent: Node | undefined) => {
        if (
          !parent ||
          typeof index !== "number" ||
          !node.value.match(TOOLTIP_REGEX)
        )
          return;

        const parts: (Element | Text)[] = [];
        let lastIndex = 0;
        let match: RegExpExecArray | null;

        TOOLTIP_REGEX.lastIndex = 0;
        while ((match = TOOLTIP_REGEX.exec(node.value))) {
          if (match.index > lastIndex) {
            parts.push({
              type: "text",
              value: node.value.slice(lastIndex, match.index)
            });
          }
          const [full, text, type, tooltipRest] = match;
          let tooltip = typeMap[type?.trim() ?? ""] ?? "";
          if (tooltipRest && tooltipRest.trim()) {
            tooltip = tooltip
              ? `${tooltip}: ${tooltipRest.trim()}`
              : tooltipRest.trim();
          }
          const component: Element = {
            type: "element",
            tagName: "abbr",
            properties: {
              title: tooltip,
            },
            children: [{
              type: "text",
              value: text?.trim() ?? ""
            }]
          };
          parts.push(component);
          lastIndex = match.index + full.length;
        }
        if (lastIndex < node.value.length) {
          parts.push({
            type: "text",
            value: node.value.slice(lastIndex)
          });
        }
        if (
          parts.length > 0 &&
          parent &&
          Array.isArray((parent as any).children)
        ) {
          (parent as Element).children.splice(index, 1, ...parts);
        }
      }
    );
  };
}
