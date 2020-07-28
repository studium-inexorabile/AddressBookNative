import { combineReducers, createStore, applyMiddleware } from 'redux'
import contactReducer from '../reducers/contactReducer'
import filterReducer from '../reducers/filterReducer'
import loginReducer from '../reducers/loginReducer'
import thunk from 'redux-thunk';

export default () => {
    // creates Redux store based on contact, filter, and login reducers
    const store = createStore(
        combineReducers({
            contacts: contactReducer,
            filters: filterReducer,
            login: loginReducer
        }),
        // allows async logic that interacts with the store
        applyMiddleware(thunk)
    )
    return store
}