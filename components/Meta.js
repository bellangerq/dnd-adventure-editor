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
          '> *': {
            fontFamily: 'var(--chakra-fonts-print) !important',
          },
        },
      }}
    >
      <Heading
        as="h1"
        marginBottom={2}
        sx={{
          '@media print': {
            color: '#471706',
            fontSize: '50pt',
            lineHeight: '60pt',
            fontVariant: 'small-caps',
            fontWeight: 'bold',
          },
        }}
      >
        {title}
      </Heading>
      <Box
        as="svg"
        version="1.1"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        sx={{
          display: 'none',
          '@media print': {
            display: 'block',
            height: '10pt',
            margin: '10pt auto',
            width: '60%',
          },
        }}
        aria-hidden="true"
      >
        <polygon
          points="50,0 100,50 50,100 0,50"
          fill="#943428"
          stroke="transparent"
        />
      </Box>
      <Text fontSize="lg" marginTop={4} marginBottom={4}>
        {description}
      </Text>
      <Text as="small" fontSize="sm" marginBottom={4} display="block">
        By {authorName} ({authorContact})
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
