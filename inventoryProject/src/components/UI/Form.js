import React, { useEffect, useCallback, useReducer, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import { Button } from 'react-bootstrap';

//import { submitForm } from '../../store/actions/formActions';
import FormInput from './Input';
import { objToArr, arrToObj } from '../../constants/MyFuncs';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const FORM_SUBMIT_CHECK = 'FORM_SUBMIT_CHECK';
const FORM_SPECIFIC_CHECK = 'FORM_SPECIFIC_CHECK';

const SUBMIT_FORM = 'SUBMIT_FORM';
const FORM_IS_SUBMITTED = 'FORM_IS_SUBMITTED';

const formReducer = (state, action) => {
	//the state is initially the initial state passed to 2nd arg of useReducer
	switch (action.type) {
		case FORM_INPUT_UPDATE:
			const updatedInputValues = {
				...state.inputValues,
				[action.input]: action.value, //replacing the key(the input's name)  and value in inputValues Obj with the new text from action.value
			};
			const updatedInputValidities = {
				...state.inputValidities,
				[action.input]: action.isValid, //replacing the key(the input's name)  and value in inputValidities Obj with the new text from action.value
			};

			const updatedInputFocuses = {
				...state.inputFocuses,
				[action.input]: action.inputHasFocus, //replacing the key(the input's name)  and value in inputValidities Obj with the new text from action.value
			};

			const updatedInputBlurs = {
				...state.inputBlurs,
				[action.input]: action.inputLostFocus, //replacing the key(the input's name)  and value in inputValidities Obj with the new text from action.value
			};
			let updatedFormFocus = false;
			let updatedFormBlur = true;
			let updatedFormValidity = true;
			for (const key in updatedInputValidities) {
				//GOOD PRACTICE! : once the updatedFormValidity is false for any,
				// it remains false even if any other inputValidity is true, because the false will override in the AND logic
				updatedFormValidity = updatedFormValidity && updatedInputValidities[key];
			}
			for (const key in updatedInputFocuses) {
				updatedFormFocus = updatedFormFocus || updatedInputFocuses[key];
			}
			for (const key in updatedInputBlurs) {
				updatedFormBlur = updatedFormBlur && updatedInputBlurs[key];
			}
			return {
				...state,
				inputValues: updatedInputValues,
				inputValidities: updatedInputValidities,
				inputFocuses: updatedInputFocuses,
				inputBlurs: updatedInputBlurs,
				formValidity: updatedFormValidity,
				formHasFocus: updatedFormFocus,
				formLostFocus: updatedFormBlur,
				showFormStatus: false,
				formIsSubmitted: action.formIsSubmitted,
				newFormErrorMsg: null,
			};
		case FORM_SUBMIT_CHECK:
			return {
				...state,
				formHasError: action.hasError,
				showFormStatus: action.showFormStatus,
				submitForm: !action.hasError,
				formIsSubmitted: action.formIsSubmitted,
				newFormErrorMsg: action.newFormErrorMsg,
			};

		case FORM_IS_SUBMITTED:
			return {
				...state,
				clearInputs: action.clearForm,
			};
	}
	return state;
};

const Form = ({
	id,
	title,
	items,
	children,
	onSubmit,
	rectInputs,
	formAction,
	formStateGetter,
	submitTitle,
	formActionDone,
	formErrorMsg,
	specificCheck,
	doNotClearInputs,
	formSuccessMsg,
	onFormSubmitted,
}) => {
	const dispatch = useDispatch();
	//const mountedRef = useRef(true);
	const prevSubmittedForm = null; //useSelector((s) => s.formReducer.submittedFormsData.find((form) => form.id === id));
	const lastInputItems = prevSubmittedForm ? prevSubmittedForm.inputValues : null;

	const inputItems = items ? items : [];
	let initialInputValues = {};
	let initialInputValidities = {};
	let initialInputFocuses = {};
	let initialInputBlurs = {};

	for (let input of inputItems) {
		if (input.initialValue !== null && input.initialValue !== undefined) {
			initialInputValues[input.id] = input.initialValue;
			initialInputValidities[input.id] = true;
		} else if (!!lastInputItems && !input.password) {
			initialInputValues[input.id] = lastInputItems[input.id];
			initialInputValidities[input.id] = true;
		} else {
			initialInputValues[input.id] = '';
			initialInputValidities[input.id] = false;
		}

		initialInputFocuses[input.id] = false;
		initialInputBlurs[input.id] = false;
	}
	const initialFormState = {
		//recommended instead of mgt of all text states and validity individually with useState() hook
		//initial Values
		inputValues: initialInputValues,
		//initial validity
		inputValidities: initialInputValidities,
		//initial general form validity
		formValidity: false,
		inputFocuses: initialInputFocuses,
		inputBlurs: initialInputBlurs,
		formHasFocus: false,
		formLostFocus: false,
		formId: id,
		formHasError: false,
		formIsSubmitted: false,
		showFormStatus: false,
		newFormErrorMsg: null,
	};

	const [formState, dispatchFormAction] = useReducer(formReducer, initialFormState);
	const submitBtnRef = useRef();

	const formInputHandler = useCallback(
		(inputNameOrId, text, validity, hasFocus, lostFocus) => {
			dispatchFormAction(
				//almost just like dispatching in redux
				//action
				{
					type: FORM_INPUT_UPDATE,
					value: text,
					isValid: validity,
					input: inputNameOrId,
					inputHasFocus: hasFocus,
					inputLostFocus: lostFocus,
					formIsSubmitted: false,
				}
			);
		},
		[dispatchFormAction]
	); //inputName,text, validity

	const formSubmitHandler = useCallback(async () => {
		//console.warn(formState.inputValues, formState.inputValidities)
		//if (!onSubmit()) {
		let specificData = {};
		const passTestFunc = () => {
			//setError(null);
			// setIsLoading(true);

			try {
				//dispatching happens here

				if (
					objToArr(formState.inputValues).every((value) => value.length !== 0) ||
					objToArr(formState.inputValidities).every((bool) => bool)
				) {
					//console.warn('valid');
					dispatchFormAction({
						type: FORM_SUBMIT_CHECK,
						hasError: false, //!onSubmit(),
						showFormStatus: true,
						formIsSubmitted: true,
						newFormErrorMsg: null,
					});

					formAction && formAction(formState.inputValues);
					// formAction
					// 	? formAction(formState.inputValues) &&
					// 	  dispatch(submitForm(formState.formId, formState.inputValues))
					// 	: dispatch(submitForm(formState.formId, formState.inputValues));
				}
			} catch (err) {
				// setError(err.message)
			}
			// setIsLoading(false);
			//props.navigation.goBack();
		};

		if (!formState.formValidity) {
			await dispatchFormAction({
				type: FORM_SUBMIT_CHECK,
				hasError: true, // !onSubmit(),
				showFormStatus: true,
				formIsSubmitted: formState.formIsSubmitted,
				newFormErrorMsg: formErrorMsg,
			});
		} else {
			if (specificCheck) {
				if (specificCheck === 'confirmPasswordMatch') {
					//check the password fields
					const confirmationInputs = inputItems.filter(
						(input) => input.password === true && input.check === 'confirmPasswordMatch'
					);
					const firstPassword = formState.inputValues[confirmationInputs[0].id];
					let passwordsMatched = true;
					for (let input of confirmationInputs) {
						passwordsMatched = formState.inputValues[input.id] === firstPassword && passwordsMatched;
					}

					if (!passwordsMatched) {
						await dispatchFormAction({
							type: FORM_SUBMIT_CHECK,
							hasError: true, // !onSubmit(),
							showFormStatus: true,
							formIsSubmitted: formState.formIsSubmitted,
							newFormErrorMsg: 'Passwords do not match',
						});
					} else {
						passTestFunc();
					}
				}
			} else {
				passTestFunc();
			}
		}

		// if (!formState.formValidity) {
		//   Alert.alert('Cannot Submit Invalid Form',
		//     'Please ensure that all input fields are filled correctly!', [{ text: 'Understood ' }])
		//   return;
		// }
	}, [dispatch, formState]);

	useEffect(() => {
		formStateGetter && formStateGetter(formState);
	}, [formState]);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				submitBtnRef.current.click();
			}}>
			{/* <Card style={styles.form}> */}
			{title && <h3 className={'auth-title'}>{title}</h3>}
			<>
				{!!inputItems &&
					inputItems.map((input, index) => {
						return (
							<FormInput
								{...input}
								key={input.id + index}
								rectInput={rectInputs}
								onInputChange={formInputHandler}
								onFocus={formInputHandler}
								initialValue={formState.inputValues[input.id]}
								initialValidity={formState.inputValidities[input.id]}
								newValue={
									formState.formIsSubmitted && (!doNotClearInputs || input.password)
										? ''
										: formState.inputValues[input.id]
								}
								formHasError={formState.formHasError && formState.showFormStatus}
								submitted={formState.formIsSubmitted && (!doNotClearInputs || input.password)}
							/>
						);
					})}
				{children}
				{formState.formHasError && formState.showFormStatus && (
					<p style={styles.formError}>
						{formState.newFormErrorMsg
							? formState.newFormErrorMsg
							: formErrorMsg
							? formErrorMsg
							: 'Please, ensure that the form is filled correctly!'}
					</p>
				)}

				{!formState.formHasError && formActionDone && !formState.formHasFocus && (
					<p style={{ ...styles.formError, color: '#55ff55', backgroundColor: '#ddffdd' }}>
						{formSuccessMsg ? formSuccessMsg : 'Your form has been submitted successfully.'}
					</p>
				)}

				{/* {!formState.formHasError && formState.formIsSubmitted && formState.showFormStatus &&
            <Text style={{ ...styles.formError, color: '#55ff55', backgroundColor: Colors.success }}>
              {formSuccessMsg ? formSuccessMsg :
                'Your form has been submitted successfully.'}</Text>
          } */}
			</>
			<Button ref={submitBtnRef} className="btn btn-primary btn-block" onClick={formSubmitHandler}>
				{submitTitle ? submitTitle : 'Submit'}
			</Button>
		</form>
	);
};

export const screenOptions = () => {
	return {};
};

const styles = {
	scroll: {
		backgroundColor: '#fff',
	},
	// form: {
	//   overflow: 'hidden',
	//   padding: 0,
	//   margin: 20,
	// },
	formTitle: {
		width: '100%',
		paddingBottom: 0,
		padding: 10,
		textAlign: 'center',
		//backgroundColor: Colors.switchPrimary,
		color: Colors.primary, //'#222', //// Colors.switchWhiteAccent,//
		fontSize: 20,
		//fontFamily: 'OpenSansBold',
		//borderBottomColor: '#f3f6f7',
		//borderBottomWidth: 2,
	},
	formError: {
		//padding: 20,
		paddingVertical: 10,
		marginTop: 20,
		textAlign: 'center',
		backgroundColor: Colors.error, //'#f3f6f7',
		borderRadius: 5,
		//fontFamily: 'OpenSansRegular',
		fontSize: 16,
		color: '#ff4444',
	},
};

export default Form;
