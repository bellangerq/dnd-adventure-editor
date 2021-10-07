import { useMemo } from 'react'
import MarkdownIt from 'markdown-it'
import markdownItFrontMatter from 'markdown-it-front-matter'
import yaml from 'js-yaml'

import Meta from './Meta'

export default function Renderer({ value }) {
  // parse markdown and extract frontmatter
  const { html, rawFrontMatter } = useMemo(() => {
    const md = new MarkdownIt()
    let rawFrontMatter

    md.use(markdownItFrontMatter, (fm) => {
      rawFrontMatter = fm
    })

    const html = md.render(value)

    return { html, rawFrontMatter }
  }, [value])

  // parse yaml frontmatter
  const frontMatter = useMemo(() => {
    try {
      return yaml.load(rawFrontMatter)
    } catch {
      // fallback to empty object
      return {}
    }
  }, [rawFrontMatter])

  return (
    <div>
      <Meta {...frontMatter} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
