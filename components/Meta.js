import { Box, Divider, Image, Heading, Text } from '@chakra-ui/react'

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
    <Box
      textAlign="center"
      sx={{
        breakAfter: 'always',
        pageBreakAfter: 'always',
      }}
    >
      <Heading as="h1" marginBottom={2}>
        {title}
      </Heading>
      <Text as="small" fontSize="sm">
        By {author.name} ({author.contact})
      </Text>
      <Text fontSize="lg" marginTop={4} marginBottom={4}>
        {description}
      </Text>
      {cover ? (
        <Image borderRadius="md" src={cover} alt="" />
      ) : (
        <Divider marginTop={8} />
      )}
    </Box>
  )
}
