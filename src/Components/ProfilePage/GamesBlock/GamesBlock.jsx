import {GAME_STATUS_FINISHED, GAME_STATUS_INIT, GAME_STATUS_OPPONENT_TURN, GAME_STATUS_OPPONENT_WIN, GAME_STATUS_YOU_WIN, GAME_STATUS_YOUR_TURN} from "../../../Strings";
import {ClockCircleOutlined, MehOutlined, PlusSquareOutlined, RightSquareOutlined, TrophyOutlined, UsergroupAddOutlined} from "@ant-design/icons";
import styles from "../ProfilePage.module.css";
import {Button, Card, message, Tooltip} from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import ModalCreateGame from "./ModalCreateGame";
import ModalConnectToGame from "./ModalConnectToGame";
import {useNavigate} from "react-router-dom";
import LoaderFullSpace from "../../Common/LoaderFullSpace/LoaderFullSpace";

// карточка с игрой
// game = {
// 	id: 6,
// 	firstUserColor: "WHITE",
// 	firstUserId: 4,
// 	secondUserId: 1,
// 	secondUserLogin: "login1",
// 	firstUserLogin: "login2",
// 	secondUserColor: "BLACK",
// 	status: "IN_PROCESS"
// }
const GameNode = ({game}) => {

	const navigate = useNavigate(); // хук для перехода между страницами

	let gameStatus = game.status; // статус игры
	let icon; // иконка
	let background; // стиль фона для карточки

	switch (gameStatus) {
		case GAME_STATUS_INIT:
			gameStatus = "Ожидаем соперника";
			icon = <ClockCircleOutlined/>;
			background = styles.waiting;
			break;
		case GAME_STATUS_YOUR_TURN:
			gameStatus = "Ваш ход";
			icon = <RightSquareOutlined/>;
			background = styles.ready;
			break;
		case GAME_STATUS_OPPONENT_TURN:
			gameStatus = "Ход соперника";
			icon = <ClockCircleOutlined/>;
			background = styles.waiting;
			break;
		case GAME_STATUS_YOU_WIN:
			gameStatus = "Вы победили";
			icon = <TrophyOutlined/>;
			background = styles.win;
			break;
		case GAME_STATUS_OPPONENT_WIN:
			gameStatus = "Вы проиграли";
			icon = <MehOutlined/>;
			background = styles.lose;
			break;

		case GAME_STATUS_FINISHED: // TODO это в будущем следует убрать и пользоваться двумя кейсами выше
			gameStatus = "Игра окончена";
			icon = <TrophyOutlined/>;
			background = styles.win;
			break;

		default:
			gameStatus = "Какая-то ошибка";
			icon = <MehOutlined/>;
			background = styles.lose;
			break;
	}

	const onGameCardClick = () => {
		if (game.status !== GAME_STATUS_INIT) // переход на страничку игры, если она уже идёт
			navigate("/game/" + game.id);
	};

	return (
		<Card className={styles.gameCard + " " + background} onClick={onGameCardClick}>
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

const GamesBlock = ({games, isGamesListLoading, isCreateGameLoading, onCreateNewGameButtonClick, setConnectToGameModalOpened, createGameModalProps, connectToGameModalProps}) => {

	const [messageApi, contextHolder] = message.useMessage(); // для отображения всплывающего сообщения

	let gamesArr = [];
	if (!isGamesListLoading && games) {
		gamesArr = games.map(game => <GameNode key={game.id} game={game}/>);
	}
	if (Array.isArray(games)) {
		if (games.length === 0)
			gamesArr = <p className={styles.gameId}>Вы ещё не сыграли ни одной партии.<br/>С помощью кнопок выше Вы можете создать свою первую партию или подключиться к партии, созданной вашим другом</p>;
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
			<ModalConnectToGame messageApi={messageApi} {...connectToGameModalProps}/>
		</div>
	);
};

export default GamesBlock;