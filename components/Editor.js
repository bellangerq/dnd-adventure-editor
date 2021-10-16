import { useCallback } from 'react'
import {
  Textarea,
  FormControl,
  FormLabel,
  VisuallyHidden,
} from '@chakra-ui/react'

export default function Editor({ onChange, value, scrollRef }) {
  const handleChange = useCallback(
    e => {
      onChange(e.target.value)
    },
    [onChange]
  )

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
        resize="none"
      />
    </FormControl>
  )
}
