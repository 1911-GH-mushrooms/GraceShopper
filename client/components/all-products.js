import React from 'react'
import {Link} from 'react-router-dom'

export const guestSession = (addGuestCart, product) => {
  if (sessionStorage.guest === undefined) {
    let cart = []
    product.ProductOrder = {
      quantity: 1
    }
    cart.push(product)
    window.sessionStorage.setItem('guest', JSON.stringify(cart))
  } else {
    let cart = JSON.parse(sessionStorage.getItem('guest'))
    let a = cart.slice()
    let arr = cart.filter(el => el.id === product.id)
    if (arr.length === 0) {
      product.ProductOrder = {
        quantity: 1
      }
    }
    let found = false
    a.forEach(el => {
      if (el.id === product.id) {
        found = true
        el.ProductOrder.quantity++
      }
    })
    if (found === false) a.push(product)
    window.sessionStorage.setItem('guest', JSON.stringify(a))
  }
  const guestCart = JSON.parse(sessionStorage.getItem('guest'))
  addGuestCart(guestCart)
}

export default class Products extends React.Component {
  componentDidMount() {
    this.props.onLoadAllProducts(this.props.userId)
  }

  render() {
    console.log('PRODUCT PROPS', this.props)
    const userStatus = this.props.userStatus
    const products = this.props.products
    return (
      <div id="main">
        {userStatus === 'admin' ? (
          <div className="addrecipe-btn">
            <Link to="/add" className="button3">
              Add Product
            </Link>
          </div>
        ) : null}
        <ul className="cards">
          {products.map(product => {
            let pid = product.id
            let cartMapVal = this.props.cart.cartMap[pid] || 0
            console.log('CARTMAPVAL', cartMapVal)
            return (
              <li key={product.id}>
                <div className="card">
                  <img src={product.imgSrc} height="250px" width="250px" />
                  <div className="card_content">
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                    <h4 className="price"> ${product.price}</h4>
                    {/* {console.log("ERROR1")} */}
                    {product.stockQuantity < 1 ? (
                      <div>
                        <h4>Out of Stock!</h4>
                      </div>
                    ) : (
                      <div>
                        <h4>In Stock: {product.stockQuantity}</h4>
                      </div>
                    )}

                    {!Array.isArray(this.props.cart.cartMap) ? (
                      this.props.cart.cartMap[pid] === undefined ? (
                        <div>
                          <h4>In Cart: 0</h4>
                        </div>
                      ) : (
                        <div>
                          <h4>In Cart: {this.props.cart.cartMap[pid]}</h4>
                        </div>
                      )
                    ) : (
                      <div>
                        <h4>In Cart: </h4>
                      </div>
                    )}

                    {/* {this.props.cart.cartMap[pid].ProductOrder.quantity} */}
                    {/* {console.log("ERROR3")} */}

                    {userStatus === 'admin' ? (
                      <div>
                        <button
                          onClick={() => {
                            this.props.delete(product.id)
                          }}
                          type="submit"
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          onClick={async () => {
                            //checks for guest or user

                            if (this.props.userId) {
                              await this.props.add(
                                product,
                                this.props.userId,
                                products.length
                              )
                            } else {
                              await guestSession(
                                this.props.addGuestCart,
                                product
                              )
                            }
                          }}
                          type="submit"
                          disabled={
                            product.stockQuantity < 1 ||
                            product.stockQuantity -
                              this.props.cart.cartMap[pid] <
                              1
                          }
                        >
                          Add to Cart
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
