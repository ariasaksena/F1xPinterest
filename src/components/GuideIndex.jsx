import { Link } from 'react-router-dom'
import { guides } from '../data'

export default function GuideIndex() {
  return (
    <section>
      <div className="index__head">
        <span className="index__title">The Guides</span>
        <span className="index__count">{guides.length} Editions</span>
      </div>
      <div className="guides">
        {guides.map((g) => (
          <Link key={g.slug} to={`/guide/${g.slug}`} className="gcard">
            <div className="gcard__frame">
              <span className="gcard__no">N{'\u00BA'} {g.number}</span>
              <span className="gcard__cat">{g.category}</span>
              <img className="gcard__img" src={g.cover} alt={g.title} loading="lazy" />
            </div>
            <div className="gcard__body">
              <h2 className="gcard__name">{g.title}</h2>
              <p className="gcard__blurb">{g.blurb}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
