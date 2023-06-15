import styles from '../styles/components/gameWindow.module.scss';

type CellProps = {
	cellIdx: number;
	bomb?: boolean;
	checked?: boolean;
	flip: (index: number) => void;
};

function Cell({ cellIdx, bomb, checked, flip }: CellProps) {
	return (
		<div className={styles.cell__container}>
			<div
				className={`${styles.cell} ${checked ? styles.flip : ''}`}
				onClick={() => {
					if (!checked) {
						// console.log('Is this cell checked?', checked);
						flip(cellIdx);
					} else {
						return;
					}
				}}
			>
				<div className={styles.front}></div>
				<div
					className={styles.back}
					style={{
						backgroundImage: bomb
							? "url('https://getx13.bond/_nuxt/img/bomb.19c1222.svg')"
							: "url('https://getx13.bond/_nuxt/img/coin.8461f21.svg')",
						backgroundPosition: 'center',
						backgroundSize: '50px',
						backgroundRepeat: 'no-repeat',
						border: bomb ? '2px solid #8e243e' : '2px solid #f4c055',
						backgroundColor: bomb ? '#8e243f8a' : '#f4bf5586',
					}}
				></div>
			</div>
		</div>
	);
}

export default Cell;
