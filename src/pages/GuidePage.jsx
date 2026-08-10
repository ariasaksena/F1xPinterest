import { useParams, Link } from 'react-router-dom'
import { getGuide } from '../data'

export default function GuidePage() {
  const { slug } = useParams()
  const guide = getGuide(slug)

  if (!guide) {
    return (
      <div className="page stub fade-in">
        <h1 className="stub__title">Guide not found</h1>
        <Link to="/" className="back">{'\u2190'} All guides</Link>
      </div>
    )
  }

  return (
    <div className="page fade-in">
      <div className="gp__top">
        <Link to="/" className="back">{'\u2190'} All guides</Link>
      </div>
      <div className="gp__head">
        <div className="gp__no">N{'\u00BA'} {guide.number}</div>
        <h1 className="gp__title">{guide.title}</h1>
        <p className="gp__blurb">{guide.blurb}</p>
        <div className="gp__count">
          {guide.items.length} {guide.items.length === 1 ? 'pick' : 'picks'} {'\u00B7'} tap any item to shop
        </div>
      </div>
      <div className="items">
        {guide.items.map((it, i) => (
          <a key={i} className="item" href={it.url} target="_blank" rel="noopener noreferrer">
            <div className="item__frame">
              <span className="item__shop">Shop {'\u2197'}</span>
              <img className="item__img" src={it.img} alt={it.name} loading="lazy" />
            </div>
            <div className="item__body">
              <p className="item__brand">{it.brand}</p>
              <h3 className="item__name">{it.name}</h3>
              <span className="item__price">{it.price}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
