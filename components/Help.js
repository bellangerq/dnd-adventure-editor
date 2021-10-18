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
  Stack,
  OrderedList,
  UnorderedList,
  ListItem,
  Link,
  Code,
  useBreakpointValue,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

export default function Help({
  isOpen,
  onClose,
  finalFocusRef,
  hasLocalAdventure,
}) {
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
            {hasLocalAdventure ? 'Help' : 'Welcome'}
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={8}>
            <section>
              <Heading as="h3" fontSize="xl" marginBottom={2}>
                Adventure details
              </Heading>
              <Text>
                Start by giving your new adventure details like a title and a
                description. Select &ldquo;
                <strong>Edit first page</strong>
                &rdquo; in the main menu and fill the form in. It will make your
                adventure looks cooler! Also prefer uploading an image in
                landscape format (16/9).
              </Text>
            </section>
            <section>
              <Heading as="h3" fontSize="xl" marginBottom={2}>
                Writing main content
              </Heading>
              <Text>
                Content is written in Markdown. It follows the standard{' '}
                <Link
                  href="https://www.markdownguide.org/cheat-sheet/"
                  isExternal
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
                    You can even write Markdown inside the callout.
                  </Text>
                  <Code
                    colorScheme="gray"
                    padding={2}
                    marginTop={2}
                    display="block"
                    whiteSpace="pre"
                    overflow="auto"
                  >
                    :::
                    <br />
                    Characters with a **Passive Perception &gt;= 15** can feel
                    the presence of the Night hag.
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
                    colorScheme="gray"
                    padding={2}
                    marginTop={2}
                    display="block"
                    whiteSpace="pre"
                    overflow="auto"
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
            </section>
            <section>
              <Heading as="h3" fontSize="xl" marginBottom={2}>
                Export as PDF
              </Heading>
              <Text>
                To get a better render of your printed adventure, it is
                recommended to use{' '}
                <Link href="https://www.mozilla.org" isExternal>
                  Mozilla Firefox <ExternalLinkIcon />
                </Link>{' '}
                or{' '}
                <Link href="https://www.google.com/chrome/" isExternal>
                  Google Chrome <ExternalLinkIcon />
                </Link>
                . Then follow these steps:
              </Text>

              <OrderedList marginTop={2}>
                <ListItem>
                  Select &ldquo;<strong>Export</strong>&rdquo; in the main menu.
                </ListItem>
                <ListItem>
                  Select &ldquo;<strong>Save to PDF</strong>&rdquo; as the print
                  destination.
                </ListItem>
                <ListItem>
                  Uncheck &ldquo;<strong>Print headers and footers</strong>
                  &rdquo; (optional).
                </ListItem>
                <ListItem>
                  Check &ldquo;<strong>Print backgrounds</strong>&rdquo;.
                </ListItem>
              </OrderedList>
            </section>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
