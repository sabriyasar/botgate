import React from 'react';
import { ColorTypes, ButtonTypes } from '../../base/models/IBaseTypes';

interface IButton {
		type: ButtonTypes;
		color?: ColorTypes;
		disabled?: boolean;
		name?: string;
		value?: string;
		text: string;
		className: string;
		onClick?: () => void;
}

const Button = (props: IButton) => {
		const { type, color, disabled, name, value, text, className, onClick } = props;
		return (
				<button
						type={type}
						color={color}
						value={value}
						name={name}
						disabled={disabled}
						className={className}
						onClick={onClick}
				>
						{text ? text : ''}
				</button>
		)
}

export default Button;
