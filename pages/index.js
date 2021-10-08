import { useState } from "react";
import { Heading, Button, Grid, Box, Container, Flex } from "@chakra-ui/react";

import Editor from "../components/Editor";
import Renderer from "../components/Renderer";
import defaultValue from "../utils/default-editor-value";

export default function Home() {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (value) => {
    setValue(value);
  };

  return (
    <Flex minHeight="100vh" direction="column">
      <Box as="header" marginTop={4}>
        <Heading as="h1" className="no-print" textAlign="center">
          DnD adventure editor
        </Heading>
      </Box>

      <Container
        as="main"
        maxWidth="container.xl"
        padding={4}
        flexGrow={1}
        display="flex"
        flexDirection="column"
      >
        <Flex justify="end" marginBottom={4}>
          <Button
            className="no-print"
            type="button"
            onClick={typeof window === "undefined" ? null : window.print}
          >
            Imprimer
          </Button>
        </Flex>

        <Grid templateColumns="1fr 1fr" gap={4} flexGrow={1}>
          <Editor value={value} onChange={handleChange} />
          <Renderer value={value} />
        </Grid>
      </Container>
    </Flex>
  );
}
