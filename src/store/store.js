import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../containers/BookList/bookListSlice'
export default configureStore({
  reducer: {
    cart: cartReducer
  },
})