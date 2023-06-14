/* eslint-disable no-mixed-spaces-and-tabs */
import { useContext, useEffect } from 'react';
import styles from '../styles/components/gameWindow.module.scss';
import Cell from './Cell';

import { Context } from '../context/MainContext';
import CoefficientsRow from './CoefficientsRow';

type CellProps = {
	index: number;
	bomb: boolean;
	checked: boolean;
};

function Game() {
	const { state, updateCells, checkCells } = useContext(Context);

	const { gameSettings, gameCells, status } = state;

	const cells = Array.from({ length: 25 });

	useEffect(() => {
		if (status === 'lose' || status === 'win') {
			setTimeout(() => {
				const allFlipedCells = gameCells.map((cell: CellProps) => {
					return {
						...cell,
						checked: true,
					};
				});
				updateCells(allFlipedCells);
			}, 500);
		}
	}, [gameCells]);

	const flipCell = (index: number) => {
		const updatedCells = gameCells.map((cell: CellProps) => {
			if (cell.index === index) {
				return {
					...cell,
					checked: true,
				};
			}
			return cell;
		});
		checkCells(updatedCells);
		updateCells(updatedCells);
	};

	return (
		<div className={styles.stars_bg}>
			<div className={styles.game}>
				<div className={styles.cells}>
					{gameCells.length === 0
						? cells.map((_, idx) => (
								<Cell
									cellIdx={idx}
									key={idx}
									flip={(idx) => 'Log in and Click PLAY'}
								/>
						  ))
						: gameCells.map((cell: CellProps, idx: number) => (
								<Cell
									key={idx}
									cellIdx={idx}
									bomb={cell.bomb}
									checked={cell.checked}
									flip={() => flipCell(idx)}
								/>
						  ))}
				</div>
				<CoefficientsRow />
				<div className={styles.miner__counter__coll__coins}>
					<img
						src='https://getx13.bond/_nuxt/img/coin.8461f21.svg'
						alt='coin'
						style={{
							width: '24px',
							height: '24px',
							objectFit: 'contain',
						}}
					/>
					<p>{25 - gameSettings.bombs}</p>
				</div>
				<div className={styles.miner__counter__coll__bombs}>
					<img
						src='https://getx13.bond/_nuxt/img/bomb.19c1222.svg'
						alt='bomb'
						style={{
							width: '24px',
							height: '24px',
							objectFit: 'contain',
						}}
					/>
					<p>{gameSettings.bombs}</p>
				</div>
			</div>
		</div>
	);
}

export default Game;
