import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = props => {
  const {isLoggedIn, handleClick, user} = props
  const status = user.status
  return (
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="navbar-header">
        <Link to="/home" className="navbar-brand items">
          <img src="mushroom.png" className="icon" />
          {'     '}
          Mushroom{' '}
        </Link>
        <Link to="/products" className="items active">
          Groceries
        </Link>
        <Link to="/recipies" className="items">
          Recipies
        </Link>
      </div>

      {isLoggedIn ? (
        <div className="nav navbar-nav navbar-right">
          {/* The navbar will show these links after you log in */}
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
        <div className="nav navbar-nav navbar-right">
          {/* The navbar will show these links before you log in */}
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
