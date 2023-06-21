/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useContext } from 'react';
import styles from '../styles/components/switcher.module.scss';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';
import { AppContext } from '../context/Context';
import { Types } from '../context/reducers';

function ThemeSwitcher() {
	const { state, dispatch } = useContext(AppContext);

	const handleTheme = (currentTheme: 'dark' | 'light') => {
		currentTheme === 'light'
			? dispatch({
					type: Types.Theme,
					payload: 'dark',
			  })
			: dispatch({
					type: Types.Theme,
					payload: 'light',
			  });
	};

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
