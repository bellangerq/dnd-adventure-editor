import { useState, useRef, useEffect, useCallback } from 'react'
import { Heading, Grid, Box, Text, Container, Flex } from '@chakra-ui/react'
import Menu from '../components/Menu'
import Editor from '../components/Editor'
import Renderer from '../components/Renderer'
import defaultValue from '../utils/default-editor-value'
import { useSyncScroller } from '../utils/useScrollSync'

export const STORAGE_KEY = 'dnd-adventure-editor'

export default function Home() {
  const [value, setValue] = useState(defaultValue)
  const [disableScroll, setDisableScroll] = useState(false)
  const [enableFocusMode, setEnableFocusMode] = useState(false)
  const ref1 = useSyncScroller('synchronizedEditor')
  const ref2 = useSyncScroller('synchronizedEditor')
  const [meta, setMeta] = useState(null)
  const [isPristine, setIsPristine] = useState(true)

  const handleChange = useCallback(value => {
    setIsPristine(false)
    setValue(value)
  }, [])

  const handleDisableScroll = useCallback(() => {
    setDisableScroll(!disableScroll)
  }, [disableScroll])

  const handleToggleFocusMode = useCallback(() => {
    setEnableFocusMode(!enableFocusMode)
  }, [enableFocusMode])

  const handleReset = useCallback(() => {
    setValue(defaultValue)
    setMeta(null)
  }, [])

  const handleMetaSubmit = useCallback(data => {
    setMeta(data)
  }, [])

  useEffect(() => {
    setDisableScroll(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )

    const savedAdventure = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (savedAdventure) {
      setValue(savedAdventure.markdown)
      setMeta(savedAdventure.meta)
    }
  }, [])

  useEffect(() => {
    if (isPristine) return

    localStorage.setItem(STORAGE_KEY, JSON.stringify({ markdown: value, meta }))
  }, [value, meta, isPristine])

  useEffect(() => {
    const doPrintEl = document.querySelector('.do-print')

    if (!doPrintEl) {
      return
    }

    // recursively get ancestors and add the `do-print-ancestor` class to each element
    let el = doPrintEl
    while (true) {
      el = el.parentElement
      if (!el) {
        break
      }
      el.classList.add('do-print-ancestor')
    }
  }, [enableFocusMode])

  return (
    <Container
      maxWidth="container.xl"
      display="flex"
      flexDirection="column"
      height="100vh"
      padding={{ base: 2, sm: 4 }}
    >
      <Grid
        as="header"
        templateColumns={{ base: '1fr auto', md: 'auto 1fr auto' }}
        templateRows={{ base: 'auto auto', md: 'auto' }}
        gap={{ base: 2, md: 4 }}
        alignItems={{ base: 'start', md: 'center' }}
        marginBottom={4}
      >
        <Heading as="h1">D&D Adventure Editor</Heading>
        <Text
          gridRow={{ base: '2', md: '1' }}
          gridColumn={{ base: '1 / span 2', md: '2' }}
        >
          Generate beautiful and print-ready D&D adventures.
        </Text>

        <Menu
          disableScroll={disableScroll}
          onDisableScroll={handleDisableScroll}
          enableFocusMode={enableFocusMode}
          onToggleFocusMode={handleToggleFocusMode}
          onReset={handleReset}
          onMetaSubmit={handleMetaSubmit}
          meta={meta}
        />
      </Grid>

      <Grid
        as="main"
        flexGrow={1}
        templateColumns={{
          base: '1fr',
          md: enableFocusMode ? '1fr' : '1fr 1fr',
        }}
        templateRows={{
          base: enableFocusMode ? '1fr' : '1fr 1fr',
          md: '1fr',
        }}
        gap={4}
        height={0}
        sx={{
          '@media print': {
            height: 'initial',
            display: 'block',
          },
        }}
      >
        <Editor value={value} onChange={handleChange} scrollRef={ref1} />
        <Renderer
          value={value}
          meta={meta}
          scrollRef={ref2}
          hidden={enableFocusMode}
        />
      </Grid>
    </Container>
  )
}
