/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useRef } from 'react';
import styles from '../styles/components/authPage.module.scss';

type Props = {
	label: string;
	type: string;
	state: string;
	setState: (value: string) => void;
	error?: boolean;
	setError: () => void;
};

function CustomInput({ label, type, state, setState, error, setError }: Props) {
	const inputRef = useRef<HTMLInputElement>(null!);

	return (
		<div className={`${styles.input__box} `}>
			<input
				className={`${error ? styles.input__error : ''}`}
				type={type}
				ref={inputRef}
				onChange={(e) => {
					setError();
					setState(e.target.value);
				}}
				value={state}
			/>
			<label
				className={`${state.length !== 0 ? styles.label__on__the__top : ''}`}
			>
				{label}
			</label>
		</div>
	);
}

export default CustomInput;
