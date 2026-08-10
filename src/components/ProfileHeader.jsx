import { account } from '../data'

export default function ProfileHeader() {
  return (
    <header className="profile">
      <img className="profile__pic" src={account.photo} alt="F1 Las Vegas GP" />
      <div className="profile__eyebrow eyebrow">{account.eyebrow}</div>
      <h1 className="profile__name">{account.name}</h1>
      <hr className="profile__rule rule-race" />
      <p className="profile__tagline">{account.tagline}</p>
      <div className="profile__loc">{account.location}</div>
      <p className="profile__meta">{account.disclaimer}</p>
    </header>
  )
}
