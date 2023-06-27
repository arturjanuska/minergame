import styles from '../styles/components/authPage.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
	auth: string;
	setAuth: () => void;
	title: string;
};

const AuthButton = ({ auth, setAuth, title }: Props) => {
	const { t } = useTranslation();

	return (
		<div
			className={`${styles.method__btn} ${
				auth === title ? styles.selected : styles.unselected
			}`}
			onClick={setAuth}
		>
			{t(title)}
		</div>
	);
};

export default AuthButton;
