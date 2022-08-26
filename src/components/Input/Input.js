import { Form, FloatingLabel, OverlayTrigger, Tooltip } from "react-bootstrap";

export default function Input({ tooltipClass="d-none", placement="bottom", label, ...props }) {
	return (
		<OverlayTrigger
			placement={placement}
			overlay={<Tooltip className={tooltipClass}>{label}</Tooltip>}
		>
			<FloatingLabel label={label}>
        <Form.Control
					placeholder={label}
          {...props}
				/>
			</FloatingLabel>
		</OverlayTrigger>
	);
}
