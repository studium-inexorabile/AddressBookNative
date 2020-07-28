export default (contacts, {name, email, phone, sortBy}) => {
    // used to filter contacts based on selected filters in <ContactList /> component
    return contacts.filter((item) => {
        const nameMatch = item.name.toLowerCase().includes(name.toLowerCase())
        const emailMatch = item.email.toLowerCase().includes(email.toLowerCase())
        const phoneMatch = item.phone.toLowerCase().includes(phone.toLowerCase())
        return nameMatch && emailMatch && phoneMatch
    }).sort((a,b) => {
        // sorts contacts based on given sortBy variable
        if(sortBy === 'name'){
            return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name.toLowerCase() > b.name.toLowerCase() ? 1 : 0
        }else if(sortBy === 'email'){
            return a.email.toLowerCase() < b.email.toLowerCase() ? -1 : a.email.toLowerCase() > b.email.toLowerCase() ? 1 : 0
        }
    })
}