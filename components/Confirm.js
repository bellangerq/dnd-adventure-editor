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
  useBreakpointValue,
} from '@chakra-ui/react'

export default function Confirm({ isOpen, onClose, onConfirm, finalFocusRef }) {
  const modalSize = useBreakpointValue({ base: 'full', sm: 'sm' })

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
            Reset default content
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Reseting default content will{' '}
            <strong>erase your current adventure</strong>. Are you sure you want
            to proceed?
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} variant="outline" marginRight={4}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Reset the adventure</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
