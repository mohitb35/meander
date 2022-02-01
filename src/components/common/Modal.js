import React from 'react';
import ReactDOM from 'react-dom';

import './Modal.css';

const Modal = (props) => {
	return ReactDOM.createPortal(
		<div id="result-modal" className={`modal ${props.type}`} onClick={props.dismiss}>
			<div className="modal-wrapper">
				<div className="close" id="btn-modal-close" onClick={props.dismiss}>&times;</div>
				<div className="modal-contents" onClick={(e)=>{e.stopPropagation()}}>
					{props.title && 
						<h4 className="header">
							{props.title}
						</h4>
					}
					{props.content &&
						<div className="content">
							{props.content}
						</div>
					}
					{props.actions &&			
						<div className="actions">
							{props.actions}
						</div>
					}
				</div>
			</div>
		</div>
		,
		document.querySelector('#modal')
	)
};

export default Modal;