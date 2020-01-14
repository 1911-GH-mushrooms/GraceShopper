import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'
import UpdateUser from './update-user'
/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, firstName, lastName, address, imageURL} = props

  return (
    <div className="profiles">
      <div className="cards">
        <div>
          <div className="profile ">
            <img src={imageURL} height="300px" width="300px" />
            <h3 className="price">Welcome, {firstName + ' ' + lastName}!</h3>
          </div>

          <ul className="menu">
            <li className="menu_item">
              <Link to="/user">Profile</Link>
            </li>
            <li className="menu_item">
              <Link to="/products">Order history</Link>
            </li>
            <li className="menu_item">
              <Link to="/user/settings">Settings</Link>
            </li>
          </ul>
        </div>
        <div className="profile_option">
          {props.location.pathname === '/user' ? (
            <div>
              <div className="card_content">
                <h3>First Name: {firstName}</h3>
                <h3>Last Name: {lastName}</h3>
                <h3>Address: {address}</h3>
                <h3>Email: {email}</h3>
              </div>
            </div>
          ) : (
            <div>
              <Route
                path={`${props.match.path}/settings`}
                render={() => <UpdateUser />}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    address: state.user.address,
    imageURL: state.user.imageURL
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
