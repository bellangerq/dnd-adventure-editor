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
  cover
}) {
  return (
    <ul>
      {title && <li>{title}</li>}
      {description && <li>{description}</li>}
      {lang && <li>{lang}</li>}
      {date && <li>{date.toString()}</li>}
      {author && (
        <li>
          <ul>
            <li>{author.name}</li>
            <li>{author.contact}</li>
          </ul>
        </li>
      )}
      {cover && <li>{cover}</li>}
    </ul>
  )
}
