import { useRef, useState, useEffect, useCallback } from 'react'
import {
  Button,
  useBoolean,
  useDisclosure,
  Menu as ChakraMenu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import {
  DeleteIcon,
  QuestionIcon,
  EditIcon,
  DownloadIcon,
} from '@chakra-ui/icons'

import Confirm from './Confirm'
import Help from './Help'
import MetaModal from './MetaModal'
import { STORAGE_KEY } from '../pages/index'

export default function Menu({
  disableScroll,
  onDisableScroll,
  enableFocusMode,
  onToggleFocusMode,
  onReset,
  onMetaSubmit,
  meta,
}) {
  const [showConfirm, { off: closeConfirm, on: openConfirm }] = useBoolean()
  const [showHelp, { off: closeHelp, on: openHelp }] = useBoolean()
  const [hasLocalAdventure, setHasLocalAdventure] = useState(false)

  const finalRef = useRef()

  const {
    isOpen: showMeta,
    onOpen: openMeta,
    onClose: closeMeta,
  } = useDisclosure()

  const handleConfirm = useCallback(() => {
    closeConfirm()
    onReset()
  }, [closeConfirm, onReset])

  const handleMeta = useCallback(
    data => {
      closeMeta()
      onMetaSubmit(data)
    },
    [closeMeta, onMetaSubmit]
  )

  useEffect(() => {
    const hasLocalAdventure = !!localStorage.getItem(STORAGE_KEY)
    setHasLocalAdventure(hasLocalAdventure)
    if (!hasLocalAdventure) {
      openHelp()
    }
  }, [openHelp])

  const handleHelpClose = useCallback(() => {
    setHasLocalAdventure(true)
    closeHelp()
  }, [closeHelp])

  const menuOptionGroupValue = [
    ...(!disableScroll ? ['enableScroll'] : []),
    ...(enableFocusMode ? ['enableFocusMode'] : []),
  ]

  return (
    <>
      <Help
        finalFocusRef={finalRef}
        isOpen={showHelp}
        onClose={handleHelpClose}
        hasLocalAdventure={hasLocalAdventure}
      />

      <Confirm
        finalFocusRef={finalRef}
        isOpen={showConfirm}
        onClose={closeConfirm}
        onConfirm={handleConfirm}
      />

      <MetaModal
        finalFocusRef={finalRef}
        isOpen={showMeta}
        onClose={closeMeta}
        onConfirm={handleMeta}
        defaultValues={meta}
      />

      <ChakraMenu>
        <MenuButton flexShrink={0} ref={finalRef} as={Button}>
          Menu
        </MenuButton>
        <MenuList>
          <MenuItem onClick={openMeta} icon={<EditIcon />}>
            Edit first page
          </MenuItem>
          <MenuItem onClick={openHelp} icon={<QuestionIcon />}>
            Help
          </MenuItem>
          <MenuItem onClick={openConfirm} icon={<DeleteIcon />}>
            Reset
          </MenuItem>
          <MenuItem
            onClick={typeof window === 'undefined' ? null : window.print}
            icon={<DownloadIcon />}
          >
            Export
          </MenuItem>
          <MenuDivider />
          <MenuOptionGroup
            value={menuOptionGroupValue}
            title="Settings"
            type="checkbox"
          >
            <MenuItemOption
              value="enableScroll"
              onClick={onDisableScroll}
              closeOnSelect={false}
              isDisabled={enableFocusMode}
            >
              Synchronized scroll
            </MenuItemOption>
            <MenuItemOption
              value="enableFocusMode"
              onClick={onToggleFocusMode}
              closeOnSelect={false}
            >
              Focus mode
            </MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      </ChakraMenu>
    </>
  )
}
