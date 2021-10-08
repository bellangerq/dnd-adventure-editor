import { Button, Flex, ButtonGroup, VisuallyHidden } from '@chakra-ui/react'
import { CheckIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons'

export default function Toolbar({ disableScroll, onDisableScroll }) {
  return (
    <Flex justify="space-between" marginBottom={4} className="no-print">
      <ButtonGroup spacing={4}>
        <Button
          type="button"
          onClick={onDisableScroll}
          rightIcon={disableScroll ? <CloseIcon /> : <CheckIcon />}
          variant="outline"
          aria-pressed={disableScroll}
        >
          <VisuallyHidden>
            {disableScroll ? 'Enable' : 'Disable'}
          </VisuallyHidden>
          Synchronized scroll
        </Button>
      </ButtonGroup>
      <Button
        type="button"
        onClick={typeof window === 'undefined' ? null : window.print}
      >
        Print
      </Button>
    </Flex>
  )
}
