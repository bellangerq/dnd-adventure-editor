import {
  Textarea,
  FormControl,
  FormLabel,
  VisuallyHidden,
} from "@chakra-ui/react";

export default function Editor({ onChange, value, scrollRef, onScroll }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <FormControl id="editor" className="no-print">
      <VisuallyHidden>
        <FormLabel>Entrée</FormLabel>
      </VisuallyHidden>
      <Textarea
        ref={scrollRef}
        spellCheck={false}
        widht="100%"
        height="100%"
        display="block"
        value={value}
        onChange={handleChange}
        fontFamily="monospace"
        onScroll={onScroll}
      />
    </FormControl>
  );
}
