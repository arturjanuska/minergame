import { useContext } from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import styles from '../styles/components/navbar.module.scss';
import { AppContext } from '../context/Context';
import CustomLanguageSelect from './CustomLanguageSelect';

function Navbar() {
	const { state } = useContext(AppContext);

	return (
		<nav className={`${styles.nav} ${styles[state.theme]}`}>
			<h1
				style={{
					textAlign: 'center',
				}}
			>
				GET <br /> MONEY
			</h1>
			<ul className={`${styles.list}`}>
				<li>
					<CustomLanguageSelect />
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
