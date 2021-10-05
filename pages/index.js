import { useState } from 'react'
import dynamic from 'next/dynamic'

import Editor from '../components/Editor'
import Renderer from '../components/Renderer'
import defaultValue from '../default-editor-value'

const DynamicPrintButton = dynamic(() => Promise.resolve(PrintButton), {
  ssr: false
})

export default function Home() {
  const [value, setValue] = useState(defaultValue)

  const handleChange = (value) => {
    setValue(value)
  }

  return (
    <main>
      <h1 className="no-print">DnD adventure editor</h1>
      <button
        className="no-print"
        type="button"
        onClick={typeof window === 'undefined' ? null : window.print}
      >
        Imprimer
      </button>

      <div className="container-grid">
        <Editor value={value} onChange={handleChange} />
        <Renderer value={value} />
      </div>
    </main>
  )
}
