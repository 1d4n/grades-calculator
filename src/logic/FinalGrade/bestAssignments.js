import {
	FINAL_GRADE_CONSTS as CONSTS,
	FINAL_GRADE_MODES as MODES,
	FINAL_GRADE_ERRORS as ERRORS,
} from "../../utils/constants";
import { finalGradeFormula, examGradeFormula, calcExamProduct } from "./main";

export const calcGradeWithBestAssignments = (
	modeId,
	assignmentsArr,
	minTotalWeight,
	examGrade,
	targetGrade
) => {
	// sorting the assignments by grades (or by weight, if grades are equal), in descending order
	assignmentsArr.sort((a, b) =>
		a.grade === b.grade ? b.weight - a.weight : b.grade - a.grade
	);

	let totalWeight = 0,
		assignmentsProduct = 0,
		i = 0;
	for (; i < assignmentsArr.length && totalWeight < minTotalWeight; ++i) {
		assignmentsProduct += assignmentsArr[i].weight * assignmentsArr[i].grade;
		totalWeight += assignmentsArr[i].weight;
	}

	if (modeId === MODES.GRADE_MODES.FINAL_GRADE.id) {
		return calcFinalGrade(
			examGrade,
			assignmentsArr,
			totalWeight,
			assignmentsProduct,
			i
		);
	}
	return calcRequiredExamGrade(
		targetGrade,
		assignmentsArr,
		totalWeight,
		assignmentsProduct,
		i
	);
};

const calcFinalGrade = (
	examGrade,
	sortedAssignments,
	totalWeight,
	assignmentsProduct,
	currIdx
) => {
	/* adding assignments with grade that is not less than the exam grade */
	for (
		;
		currIdx < sortedAssignments.length &&
		sortedAssignments[currIdx].grade >= examGrade;
		++currIdx
	) {
		assignmentsProduct +=
			sortedAssignments[currIdx].weight * sortedAssignments[currIdx].grade;
		totalWeight += sortedAssignments[currIdx].weight;
	}

	return finalGradeFormula(
		calcExamProduct(examGrade, totalWeight),
		assignmentsProduct
	);
};

const calcRequiredExamGrade = (
	targetGrade,
	sortedAssignments,
	totalWeight,
	assignmentsPoints,
	currIdx
) => {
	const roundNum = 0.5;
	targetGrade -= roundNum; /* if the target grade is 91, then 90.5 is enough */

	let minExamGrade = examGradeFormula(
		targetGrade,
		assignmentsPoints,
		CONSTS.MAX_GRADE - totalWeight
	);
	/* adding assignments with grade greater than the current min exam grade */
	for (
		;
		currIdx < sortedAssignments.length &&
		sortedAssignments[currIdx].grade > minExamGrade;
		++currIdx
	) {
		assignmentsPoints +=
			sortedAssignments[currIdx].weight * sortedAssignments[currIdx].grade;
		totalWeight += sortedAssignments[currIdx].weight;
		minExamGrade = Math.min(
			minExamGrade,
			examGradeFormula(
				targetGrade,
				assignmentsPoints,
				CONSTS.MAX_GRADE - totalWeight
			)
		);
	}

	return minExamGrade > CONSTS.MAX_GRADE
		? ERRORS.IMPOSSIBLE
		: Math.max(CONSTS.MIN_GRADE, minExamGrade);
};
