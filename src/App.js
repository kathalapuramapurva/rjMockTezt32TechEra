import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import CourseItem from './components/CourseItem'
import NotFound from './components/NotFound'

import './App.css'

// Replace your code here
const App = () => (
  <div className="app-container">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses/:id" component={CourseItem} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </div>
)

export default App
