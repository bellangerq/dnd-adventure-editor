import { useState } from 'react'
import {
  Button,
  Flex,
  ButtonGroup,
  VisuallyHidden,
  useBoolean,
} from '@chakra-ui/react'
import {
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  QuestionIcon,
} from '@chakra-ui/icons'

import Confirm from './Confirm'
import Help from './Help'

export default function Toolbar({
  disableScroll,
  onDisableScroll,
  enableFocusMode,
  onToggleFocusMode,
  onReset,
}) {
  const [showConfirm, { off: closeConfirm, on: openConfirm }] = useBoolean()
  const [showHelp, { off: closeHelp, on: openHelp }] = useBoolean()

  const handleConfirm = () => {
    closeConfirm()
    onReset()
  }

  return (
    <>
      <Help isOpen={showHelp} onClose={closeHelp} />

      <Confirm
        isOpen={showConfirm}
        onClose={closeConfirm}
        onConfirm={handleConfirm}
      />
      <Flex
        justify="space-between"
        marginBottom={4}
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
          <Button
            type="button"
            onClick={openConfirm}
            variant="outline"
            rightIcon={<DeleteIcon />}
          >
            Reset
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={openHelp}
            rightIcon={<QuestionIcon />}
          >
            How to
          </Button>
        </ButtonGroup>
        <Button
          type="button"
          onClick={typeof window === 'undefined' ? null : window.print}
        >
          Print
        </Button>
      </Flex>
    </>
  )
}
