import {Link} from 'react-router-dom'
import './index.css'

const CourseLogoItem = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails
  return (
    <li className="style-course-item">
      <Link to={`/courses/${id}`} className="style-link">
        <img className="style-logo" src={logoUrl} alt={name} />
        <p className="course-name">{name}</p>
      </Link>
    </li>
  )
}

export default CourseLogoItem
