import { useMemo } from "react";
import MarkdownIt from "markdown-it";
import markdownItFrontMatter from "markdown-it-front-matter";
import markdownItContainer from "markdown-it-container";
import markdownItTableCaptions from "markdown-it-table-captions";
import yaml from "js-yaml";
import { Stack, Divider, useColorModeValue } from "@chakra-ui/react";

import Meta from "./Meta";

export default function Renderer({ value }) {
  // parse markdown and extract frontmatter
  const { html, rawFrontMatter } = useMemo(() => {
    const md = new MarkdownIt();
    let rawFrontMatter;

    // extract front matter
    md.use(markdownItFrontMatter, (fm) => {
      rawFrontMatter = fm;
    });

    // render callout blocks
    md.use(markdownItContainer, "callout", {
      validate: function (params) {
        return true;
      },
      render: function (tokens, idx) {
        if (tokens[idx].nesting === 1) {
          return '<div class="callout" style="border: 2px solid gold;">';
        } else {
          return "</div>";
        }
      },
    });

    // handle table captions
    md.use(markdownItTableCaptions);

    const html = md.render(value);

    return { html, rawFrontMatter };
  }, [value]);

  // parse yaml frontmatter
  const frontMatter = useMemo(() => {
    try {
      return yaml.load(rawFrontMatter);
    } catch {
      // fallback to empty object
      return {};
    }
  }, [rawFrontMatter]);

  const borderColor = useColorModeValue("gray.200", "white.300");

  return (
    <Stack
      spacing={4}
      borderWidth={1}
      borderColor={borderColor}
      padding={4}
      borderRadius="md"
    >
      <Meta {...frontMatter} />
      <Divider />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Stack>
  );
}
