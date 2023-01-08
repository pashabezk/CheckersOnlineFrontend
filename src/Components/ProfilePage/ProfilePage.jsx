import React from "react";
import PageWithDefaultMenuSidebar from "../PageWithSideMenu/PageWithStandartMenu";
import {Avatar, Card, Spin, Tooltip} from "antd";
import {ClockCircleOutlined, MehOutlined, RightSquareOutlined, TrophyOutlined, UserOutlined} from "@ant-design/icons";
import styles from "./ProfilePage.module.css"
import {GAME_STATUS_BLACK_TURN, GAME_STATUS_BLACK_WIN, GAME_STATUS_WAITING_FOR_OPPONENT, GAME_STATUS_WHITE_TURN, GAME_STATUS_WHITE_WIN} from "../../Redux/ProfileReducer";
import {CHECKER_COLOR_BLACK, CHECKER_COLOR_WHITE} from "../../Redux/GameReducer";

const UserPhotoAndLoginBlock = () => {
	return (
		<div className={styles.userPhotoAndLoginBlock}>
			<Avatar
				size={100}
				icon={<UserOutlined/>}
			/>
			<div className={styles.nameBlock}>
				<h1>loginloginlogin</h1>
			</div>
		</div>
	);
};

// карточка с игрой
// game = {
// 	id: 1,
// 	opponentId: 32,
// 	opponentLogin: "UserLogin",
// 	playerColor: "BLACK",
// 	status: GAME_STATUS_WHITE_TURN
// }
const GameNode = ({game}) => {
	let gameStatus = game.status; // статус игры
	let icon; // иконка
	let background; // стиль фона для карточки
	if (gameStatus === GAME_STATUS_WAITING_FOR_OPPONENT) {
		gameStatus = "Ожидаем соперника";
		icon = <ClockCircleOutlined/>;
		background = styles.waiting;
	} else {
		if ((gameStatus === GAME_STATUS_WHITE_WIN && game.playerColor === CHECKER_COLOR_WHITE) ||
			(gameStatus === GAME_STATUS_BLACK_WIN && game.playerColor === CHECKER_COLOR_BLACK)) {
			gameStatus = "Вы победили";
			icon = <TrophyOutlined/>;
			background = styles.win;
		} else {
			if (gameStatus === GAME_STATUS_WHITE_WIN || gameStatus === GAME_STATUS_BLACK_WIN) {
				gameStatus = "Вы проиграли";
				icon = <MehOutlined/>;
				background = styles.lose;
			} else {
				if ((gameStatus === GAME_STATUS_WHITE_TURN && game.playerColor === CHECKER_COLOR_WHITE) ||
					(gameStatus === GAME_STATUS_BLACK_TURN && game.playerColor === CHECKER_COLOR_BLACK)) {
					gameStatus = "Ваш ход";
					icon = <RightSquareOutlined/>;
					background = styles.ready;
				} else {
					gameStatus = "Ход соперника";
					icon = <ClockCircleOutlined/>;
					background = styles.waiting;
				}
			}
		}
	}

	return (
		<Card className={styles.gameCard + " " + background}>
			{icon}&nbsp;&nbsp;
			{
				game.opponentId &&
				<Tooltip title={"id: " + game.opponentId}>
					<span className={styles.user}>{game.opponentLogin}</span>&nbsp;
				</Tooltip>
			}
			<span>{gameStatus}</span>&nbsp;
			<span className={styles.gameId}>(id: {game.id})</span>
		</Card>
	);
};

const GamesBlock = ({games, isGamesListLoading}) => {

	let gamesArr = [];
	if (!isGamesListLoading && games && games !== []) {
		gamesArr = games.map(game => <GameNode key={game.id} game={game}/>);
	}

	return (
		<div>
			<h1>Список партий</h1>
			{
				isGamesListLoading
					? <Spin tip="Подгружаем данные"/>
					: <div className={styles.gameCardBlock}>{gamesArr}</div>
			}
		</div>
	);
};

const ProfilePage = ({games, isGamesListLoading}) => {
	return (
		<PageWithDefaultMenuSidebar>
			<UserPhotoAndLoginBlock/>
			<GamesBlock
				games={games}
				isGamesListLoading={isGamesListLoading}
			/>
		</PageWithDefaultMenuSidebar>
	);
}

export default ProfilePage;