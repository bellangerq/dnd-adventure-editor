import marked from 'marked'

export default function Renderer({ value }) {
  return <div dangerouslySetInnerHTML={{ __html: marked(value) }} />
}
