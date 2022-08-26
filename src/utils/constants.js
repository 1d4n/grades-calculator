export const APP_CONSTS = {
	APP_NAME: "Grades",
	LOGO_HEIGHT: "30",
	LOGO_WIDTH: "30",
};

export const COMPS = {
	FINAL_GRADE: { key: "0", label: "Final Grade" },
	AVERAGE: { key: "1", label: "GPA" },
};

export const AVERAGE_CONSTS = {
	DEFAULT_VALUE: 0,
	MIN_COURSES: 2,
	MAX_COURSES: 40,
	MIN_COURSE_GRADE: 60,
	MIN_INPUT_GRADE: 0,
	MAX_INPUT_GRADE: 100,
	MIN_CREDITS: 0,
	MAX_CREDITS: 255,
  MAX_COURSE_NAME_LENGTH: 50,
  AVG_FRACTION_DIGITS: 2,
	COURSE_NAME_LABEL: "course",
	COURSE_CREDITS_LABEL: "credits",
	COURSE_GRADE_LABEL: "grade",
	ADD_COURSE_LABEL: "Add Course",
	REMOVE_COURSE_LABEL: "Remove Course",
	RESET_LABEL: "Reset",
	RESET_ALERT: "All data will be deleted",
	TOTAL_CREDITS_LABEL: "Credits",
	AVERAGE_LABEL: "GPA",
	TITLE: "GPA Calculator",
};

export const FINAL_GRADE_CONSTS = {
	INITIAL_GRADE: -1,
	MIN_ASSIGNMENTS: 2,
	MAX_ASSIGNMENTS: 20,
	MIN_INPUT_GRADE: 0,
	MAX_INPUT_GRADE: 100,
	MIN_GRADE: 60,
	MAX_GRADE: 100,
	MIN_WEIGHT: 0,
	MAX_WEIGHT: 100,
	SELECT_LABEL: "Grade Type",
	ASSIGNMENT_WEIGHT_LABEL: "assignment weight",
	ASSIGNMENT_GRADE_LABEL: "assignment grade",
	TITLE: "Final Grade Calculator",
	FINAL_GRADE_LABEL: "Final grade",
	REQUIRED_EXAM_GRADE_LABEL: "Required exam grade",
	MIN_WEIGHT_LABEL: "minimum total weight",
	ADD_ASSIGNMENT_LABEL: "Add Assignment",
	REMOVE_ASSIGNMENT_LABEL: "Remove Assignment",
};

export const FINAL_GRADE_ERRORS = {
	EXAM_RANGE: "Exam grade should to be in range 60-100",
	FINAL_RANGE: "Final grade should to be in range 60-100",
	HIGH_WEIGHT: "The maximum total weight can't be greater than 100",
	LOW_WEIGHT: "The total weight is lower than the minimum",
	NO_ASSIGNMENTS: "Please insert data of at least one assignment",
	INVALID_ASSIGNMENT_WEIGHT: (i) => `Invalid assignment weight ${i}`,
	INVALID_ASSIGNMENT_GRADE: (i) => `Invalid assignment grade ${i}`,
	IMPOSSIBLE: "The target grade can't be reached",
};

export const FINAL_GRADE_MODES = {
	GRADE_MODES: {
		FINAL_GRADE: {
			id: "0",
			selectLabel: "Calculate final grade by the exam grade",
			inputLabel: "exam grade",
		},
		EXAM_GRADE: {
			id: "1",
			selectLabel: "Calculate required exam grade",
			inputLabel: "target grade",
		},
	},
	CALC_METHODS: {
		ALL_ASSIGNMENTS: { id: "0", label: "Include all assignments" },
		BEST_ASSIGNMENTS: {
			id: "1",
			label: "Include only the best assignments",
			info: "The rest of the assignments will be included only if needed, in order to reach the minimum total weight.",
		},
	},
};
