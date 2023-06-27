/* eslint-disable no-mixed-spaces-and-tabs */
import { useContext } from 'react';
import styles from '../styles/components/gameWindow.module.scss';
import PlayButton from './PlayButton';
import { AppContext } from '../context/Context';

import BombSelectButton from './BombSelectButton';
import BidButton from './BidButton';
import { useTranslation } from 'react-i18next';

function GameOptions() {
	const { state } = useContext(AppContext);
	const { t } = useTranslation();

	const { bid, bombs, status } = state;

	return (
		<div className={styles.settings}>
			<div className={styles.bombs}>
				<p className={styles.bombs__title}>{t('number of bombs')}</p>
				<div
					className={styles.bombs__selector}
					style={{
						opacity: status !== 'initial' ? 0.8 : 1,
					}}
				>
					<BombSelectButton bombs={3} />
					<BombSelectButton bombs={5} />
					<BombSelectButton bombs={10} />
					<BombSelectButton bombs={16} />
					<BombSelectButton bombs={24} />
				</div>
				<div className={styles.another}>
					<p className={styles.title}>{t('another')}</p>
					<p className={styles.bomb__number}>{bombs}</p>
				</div>
			</div>
			<div className={styles.play__button}>
				<PlayButton />
			</div>
			<div
				className={styles.bid}
				style={{
					opacity: status !== 'initial' ? 0.8 : 1,
				}}
			>
				<p className={styles.bid__title}>{t('bid')}</p>
				<div className={styles.bid__selector}>
					<p className={styles.bid__count}>
						{bid.toFixed(2)} <span>€</span>
					</p>
					<div className={styles.count__selector}>
						<BidButton text='-' />
						<BidButton text='+' />
					</div>
				</div>
				<div className={styles.bid__numbers}>
					<BidButton text='Min' />
					<BidButton count={10} />
					<BidButton count={50} />
					<BidButton count={100} />
					<BidButton count={200} />
					<BidButton text='Max' />
				</div>
			</div>
		</div>
	);
}

export default GameOptions;
