import { useState } from "react";
import FinalGrade from "./components/FinalGrade";
import Average from "./components/Average";
import { APP_CONSTS, COMPS } from "./utils/constants";
import "./App.css";
import { Nav, Navbar, Container } from "react-bootstrap";

export default function App() {
	const [compKey, setCompKey] = useState(COMPS.AVERAGE.key);
	const comp = {
		[COMPS.FINAL_GRADE.key]: <FinalGrade />,
		[COMPS.AVERAGE.key]: <Average />,
	}[compKey] ?? <Average />;

	return (
		<div>
			<Navbar style={{ backgroundColor: "#282c34" }} variant="dark">
				<Navbar.Brand>
					<img
						alt="logo"
						src="/logo.png"
						height={APP_CONSTS.LOGO_HEIGHT}
						width={APP_CONSTS.LOGO_WIDTH}
						className="d-inline-block align-top"
					/>&nbsp;
					{APP_CONSTS.APP_NAME}
				</Navbar.Brand>
				<Nav
					variant="pills"
					onSelect={setCompKey}
					activeKey={compKey}
				>
					<Nav.Link eventKey={COMPS.AVERAGE.key}>
						{COMPS.AVERAGE.label}
					</Nav.Link>
					<Nav.Link eventKey={COMPS.FINAL_GRADE.key}>
						{COMPS.FINAL_GRADE.label}
					</Nav.Link>
				</Nav>
			</Navbar>
			<br />
			<br />

			<Container>
				<div className="d-flex justify-content-center">
					<div className="form-container">{comp}</div>
				</div>
			</Container>
			<br />
		</div>
	);
}
