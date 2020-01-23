import React from 'react'
import {loadUserOrders} from '../store/orders'
import {connect} from 'react-redux'
import {SingleOrder} from './single-order'
class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.onLoadUserOrders()
  }

  render() {
    console.log('ORDER', this.props.userOrders)

    return (
      <div>
        <h1>Order History:</h1>
        {this.props.userOrders.map(order => {
          let date = order.date.split('T')
          return (
            <div key={order.id}>
              <p>Order ID: {order.id}</p>
              <p>Order Date: {date[0]}</p>
              <p>
                Shipped To: {order.firstName} {order.lastName}
                <br />
                {order.address}
              </p>
              <div>
                <p>Items in Order:</p>
                {order.products.map(product => {
                  return (
                    <div key={product.id}>
                      <p>
                        {product.ProductOrder.quantity} {product.name}
                      </p>
                    </div>
                  )
                })}
              </div>
              <hr />
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    userOrders: state.orders
  }
}

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    onLoadUserOrders: function() {
      const userId = ownProps.userid
      const thunk = loadUserOrders(userId)
      dispatch(thunk)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)