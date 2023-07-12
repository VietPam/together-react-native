import BaseInitialState from "../../models/baseInitialState";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { testApi } from "../../api/testApi";
import { AppRootState } from "../../store/index";


interface Test extends BaseInitialState {
    user: string;
}

const initialState: Test = {
    user: "",
    status: "idle",
};

export const fetchTestingText = createAsyncThunk(
    "test/fetchTestingText",
    async (query: void, { dispatch, rejectWithValue }) => {
        try {
            const response = await testApi.getTestString();
            return response;
        } catch (error) {
            const message = "ERORR Message";
            return rejectWithValue(message);
        }
    }
);


const userSlice = createSlice({
    name: "test",
    initialState,
    reducers: {
        setTestValue(state, action: PayloadAction<Test>) {
            state.user = action.payload.user;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTestingText.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTestingText.fulfilled, (state, action) => {
                state.status = "succeeded";
                console.log(action.payload);
            })
            .addCase(fetchTestingText.rejected, (state) => {
                state.status = "failed";
                console.log("failed");
            });
    },
});

export const selectUser = (state: AppRootState) => state.testSlice.user;

export const { setTestValue: setUser } = userSlice.actions;
export default userSlice.reducer;
