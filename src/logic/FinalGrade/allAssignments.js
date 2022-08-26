import {
	FINAL_GRADE_MODES as MODES,
	FINAL_GRADE_CONSTS as CONSTS,
	FINAL_GRADE_ERRORS as ERRORS,
} from "../../utils/constants";
import {
	finalGradeFormula,
	examGradeFormula,
	calcExamProduct,
	calcExamWeight,
} from "./main";

export const calcGradeWithAllAssignments = (
	modeId,
	assignmentsArr,
	examGrade,
	targetGrade
) => {
	let assignmentsProduct = 0,
		totalWeight = 0;
	assignmentsArr.forEach((a) => {
		assignmentsProduct += a.weight * a.grade;
		totalWeight += a.weight;
	});

	if (modeId === MODES.GRADE_MODES.FINAL_GRADE.id) {
		return finalGradeFormula(
			calcExamProduct(examGrade, totalWeight),
			assignmentsProduct
		);
	}

	const roundNum = 0.5;
	targetGrade -= roundNum;

	const requiredGrade = Math.max(
		CONSTS.MIN_GRADE,
		examGradeFormula(
			targetGrade,
			assignmentsProduct,
			calcExamWeight(totalWeight)
		)
	);
	return requiredGrade > CONSTS.MAX_GRADE ? ERRORS.IMPOSSIBLE : requiredGrade;
};
