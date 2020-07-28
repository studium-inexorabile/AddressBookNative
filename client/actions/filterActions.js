// Action creators for filtering and sorting contacts

export const setNameFilter = (name = '') => ({
    type:'SET_NAME_FILTER',
    name
})
export const setEmailFilter = (email = '') => ({
    type:'SET_EMAIL_FILTER',
    email
})
export const setPhoneFilter = (phone = '') => ({
    type:'SET_PHONE_FILTER',
    phone
})

export const sortByName = () => ({
    type:'SORTBY_NAME'
})

export const sortByEmail = () => ({
    type:'SORTBY_EMAIL'
})