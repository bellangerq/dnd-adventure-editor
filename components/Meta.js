import { UnorderedList, ListItem } from "@chakra-ui/layout";

/**
 * @param {Object} [props]
 * @param {string} [props.title]
 * @param {string} [props.description]
 * @param {string} [props.lang]
 * @param {Date} [props.date]
 * @param {Object} [props.author]
 * @param {string} [props.author.name]
 * @param {string} [props.author.contact]
 * @param {string} [props.cover]
 */
export default function Meta({
  title,
  description,
  lang,
  date,
  author,
  cover,
}) {
  return (
    <UnorderedList spacing={2}>
      {title && <ListItem>{title}</ListItem>}
      {description && <ListItem>{description}</ListItem>}
      {lang && <ListItem>{lang}</ListItem>}
      {date && <ListItem>{date.toString()}</ListItem>}
      {author && (
        <ListItem>
          <UnorderedList>
            <ListItem>{author.name}</ListItem>
            <ListItem>{author.contact}</ListItem>
          </UnorderedList>
        </ListItem>
      )}
      {cover && <ListItem>{cover}</ListItem>}
    </UnorderedList>
  );
}
