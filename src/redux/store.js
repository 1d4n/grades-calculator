import { configureStore } from "@reduxjs/toolkit";
import finalGradeReducer from "./finalGradeSlice";
import averageReducer from "./averageSlice";

export default configureStore({
	reducer: {
		finalGrade: finalGradeReducer,
		average: averageReducer,
	},
});
