import { useState, useContext } from 'react';
import styles from '../styles/components/authPage.module.scss';
import Logo from '../assets/M-logo.svg';
import { useTranslation } from 'react-i18next';
import Form from '../components/Form';
import AuthButton from '../components/AuthButton';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AppContext } from '../context/Context';

function AuthPage() {
	const { state } = useContext(AppContext);

	const { t } = useTranslation();

	const [auth, setAuth] = useState<string>('log in');

	return (
		<div className={state.theme}>
			<Navbar />
			<div className='background'>
				<div className={`${styles.auth__page}`}>
					<div className={`${styles.auth__container}`}>
						<div className={`${styles.left__side}`}>
							<img
								src={Logo}
								alt='logo'
							/>
							<div className={styles.logo__title}>
								<h2>GET</h2>
								<img
									src={Logo}
									alt='logo'
								/>
							</div>
						</div>
						<div className={`${styles.right__side}`}>
							<h2>{auth === 'log in' ? t('log in') : t('reg')}</h2>
							<div className={styles.auth__method}>
								<AuthButton
									auth={auth}
									setAuth={() => setAuth('log in')}
									title='log in'
								/>
								<AuthButton
									auth={auth}
									setAuth={() => setAuth('reg')}
									title='reg'
								/>
							</div>
							<Form
								auth={auth}
								setAuth={() => setAuth('log in')}
							/>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</div>
	);
}

export default AuthPage;
