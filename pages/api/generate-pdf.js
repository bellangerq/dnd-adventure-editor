import pdf from 'html-pdf'

import md from '../../utils/markdown-renderer'

/** @type {import('html-pdf').CreateOptions} */
const pdfOptions = {
  format: 'A4',
}

function generatePdfBuffer(html, options) {
  return new Promise((resolve, reject) => {
    pdf.create(html, options).toBuffer((err, buffer) => {
      if (err) {
        return reject(err)
      }
      resolve(buffer)
    })
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(404)
  }

  const { markdown } = req.body
  const html = md.render(markdown)

  const buffer = await generatePdfBuffer(html, pdfOptions)

  res.setHeader('Content-Type', 'application/pdf')
  return res.status(200).send(buffer)
}
