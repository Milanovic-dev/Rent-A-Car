import { combineReducers } from 'redux'
import language from './language'
import searchForm from './searchForm'
import menu from './menu'

import translations from './translations'
import { reducer as reduxFormReducer } from 'redux-form'

export default combineReducers({
  language,
  translations,
  searchForm,
  menu,
  form: reduxFormReducer,
})

