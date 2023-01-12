import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
	selectAvailableFields,
	selectGameData,
	selectGameDataError,
	selectGameField,
	selectGameFieldError,
	selectGameId,
	selectIsCapitulating,
	selectIsGameDataLoading,
	selectIsGameFieldLoading,
	selectSelectedCheckerPosition,
	setGameId,
	setSelectedCheckerPosition,
	tryCapitulateAsync,
	tryCreateCheckerStepAsync,
	tryGetAvailableFieldsForCheckerAsync,
	tryGetCheckersFieldAsync,
	tryGetGameDataAsync
} from "../../Redux/GameReducer";
import {useParams} from "react-router-dom";
import PageNotFound from "../PageNotFound/PageNotFound";
import withAuthRedirect from "../HOC/withAuthRedirect";
import GamePage from "./GamePage";
import {GAME_STATUS_FINISHED, GAME_STATUS_OPPONENT_WIN, GAME_STATUS_YOU_WIN} from "../../Strings";
import PlayedGamePage from "./PlayedGamePage";
import {selectLogin, selectUserId} from "../../Redux/AuthReducer";
import LoaderFullSpace from "../Common/LoaderFullSpace/LoaderFullSpace";
import {setGamesList} from "../../Redux/ProfileReducer";
import useWebSocket from "react-use-websocket";

export const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const GamePageContainer = () => {

	const params = useParams(); // использование параметров строки запроса
	const gameIdParam = params.gameId; // идентификатор игры

	const login = useSelector(selectLogin);
	const userId = useSelector(selectUserId);
	const gameId = useSelector(selectGameId);
	const gameData = useSelector(selectGameData);
	const isGameDataLoading = useSelector(selectIsGameDataLoading);
	const gameDataError = useSelector(selectGameDataError);
	const gameField = useSelector(selectGameField);
	const isGameFieldLoading = useSelector(selectIsGameFieldLoading);
	const gameFieldError = useSelector(selectGameFieldError);
	const selectedCheckerPosition = useSelector(selectSelectedCheckerPosition);
	const availableFields = useSelector(selectAvailableFields);
	const isCapitulating = useSelector(selectIsCapitulating);

	const dispatch = useDispatch();

	useEffect(() => {
		// если идентификатор игры из пути не совпадает с тем что в редаксе, то надо его сохранить и получить данные об игровом поле, т.к. это означает, что пользователь только зашёл на страничку
		if (gameIdParam !== gameId) {
			dispatch(setGameId(gameIdParam));
			dispatch(tryGetGameDataAsync({gameId: gameIdParam, userId}));
		}
		// если игровые данные отсутствуют, то надо их подгрузить
		if (!gameData && !isGameDataLoading) {
			dispatch(tryGetGameDataAsync({gameId: gameIdParam, userId}));
		}
		// если игровые данные загружены, а данных по полю нет, то их надо подгрузить
		if (!gameField && !isGameFieldLoading && !isGameDataLoading) {
			dispatch(tryGetCheckersFieldAsync({gameId: gameIdParam, userId}));
		}
	});

	const WS_PATH = `wss://home.ferrion.tech/game/checker/${gameId}/user/${userId}`;
	const {lastJsonMessage} = useWebSocket(WS_PATH, {});

	useEffect(() => {
		if (lastJsonMessage) {
			if (!isGameFieldLoading && !isGameDataLoading)
				dispatch(tryGetCheckersFieldAsync({gameId: gameIdParam, userId}));
		}
	}, [lastJsonMessage]);

	if (!Number(gameIdParam) || Number(gameIdParam) < 0) { // если не удается превратить строку в число, то значит переданный параметр (gameId) задан неправильно
		return <PageNotFound title="Невалидный url игры" message="Введите корректный url или выберите игру из списка в профиле"/>
	}

	// если данных ещё нет, то показать загрузку (иначе проблема с чтением параметров)
	if (!gameData || isGameDataLoading) {
		return <LoaderFullSpace/>
	}

	// если игра завершена, то отрендерить победную страничку
	if (gameData.status === GAME_STATUS_FINISHED || gameData.status === GAME_STATUS_OPPONENT_WIN || gameData.status === GAME_STATUS_YOU_WIN) {
		return <PlayedGamePage
			winnerLogin={gameData.status === GAME_STATUS_YOU_WIN ? login + " (Вы)" : gameData.opponentLogin}
			loserLogin={gameData.status === GAME_STATUS_YOU_WIN ? gameData.opponentLogin : login + " (Вы)"}
		/>;
	}

	// обработчик нажатий на выбор шашки
	const onSelectChecker = (position) => {
		dispatch(setSelectedCheckerPosition(position)); // добавление выбранной шашки в редакс
		dispatch(tryGetAvailableFieldsForCheckerAsync({gameId, position})); // добавление возможных для шашки ходов в редакс
	};

	// функция для совершения хода шашкой
	const createCheckerStep = (position) => {
		dispatch(setGamesList(null)); // обнуление списка игр в профиле
		dispatch(tryCreateCheckerStepAsync({gameId, from: selectedCheckerPosition, to: position}));
	};

	// обработчик нажатия на кнопку "Сдаться"
	const onCapitulation = () => {
		dispatch(setGamesList(null)); // обнуление списка игр в профиле
		dispatch(tryCapitulateAsync(gameId));
	};

	const checkersFieldProps = {
		gameField,
		isGameFieldLoading,
		gameFieldError,
		playerColor: gameData.playerColor,
		gameStatus: gameData.status,
		selectedCheckerPosition,
		onSelectChecker,
		availableFields,
		createCheckerStep
	};

	const gamePageProps = {
		login,
		gameId,
		gameData,
		isGameDataLoading,
		gameDataError,
		onCapitulation,
		isCapitulating
	};

	return (
		<GamePage {...gamePageProps} checkersFieldProps={checkersFieldProps}/>
	);
}

export default withAuthRedirect(GamePageContainer);