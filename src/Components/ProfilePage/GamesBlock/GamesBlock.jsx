import {GAME_STATUS_BLACK_TURN, GAME_STATUS_BLACK_WIN, GAME_STATUS_WAITING_FOR_OPPONENT, GAME_STATUS_WHITE_TURN, GAME_STATUS_WHITE_WIN} from "../../../Redux/ProfileReducer";
import {ClockCircleOutlined, MehOutlined, PlusSquareOutlined, RightSquareOutlined, TrophyOutlined, UsergroupAddOutlined} from "@ant-design/icons";
import styles from "../ProfilePage.module.css";
import {CHECKER_COLOR_BLACK, CHECKER_COLOR_WHITE} from "../../../Redux/GameReducer";
import {Button, Card, message, Tooltip} from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import ModalCreateGame from "./ModalCreateGame";
import ModalConnectToGame from "./ModalConnectToGame";
import {NavLink} from "react-router-dom";
import LoaderFullSpace from "../../Common/LoaderFullSpace/LoaderFullSpace";

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
		<NavLink to={"/game/" + game.id}>
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
		</NavLink>
	);
};

const GamesBlock = ({games, isGamesListLoading, isCreateGameLoading, onCreateNewGameButtonClick, setConnectToGameModalOpened, createGameModalProps, connectToGameModalProps}) => {

	const [messageApi, contextHolder] = message.useMessage(); // для отображения всплывающего сообщения

	let gamesArr = [];
	if (!isGamesListLoading && games && games !== []) {
		gamesArr = games.map(game => <GameNode key={game.id} game={game}/>);
	}

	return (
		<div>
			{contextHolder}
			<div className={styles.gamesBlockHeader}>
				<Title level={2}>Список партий</Title>
				<div>
					<Button
						loading={isCreateGameLoading}
						type="text"
						icon={<PlusSquareOutlined/>}
						onClick={onCreateNewGameButtonClick}>Создать
					</Button>
					<Button
						type="text"
						icon={<UsergroupAddOutlined/>}
						onClick={() => setConnectToGameModalOpened(true)}>Присоединиться
					</Button>
				</div>
			</div>
			{
				isGamesListLoading
					? <div className={styles.loader}><LoaderFullSpace message="Подгружаем данные" size="medium"/></div>
					: <div className={styles.gameCardBlock}>{gamesArr}</div>
			}
			<ModalCreateGame messageApi={messageApi} {...createGameModalProps}/>
			<ModalConnectToGame {...connectToGameModalProps}/>
		</div>
	);
};

export default GamesBlock;