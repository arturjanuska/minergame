import { useContext } from 'react';
import styles from '../styles/components/gameWindow.module.scss';
import {
	coefficient22,
	coefficient20,
	coefficient15,
	coefficient9,
	coefficient1,
} from '../data/coefficients';
import { AppContext } from '../context/Context';
import { Types } from '../context/reducers';

type Props = {
	bombs: number;
};

function BombSelectButton({ bombs }: Props) {
	const { state, dispatch } = useContext(AppContext);

	const handleBombs = () => {
		if (bombs === 3) {
			dispatch({
				type: Types.Bombs,
				payload: { bombs: bombs, coefficients: coefficient22 },
			});
		}
		if (bombs === 5) {
			dispatch({
				type: Types.Bombs,
				payload: { bombs: bombs, coefficients: coefficient20 },
			});
		}
		if (bombs === 10) {
			dispatch({
				type: Types.Bombs,
				payload: { bombs: bombs, coefficients: coefficient15 },
			});
		}
		if (bombs === 16) {
			dispatch({
				type: Types.Bombs,
				payload: { bombs: bombs, coefficients: coefficient9 },
			});
		}
		if (bombs === 24) {
			dispatch({
				type: Types.Bombs,
				payload: { bombs: bombs, coefficients: coefficient1 },
			});
		}
	};

	return (
		<div
			className={`${styles.bomb__square} ${
				bombs === state.bombs ? styles.selected : ''
			}`}
			onClick={() => {
				if (state.status !== 'initial') return;
				handleBombs();
			}}
		>
			<p>{bombs}</p>
		</div>
	);
}

export default BombSelectButton;
