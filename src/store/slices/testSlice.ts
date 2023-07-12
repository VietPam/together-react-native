import BaseInitialState from "../../models/baseInitialState";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { testApi } from "api/testApi";


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