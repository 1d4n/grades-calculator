import { useDispatch, useSelector } from "react-redux";
import { updateGrade, updateWeight } from "../../redux/finalGradeSlice";
import { FINAL_GRADE_CONSTS } from "../../utils/constants";
import { parseNum } from "../../logic/parsing";
import { Col, Row } from "react-bootstrap";
import Input from "../Input";

export default function Assignment(props) {
	const data = useSelector((state) => state.finalGrade.assignments[props.idx]);
	const dispatch = useDispatch();
	const numRegex = /^\d+$/;

	const handleWeight = (e) => {
		dispatch(
			updateWeight({
				idx: props.idx,
				weight: parseNum(
					e.target.value,
					FINAL_GRADE_CONSTS.MIN_WEIGHT,
					FINAL_GRADE_CONSTS.MAX_WEIGHT,
					numRegex
				),
			})
		);
	};

	const handleGrade = (e) => {
		dispatch(
			updateGrade({
				idx: props.idx,
				grade: parseNum(
					e.target.value,
					FINAL_GRADE_CONSTS.MIN_INPUT_GRADE,
					FINAL_GRADE_CONSTS.MAX_INPUT_GRADE,numRegex
				),
			})
		);
	};

	const weightVal =
		data.weight >= FINAL_GRADE_CONSTS.MIN_WEIGHT ? data.weight : "";
	const gradeVal =
		data.grade >= FINAL_GRADE_CONSTS.MIN_INPUT_GRADE ? data.grade : "";

	return (
		<>
			<Row>
				<Col>
					<Input
						type="number"
						tooltipClass="Assignment-weight-tooltip"
						value={weightVal}
						onChange={handleWeight}
						label={`${FINAL_GRADE_CONSTS.ASSIGNMENT_WEIGHT_LABEL} ${
							props.idx + 1
						}`}
					/>
				</Col>
				<Col>
					<Input
						type="number"
						tooltipClass="Assignment-grade-tooltip"
						value={gradeVal}
						onChange={handleGrade}
						label={`${FINAL_GRADE_CONSTS.ASSIGNMENT_GRADE_LABEL} ${
							props.idx + 1
						}`}
					/>
				</Col>
			</Row>
			<br />
		</>
	);
}
