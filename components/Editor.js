import {
  Textarea,
  FormControl,
  FormLabel,
  VisuallyHidden,
} from '@chakra-ui/react'

export default function Editor({ onChange, value, scrollRef, onScroll }) {
  const handleChange = e => {
    onChange(e.target.value)
  }

  return (
    <FormControl id="editor">
      <VisuallyHidden>
        <FormLabel>Entrée</FormLabel>
      </VisuallyHidden>
      <Textarea
        ref={scrollRef}
        spellCheck={false}
        height="100%"
        value={value}
        onChange={handleChange}
        fontFamily="mono"
        onScroll={onScroll}
        resize="none"
      />
    </FormControl>
  )
}
