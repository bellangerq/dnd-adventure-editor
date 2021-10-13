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
                description. Select "<strong>Edit first page</strong>" in the
                main menu and fill the form in. It will make your adventure
                looks cooler!
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
                    specific location's description or secret DM information.
                  </Text>
                  <Code
                    colorScheme="grey"
                    marginTop={2}
                    display="block"
                    whiteSpace="pre"
                    children={`:::
                      pouet
                    :::`}
                  />
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
                    children={`Table: Race of character

                    | d4 | Race     |
                    | -- | -------- |
                    | 1  | Dwarf    |
                    | 2  | Elf      |
                    | 3  | Halfling |
                    | 4  | Human    |`}
                  />
                </ListItem>
              </UnorderedList>
            </ListItem>
            <ListItem>
              <Heading as="h3" fontSize="xl" marginBottom={2}>
                Download as PDF
              </Heading>
              <Text>
                Select "<strong>Download</strong>" in the main menu to download
                the printable PDF.
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
