import { calcGradeWithAllAssignments } from "./allAssignments";
import { calcGradeWithBestAssignments } from "./bestAssignments";
import {
	FINAL_GRADE_ERRORS as ERRORS,
	FINAL_GRADE_CONSTS as CONSTS,
	FINAL_GRADE_MODES as MODES,
} from "../../utils/constants";

export const calcExamWeight = (assignmentsWeight) =>
	CONSTS.MAX_GRADE - assignmentsWeight;

export const calcExamProduct = (examGrade, assignmentsWeight) =>
	examGrade * calcExamWeight(assignmentsWeight);

export const finalGradeFormula = (examProduct, assignmentsProduct) =>
	Math.round((examProduct + assignmentsProduct) / CONSTS.MAX_GRADE);

export const examGradeFormula = (finalGrade, assignmentsProduct, examWeight) =>
	Math.ceil((CONSTS.MAX_GRADE * finalGrade - assignmentsProduct) / examWeight);

export const calculate = (data) => {
	const resp = isDataValid(data);
	if (!resp.isValid) {
		return resp.err;
	}

	const assignments = data.assignments.filter(
		(a) => a.weight > CONSTS.MIN_WEIGHT && a.grade >= CONSTS.MIN_INPUT_GRADE
	);
	const assignmentsWeightSum = assignments.reduce((a, b) => a + b.weight, 0);
	if (assignmentsWeightSum > CONSTS.MAX_WEIGHT) {
		return ERRORS.HIGH_WEIGHT;
	}
	if (assignmentsWeightSum === 0) {
		return ERRORS.NO_ASSIGNMENTS;
	}

	if (data.calcMethodId === MODES.CALC_METHODS.ALL_ASSIGNMENTS.id) {
		return calcGradeWithAllAssignments(
			data.gradeModeId,
			assignments,
			data.examGrade,
			data.targetGrade
		);
	}

	if (assignmentsWeightSum < data.minTotalWeight) {
		return ERRORS.LOW_WEIGHT;
	}
	return calcGradeWithBestAssignments(
		data.gradeModeId,
		assignments,
		data.minTotalWeight,
		data.examGrade,
		data.targetGrade
	);
};

const isAssignmentWeightValid = (weight) => weight > CONSTS.MIN_WEIGHT;
const isAssignmentGradeValid = (grade) => grade >= CONSTS.MIN_INPUT_GRADE;

const isDataValid = (data) => {
	const result = { isValid: true, err: "" };

	if (
		data.gradeModeId === MODES.GRADE_MODES.FINAL_GRADE.id &&
		data.examGrade < CONSTS.MIN_GRADE
	) {
		result.isValid = false;
		result.err = ERRORS.EXAM_RANGE;
		return result;
	}

	if (
		data.gradeModeId === MODES.GRADE_MODES.EXAM_GRADE.id &&
		data.targetGrade < CONSTS.MIN_GRADE
	) {
		result.isValid = false;
		result.err = ERRORS.FINAL_RANGE;
		return result;
	}

	for (let i = 0; i < data.assignments.length; ++i) {
		if (
			!isAssignmentWeightValid(data.assignments[i].weight) &&
			isAssignmentGradeValid(data.assignments[i].grade)
		) {
			result.isValid = false;
			result.err = ERRORS.INVALID_ASSIGNMENT_WEIGHT(i + 1);
			return result;
		}

		if (
			isAssignmentWeightValid(data.assignments[i].weight) &&
			!isAssignmentGradeValid(data.assignments[i].grade)
		) {
			result.isValid = false;
			result.err = ERRORS.INVALID_ASSIGNMENT_GRADE(i + 1);
			return result;
		}
	}

	return result;
};
