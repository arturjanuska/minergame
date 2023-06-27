import { useContext } from 'react';
import styles from '../styles/components/footer.module.scss';
import { AppContext } from '../context/Context';
import Logo from '../assets/M-logo.svg';
import { FaGithubSquare, FaLinkedin } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function Footer() {
	const { state } = useContext(AppContext);
	const { t } = useTranslation();

	const openWebsite = (link: string): void => {
		window.open(link, '_blank');
	};

	const nav = useNavigate();

	return (
		<div className={`${styles.footer__container} ${styles[state.theme]}`}>
			<div className={styles.footer__content}>
				<div className={styles.first__col}>
					<img
						src={Logo}
						alt='logo'
					/>
					<div className={styles.rights}>
						<p className={`text ${styles.title}`}>© 2023 GETM</p>
						<p className={`text`}>{t('rights')}</p>
					</div>
				</div>
				<div className={styles.second__col}>
					<h2 className={`text ${styles.title}`}>{t('navigation')}</h2>
					<ul className={`text`}>
						<li onClick={() => nav('/')}>{t('miner game')}</li>
						<li onClick={() => nav('/auth')}>{t('authorization')}</li>
						<li>{t('deposit')}</li>
					</ul>
				</div>
				<div className={styles.third__col}>
					<h2 className={`text ${styles.title}`}>{t('other')}</h2>
					<ul className={`text`}>
						<li
							className={styles.link}
							onClick={() => openWebsite('https://github.com/arturjanuska')}
						>
							<FaGithubSquare
								className={styles.icon}
								size={27}
							/>
							<p>Github</p>
						</li>
						<li
							className={styles.link}
							onClick={() =>
								openWebsite(
									'https://www.linkedin.com/in/artur-januska-11449a258/'
								)
							}
						>
							<FaLinkedin
								className={styles.icon}
								size={27}
							/>
							<p>Linkedin</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Footer;
