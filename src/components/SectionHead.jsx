// A hairline bezel: section name inset left, a true measurement inset
// right. The right-hand datum always reports something real about the
// section below it, so the device carries information instead of trim.
function SectionHead({ label, title, datum }) {
  return (
    <header className="bezel">
      <div>
        <span className="legend">{label}</span>
        <h2 className="section-title">{title}</h2>
      </div>
      {datum && <span className="bezel-datum">{datum}</span>}
    </header>
  )
}

export default SectionHead
