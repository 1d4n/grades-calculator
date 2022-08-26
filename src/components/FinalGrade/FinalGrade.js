import { useSelector, useDispatch } from "react-redux";
import {
	changeCalcMethod,
	updateMinTotalWeight,
	add,
	remove,
} from "../../redux/finalGradeSlice";
import { parseNum } from "../../logic/parsing";
import {
	FINAL_GRADE_CONSTS as CONSTS,
	FINAL_GRADE_MODES as MODES,
} from "../../utils/constants";
import Assignment from "./Assignment";
import ModeSwitch from "./ModeSwitch";
import Input from "../Input";
import { Button, Form, Tooltip, OverlayTrigger } from "react-bootstrap";
import { BsInfoCircleFill } from "react-icons/bs";
import "./style.css";
import { IconContext } from "react-icons";

export default function FinalGrade() {
	const data = useSelector((state) => state.finalGrade);
	const dispatch = useDispatch();
	const numRegex = /^\d+$/;

	// not using the map method, because the order of the indexes is important
	const assignments = [];
	for (let i = 0; i < data.assignments.length; i++) {
		assignments.push(<Assignment key={i} idx={i} />);
	}

	const handleCalcMethod = (e) => {
		dispatch(changeCalcMethod(e.target.value));
	};

	const handleMinWeight = (e) => {
		dispatch(
			updateMinTotalWeight(
				parseNum(e.target.value, CONSTS.MIN_WEIGHT, CONSTS.MAX_WEIGHT, numRegex)
			)
		);
	};

	const minWeightVal =
		data.minTotalWeight >= CONSTS.MIN_WEIGHT ? data.minTotalWeight : "";

	const handleAdd = () => {
		if (data.assignments.length < CONSTS.MAX_ASSIGNMENTS) {
			dispatch(add());
		}
	};

	const handleRemove = () => {
		if (data.assignments.length > CONSTS.MIN_ASSIGNMENTS) {
			dispatch(remove());
		}
	};

	return (
		<>
			<h1 className="fw-bold text-center">{CONSTS.TITLE}</h1>
			<br />

			{/* a select form with an input for the final/exam grade mode */}
			<ModeSwitch />
			<br />

			{/* radio buttons for choosing the calc method*/}
			<Form>
				<Form.Check
					
					type="radio"
					label={MODES.CALC_METHODS.ALL_ASSIGNMENTS.label}
					aria-label={MODES.CALC_METHODS.ALL_ASSIGNMENTS.label}
					name="calcMethod"
					value={MODES.CALC_METHODS.ALL_ASSIGNMENTS.id}
					onChange={handleCalcMethod}
					checked={data.calcMethodId === MODES.CALC_METHODS.ALL_ASSIGNMENTS.id}
				/>
				<Form.Check
					
					type="radio"
					label={
						<div>
							{MODES.CALC_METHODS.BEST_ASSIGNMENTS.label}
							&nbsp;
							<Info />
						</div>
					}
					aria-label={MODES.CALC_METHODS.BEST_ASSIGNMENTS.label}
					name="calcMethod"
					value={MODES.CALC_METHODS.BEST_ASSIGNMENTS.id}
					onChange={handleCalcMethod}
					checked={data.calcMethodId === MODES.CALC_METHODS.BEST_ASSIGNMENTS.id}
				/>
			</Form>
			<br />

			{/* showing the minWeight input if the calc method is "best assignments" */}
			{data.calcMethodId === MODES.CALC_METHODS.BEST_ASSIGNMENTS.id && (
				<div>
					<Input
						type="number"
						tooltipClass="FinalGrade-minWeight-tooltip"
						value={minWeightVal}
						onChange={handleMinWeight}
						label={CONSTS.MIN_WEIGHT_LABEL}
					/>
					<br />
				</div>
			)}

			{/* assignment weight-grade input pairs */}
			{assignments}
			<br />

			{/* add and remove assignment buttons*/}
			<div className="text-center">
				<Button variant="primary" onClick={handleAdd}>
					{CONSTS.ADD_ASSIGNMENT_LABEL}
				</Button>
				&nbsp;
				<Button variant="secondary" onClick={handleRemove}>
					{CONSTS.REMOVE_ASSIGNMENT_LABEL}
				</Button>
			</div>
		</>
	);
}

/* info icon with a tooltip to show more info about the "best assignments" calc method */
function Info() {
	return (
		<IconContext.Provider value={{ color: "#5a7f9f", size: "1.5em" }}>
			<OverlayTrigger
				placement="bottom"
				overlay={<Tooltip>{MODES.CALC_METHODS.BEST_ASSIGNMENTS.info}</Tooltip>}
			>
				<span>
					<BsInfoCircleFill />
				</span>
			</OverlayTrigger>
		</IconContext.Provider>
	);
}
