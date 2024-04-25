import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: {},
  },
  reducers: {
    addBook: (state, action) => {
      state.value = {...state.value, [action.payload.id]: action.payload.info}
    },
    removeBook: (state, action) => {
      delete state.value[action.payload.id]
    },
  },
})

// Action creators are generated for each case reducer function
export const { addBook, removeBook } = cartSlice.actions

export default cartSlice.reducer