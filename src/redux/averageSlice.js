import { createSlice } from "@reduxjs/toolkit";
import { calculate, getData } from "../logic/Average/main";
import { AVERAGE_CONSTS as CONSTS } from "../utils/constants";

export const newCourse = {
	name: "",
	credits: CONSTS.DEFAULT_VALUE,
	grade: CONSTS.DEFAULT_VALUE,
};

export const initialState = {
	courses: Array(CONSTS.MIN_COURSES)
		.fill("")
		.map(() => ({ ...newCourse })),
	creditsSum: CONSTS.DEFAULT_VALUE,
	gradeCreditsProductsSum: CONSTS.DEFAULT_VALUE,
	average: CONSTS.DEFAULT_VALUE,
};

export const averageSlice = createSlice({
	name: "average",
	initialState: getData(),
	reducers: {
		updateName: (state, action) => {
			state.courses[action.payload.idx].name = action.payload.name;
		},
		updateCredits: (state, action) => {
			const delta =
				action.payload.credits - state.courses[action.payload.idx].credits;
			state.creditsSum += delta;
			state.gradeCreditsProductsSum +=
				state.courses[action.payload.idx].grade * delta;
			state.courses[action.payload.idx].credits += delta;
		},
		updateGrade: (state, action) => {
			const delta =
				action.payload.grade - state.courses[action.payload.idx].grade;
			state.gradeCreditsProductsSum +=
				state.courses[action.payload.idx].credits * delta;
			state.courses[action.payload.idx].grade += delta;
		},
		add: (state) => {
			state.courses.push({ ...newCourse });
		},
		remove: (state) => {
			const course = state.courses.pop();
			state.creditsSum -= course.credits;
			state.gradeCreditsProductsSum -= course.grade * course.credits;
		},
		reset: () => {
			localStorage.clear();
			return { ...initialState };
		},
	},
	extraReducers: (builder) => {
		/* calculating the average after each action (except of 'updateName') */
		builder
			.addMatcher(
				(action) => action.type !== "average/updateName",
				(state) => {
					state.average = calculate(
						state.creditsSum,
						state.gradeCreditsProductsSum
					);
				}
			)
			/* updating the localStorage after each action */
			.addMatcher(
				() => true,
				(state) => {
					localStorage.setItem("average_data", JSON.stringify(state));
				}
			);
	},
});

export const { updateName, updateCredits, updateGrade, add, remove, reset } =
	averageSlice.actions;

export default averageSlice.reducer;
