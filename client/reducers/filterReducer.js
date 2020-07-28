const filterReducerDefaultState = {
    name: "",
    email: "",
    phone: "",
    sortBy: "name"
}
// Sets reducer behavior for handling Filter actions,
// controlling how Contacts are displayed.
export default (state = filterReducerDefaultState, action) => {
    switch(action.type){
        case 'SET_NAME_FILTER':
            // takes given name and applies it 
            // to name property in reducer
            return {
                ...state,
                name:action.name
            }
        case 'SET_EMAIL_FILTER':
            // takes given email and applies it 
            // to email property in reducer
            return {
                ...state,
                email:action.email
            }
        case 'SET_PHONE_FILTER':
            // takes given phone and applies it 
            // to phone property in reducer
            return {
                ...state,
                phone:action.phone
            }
        case 'SORTBY_NAME':
            // sets 'sortBy' property to 'name'
            return {
                ...state,
                sortBy:'name'
            }
        case 'SORTBY_EMAIL':
            // sets 'sortBy' property to 'email'
            return {
                ...state,
                sortBy:'email'
            }        
        default:
            return state
    }
}