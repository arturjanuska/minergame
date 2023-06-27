/* eslint-disable no-mixed-spaces-and-tabs */
import { useContext } from 'react';
import styles from '../styles/components/gameWindow.module.scss';
import { AppContext } from '../context/Context';

const Stats = () => {
	const { state } = useContext(AppContext);

	const formatedUsername = (nick: string): string => {
		if (nick.length > 8) {
			const slicedNick = nick.slice(0, 8);
			return `${slicedNick}...`;
		}
		return nick;
	};

	return (
		<div className={styles.stats__container}>
			<div className={styles.stats__top__row}>
				<p>Player and Bet</p>
				<p>Bombs</p>
				<p>Ratio</p>
				<p>Winning</p>
			</div>
			<div className={styles.stats__list}>
				{state.stats.length !== 0
					? state.stats.map((stat, i) => (
							<div
								className={`${styles.stat__row} ${
									stat.winning !== '-' ? styles.stat__win : styles.stat__lose
								}`}
								key={i}
							>
								<div className={styles.player}>
									<img
										src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsdk.bitmoji.com%2Frender%2Fpanel%2F3a275541-c977-4a9c-8fd2-1f445bb222e2-AVloSXbh0RF3hNOXaUV4EXUrVRrf-v1.png%3Ftransparent%3D1%26palette%3D1&f=1&nofb=1&ipt=45d31424f3d500da1da368d377ef3800824eb3dcb2d6f4e758b9924d46d008c9&ipo=images'
										alt=''
									/>
									<div className={styles.nick__bet}>
										<p className={styles.nick}>
											{formatedUsername(stat.username)}
										</p>
										<p className={styles.bet}>{stat.bid} €</p>
									</div>
								</div>
								<div className={styles.bombs}>
									<p>{stat.bombs}</p>
								</div>
								<div className={styles.ratio}>
									<p>{stat.ratio} x</p>
								</div>
								<div className={styles.winning}>
									{stat.winning !== '-' ? <p>{stat.winning} €</p> : <p>__</p>}
								</div>
							</div>
					  ))
					: ''}
			</div>
		</div>
	);
};

export default Stats;
