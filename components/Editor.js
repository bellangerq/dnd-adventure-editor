export default function Editor({ onChange, value }) {
  const handleChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <div className="no-print">
      <label style={{ display: 'block' }} htmlFor="editor">
        Entrée
      </label>
      <textarea
        style={{ display: 'block', height: '100%', width: '100%' }}
        value={value}
        onChange={handleChange}
        id="editor"
      />
    </div>
  )
}
