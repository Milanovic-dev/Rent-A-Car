const language = (state = 'en', action) => {
    switch (action.type) {
        case 'CHANGE_LANGUAGE':
            return action.lang
        default:
            return state
    }
}

export default language;

