import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
	selectAvailableFields,
	selectGameData,
	selectGameDataError,
	selectGameField,
	selectGameFieldError,
	selectGameId,
	selectIsGameDataLoading,
	selectIsGameFieldLoading,
	selectSelectedCheckerPosition,
	setGameId,
	setSelectedCheckerPosition, tryCreateCheckerStepAsync, tryGetAvailableFieldsForCheckerAsync,
	tryGetCheckersFieldAsync,
	tryGetGameDataAsync
} from "../../Redux/GameReducer";
import {useParams} from "react-router-dom";
import PageNotFound from "../PageNotFound/PageNotFound";
import withAuthRedirect from "../HOC/withAuthRedirect";
import GamePage from "./GamePage";
import {GAME_STATUS_FINISHED} from "../../Strings";
import PlayedGamePage from "./PlayedGamePage";
import {selectLogin} from "../../Redux/AuthReducer";
import LoaderFullSpace from "../Common/LoaderFullSpace/LoaderFullSpace";

export const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

// получение объекта шашки на позиции
export const findChecker = (gameField, position) => {
	return gameField.find(elem => {
		if (elem.position === position) {
			return elem;
		} else return false;
	});
}

const GamePageContainer = () => {

	const params = useParams(); // использование параметров строки запроса
	const gameIdParam = params.gameId; // идентификатор игры

	const login = useSelector(selectLogin);
	const gameId = useSelector(selectGameId);
	const gameData = useSelector(selectGameData);
	const isGameDataLoading = useSelector(selectIsGameDataLoading);
	const gameDataError = useSelector(selectGameDataError);
	const gameField = useSelector(selectGameField);
	const isGameFieldLoading = useSelector(selectIsGameFieldLoading);
	const gameFieldError = useSelector(selectGameFieldError);
	const selectedCheckerPosition = useSelector(selectSelectedCheckerPosition);
	const availableFields = useSelector(selectAvailableFields);

	const dispatch = useDispatch();

	useEffect(() => {
		// если идентификатор игры из пути не совпадает с тем что в редаксе, то надо его сохранить и получить данные об игровом поле, т.к. это означает, что пользователь только зашёл на страничку
		if (gameIdParam !== gameId) {
			dispatch(setGameId(gameIdParam));
			dispatch(tryGetGameDataAsync({gameId: gameIdParam, userLogin: login}));
		}
		// если игровые данные загружены, а данных по полю нет, то их надо подгрузить
		if (!gameField && !isGameFieldLoading && !isGameDataLoading) {
			dispatch(tryGetCheckersFieldAsync(gameIdParam));
		}
	});

	if (!Number(gameIdParam) || Number(gameIdParam) < 0) { // если не удается превратить строку в число, то значит переданный параметр (gameId) задан неправильно
		return <PageNotFound title="Невалидный url игры" message="Введите корректный url или выберите игру из списка в профиле"/>
	}

	// если данных ещё нет, то показать загрузку (иначе проблема с чтением параметров)
	if (!gameData || isGameDataLoading) {
		return <LoaderFullSpace/>
	}

	if (gameData.status === GAME_STATUS_FINISHED) { // если игра завершена, то отрендерить победную страничку
		return <PlayedGamePage winnerLogin={"login"} loserLogin={"user"}/>;
	}

	// обработчик нажатий на выбор шашки
	const onSelectChecker = (position) => {
		dispatch(setSelectedCheckerPosition(position)); // добавление выбранной шашки в редакс
		dispatch(tryGetAvailableFieldsForCheckerAsync({gameId, position})); // добавление возможных для шашки ходов в редакс
	};

	// функция для совершения хода шашкой
	const createCheckerStep = (position) => {
		dispatch(tryCreateCheckerStepAsync({gameId, from: selectedCheckerPosition, to: position}));
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
	};

	return (
		<GamePage {...gamePageProps} checkersFieldProps={checkersFieldProps}/>
	);
}

export default withAuthRedirect(GamePageContainer);