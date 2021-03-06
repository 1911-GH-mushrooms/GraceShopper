import React from 'react'
import {connect} from 'react-redux'
import {Link, Route, Redirect} from 'react-router-dom'
import {loadSingleRecipe} from '../store/recipies'
import {guestSession} from './all-products'
import {addToCart, gotSavedCart} from '../store/cart'
import UpdateRecipeContainer from './update-recipe-container'

class SingleRecipe extends React.Component {
  async componentDidMount() {
    const id = this.props.match.params.recipeId
    await this.props.onLoadSingleRecipe(id)
  }
  render() {
    const {recipe, user} = this.props
    if (recipe === undefined) return <h1>Loading</h1>
    return user.status === 'admin' ? (
      <div>
        <Redirect
          exact
          from={`/recipies/${recipe.id}`}
          to={`/recipies/${recipe.id}/update`}
        />
        <Route path={`/recipies/${recipe.id}/update`}>
          <UpdateRecipeContainer {...this.props} />
        </Route>
      </div>
    ) : (
      <div id="main">
        <div id="recipes">
          <div className="recipeBox ">
            <img src={recipe.imageURL} />
          </div>
          <div className="recipeBox ">
            <div>
              <h1>{recipe.name}</h1>
            </div>
            <div>
              <h3 className="price">Cooking time: {recipe.time}</h3>
            </div>
            <div className="ingredients">
              <h3 className="price">Ingredients: </h3>
              <div>
                <button
                  className="btn1"
                  onClick={() => {
                    //checks for guest or user
                    if (user.id) {
                      recipe.products.map(product => {
                        for (
                          let i = 0;
                          i < product.recipeProduct.quantity;
                          i++
                        ) {
                          this.props.addProductToUserCart(product, user.id)
                        }
                      })
                    } else {
                      recipe.products.map(product => {
                        for (
                          let i = 0;
                          i < product.recipeProduct.quantity;
                          i++
                        ) {
                          guestSession(
                            this.props.addProductToGuestCart,
                            product
                          )
                        }
                      })
                    }
                  }}
                  type="submit"
                >
                  Add all ingredients
                </button>
              </div>
              <ul>
                {recipe.products.map(product => (
                  <div key={product.id} className="ingredient">
                    <button
                      className="addbtn"
                      onClick={() => {
                        //checks for guest or user
                        if (user.id) {
                          this.props.addProductToUserCart(product, user.id)
                        } else {
                          guestSession(
                            this.props.addProductToGuestCart,
                            product
                          )
                        }
                      }}
                      type="submit"
                    >
                      +
                    </button>
                    <ol>
                      <Link to={`/products/${product.id}`}>
                        {' '}
                        {product.name}
                      </Link>
                    </ol>
                  </div>
                ))}
              </ul>
            </div>
          </div>
          <div className="recipeBox directions">
            <div>
              <h2>Directions: </h2>
            </div>

            <div>
              <p align="center">{recipe.description}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  recipe: state.recipies[0],
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  onLoadSingleRecipe: id => dispatch(loadSingleRecipe(id)),
  addProductToUserCart: (product, userId) =>
    dispatch(addToCart(product, userId)),
  addProductToGuestCart: items => gotSavedCart(items)
})

const SingleRecipeContainer = connect(mapStateToProps, mapDispatchToProps)(
  SingleRecipe
)

export default SingleRecipeContainer
