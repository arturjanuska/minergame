import { useContext } from 'react';
import { AppContext } from '../context/Context';
import { Types } from '../context/reducers';
import styles from '../styles/components/gameWindow.module.scss';

type Props = {
	text?: string;
	count?: number;
};

function BidButton({ text, count }: Props) {
	const { state, dispatch } = useContext(AppContext);

	return (
		<button
			className={`${
				text === 'Min' || text === 'Max' ? styles.bid__min__max : ''
			} ${text === '-' ? styles.count__dec : styles.count__inc}`}
			onClick={() => {
				if (state.status !== 'initial') return;
				if (text === '-' && state.bid === 1) return;
				dispatch({
					type: Types.Bid,
					payload: count
						? state.bid + count
						: text === 'Min'
						? 1
						: text === 'Max'
						? 500
						: text === '-'
						? state.bid - 1
						: state.bid + 1,
				});
			}}
		>
			{text ? text : `+${count}`}
		</button>
	);
}

export default BidButton;
