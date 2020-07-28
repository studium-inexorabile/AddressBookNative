const contactReducerDefaultState = []
// Sets reducer behavior for handling Contact actions
export default (state = contactReducerDefaultState, action) => {
    switch(action.type){
        case 'SET_CONTACTS':
            // takes given contacts and sets them as reducer state
            return action.contacts
        case 'ADD_CONTACT':
            // adds contact to reducer state
            return [...state, action.contact]
        case 'REMOVE_CONTACT':
            // filters out contact in reducer state that matches given ID
            return state.filter((item) => item.id !== action.id)
        case 'EDIT_CONTACT':
            // finds contact that matches given ID and applies
            // updates to it
            return state.map((item) => {
                if(item.id === action.id){
                    return {
                        ...item,
                        ...action.updates
                    }
                }else{
                    return item
                }
            })
        default:
            return state
    }
}