import { useState, useRef, useEffect } from 'react'
import { Heading, Grid, Box, Container, Flex } from '@chakra-ui/react'
import Toolbar from '../components/Toolbar'
import Editor from '../components/Editor'
import Renderer from '../components/Renderer'
import defaultValue from '../utils/default-editor-value'

const STORAGE_KEY = 'dnd-adventure-editor'

export default function Home() {
  const [value, setValue] = useState(defaultValue)
  const [disableScroll, setDisableScroll] = useState(false)
  const [enableFocusMode, setEnableFocusMode] = useState(false)
  const [ignoreScroll, setIgnoreScroll] = useState(false)
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

  useEffect(() => {
    setDisableScroll(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )

    const savedAdventure = localStorage.getItem(STORAGE_KEY)
    if (savedAdventure) {
      setValue(savedAdventure)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, value)
  }, [value])

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
    <Flex height="100vh" direction="column">
      <Box as="header" marginTop={4}>
        <Heading as="h1" textAlign="center">
          DnD adventure editor
        </Heading>
      </Box>

      <Container
        as="main"
        maxWidth="container.xl"
        padding={4}
        flexGrow={1}
        display="flex"
        flexDirection="column"
      >
        <Toolbar
          disableScroll={disableScroll}
          onDisableScroll={handleDisableScroll}
          enableFocusMode={enableFocusMode}
          onToggleFocusMode={handleToggleFocusMode}
          onReset={handleReset}
        />

        <Grid
          templateColumns={{
            base: '1fr',
            md: enableFocusMode ? '1fr' : '1fr 1fr',
          }}
          templateRows={{
            base: enableFocusMode ? '1fr' : '1fr 1fr',
            md: '1fr',
          }}
          gap={4}
          flexGrow={1}
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
            scrollRef={rendererRef}
            onScroll={disableScroll ? null : handleRendererScroll}
            hidden={enableFocusMode}
          />
        </Grid>
      </Container>
    </Flex>
  )
}
