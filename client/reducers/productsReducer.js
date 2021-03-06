import axios from 'axios'

const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'
const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
const FETCH_PRODUCTS_FAIL = 'FETCH_PRODUCTS_FAIL'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'
const NEW_PRODUCT = 'NEW_PRODUCT'
const FETCH_SELECTED_PRODUCT = 'FETCH_SELECTED_PRODUCT'
const RESET_PRODUCT = 'RESET_PRODUCT'

const initialState = {
  products: [],
  selectedProduct: {},
  isLoading: false,
  error: false
}

export const fetchProducts = () => {
  return dispatch => {
    axios
      .get('/api/products')
      .then(res => {
        dispatch({type: FETCH_PRODUCTS_SUCCESS, payload: res.data})
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const fetchProduct = id => {
  return dispatch => {
    axios
      .get(`/api/products/${id}`)
      .then(res => {
        dispatch({type: FETCH_SELECTED_PRODUCT, payload: res.data})
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const resetProduct = () => {
  return dispatch => {
    dispatch({type: RESET_PRODUCT})
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_PRODUCTS:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_PRODUCTS_FAIL:
      return {
        ...state,
        error: true
      }
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        isLoading: false
      }
    case NEW_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => {
          return product.id !== action.payload.id
        })
      }
    case EDIT_PRODUCT:
      return {
        ...state,
        products: state.products.map(product => {
          if (product.id === action.payload.id) {
            return action.payload
          }
          return product
        })
      }

    case FETCH_SELECTED_PRODUCT:
      return {
        ...state,
        selectedProduct: action.payload
      }

    case RESET_PRODUCT:
      return {
        ...state,
        selectedProduct: {}
      }

    default:
      return state
  }
}

export default reducer
