import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer,productDetailsReducer} from '../reducers/productListReducer'
import {userReducer} from '../reducers/userReducer'
const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    userLogin:userReducer,
})

/**eklediğimiz item'i localstorage'ye eklemek için aşağıdaki komutları yazıyoruz. */
const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    :null;

const initialState = {
    userLogin:{userInfoFromStorage},
}
const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store