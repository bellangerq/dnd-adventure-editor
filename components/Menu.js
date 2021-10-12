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

  const {
    isOpen: showMeta,
    onOpen: openMeta,
    onClose: closeMeta,
  } = useDisclosure()

  const handleConfirm = () => {
    closeConfirm()
    onReset()
  }

  const handleMeta = data => {
    closeMeta()
    onMetaSubmit(data)
  }

  const menuOptionGroupValue = [
    ...(!disableScroll ? ['enableScroll'] : []),
    ...(enableFocusMode ? ['enableFocusMode'] : []),
  ]

  return (
    <>
      <Help isOpen={showHelp} onClose={closeHelp} />

      <Confirm
        isOpen={showConfirm}
        onClose={closeConfirm}
        onConfirm={handleConfirm}
      />

      <MetaModal
        isOpen={showMeta}
        onClose={closeMeta}
        onConfirm={handleMeta}
        defaultValues={meta}
      />

      <ChakraMenu>
        <MenuButton as={Button}>Menu</MenuButton>
        <MenuList>
          <MenuItem onClick={openMeta} icon={<EditIcon />}>
            Edit first page
          </MenuItem>
          <MenuItem onClick={openHelp} icon={<QuestionIcon />}>
            How to
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
