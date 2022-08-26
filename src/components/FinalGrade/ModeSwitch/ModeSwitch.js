import { useDispatch, useSelector } from "react-redux";
import { changeGradeMode } from "../../../redux/finalGradeSlice";
import { FINAL_GRADE_MODES as MODES, FINAL_GRADE_CONSTS as CONSTS} from "../../../utils/constants";
import { FormSelect } from "react-bootstrap/";
import FinalGradeMode from "./FinalGradeMode";
import ExamGradeMode from "./ExamGradeMode";

export default function ModeSwitch() {
	const modeId = useSelector((state) => state.finalGrade.gradeModeId);
	return (
		{
			[MODES.GRADE_MODES.FINAL_GRADE.id]: <FinalGradeMode />,
			[MODES.GRADE_MODES.EXAM_GRADE.id]: <ExamGradeMode />,
		}[modeId] ?? <FinalGradeMode />
	);
}

export function Select() {
	const dispatch = useDispatch();
	const handleChange = (e) => {
		dispatch(changeGradeMode(e.target.value));
	};

	const modeId = useSelector((state) => state.finalGrade.gradeModeId);

	return (
		<FormSelect value={modeId} onChange={handleChange} aria-label={CONSTS.SELECT_LABEL}>
			<option value={MODES.GRADE_MODES.FINAL_GRADE.id}>
				{MODES.GRADE_MODES.FINAL_GRADE.selectLabel}
			</option>
			<option value={MODES.GRADE_MODES.EXAM_GRADE.id}>
				{MODES.GRADE_MODES.EXAM_GRADE.selectLabel}
			</option>

			{/* another way */}
			{/* {Object.keys(MODES.GRADE_MODES).map((mode, i) => (
				<option key={i} value={MODES.GRADE_MODES[mode].id}>
					{MODES.GRADE_MODES[mode].selectLabel}
				</option>
			))} */}
		</FormSelect>
	);
}
