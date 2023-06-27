import { useState, useContext, useRef, useEffect } from 'react';
import styles from '../styles/components/navbar.module.scss';
import { RiArrowDropDownLine } from 'react-icons/ri';
import UK from '../assets/flags/UK.png';
import RU from '../assets/flags/RU.png';
import LT from '../assets/flags/LT.png';
import { AppContext } from '../context/Context';
import { Types } from '../context/reducers';
import { useTranslation } from 'react-i18next';

function CustomLanguageSelect() {
	const { state, dispatch } = useContext(AppContext);

	const { i18n } = useTranslation();

	const containerRef = useRef<HTMLDivElement>(null);

	const languages = [
		{
			title: 'English',
			stateTitle: 'english',
			shortCut: 'en',
		},
		{
			title: 'Русский',
			stateTitle: 'russian',
			shortCut: 'ru',
		},
		{
			title: 'Lietuvių',
			stateTitle: 'lithuanian',
			shortCut: 'lt',
		},
	];

	const [openDropdown, setOpen] = useState<boolean>(false);

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

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
	};

	const filteredLanguages = languages.filter(
		(lang) => lang.title !== state.language.title
	);

	return (
		<div className={`${styles.language__container}`}>
			<div
				className={`${styles.language__select} ${styles[state.theme]}`}
				onClick={() => {
					setOpen(!openDropdown);
				}}
			>
				<img
					className={styles.flag}
					src={
						state.language.stateTitle === 'english'
							? UK
							: state.language.stateTitle === 'russian'
							? RU
							: state.language.stateTitle === 'lithuanian'
							? LT
							: undefined
					}
					alt={state.language.stateTitle}
				/>
				<RiArrowDropDownLine
					size={28}
					className={`${styles.icon} ${openDropdown ? styles.open : ''}`}
				/>
			</div>
			{openDropdown && (
				<div
					ref={containerRef}
					className={`${styles.language__options} ${styles[state.theme]}`}
				>
					{filteredLanguages.map((lang) => (
						<div
							className={`${styles.language__box} ${styles[state.theme]}`}
							key={lang.title}
							onClick={() => {
								changeLanguage(lang.shortCut);
								setOpen(false);
								dispatch({
									type: Types.Language,
									payload: lang,
								});
							}}
						>
							<img
								className={styles.flag}
								src={
									lang.stateTitle === 'english'
										? UK
										: lang.stateTitle === 'russian'
										? RU
										: lang.stateTitle === 'lithuanian'
										? LT
										: undefined
								}
								alt={lang.title}
							/>
							<p>{lang.title}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default CustomLanguageSelect;
