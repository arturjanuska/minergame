/* eslint-disable no-mixed-spaces-and-tabs */
import { useContext } from 'react';
import styles from '../styles/components/gameWindow.module.scss';
import Cell from './Cell';
import CoefficientsRow from './CoefficientsRow';
import { AppContext } from '../context/Context';
import { Types, CellType, StatusType } from '../context/reducers';
import { updateCells, checkCells, setStatus } from '../helpers/stateManagement';

// DONE

function Game() {
	const { state, dispatch } = useContext(AppContext);

	const { bombs, gameCells } = state;

	const cells = Array.from({ length: 25 });

	const handleCells = (cellsArr: CellType[]) => {
		const result = updateCells(cellsArr);
		dispatch({
			type: Types.Update,
			payload: {
				cellsArr: result.cellsArr,
				cellsOpened: result.cellsOpened > 24 ? 0 : result.cellsOpened,
			},
		});
	};

	const handleStatus = (status: StatusType) => {
		const statusResult = setStatus(status);
		dispatch({
			type: Types.Status,
			payload: statusResult,
		});
	};

	const flipCell = (index: number) => {
		const updatedCells = gameCells.map((cell: CellType) => {
			if (cell.index === index) {
				return {
					...cell,
					checked: true,
				};
			}
			return cell;
		});
		const isBomb = checkCells(updatedCells);
		const openedCellsCount = updatedCells.filter(
			(cell: CellType) => cell.checked
		);
		if (isBomb) {
			setTimeout(() => {
				const allFlipedCells = gameCells.map((cell: CellType) => {
					return {
						...cell,
						checked: true,
					};
				});
				handleCells(allFlipedCells);
				handleStatus('lose');
			}, 200);
		} else {
			setOpenedCellsCount(openedCellsCount.length);
			handleCells(updatedCells);
			handleStatus('active');
		}
	};

	const setOpenedCellsCount = (count: number) => {
		dispatch({
			type: Types.CellsCount,
			payload: count,
		});
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
						: gameCells.map((cell: CellType, idx: number) => (
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
					<p>{25 - bombs}</p>
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
					<p>{bombs}</p>
				</div>
			</div>
		</div>
	);
}

export default Game;
