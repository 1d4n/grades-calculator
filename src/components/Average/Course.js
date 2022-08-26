import { useDispatch, useSelector } from "react-redux";
import {
	updateName,
	updateCredits,
	updateGrade,
} from "../../redux/averageSlice";
import { AVERAGE_CONSTS as CONSTS } from "../../utils/constants";
import { parseNum } from "../../logic/parsing";
import Input from "../Input";
import { Row, Col } from "react-bootstrap";

export default function Course(props) {
	const nameRegex = new RegExp(
		`^[a-zA-Z0-9\u05D0-\u05EA _.-]{0,${CONSTS.MAX_COURSE_NAME_LENGTH}}$`
	);
	const intRegex = /^\d+$/;
	const floatRegex = /^\d+(\.\d)?$/;
	const dispatch = useDispatch();
	const data = useSelector((state) => state.average.courses[props.idx]);

	const handleName = (e) => {
		const name = e.target.value;
		if (nameRegex.test(name)) {
			dispatch(updateName({ idx: props.idx, name: name }));
		}
	};

  const handleCredits = (e) => {
		dispatch(
			updateCredits({
				idx: props.idx,
				credits: parseNum(
					e.target.value,
					CONSTS.MIN_CREDITS,
					CONSTS.MAX_CREDITS,
					floatRegex,
					CONSTS.DEFAULT_VALUE
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
					CONSTS.MIN_INPUT_GRADE,
					CONSTS.MAX_INPUT_GRADE,
					intRegex,
					CONSTS.DEFAULT_VALUE
				),
			})
		);
	};

	const creditsVal =
		data.credits > CONSTS.MIN_CREDITS ? data.credits : "";
	const gradeVal = data.grade > CONSTS.MIN_INPUT_GRADE ? data.grade : "";

	return (
		<>
			<Row>
				<Col>
					<Input
						value={data.name}
						tooltipClass="Average-courseName-tooltip"
						onChange={handleName}
						label={CONSTS.COURSE_NAME_LABEL}
					/>
				</Col>
				<Col>
					<Input
						type="number"
						tooltipClass="Average-credits-tooltip"
						value={creditsVal}
						onChange={handleCredits}
						label={CONSTS.COURSE_CREDITS_LABEL}
						step="0.5"
					/>
				</Col>
				<Col>
					<Input
						type="number"
						tooltipClass="Average-finalGrade-tooltip"
						value={gradeVal}
						onChange={handleGrade}
						label={CONSTS.COURSE_GRADE_LABEL}
					/>
				</Col>
			</Row>
			<br />
		</>
	);
}
