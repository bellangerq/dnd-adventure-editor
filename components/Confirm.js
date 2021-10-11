import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'

export default function Confirm({ isOpen, onClose, onConfirm }) {
  const modalSize = useBreakpointValue({ base: 'full', sm: 'sm' })

  return (
    <Modal size={modalSize} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Reset default content</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Reseting default content will erase your adventure. Are you sure you
            want to proceed?
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
