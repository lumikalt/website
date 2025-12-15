import { visit } from "unist-util-visit";

export default function remarkDirectiveToHtml() {
  return (tree: any) => {
    visit(
      tree,
      ["containerDirective", "leafDirective", "textDirective"],
      node => {
        const data = node.data || (node.data = {});
        const tagName = node.name;

        if (!tagName) return;

        data.hName = tagName;
        data.hProperties = node.attributes || {};
      }
    );
  };
}
