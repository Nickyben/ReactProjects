//import Icon from 'react-native-vector-icons/FontAwesome';
//import { Input as RNElemInput } from 'react-native-elements';
import React, { useEffect, useReducer, useState } from 'react';
import Colors from '../../constants/Colors';

//import ItemIcon from './ItemIcon';

const INPUT_FOCUS = 'INPUT_FOCUS';
const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';
const INPUT_SUBMIT = 'INPUT_SUBMIT';

const inputReducer = (state, action) => {
	switch (action.type) {
		case INPUT_FOCUS:
			return {
				...state,
				gainedFocus: true,
				lostFocus: false,
				//alignText: 'justify'
			};

		case INPUT_CHANGE:
			return {
				...state,
				value: action.value,
				validity: action.validity,
				lostFocus: false,
				hasFocus: true, //action.hasFocus,//isTouched: action.isTouched
				// alignText: 'justify',
			};

		case INPUT_BLUR:
			return {
				...state,
				hasFocus: false,
				gainedFocus: false,
				lostFocus: true,
				//alignText: state.value.length > 0 ? 'center' : 'justify',
			};
		case INPUT_SUBMIT: {
			return {
				...state,
				value: '',
				validity: false,
			};
		}
		default:
			return state;
	}
	return state;
};

const FormInput = ({
	id,
	className,
	parentClassName,
	type,
	initialValue,
	initialValidity,
	onInputChange,
	required,
	email,
	password,
	phoneNumber,
	min,
	max,
	textType,
	minLength,
	maxLength,
	style,
	inputContainerStyle,
	inputStyle,
	label,
	ExtraComponent,
	SpecialInput,
	hideLabel,
	errorMsg,
	successMsg,
	textInputProps,
	submitted,
	submitAction,
	secureText,
	formState,
	singleInput,
	rectInput,
	clear,
	newValue,
	onTextChanged,
	hideIcon,
	icon,
	touchableIcon,
	floatingLabel,
	hideFloatingLabel,
	placeholder,
	showErrorMsg,
	formHasError,
	...others
}) => {
	const toggler = type === 'checkbox';

	const [inputState, dispatchAction] = useReducer(inputReducer, {
		value: initialValue ? initialValue : toggler ? false : '',
		validity: initialValidity ? initialValidity : !required ? true : false,
		hasFocus: false,
		lostFocus: false,
		gainedFocus: false,
		// alignText: 'justify'
	});

	const [showPassword, setShowPassword] = useState(false);

	//console.warn(id, inputState.validity)

	const toggleShowPassword = () => {
		setShowPassword((p) => !p);
	};

	const textChangeHandler = (event) => {
		const text = event.target.value;
		const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const emailText = text.toLowerCase();

		const phoneNumberRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		let isValid = true;

		//for requirements
		if (required && text.trim().length === 0) {
			isValid = false;
		}

		//for email
		if (email && !emailRegex.test(emailText)) {
			isValid = false;
		}

		//for passwords
		if (password && (text.length < 7 || (minLength != null && text.length < minLength))) {
			isValid = false;
		}

		if (phoneNumber && !phoneNumberRegex.test(text)) {
			isValid = false;
		}

		//for numerical data
		if (min != null && +text < min) {
			isValid = false;
		}
		if (max != null && +text > max) {
			isValid = false;
		}

		//for strings
		if (minLength != null && text.length < minLength) {
			isValid = false;
		}
		if (maxLength != null && text.length > maxLength) {
			isValid = false;
		}

		dispatchAction({
			type: INPUT_CHANGE,
			value: toggler ? !inputState.value : text,
			validity: isValid,
			hasFocus: true,
		});

		onTextChanged && onTextChanged(text);
	};

	const lostFocusHandler = () => {
		dispatchAction({ type: INPUT_BLUR });
	};

	const gainedFocusHandler = () => {
		dispatchAction({ type: INPUT_FOCUS });
	};

	useEffect(() => {
		if (
			inputState.hasFocus ||
			inputState.gainedFocus ||
			inputState.lostFocus ||
			initialValidity === true ||
			!required
		) {
			onInputChange &&
				onInputChange(id, inputState.value, inputState.validity, inputState.gainedFocus, inputState.lostFocus);
		}
	}, [inputState, onInputChange, id, initialValidity, required]);

	useEffect(() => {
		if (submitted) {
			dispatchAction({ type: INPUT_SUBMIT });
		}
	}, [submitted]);

	return (
		//REMINDER: Edit inputs are not working properly when you submit with first input Empty
		<div className="form-group">
			{!hideLabel && !(inputState.value.length > 0 && inputState.hasFocus && true) && (
				<label>{label ? label : placeholder ? placeholder : 'Input Label'}</label>
			)}

			{inputState.value.length > 0 && inputState.hasFocus && !hideFloatingLabel && (
				<label style={{ ...styles.floatingLabel }}>
					{floatingLabel ? floatingLabel : label ? label : 'Placeholder'}
				</label>
			)}

			<div
				style={{
					...styles.inputContainer,
					borderBottomColor: inputState.gainedFocus ? Colors.primary : '#bbb',
					padding: rectInput ? 5 : styles.inputContainer.padding,
					borderWidth: rectInput ? 1.5 : 0,
					...inputContainerStyle,
				}}
				className={parentClassName ? parentClassName : 'parentClassName'}>
				{!hideIcon && (
					<div style={{ marginLeft: rectInput ? 0 : 10 }}>
						{/* <ItemIcon
							onTouch={icon && icon.touchable && icon.onTouch}
							bgColor={icon.bgColor || Colors.primary + '22'}
							name={icon ? icon.iconName : 'clipboard'}
							borderRadius={icon && icon.bgBorderRadius}
							size={23}
							color={icon && icon.iconColor ? icon.iconColor : Colors.primary}
						/> */}
					</div>
				)}

				{!SpecialInput && (
					<input
						// {...props}
						id={id}
						className={className}
						name={id}
						value={newValue}
						//style={{ ...styles.input, ...inputStyle }}
						onChange={textChangeHandler}
						onBlur={lostFocusHandler}
						onFocus={gainedFocusHandler}
						placeholder={placeholder ? placeholder : 'placeholder'}
						type={type}
					/>
				)}

				{/* {password &&
					
						 <ItemIcon
						onTouch={toggleShowPassword}
						bgColor={'transparent'}
						name={showPassword ? 'eye-off' : 'eye'}
						size={23}
						color={icon && icon.iconColor ? icon.iconColor : Colors.primary}
					/> 
					} */}
				{SpecialInput && (
					<SpecialInput
						id={id}
						className={className}
						name={id}
						value={newValue}
						onChange={textChangeHandler}
						onBlur={lostFocusHandler}
						onFocus={gainedFocusHandler}
					/>
				)}

				{ExtraComponent && <ExtraComponent />}
			</div>

			{showErrorMsg !== false && (
				<>
					{((!inputState.validity && inputState.hasFocus && inputState.value.length > 2) ||
						(formHasError && !inputState.validity)) && (
						<div style={styles.errorMsgWrap}>
							<p style={styles.errorMsg}>{errorMsg ? errorMsg : 'Invalid field'}</p>
						</div>
					)}
					{/* {inputState.validity && inputState.lostFocus && inputState.value.length > 2 && (
						<div style={styles.errorMsgWrap}>
							<p style={styles.successMsg}>{successMsg ? successMsg : 'Valid input'}</p>
						</div>
					)} */}
				</>
			)}
		</div>
	);
};

const styles = {
	formControl: {
		width: '100%',
		marginBottom: 10,
	},
	label: {
		marginTop: 5,
		marginBottom: 7,
		paddingHorizontal: 10,
		fontSize: 17,
		//fontFamily: 'OpenSansBold',
		color: '#555',
	},

	floatingLabel: {
		color: '#777',
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	input: {
		// alignSelf: 'center',
		//width: '100%',
		flex: 1,
		paddingHorizontal: 10,
		paddingVertical: 5,
		//backgroundColor: 'yellow',

		//	fontFamily: 'OpenSansRegular',
		fontSize: 18,
	},

	errorMsgWrap: {
		marginTop: 5,
	},
	errorMsg: {
		textAlign: 'center',
		color: '#ff7777',
		//padding: 5,
		//paddingBottom:0,
		//fontFamily: 'OpenSansRegular',
	},
	successMsg: {
		textAlign: 'center',
		color: '#11ee22',
		//padding: 5,
		//fontFamily: 'OpenSansRe//gular',
	},
};

export default FormInput;
