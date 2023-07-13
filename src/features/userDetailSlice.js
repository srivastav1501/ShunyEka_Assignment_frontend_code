import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// create action 
export const createUser = createAsyncThunk('createUser', async (data, { rejectWithValue }) => {
    const response = await fetch('/register', {
        method: 'Post',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    try {
        const result = await response.json();
        return result;

    } catch (error) {
        return rejectWithValue(error);
    }
})

// read operation

export const showUser = createAsyncThunk("showUser", async (args, { rejectWithValue }) => {
    const data = await fetch("/getUsers", {
        method: 'Get',
        headers: {
            "Content-Type": 'application/json',
        },
    });
    try {
        const res = await data.json();
        return res;
    } catch (error) {
        return rejectWithValue(error)
    }
}
)


export const deleteUser = createAsyncThunk("deleteUser", async (id, { rejectWithValue }) => {
    const data = await fetch(`/deleteUser/${id}`, {
        method: 'Delete',
        headers: {
            "Content-Type": 'application/json',
        },
    });
    try {
        const res = await data.json();
        return res;
    } catch (error) {
        return rejectWithValue(error)
    }
}
)

export const updateData = createAsyncThunk('updateData', async (data,{ rejectWithValue }) => {
    // console.log(data.id,'===5555',data.currUser)
    const response = await fetch(`/editUser/${data.id}`, {
        method: 'Put',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data.currUser)
    });
 
    try {
        const result = await response.json();
        return result;

    } catch (error) {
        return rejectWithValue(error);
    }
})


export const userDetails = createSlice({
    name: 'userDetail',
    initialState: {
        users: [],
        loading: false,
        error: null,

    },
    extraReducers: {
        [createUser.pending]: (state) => {
            state.loading = true;
        },
        [createUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.users.push(action.payload)
        },
        [createUser.rejected]: (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [showUser.pending]: (state) => {
            state.loading = true;
        },
        [showUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = action.payload;
        },
        [showUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }, [deleteUser.pending]: (state) => {
            state.loading = true;
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false;
            const { _id } = action.payload;
            if (_id) {
                state.users = state.users.filter((ele) => ele._id !== _id);
            }
            // console.log("action ", action.payload)
        },
        [deleteUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [updateData.pending]: (state) => {
            state.loading = true;
        },
        [updateData.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = state.users.map((ele)=>{
              return  ele._id === action.payload._id ? action.payload : ele
            })
        },
        [updateData.rejected]: (state) => {
            state.loading = false;
        },

    }

})

export default userDetails.reducer;