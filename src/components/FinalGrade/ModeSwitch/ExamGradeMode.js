import { useDispatch, useSelector } from "react-redux";
import { updateTargetGrade } from "../../../redux/finalGradeSlice";
import {
	FINAL_GRADE_CONSTS as CONSTS,
	FINAL_GRADE_MODES as MODES,
} from "../../../utils/constants";
import { parseNum } from "../../../logic/parsing";
import { Select } from "./ModeSwitch";
import Input from "../../Input";

export default function ExamGradeMode() {
	const data = useSelector((state) => state.finalGrade);
	const dispatch = useDispatch();
	const numRegex = /^\d+$/;

	const handleChange = (e) => {
		dispatch(
			updateTargetGrade(
				parseNum(
					e.target.value,
					CONSTS.MIN_INPUT_GRADE,
					CONSTS.MAX_INPUT_GRADE,
					numRegex
				)
			)
		);
	};

	const val =
		data.targetGrade >= CONSTS.MIN_INPUT_GRADE ? data.targetGrade : "";

	return (
		<>
			<div className="text-center">
				<strong>
					{data.final > 0
						? `${CONSTS.REQUIRED_EXAM_GRADE_LABEL}: ${data.final}`
						: data.msg}{" "}
				</strong>
			</div>
			<br />

			<Select />
			<br />

			<Input
				type="number"
				value={val}
				onChange={handleChange}
				label={MODES.GRADE_MODES.EXAM_GRADE.inputLabel}
			/>
		</>
	);
}
