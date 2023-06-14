import React, { useContext } from 'react';
import styles from '../styles/components/switcher.module.scss';
import { Context } from '../context/MainContext';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';

function ThemeSwitcher() {
	const { state, handleTheme } = useContext(Context);

	return (
		<div
			className={`${styles.switcher} ${styles[state.theme]}`}
			onClick={() => handleTheme(state.theme)}
		>
			<div
				className={`${styles.circle} ${styles[state.theme]} ${
					state.theme === 'dark' ? styles.right : ''
				}`}
			>
				{state.theme === 'dark' ? (
					<HiOutlineMoon color='gray' />
				) : (
					<HiOutlineSun color='orange' />
				)}
			</div>
		</div>
	);
}

export default ThemeSwitcher;
