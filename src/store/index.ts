import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import testSlice from "./slices/testSlice";

const store = configureStore({
    reducer: {
        testSlice: testSlice,
    },
});