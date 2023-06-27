/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-spaces-and-tabs */
import { useContext, useEffect } from 'react';

import { StatusType, CellType, Types } from '../context/reducers';
import { AppContext } from '../context/Context';
import {
	generateCells,
	setStatus,
	updateCells,
} from '../helpers/stateManagement';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function PlayButton() {
	const { state, dispatch } = useContext(AppContext);
	const { t } = useTranslation();

	const { bid, bombs, coefficients, status, cellsOpened, gameCells, isLogged } =
		state;

	const nav = useNavigate();

	const handleButtonTheme = (): { text: string; background: string } => {
		if (!isLogged) {
			return {
				text: `${t('log in')}`,
				background: 'Orange',
			};
		}
		if (status === 'initial') {
			return {
				text: `${t('start')}`,
				background: 'Orange',
			};
		}
		if (status === 'active') {
			if (cellsOpened === 0) {
				return {
					text: `${t('choose cell')}`,
					background: 'grey',
				};
			} else {
				return {
					text: `${t('take money')}: ${Number(
						bid * coefficients[cellsOpened - 1].coefficient
					).toFixed(2)} €`,
					background: 'Green',
				};
			}
		}
		if (status === 'lose') {
			return {
				text: `${t('play again')}`,
				background: 'Orange',
			};
		}
		if (status === 'win') {
			return {
				text: `${t('play again')}`,
				background: 'Orange',
			};
		}
		return { text: '', background: '' };
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
		dispatch({
			type: Types.Cash,
			payload: state.loggedUser.cash - state.bid,
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
		const prize = (bid * coeff).toFixed(2);
		const sum = Number(prize) + state.loggedUser.cash;

		dispatch({
			type: Types.Cash,
			payload: sum,
		});
		dispatch({
			type: Types.Prize,
			payload: Number(prize),
		});
	};

	const gameEnd = (status: 'win' | 'lose', prize: number | '-'): void => {
		if (status === 'win') {
			const username = state.loggedUser.username;
			const bid = state.bid;
			const bombs = state.bombs;
			const ratio = coefficients[state.beforeEndOpenedCells - 1].coefficient;
			const winning = prize;
			return dispatch({
				type: Types.Stats,
				payload: {
					username,
					bid,
					bombs,
					ratio,
					winning,
				},
			});
		}
		if (status === 'lose') {
			const username = state.loggedUser.username;
			const bid = state.bid;
			const bombs = state.bombs;
			const ratio = coefficients[state.beforeEndOpenedCells].coefficient;
			const winning = prize;
			return dispatch({
				type: Types.Stats,
				payload: {
					username,
					bid,
					bombs,
					ratio,
					winning,
				},
			});
		}
	};
	return (
		<button
			onClick={() => {
				if (!isLogged) {
					nav('/auth');
				}
				if (status === 'initial') {
					if (state.loggedUser.cash < state.bid) return;
					handleStatus('active');
					startGame(bombs);
				}
				if (status === 'active') {
					if (cellsOpened === 0) return;
					const prize = coefficients[cellsOpened - 1].coefficient * bid;
					takeMoney(coefficients[cellsOpened - 1].coefficient, bid);
					gameEnd('win', Number(prize.toFixed(2)));
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
				background: handleButtonTheme().background,
			}}
		>
			{handleButtonTheme().text}
		</button>
	);
}

export default PlayButton;
