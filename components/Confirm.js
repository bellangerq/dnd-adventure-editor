import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react'

export default function Confirm({
  isOpen,
  onClose,
  onConfirm,
  title,
  body,
  cancel,
  confirm,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>

        <ModalFooter>
          <Button onClick={onClose} variant="outline" marginRight={2}>
            {cancel}
          </Button>
          <Button onClick={onConfirm}>{confirm}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
