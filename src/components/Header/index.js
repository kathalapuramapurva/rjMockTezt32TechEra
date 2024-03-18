import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="header-container">
    <Link to="/">
      <img
        className="style-website-logo"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
      />
    </Link>
  </nav>
)

export default Header
