const searchForm = (state = false, action) => {
    switch (action.type) {
        case 'HANDLE_MOBILE_SEARCH_FORM':
            return action.val
        default:
            return state
    }
}

export default searchForm;

