import { Box, Divider, Image, Heading, Text } from '@chakra-ui/react'

/**
 * @param {Object} [props]
 * @param {string} [props.title]
 * @param {string} [props.description]
 * @param {string} [props.authorName]
 * @param {string} [props.authorContact]
 * @param {string} [props.coverUrl]
 */
export default function Meta({
  title,
  description,
  authorName,
  authorContact,
  coverUrl,
}) {
  return (
    <Box
      textAlign="center"
      sx={{
        '@media print': {
          pageBreakAfter: 'always',
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        },
      }}
    >
      <Heading as="h1" marginBottom={2}>
        {title}
      </Heading>
      <Text as="small" fontSize="sm">
        By {authorName} ({authorContact})
      </Text>
      <Text fontSize="lg" marginTop={4} marginBottom={4}>
        {description}
      </Text>
      {coverUrl ? (
        <Image borderRadius="md" display="inline-block" src={coverUrl} alt="" />
      ) : (
        <Divider
          marginTop={8}
          className="no-print"
          sx={{
            '@media print': {
              display: 'none',
            },
          }}
        />
      )}
    </Box>
  )
}
