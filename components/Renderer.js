import { useMemo } from 'react'
import MarkdownIt from 'markdown-it'
import markdownItContainer from 'markdown-it-container'
import markdownItTableCaptions from 'markdown-it-table-captions'
import { Stack, useColorModeValue, useColorMode } from '@chakra-ui/react'
import clsx from 'clsx'

import classes from './Renderer.module.css'
import Meta from './Meta'
import md from '../utils/markdown-renderer'

export default function Renderer({ value, scrollRef, onScroll, hidden, meta }) {
  const { colorMode } = useColorMode()
  const borderColor = useColorModeValue('gray.200', 'white.300')

  // parse markdown
  const html = useMemo(() => {
    const html = md.render(value)

    return html
  }, [value])

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
      sx={{
        '@media print': {
          display: 'block',
          border: 'none',
        },
        ...(hidden && {
          display: 'none',
        }),
      }}
    >
      {meta && <Meta {...meta} />}
      <div
        className={clsx(classes.content, {
          [classes.dark]: colorMode === 'dark',
        })}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Stack>
  )
}
