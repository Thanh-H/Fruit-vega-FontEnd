import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "products",
    initialState: {
        cart: {
            cartView: [],
            error: false,
            quantity: 0,
            total: 0

        },
    },
    reducers: {
        //create CART
        createCartSuccess: (state, action) => {
            let id = action.payload.id
            let description = action.payload.description
            let quantity = action.payload.quantity
            let coppyState = [...state.cart.cartView]
            let product = coppyState.find((item, index) => {
                return (item.id === id && item.description === description)

            })
            if (!product) {
                state.cart.cartView = [...state.cart.cartView, action.payload]
            }
            if (product) {
                state.cart.cartView.map((item, index) => {
                    if (item.id === id && item.description === description) {
                        item.quantity = item.quantity + quantity
                        return item
                    }
                })
            }
            state.cart.quantity = state.cart.cartView.map((item, index) => item.quantity).reduce((a, b) => a + b)
            state.cart.total = state.cart.cartView.map((item, index) => item.price * item.quantity).reduce((a, b) => a + b)

        },
        createCartFailed: (state) => {
            state.cart.error = true;
        },
        //delete CART 
        deleteCartSuccess: (state, action) => {
            let id = action.payload
            let coppyState = [...state.cart.cartView]
            coppyState = coppyState.filter((item, index) => { if (index !== id) return item })
            state.cart.cartView = [...coppyState]
            if (state.cart.cartView.length > 0) { state.cart.quantity = state.cart.cartView.map((item, index) => item.quantity).reduce((a, b) => a + b) }
            if (state.cart.cartView.length === 0) { state.cart.quantity = 0 }
            if (state.cart.cartView.length > 0) { state.cart.total = state.cart.cartView.map((item, index) => item.price * item.quantity).reduce((a, b) => a + b) }
            if (state.cart.cartView.length === 0) { state.cart.total = 0 }
        },
        deleteCartFailed: (state) => {
            state.cart.error = true;
        },


    }
})

export const {
    createCartSuccess,
    createCartFailed,
    deleteCartSuccess,
    deleteCartFailed
} = productSlice.actions;

export default productSlice.reducer;