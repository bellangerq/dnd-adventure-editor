import MarkdownIt from 'markdown-it'
import markdownItContainer from 'markdown-it-container'
import markdownItTableCaptions from 'markdown-it-table-captions'

import classes from '../components/Renderer.module.css'

const md = new MarkdownIt()

// render callout blocks
md.use(markdownItContainer, 'callout', {
  validate: function (params) {
    return true
  },
  render: function (tokens, idx) {
    if (tokens[idx].nesting === 1) {
      return `<div class="${classes.callout}">`
    } else {
      return '</div>'
    }
  },
})

// handle table captions
md.use(markdownItTableCaptions)

export default md
