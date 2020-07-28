const loginReducerDefaultState = {}
// Sets reducer behavior for handling Login actions.
export default (state = loginReducerDefaultState, action) => {
    switch(action.type){
        case 'LOGIN':
            // Sets login credentails in reducer
            return action.login
        case 'LOGOUT':
            // Resets login credentials in reducer
            return action.login
        default:
            return state
    }
}