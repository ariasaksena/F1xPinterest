import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className="nav">
      <NavLink to="/" className="nav__brand" aria-label="Formula Planner home">
        <span className="dot" /> FORMULA PLANNER
      </NavLink>
      <div className="nav__links">
        <NavLink to="/" end className={({ isActive }) => 'nav__link' + (isActive ? ' is-active' : '')}>Guides</NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => 'nav__link' + (isActive ? ' is-active' : '')}>Invest In Me</NavLink>
        <NavLink to="/about" className={({ isActive }) => 'nav__link' + (isActive ? ' is-active' : '')}>About</NavLink>
      </div>
    </nav>
  )
}
