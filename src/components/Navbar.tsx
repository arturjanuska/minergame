import React, { useContext } from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import { Context } from '../context/MainContext';
import styles from '../styles/components/navbar.module.scss';

interface ContextStateProps {
	state: object;
	// theme: string;
}

function Navbar() {
	const { state } = useContext<ContextStateProps>(Context);

	return (
		<nav className={`${styles.nav} ${styles[state.theme]}`}>
			<h1>GET MONEY</h1>
			<ul className={`${styles.list}`}>
				<li>
					<select name='lang'>
						<option value='EN'>EN</option>
						<option value='LT'>LT</option>
						<option value='RU'>RU</option>
					</select>
				</li>
				<li>
					<ThemeSwitcher />
				</li>
				<li>Log In</li>
			</ul>
		</nav>
	);
}

export default Navbar;
