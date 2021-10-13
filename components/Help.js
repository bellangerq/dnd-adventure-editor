import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Heading,
  Text,
  List,
  UnorderedList,
  ListItem,
  Link,
  Code,
  useBreakpointValue,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

export default function Help({ isOpen, onClose, finalFocusRef }) {
  const modalSize = useBreakpointValue({ base: 'full', sm: 'xl' })

  return (
    <Modal
      finalFocusRef={finalFocusRef}
      size={modalSize}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading as="h2" fontSize="2xl">
            Help
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <List as="ol" spacing={8}>
            <ListItem>
              <Heading as="h3" fontSize="xl" marginBottom={2}>
                Adventure details
              </Heading>
              <Text>
                Start by giving your new adventure details like a title and a
                description. Select &ldquo;
                <strong>Edit first page</strong>
                &rdquo; in the main menu and fill the form in. It will make your
                adventure looks cooler!
              </Text>
            </ListItem>
            <ListItem>
              <Heading as="h3" fontSize="xl" marginBottom={2}>
                Writing main content
              </Heading>
              <Text>
                Content is written in Markdown. It follows the standard{' '}
                <Link
                  href="https://www.markdownguide.org/cheat-sheet/"
                  isExternal
                  color="pink"
                >
                  Markdown guidelines <ExternalLinkIcon />
                </Link>{' '}
                and implements 2 new custom block types:
              </Text>
              <UnorderedList spacing={4} marginTop={2}>
                <ListItem>
                  <Text>
                    <strong>Callout</strong>: renders a callout to emphasize a
                    part in your adventure. Useful for incoming encounters,
                    specific descriptions of locations or secret DM information.
                  </Text>
                  <Code
                    colorScheme="grey"
                    marginTop={2}
                    display="block"
                    whiteSpace="pre"
                  >
                    :::
                    <br />
                    pouet
                    <br />
                    :::
                  </Code>
                </ListItem>
                <ListItem>
                  <Text>
                    <strong>Captioned table</strong>: renders a table with a
                    caption. Useful to generate random elements for your
                    adventure.
                  </Text>
                  <Code
                    colorScheme="grey"
                    marginTop={2}
                    display="block"
                    whiteSpace="pre"
                  >
                    Table: Race of character
                    <br />
                    <br />
                    | d4 | Race |<br />
                    | -- | -------- |<br />
                    | 1 | Dwarf |<br />
                    | 2 | Elf |<br />
                    | 3 | Halfling |<br />| 4 | Human |
                  </Code>
                </ListItem>
              </UnorderedList>
            </ListItem>
            <ListItem>
              <Heading as="h3" fontSize="xl" marginBottom={2}>
                Download as PDF
              </Heading>
              <Text>
                Select &ldquo;<strong>Download</strong>&rdquo; in the main menu
                to download the printable PDF.
              </Text>
            </ListItem>
          </List>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
