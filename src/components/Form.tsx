import { useContext, useState } from 'react';
import CustomInput from './CustomInput';
import styles from '../styles/components/authPage.module.scss';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../context/Context';
import { Types } from '../context/reducers';
import { useNavigate } from 'react-router-dom';

type Props = { auth: string; setAuth: () => void };

function Form({ auth, setAuth }: Props) {
	const { state, dispatch } = useContext(AppContext);
	const { t } = useTranslation();

	const nav = useNavigate();

	const [username, setUsername] = useState('');
	const [pass, setPass] = useState('');
	const [repeatedPass, setRepeatedPass] = useState('');

	const [nameError, setNameError] = useState(false);
	const [passError, setPassError] = useState(false);
	const [secPassError, setSecPassError] = useState(false);

	const resetValues = (): void => {
		setUsername('');
		setPass('');
		setRepeatedPass('');
	};

	const handleForm = (): void => {
		if (auth === 'reg') {
			if (username.length < 3 || username.length > 15) {
				return setNameError(true);
			}
			if (pass.length < 3 || pass.length > 20) {
				return setPassError(true);
			}
			if (pass !== repeatedPass) {
				setPassError(true);
				setSecPassError(true);
				return;
			}

			const user = {
				id: Math.floor(Math.random() * 99999) + 1,
				username,
				password: pass,
				cash: 100,
			};
			console.log('user ===', user);
			dispatch({
				type: Types.RegUser,
				payload: user,
			});
			resetValues();
			return setAuth();
		}
		if (auth === 'log in') {
			const isExist = state.registeredUsers.some(
				(user) => user.username === username
			);
			if (!isExist) return setNameError(true);

			const userToLogin = state.registeredUsers.find(
				(user) => user.username === username
			);
			console.log('userToLogin ===', userToLogin);
			const isCorrectPass = userToLogin?.password === pass;

			if (!isCorrectPass) return setPassError(true);

			dispatch({
				type: Types.LoggedUser,
				payload: {
					isLogged: true,
					loggedUser: userToLogin,
				},
			});
			localStorage.setItem('username', userToLogin.username);
			resetValues();
			return nav('/');
		}
	};

	return (
		<div className={styles.form}>
			<CustomInput
				label={t('username')}
				type='text'
				state={username}
				setState={(value) => setUsername(value)}
				error={nameError}
				setError={() => setNameError(false)}
			/>
			<CustomInput
				label={t('password')}
				type='password'
				state={pass}
				setState={(value) => setPass(value)}
				error={passError}
				setError={() => setPassError(false)}
			/>
			{auth === 'reg' ? (
				<CustomInput
					label={t('repeat password')}
					type='password'
					state={repeatedPass}
					setState={(value) => setRepeatedPass(value)}
					error={secPassError}
					setError={() => setSecPassError(false)}
				/>
			) : (
				''
			)}
			<button
				className={styles.form__btn}
				onClick={handleForm}
			>
				{auth === 'log in' ? t('sign in') : t('sign up')}
			</button>
		</div>
	);
}

export default Form;
