import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CourseLogoItem from '../CourseLogoItem'
import './index.css'

const allAPIStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Home extends Component {
  state = {
    courses: [],
    apiStatus: allAPIStatus.initial,
  }

  componentDidMount() {
    this.getAllCourses()
  }

  getAllCourses = async () => {
    this.setState({apiStatus: allAPIStatus.inProgress})
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const filteredCourses = data.courses.map(course => ({
        id: course.id,
        name: course.name,
        logoUrl: course.logo_url,
      }))
      this.setState({courses: filteredCourses, apiStatus: allAPIStatus.success})
    } else {
      this.setState({apiStatus: allAPIStatus.failure})
    }
  }

  retryGetCourses = () => {
    this.getAllCourses()
  }

  renderCourses = () => {
    const {courses} = this.state
    return (
      <div className="home-content-container">
        <h1 className="style-courses-heading">Courses</h1>
        <ul className="courses-list">
          {courses.map(course => (
            <CourseLogoItem key={course.id} courseDetails={course} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="failure-button"
        type="button"
        onClick={this.retryGetCourses}
      >
        Retry
      </button>
    </div>
  )

  renderSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case allAPIStatus.success:
        return this.renderCourses()
      case allAPIStatus.failure:
        return this.renderFailureView()
      case allAPIStatus.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="content-container">{this.renderSwitch()}</div>
        </div>
      </>
    )
  }
}

export default Home
