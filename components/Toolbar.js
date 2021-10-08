import { Button, Flex, ButtonGroup, VisuallyHidden } from '@chakra-ui/react'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'

export default function Toolbar({
  disableScroll,
  onDisableScroll,
  enableFocusMode,
  onToggleFocusMode,
}) {
  return (
    <Flex
      justify="space-between"
      marginBottom={4}
      className="no-print"
      flexWrap={{ base: 'wrap', md: 'nowrap' }}
    >
      <ButtonGroup
        spacing={{ base: 0, md: 4 }}
        marginRight={4}
        marginBottom={{ base: 2, md: 0 }}
        flexWrap={{ base: 'wrap', md: 'nowrap' }}
        flexDir={{ base: 'column', md: 'row' }}
      >
        <Button
          type="button"
          onClick={onDisableScroll}
          disabled={enableFocusMode}
          rightIcon={disableScroll ? <CloseIcon /> : <CheckIcon />}
          variant="outline"
          aria-pressed={disableScroll}
          marginBottom={{ base: 2, md: 0 }}
        >
          <VisuallyHidden>
            {disableScroll ? 'Enable' : 'Disable'}
          </VisuallyHidden>
          Synchronized scroll
        </Button>
        <Button
          type="button"
          onClick={onToggleFocusMode}
          rightIcon={enableFocusMode ? <CheckIcon /> : <CloseIcon />}
          variant="outline"
          aria-pressed={enableFocusMode}
        >
          <VisuallyHidden>
            {enableFocusMode ? 'Enable' : 'Disable'}
          </VisuallyHidden>
          Focus mode
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
