import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
	fallbackLng: 'en',
	debug: true,
	resources: {
		en: {
			translation: {
				'log in': 'Log in',
				reg: 'Registration',
				'number of bombs': 'Number of bombs',
				another: 'Another',
				bid: 'Bid',
				navigation: 'NAVIGATION',
				other: 'OTHER',
				'miner game': 'Miner game',
				authorization: 'Authorization',
				deposit: 'Deposit',
				rights: 'All rights reserved',
				start: 'START',
				'choose cell': 'CHOOSE CELL',
				'take money': 'TAKE',
				bomb: 'BOMB',
				win: 'WIN',
				'play again': 'PLAY AGAIN',
				hit: 'Hit',
				'sign in': 'Sign In',
				'sign up': 'Sign Up',
				username: 'Username',
				password: 'Password',
				'repeat password': 'Repeat Password',
				logout: 'Log Out',
				balance: 'Balance',
			},
		},
		ru: {
			translation: {
				'log in': 'Войти',
				reg: 'Регистрация',
				'number of bombs': 'Кол-во бомб',
				another: 'Другое',
				bid: 'Ставка',
				navigation: 'НАВИГАЦИЯ',
				other: 'ДРУГОЕ',
				'miner game': 'Минёр',
				authorization: 'Авторизация',
				deposit: 'Депозит',
				rights: 'Все права защищены',
				start: 'НАЧАТЬ',
				'choose cell': 'ВЫБЕРИТЕ ЯЧЕЙКУ',
				'take money': 'ЗАБРАТЬ',
				bomb: 'БОМБА',
				win: 'ПОБЕДА',
				'play again': 'ИГРАТЬ СНОВА',
				hit: 'Попадание',
				'sign in': 'Войти',
				'sign up': 'Зарегистрироватся',
				username: 'Никнейм',
				password: 'Пароль',
				'repeat password': 'Повтори Пароль',
				logout: 'Выйти',
				balance: 'Баланс',
			},
		},
		lt: {
			translation: {
				'log in': 'Prisijungti',
				reg: 'Registracija',
				'number of bombs': 'Bombu skaičius',
				another: 'Kitas',
				bid: 'Statymas',
				navigation: 'NAVIGACIJA',
				other: 'KITAS',
				'miner game': 'Miner game',
				authorization: 'Autorizacija',
				deposit: 'Depozitas',
				rights: 'Visos teisės saugomos',
				start: 'PRADĖTI',
				'choose cell': 'PASIRINKITE LANGELĮ',
				'take money': 'PASIIMTI',
				bomb: 'BOMBA',
				win: 'PERGALĖ',
				'play again': 'ŽAISTI DAR KARTĄ',
				hit: 'Pataikymas',
				'sign in': 'Prisijungti',
				'sign up': 'Užsiregistruoti',
				username: 'Prisijungimo vardas',
				password: 'Slaptažodis',
				'repeat password': 'Pakartok Slaptažodį',
				logout: 'Atsijungti',
				balance: 'Balansas',
			},
		},
	},
});

export default i18n;