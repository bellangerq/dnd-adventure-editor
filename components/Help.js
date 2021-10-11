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

export default function Help({ isOpen, onClose }) {
  const modalSize = useBreakpointValue({ base: 'full', sm: 'xl' })

  return (
    <Modal size={modalSize} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>How to write</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Officia dolore qui proident duis dolore aliqua pariatur Lorem elit
            laboris eu sint reprehenderit consequat. Dolor anim velit enim sunt
            esse ex. Veniam pariatur duis est fugiat exercitation in. Sunt
            proident eiusmod voluptate Lorem reprehenderit magna consectetur
            proident irure culpa eu Lorem tempor incididunt. Nulla eiusmod ex
            elit Lorem reprehenderit magna tempor exercitation qui. Quis eu sint
            officia eiusmod.
          </Text>
          <Text>
            Commodo voluptate sit ullamco fugiat. Sint eiusmod veniam nisi
            nostrud laboris duis eu laboris amet dolor mollit. Cillum
            exercitation officia occaecat consequat ea magna eu ad laboris nisi
            incididunt. Ipsum id nulla irure proident pariatur tempor aute
            dolore commodo qui cupidatat.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
