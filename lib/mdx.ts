import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { createElement } from 'react'

export function MarkdownRenderer({ content }: { content: string }) {
  return createElement(ReactMarkdown, {
    remarkPlugins: [remarkGfm],
    components: {
      code: ({ node, children, ...props }: any) => {
        const language = node?.lang || 'text'
        return createElement('pre', { className: 'bg-muted p-4 rounded-lg overflow-x-auto' },
          createElement('code', { className: `language-${language}` }, children)
        )
      },
    },
  }, content)
}
