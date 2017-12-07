import React from 'react'
import { Route } from 'react-router'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const Navigation = () =>
  <ul>
    <li><Link to='/'>Index page</Link></li>
    <li><Link to='/about'>About page</Link></li>
  </ul>

const IndexPage = () =>
  <div>
    <h2>Index page</h2>
    <p>This is content of the index page.</p>
  </div>

const AboutPage = () =>
  <div>
    <h2>About page</h2>
    <p>This is content of the about page.</p>
  </div>

const App = () =>
  <div className='app'>
    <Helmet>
      <title>react-spring-webpack-isomorphic-boilerplate</title>
    </Helmet>

    <img className='app__react-logo' src='static/react.svg' />

    <h1>react-spring-webpack-isomorphic-boilerplate</h1>

    <Navigation />

    <Route exact path='/' component={IndexPage} />
    <Route path='/about' component={AboutPage} />
  </div>

export default App
