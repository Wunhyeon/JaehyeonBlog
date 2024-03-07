import React from "react";
import Markdown from "react-markdown";
import rehypedHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

const MarkdownPreview = ({ content }: { content: string }) => {
  return (
    <Markdown
      rehypePlugins={[rehypedHighlight]}
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => {
          return <h1 {...props} className="text-4xl font-bold block" />;
        },
        h2(props) {
          return <h2 className="text-2xl font-bold block">{props.children}</h2>;
        },
        h3(props) {
          return <h3 className="text-xl block font-bold">{props.children}</h3>;
        },
      }}
      className="flex-col space-y-6"
    >
      {content}
    </Markdown>
  );
};

export default MarkdownPreview;
