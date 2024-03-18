import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const allAPIStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class CourseItem extends Component {
  state = {
    courseDetails: {},
    apiStatus: allAPIStatus.initial,
  }

  componentDidMount() {
    this.getAllCourses()
  }

  getAllCourses = async () => {
    this.setState({apiStatus: allAPIStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const filteredCourses = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      console.log(filteredCourses)
      this.setState({
        courseDetails: filteredCourses,
        apiStatus: allAPIStatus.success,
      })
    } else {
      this.setState({apiStatus: allAPIStatus.failure})
    }
  }

  retryGetCourses = () => {
    this.getAllCourses()
  }

  renderCourses = () => {
    const {courseDetails} = this.state
    const {name, imageUrl, description} = courseDetails
    return (
      <div className="course-item-container">
        <img className="course-image" src={imageUrl} alt={name} />
        <div className="name-description">
          <h1 className="name">{name}</h1>
          <p className="description">{description}</p>
        </div>
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
    const {apiStatus, courseDetails} = this.state
    console.log(courseDetails)
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
        <div className="courseItem-container">
          <div className="courseItem-content-container">
            {this.renderSwitch()}
          </div>
        </div>
      </>
    )
  }
}

export default CourseItem
