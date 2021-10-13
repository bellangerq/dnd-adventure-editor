import { useState, useRef, useEffect } from 'react'
import { Heading, Grid, Box, Container, Flex } from '@chakra-ui/react'
import Menu from '../components/Menu'
import Editor from '../components/Editor'
import Renderer from '../components/Renderer'
import defaultValue from '../utils/default-editor-value'

const STORAGE_KEY = 'dnd-adventure-editor'

export default function Home() {
  const [value, setValue] = useState(defaultValue)
  const [disableScroll, setDisableScroll] = useState(false)
  const [enableFocusMode, setEnableFocusMode] = useState(false)
  const [ignoreScroll, setIgnoreScroll] = useState(false)
  const [meta, setMeta] = useState(null)
  const editorRef = useRef()
  const rendererRef = useRef()

  const handleChange = value => {
    setValue(value)
  }

  const handleDisableScroll = () => {
    setDisableScroll(!disableScroll)
  }

  const handleToggleFocusMode = () => {
    setEnableFocusMode(!enableFocusMode)
  }

  const handleReset = () => {
    setValue(defaultValue)
    setMeta(null)
  }

  // TODO: extract synchronized scrolling into a hook
  const handleTextareaScroll = event => {
    if (ignoreScroll) {
      setIgnoreScroll(false)
      return
    }

    const { scrollTop, scrollHeight, clientHeight } = event.target
    const scrollTopMax = scrollHeight - clientHeight
    const ratio = scrollTop / scrollTopMax

    const rendererScrollTopMax =
      rendererRef.current.scrollHeight - rendererRef.current.clientHeight
    const rendererTop = Math.round(rendererScrollTopMax * ratio)

    setIgnoreScroll(true)
    rendererRef.current.scrollTop = rendererTop
  }

  const handleRendererScroll = event => {
    if (ignoreScroll) {
      setIgnoreScroll(false)
      return
    }

    const { scrollTop, scrollHeight, clientHeight } = event.target
    const scrollTopMax = scrollHeight - clientHeight
    const ratio = scrollTop / scrollTopMax

    const editorScrollTopMax =
      editorRef.current.scrollHeight - editorRef.current.clientHeight
    const editorTop = Math.round(editorScrollTopMax * ratio)

    setIgnoreScroll(true)
    editorRef.current.scrollTop = editorTop
  }

  const handleMetaSubmit = data => {
    setMeta(data)
  }

  const handleExport = async () => {
    console.log('Requesting export')

    const body = JSON.stringify({ markdown: value })
    const headers = { 'Content-Type': 'application/json' }
    const res = await fetch('/api/generate-pdf', {
      method: 'POST',
      body,
      headers,
    })

    const pdfBlob = await res.blob()
    const pdfBlobUrl = window.URL.createObjectURL(pdfBlob)
    const pdfFilename = meta?.title ? `${meta.title}.pdf` : 'my-adventure.pdf'

    const a = document.createElement('a')
    a.href = pdfBlobUrl
    a.download = pdfFilename
    a.click()
  }

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
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ markdown: value, meta }))
  }, [value, meta])

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
      <Flex
        as="header"
        marginTop={{ base: 0, sm: 4 }}
        marginBottom={4}
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        sx={{ gap: 12 }}
      >
        <Heading as="h1">D&D AE</Heading>

        <Menu
          disableScroll={disableScroll}
          onDisableScroll={handleDisableScroll}
          enableFocusMode={enableFocusMode}
          onToggleFocusMode={handleToggleFocusMode}
          onReset={handleReset}
          onMetaSubmit={handleMetaSubmit}
          meta={meta}
          onExport={handleExport}
        />
      </Flex>

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
        <Editor
          value={value}
          onChange={handleChange}
          scrollRef={editorRef}
          onScroll={
            disableScroll || enableFocusMode ? null : handleTextareaScroll
          }
        />
        <Renderer
          value={value}
          meta={meta}
          scrollRef={rendererRef}
          onScroll={disableScroll ? null : handleRendererScroll}
          hidden={enableFocusMode}
        />
      </Grid>
    </Container>
  )
}
