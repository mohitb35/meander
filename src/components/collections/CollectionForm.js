import React from "react";
import { Field, Form } from 'react-final-form';

import './CollectionForm.css';

class CollectionForm extends React.Component {
	renderError = ({touched, error}) => {
		if (touched && error) {
		  return (
			<div className="field-error">
				{error}
			</div>
		  );
		}
	  };

	renderInput = ({label, input, required, maxLength, meta}) => {
		return (
			<div className="form-field required">
				<label htmlFor={input.name}>{label}</label>
				<div className="input-container">
					<span className="remaining-chars">{maxLength - input.value.length}</span>
					<input 
						type="text"
						id={input.name} 
						{...input}
						required={required}
						maxLength={maxLength}
					/>
				</div>
				{this.renderError(meta)}
			</div>
		)
	}

	renderTextArea = ({label, input, maxLength}) => {
		return (
			<div className="form-field">
				<label htmlFor={input.name}>{label}</label>
				<div className="input-container">
					<span className="remaining-chars">{maxLength - input.value.length}</span>
					<textarea
						id={input.name}
						{...input}
						rows="6"
						maxLength={maxLength}
					/>
				</div>
			</div>
		)
	}

	renderCheckbox = ({label, input}) => {
		return (
			<div className="form-field checkbox">
				<input id={input.name} type="checkbox" {...input}></input>
				<label htmlFor={input.name}>{label}</label>
			</div>
		)
	}

	validateTitle(titleValue) {
		return (titleValue ? undefined : "Please enter a title")
    }

	renderForm = ({ handleSubmit }) => {
		return (
			<form onSubmit={ handleSubmit }>
				<Field 
					name="title" 
					component={this.renderInput} 
					label="Title" 
					required 
					maxLength={60} 
					validate={this.validateTitle} 
					validateFields={[]}
				/>
				<Field name="description" component={this.renderTextArea} label="Description" maxLength={250}/>
				<Field name="private" component={this.renderCheckbox} label="This is a private collection." type="checkbox"/>
				<button className="form-button">Submit</button>
			</form>
		)
	}

	render() {
		return (
			<div className="form-container">
				<h2 className="form-header">{this.props.formHeader}</h2>
				<Form
					af
					initialValues={this.props.initialValues}
					onSubmit={this.props.onSubmit} 
					render={this.renderForm} 
					validateOnBlur
				/>
			</div>
		)
	}
}

export default CollectionForm;