/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-spaces-and-tabs */
import { useContext, useState, useEffect } from 'react';

import { StatusType, CellType, Types } from '../context/reducers';
import { AppContext } from '../context/Context';
import {
	generateCells,
	setStatus,
	updateCells,
} from '../helpers/stateManagement';

// DONE

function PlayButton() {
	const { state, dispatch } = useContext(AppContext);

	const [buttonTheme, setButtonTheme] = useState({
		text: 'START',
		background: 'Orange',
	});

	const { bid, bombs, coefficients, status, cellsOpened, gameCells } = state;

	const handleButtonTheme = (): void => {
		if (status === 'initial') {
			setButtonTheme({
				text: 'START',
				background: 'Orange',
			});
		}
		if (status === 'active') {
			if (cellsOpened === 0) {
				setButtonTheme({
					text: 'CHOOSE CELL',
					background: 'grey',
				});
			} else {
				setButtonTheme({
					text: `TAKE: ${Number(
						bid * coefficients[cellsOpened - 1].coefficient
					).toFixed(2)}`,
					background: 'Green',
				});
			}
		}
		if (status === 'lose') {
			setButtonTheme({
				text: 'PLAY AGAIN',
				background: 'Orange',
			});
		}
		if (status === 'win') {
			setButtonTheme({
				text: 'PLAY AGAIN',
				background: 'Orange',
			});
		}
	};

	useEffect(() => {
		handleButtonTheme();
	}, [status, cellsOpened]);

	const handleStatus = (status: StatusType): void => {
		const statusResult = setStatus(status);
		dispatch({
			type: Types.Status,
			payload: statusResult,
		});
	};

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

	const startGame = (bombs: number) => {
		const generatedGame = generateCells(bombs);
		dispatch({
			type: Types.Generate,
			payload: generatedGame,
		});
	};

	const flipAllCells = () => {
		const allCells = gameCells.map((cell: CellType) => {
			return {
				...cell,
				checked: true,
			};
		});
		handleCells(allCells);
	};

	const flipBackAllCells = () => {
		const allCells = gameCells.map((cell: CellType) => {
			return {
				...cell,
				checked: false,
			};
		});
		handleCells(allCells);
	};

	const takeMoney = (coeff: number, bid: number) => {
		const sum = (bid * coeff).toFixed(2);
		dispatch({
			type: Types.Prize,
			payload: Number(sum),
		});
	};

	return (
		<button
			onClick={() => {
				if (status === 'initial') {
					handleStatus('active');
					startGame(bombs);
				}
				if (status === 'active') {
					if (cellsOpened === 0) return;
					takeMoney(coefficients[cellsOpened - 1].coefficient, bid);
					handleStatus('win');
					flipAllCells();
				}
				if (status === 'win' || status === 'lose') {
					flipBackAllCells();
					setTimeout(() => {
						handleStatus('initial');
					}, 800);
				}
			}}
			style={{
				background: buttonTheme.background,
			}}
		>
			{buttonTheme.text}
		</button>
	);
}

export default PlayButton;
