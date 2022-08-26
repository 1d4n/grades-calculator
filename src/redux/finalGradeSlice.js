import { createSlice } from "@reduxjs/toolkit";
import { calculate } from "../logic/FinalGrade/main";
import { FINAL_GRADE_MODES as MODES, FINAL_GRADE_CONSTS as CONSTS } from "../utils/constants";

const newAssignment = { weight: CONSTS.INITIAL_GRADE, grade: CONSTS.INITIAL_GRADE };

export const finalGradeSlice = createSlice({
	name: "finalGrade",
	initialState: {
		/* initializing 'assignments' as array with 'CONSTS.MIN_ASSIGNMENTS' objects (each object has a different reference) */
		assignments: Array(CONSTS.MIN_ASSIGNMENTS)
			.fill("")
			.map(() => ({ ...newAssignment })),
		minTotalWeight: 15,
		examGrade: CONSTS.INITIAL_GRADE,
		targetGrade: CONSTS.INITIAL_GRADE,
		final: CONSTS.INITIAL_GRADE,
		msg: "",
		calcMethodId: MODES.CALC_METHODS.ALL_ASSIGNMENTS.id,
		gradeModeId: MODES.GRADE_MODES.FINAL_GRADE.id,
	},
	reducers: {
		changeGradeMode: (state, action) => {
			state.gradeModeId = action.payload;
		},
		changeCalcMethod: (state, action) => {
			state.calcMethodId = action.payload;
		},
		add: (state) => {
			state.assignments.push({ ...newAssignment });
		},
		remove: (state) => {
			state.assignments.pop();
		},
		updateGrade: (state, action) => {
			state.assignments[action.payload.idx].grade = action.payload.grade;
		},
		updateWeight: (state, action) => {
			state.assignments[action.payload.idx].weight = action.payload.weight;
		},
		updateMinTotalWeight: (state, action) => {
			state.minTotalWeight = action.payload;
		},
		updateExamGrade: (state, action) => {
			state.examGrade = action.payload;
		},
		updateTargetGrade: (state, action) => {
			state.targetGrade = action.payload;
		},
	},
	extraReducers: (builder) => {
		// a reducer for calculating the grade after each change (except of adding a new assignment)
		builder.addMatcher(
			(action) => action.type !== "finalGrade/add",
			(state) => {
				const res = calculate({ ...state });
				if (isNaN(res)) {
					state.msg = res;
					state.final = CONSTS.INITIAL_GRADE;
				} else {
					state.final = res;
					state.msg = "";
				}
			}
		);
	},
});

export const {
	changeGradeMode,
	changeCalcMethod,
	add,
	remove,
	updateGrade,
	updateWeight,
	updateMinTotalWeight,
	updateExamGrade,
	updateTargetGrade,
} = finalGradeSlice.actions;

export default finalGradeSlice.reducer;
