import React from 'react';
import './submit-button.scss';

function SubmitButton ({text, enabled, onSubmit}) {
	if (enabled) {
		return <div className="submit" onClick={onSubmit}>{text}</div>
	} else {
		return <div className="submit">{text}</div>
	}
}

export default SubmitButton;