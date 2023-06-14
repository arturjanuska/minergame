import React, { useContext, useRef } from 'react';
import styles from '../styles/components/gameWindow.module.scss';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Context } from '../context/MainContext';

type CoefficientsProps = {
	coefficient: number;
};

export default function CoefficientsRow() {
	const { state } = useContext(Context);

	const { gameSettings } = state;

	const scrollContainerRef = useRef(null);

	const handleScrollToRight = () => {
		if (scrollContainerRef.current) {
			const { scrollLeft } = scrollContainerRef.current;
			const newScrollLeft = scrollLeft + 80;
			scrollContainerRef.current.scrollTo({
				left: newScrollLeft,
				behavior: 'smooth',
			});
		}
	};
	const handleScrollToLeft = () => {
		if (scrollContainerRef.current) {
			const { scrollleft } = scrollContainerRef.current;
			const newScrollleft = scrollleft - 80;
			scrollContainerRef.current.scrollTo({
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
				className={styles.hit__coefficient__row}
				ref={scrollContainerRef}
			>
				{gameSettings.coefficients.map(
					(coefficient: CoefficientsProps, idx: number) => (
						<div
							className={styles.coefficent__box}
							key={idx}
						>
							<p className={styles.hit}>{idx + 1} Hit</p>
							<p className={styles.coeff}>{coefficient.coefficient} x</p>
						</div>
					)
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
