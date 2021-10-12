import { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useBreakpointValue,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Textarea,
  Grid,
  Stack,
  Image,
} from '@chakra-ui/react'

const DEFAULT_FIELD_VALUES = {
  title: '',
  description: '',
  authorName: '',
  authorContact: '',
  coverUrl: '',
}

export default function MetaModal({
  isOpen,
  onClose,
  onConfirm,
  defaultValues,
}) {
  const modalSize = useBreakpointValue({ base: 'full', sm: 'md' })

  const [fields, setFields] = useState({
    ...DEFAULT_FIELD_VALUES,
    ...defaultValues,
  })

  useEffect(() => {
    setFields({
      ...DEFAULT_FIELD_VALUES,
      ...defaultValues,
    })
  }, [defaultValues])

  const onChange = name => event => {
    setFields({
      ...fields,
      [name]: event.target.value,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    onConfirm(fields)
  }

  return (
    <Modal size={modalSize} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit meta</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack
            id="edit-meta-form"
            as="form"
            direction="column"
            spacing={4}
            onSubmit={handleSubmit}
          >
            <FormControl id="meta-title" isRequired>
              <FormLabel>Title</FormLabel>
              <Input value={fields.title} onChange={onChange('title')} />
              <FormHelperText>
                Ex: &quot;The Great Big Adventure&quot;
              </FormHelperText>
            </FormControl>

            <FormControl id="meta-description" isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={fields.description}
                onChange={onChange('description')}
              />
            </FormControl>

            <fieldset>
              <legend>Author</legend>
              <Grid templateColumns="1fr 1fr" gap={4}>
                <FormControl id="meta-author-name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={fields.authorName}
                    onChange={onChange('authorName')}
                  />
                </FormControl>
                <FormControl id="meta-author-contact" isRequired>
                  <FormLabel>Contact</FormLabel>
                  <Input
                    value={fields.authorContact}
                    onChange={onChange('authorContact')}
                  />
                </FormControl>
              </Grid>
            </fieldset>

            <FormControl id="meta-cover">
              <FormLabel>Cover URL</FormLabel>
              <Grid
                alignItems="center"
                templateColumns="1fr var(--chakra-sizes-10)"
                gap={4}
              >
                <Input
                  value={fields.coverUrl}
                  onChange={onChange('coverUrl')}
                  type="url"
                />

                <Image
                  borderRadius={4}
                  src={fields.coverUrl}
                  alt=""
                  objectFit="cover"
                />
              </Grid>
              <FormHelperText>URL pointing to an image.</FormHelperText>
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} variant="outline" marginRight={4}>
            Cancel
          </Button>
          <Button type="submit" form="edit-meta-form">
            Update the meta
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
