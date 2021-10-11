import { useMemo } from 'react'
import MarkdownIt from 'markdown-it'
import markdownItFrontMatter from 'markdown-it-front-matter'
import markdownItContainer from 'markdown-it-container'
import markdownItTableCaptions from 'markdown-it-table-captions'
import yaml from 'js-yaml'
import { Stack, useColorModeValue, useColorMode } from '@chakra-ui/react'
import clsx from 'clsx'

import classes from './Renderer.module.css'
import Meta from './Meta'

export default function Renderer({ value, scrollRef, onScroll }) {
  const { colorMode } = useColorMode()
  const borderColor = useColorModeValue('gray.200', 'white.300')

  // parse markdown and extract frontmatter
  const { html, rawFrontMatter } = useMemo(() => {
    const md = new MarkdownIt()
    let rawFrontMatter

    // extract front matter
    md.use(markdownItFrontMatter, fm => {
      rawFrontMatter = fm
    })

    // render callout blocks
    md.use(markdownItContainer, 'callout', {
      validate: function (params) {
        return true
      },
      render: function (tokens, idx) {
        if (tokens[idx].nesting === 1) {
          return `<div class="${classes.callout}">`
        } else {
          return '</div>'
        }
      },
    })

    // handle table captions
    md.use(markdownItTableCaptions)

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
    <Stack
      spacing={4}
      borderWidth={1}
      borderColor={borderColor}
      padding={4}
      borderRadius="md"
      overflow="auto"
      ref={scrollRef}
      onScroll={onScroll}
      className="do-print"
    >
      <Meta {...frontMatter} />
      <div
        className={clsx(classes.content, {
          [classes.dark]: colorMode === 'dark',
        })}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Stack>
  )
}
