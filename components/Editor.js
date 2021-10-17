import { useState } from 'react'
import {
  Textarea,
  FormControl,
  FormLabel,
  VisuallyHidden,
} from '@chakra-ui/react'

async function uploadImageFile(file) {
  const formData = new FormData()
  formData.append('image', file, file.name)

  const res = await fetch('/api/upload-image', {
    method: 'POST',
    headers: {
      Authorization: 'Client-ID 692dd137fb5fb7a',
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

export default function Editor({ onChange, value, scrollRef, onScroll }) {
  const [isUploading, setIsUploading] = useState(false)

  const handleChange = e => {
    onChange(e.target.value)
  }

  /**
   * @param {ClipboardEvent} e
   */
  const handlePaste = async e => {
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
        const pastedText = `![image](${imageUrl})`

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
        // TODO: show snackbar ?
        console.log('Failed to upload image.', e)
      } finally {
        // re-enable the text-area
        setIsUploading(false)
      }
    }
  }

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
        onScroll={onScroll}
        resize="none"
        onPaste={handlePaste}
        isDisabled={isUploading}
      />
    </FormControl>
  )
}
