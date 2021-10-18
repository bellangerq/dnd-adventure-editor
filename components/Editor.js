import { useState, useCallback } from 'react'
import {
  Textarea,
  FormControl,
  FormLabel,
  VisuallyHidden,
  useToast,
} from '@chakra-ui/react'

async function uploadImageFile(file) {
  const formData = new FormData()
  formData.append('image', file, file.name)

  const res = await fetch('/api/upload-image', {
    method: 'POST',
    headers: {
      Referer: null,
    },
    body: formData,
  })

  const json = await res.json()

  if (json.success) {
    return json.data.link
  } else {
    throw new Error(json.data.error)
  }
}

export default function Editor({ onChange, value, scrollRef }) {
  const [isUploading, setIsUploading] = useState(false)
  const toast = useToast()

  const handleChange = useCallback(e => {
    onChange(e.target.value)
  }, [onChange])

  /** @param {ClipboardEvent} e */
  const handlePaste = useCallback(
    async e => {
      const data = e.clipboardData.items[0]
      const textarea = e.currentTarget

      if (data.kind === 'file' && data.type.startsWith('image/')) {
        const file = data.getAsFile()

        // Disable text area temporarily
        setIsUploading(true)

        try {
          // Upload image
          const imageUrl = await uploadImageFile(file)

          // generate markdown from image url
          const pastedText = `![](${imageUrl})`

          const { selectionStart, selectionEnd } = textarea

          // Insert image markdown at current cursor position
          const newValue =
            textarea.value.substring(0, selectionStart) +
            pastedText +
            textarea.value.substring(selectionEnd, textarea.value.length)

          // tell parent the value was updated
          onChange(newValue)

          // update cursor position to the end of the added markdown
          textarea.selectionStart = selectionStart + pastedText.length
          textarea.selectionEnd = selectionStart + pastedText.length
        } catch (e) {
          console.error('Failed to upload image.', e)
          toast({
            title: 'Something went wrong...',
            description:
              'An error happened while uploading the image. Please try again.',
            status: 'error',
            isClosable: true,
          })
        } finally {
          // re-enable the text-area
          setIsUploading(false)
        }
      }
    },
    [onChange, toast]
  )

  return (
    <FormControl id="editor">
      <VisuallyHidden>
        <FormLabel>Adventure&apos;s content</FormLabel>
      </VisuallyHidden>
      <Textarea
        ref={scrollRef}
        spellCheck={false}
        height="100%"
        value={value}
        onChange={handleChange}
        fontFamily="mono"
        resize="none"
        onPaste={handlePaste}
        isDisabled={isUploading}
      />
    </FormControl>
  )
}
