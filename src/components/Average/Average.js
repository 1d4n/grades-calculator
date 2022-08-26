import { useDispatch, useSelector } from "react-redux";
import { add, remove, reset } from "../../redux/averageSlice";
import { AVERAGE_CONSTS as CONSTS } from "../../utils/constants";
import Course from "./Course";
import { Button, Row, Col } from "react-bootstrap";
import "./style.css";

export default function Average() {
	const data = useSelector((state) => state.average);
	const dispatch = useDispatch();

	const courses = [];
	for (let i = 0; i < data.courses.length; i++) {
		courses.push(<Course key={i} idx={i} />);
	}

	const handleAdd = () => {
		if (data.courses.length < CONSTS.MAX_COURSES) {
			dispatch(add());
		}
	};

	const handleRemove = () => {
		if (data.courses.length > CONSTS.MIN_COURSES) {
			dispatch(remove());
		}
	};

	const handleReset = () => {
		if (window.confirm(CONSTS.RESET_ALERT)) {
			dispatch(reset());
		}
	};

	return (
		<>
			<div className="text-center">
				<h1 className="fw-bold">{CONSTS.TITLE}</h1>
				<br />

				{data.average > CONSTS.MIN_INPUT_GRADE && (
					<div>
						<strong>{`${CONSTS.AVERAGE_LABEL}:  ${data.average} ≈ ${Math.round(
							data.average
            )}`}</strong>
            <br />
            {`${CONSTS.TOTAL_CREDITS_LABEL}: ${data.creditsSum}`}
					</div>
				)}
			</div>
			<br />

			<div>{courses}</div>
			<br />

			<div className="text-center">
				<Button variant="primary" onClick={handleAdd}>
					{CONSTS.ADD_COURSE_LABEL}
				</Button>
				&nbsp;
				<Button variant="secondary" onClick={handleRemove}>
					{CONSTS.REMOVE_COURSE_LABEL}
				</Button>
			</div>
			<br />

			<Row className="text-center">
				<Col>
					<Button variant="outline-danger" onClick={handleReset}>
						{CONSTS.RESET_LABEL}
					</Button>
				</Col>
			</Row>
		</>
	);
}
