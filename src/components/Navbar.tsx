import { useContext, useEffect, useRef, useState } from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import styles from '../styles/components/navbar.module.scss';
import { AppContext } from '../context/Context';
import CustomLanguageSelect from './CustomLanguageSelect';
import Logo from '../assets/M-logo.svg';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Types } from '../context/reducers';

function Navbar() {
	const { state, dispatch } = useContext(AppContext);

	const { t } = useTranslation();

	const containerRef = useRef<HTMLUListElement>(null);

	const nav = useNavigate();

	const [openProfile, setOpen] = useState(false);

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, []);

	const logout = () => {
		localStorage.removeItem('username');
		dispatch({
			type: Types.LoggedUser,
			payload: {
				isLogged: false,
				loggedUser: {
					id: 0,
					username: '',
					cash: 0,
				},
			},
		});
		nav('/auth');
	};

	return (
		<nav className={`${styles.nav} ${styles[state.theme]}`}>
			<h1
				style={{
					textAlign: 'center',
				}}
			>
				GET
				<img
					src={Logo}
					alt='logo'
				/>
			</h1>
			{!state.isLogged ? (
				<ul className={`${styles.list}`}>
					<li>
						<CustomLanguageSelect />
					</li>
					<li>
						<ThemeSwitcher />
					</li>
					<li
						className={styles.login__button}
						onClick={() => nav('/auth')}
					>
						{t('log in')}
					</li>
					<li
						className={styles.registration__button}
						onClick={() => nav('/auth')}
					>
						{t('reg')}
					</li>
				</ul>
			) : (
				<ul className={`${styles.list}`}>
					<li>
						<CustomLanguageSelect />
					</li>
					<li>
						<ThemeSwitcher />
					</li>
					<li className={styles.balance}>
						<p>
							<span>{t('balance')}:</span>{' '}
							{Number(state.loggedUser.cash.toFixed(2))} €
						</p>
					</li>
					<li className={styles.profile}>
						<p>{state.loggedUser.username}</p>
						<img
							src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsdk.bitmoji.com%2Frender%2Fpanel%2F3a275541-c977-4a9c-8fd2-1f445bb222e2-AVloSXbh0RF3hNOXaUV4EXUrVRrf-v1.png%3Ftransparent%3D1%26palette%3D1&f=1&nofb=1&ipt=45d31424f3d500da1da368d377ef3800824eb3dcb2d6f4e758b9924d46d008c9&ipo=images'
							alt='profile'
							onClick={() => setOpen(!openProfile)}
						/>
						{openProfile ? (
							<ul
								ref={containerRef}
								className={`${styles.profile__options} ${styles[state.theme]}`}
							>
								<li>{t('deposit')}</li>
								<li onClick={logout}>{t('logout')}</li>
							</ul>
						) : (
							''
						)}
					</li>
				</ul>
			)}
		</nav>
	);
}

export default Navbar;
