const menu = (state = null, action) => {
    switch (action.type) {
        case 'HANDLE_MENU':
            return action.val
        default:
            return state
    }
}

export default menu;

