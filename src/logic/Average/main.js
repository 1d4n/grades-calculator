import { initialState, newCourse } from "../../redux/averageSlice";
import { AVERAGE_CONSTS as CONSTS } from "../../utils/constants";

export const getData = () => {
	const data = localStorage.getItem("average_data");
	if (!data) return { ...initialState };

	const dataObject = JSON.parse(data);
	if (!dataObject.courses) return { ...initialState };

	const nonEmptyCourses = dataObject.courses.filter(
		(course) =>
			course.grade > CONSTS.MIN_INPUT_GRADE ||
			course.credits > CONSTS.MIN_CREDITS
	);
	while (nonEmptyCourses.length < CONSTS.MIN_COURSES) {
		nonEmptyCourses.push({ ...newCourse });
	}

	dataObject.courses = nonEmptyCourses;
	return dataObject;
};

export const calculate = (creditsSum, gradeCreditsProductsSum) =>
	creditsSum > 0
		? (gradeCreditsProductsSum / creditsSum).toFixed(CONSTS.AVG_FRACTION_DIGITS)
		: CONSTS.DEFAULT_VALUE;
