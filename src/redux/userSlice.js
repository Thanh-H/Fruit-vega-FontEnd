import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: {
            allUsers: null,
            error: false
        },
    },
    reducers: {
        //GET USER
        getAllUsersSuccess: (state, action) => {
            state.users.allUsers = action.payload;
        },
        getAllUsersFailed: (state) => {
            state.users.error = true;
        },
        //DELETE
        deleteUsersSuccess: (state, action) => {
        },
        deleteUserFailed: (state, action) => {
            state.users.error = true;
        }
    }
})

export const {
    getAllUsersSuccess,
    getAllUsersFailed,
    deleteUsersSuccess,
    deleteUserFailed
} = userSlice.actions;

export default userSlice.reducer;