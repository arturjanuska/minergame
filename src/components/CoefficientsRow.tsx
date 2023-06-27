import { useContext, useRef } from 'react';
import styles from '../styles/components/gameWindow.module.scss';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { AppContext } from '../context/Context';
import { CoefficientType } from '../context/reducers';
import { useTranslation } from 'react-i18next';

export default function CoefficientsRow() {
	const { state } = useContext(AppContext);
	const { t } = useTranslation();

	const { coefficients, cellsOpened, status, cashPrize, beforeEndOpenedCells } =
		state;

	const scrollContainerRef = useRef(null);

	const handleScrollToRight = () => {
		if (scrollContainerRef.current) {
			const { scrollLeft } = scrollContainerRef.current;
			const newScrollLeft = scrollLeft + 80;
			(scrollContainerRef.current as HTMLElement).scrollTo({
				left: newScrollLeft,
				behavior: 'smooth',
			});
		}
	};
	const handleScrollToLeft = () => {
		if (scrollContainerRef.current) {
			const { scrollleft } = scrollContainerRef.current;
			const newScrollleft = scrollleft - 80;
			(scrollContainerRef.current as HTMLElement).scrollTo({
				left: newScrollleft,
				behavior: 'smooth',
			});
		}
	};

	return (
		<div className={styles.progress}>
			<div
				className={styles.hit__button__left}
				onClick={handleScrollToLeft}
			>
				<MdKeyboardArrowLeft size={40} />
			</div>
			<div
				className={`${styles.hit__coefficient__row} ${
					status === 'win' ? styles.win : ''
				} ${status === 'lose' ? styles.lose : ''}`}
				ref={scrollContainerRef}
			>
				{status === 'initial' || status === 'active' ? (
					coefficients.map((coefficient: CoefficientType, idx: number) => (
						<div
							className={`${styles.coefficent__box} ${
								idx === cellsOpened - 1 && status === 'active'
									? styles.hitted_box
									: ''
							} ${
								idx <= cellsOpened - 1 && status === 'active'
									? styles.prev_box
									: ''
							}`}
							key={idx}
						>
							<p className={styles.hit}>
								{idx + 1} {t('hit')}
							</p>
							<p className={styles.coeff}>{coefficient.coefficient} x</p>
						</div>
					))
				) : status === 'win' ? (
					<div className={styles.win_row}>
						<p className={styles.coeff}>
							{coefficients[beforeEndOpenedCells - 1].coefficient} x
						</p>
						<p className={styles.cash_prize}>+ {cashPrize} €</p>
						<p className={styles.win_status}>{t('win')}</p>
					</div>
				) : status === 'lose' ? (
					<div className={styles.lose_row}>
						<p className={styles.coeff}>
							{coefficients[beforeEndOpenedCells].coefficient} x
						</p>
						<p className={styles.bomb}>{t('bomb')}</p>
						<p className={styles.lose_hits}>
							{beforeEndOpenedCells + 1} {t('hit')}
						</p>
					</div>
				) : (
					''
				)}
			</div>
			<div
				className={styles.hit__button__right}
				onClick={handleScrollToRight}
			>
				<MdKeyboardArrowRight size={40} />
			</div>
		</div>
	);
}
