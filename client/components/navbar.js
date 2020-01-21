import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = props => {
  const {isLoggedIn, handleClick, user} = props
  const status = user.status
  return (
    <div>
      <h1>Mushroom</h1>
      <nav>
        {isLoggedIn ? (
          <div id="nav_hm">
            {/* The navbar will show these links after you log in */}
            <Link to="/products" className="items">
              Home
            </Link>
            <Link to="/recipies" className="items">
              Recipies
            </Link>
            <Link to="/user" className="items">
              User
            </Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            {status !== 'admin' ? (
              <Link to="/cart" className="items">
                🛒
              </Link>
            ) : null}
          </div>
        ) : (
          <div id="nav_hm">
            {/* The navbar will show these links before you log in */}
            <Link to="/products" className="items">
              Home
            </Link>
            <Link to="/recipies" className="items">
              Recipies
            </Link>
            <Link to="/login" className="items">
              Login
            </Link>
            <Link to="/signup" className="items">
              Sign Up
            </Link>
            <Link to="/cart" className="items">
              🛒
            </Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
