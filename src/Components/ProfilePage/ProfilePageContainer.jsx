import React, {useEffect} from "react";
import withAuthRedirect from "../HOC/withAuthRedirect";
import ProfilePage from "./ProfilePage";
import {useDispatch, useSelector} from "react-redux";
import {
	selectConnectedGameId,
	selectConnectGameError,
	selectCreatedGameId,
	selectGames,
	selectIsConnectGameLoading,
	selectIsConnectGameModalOpen,
	selectIsCreateGameLoading,
	selectIsCreateGameModalOpen,
	selectIsGamesListLoading,
	setIsConnectGameModalOpen,
	setIsCreateGameModalOpen,
	tryConnectToGameAsync,
	tryCreateNewGameAsync,
	tryGetGamesListAsync
} from "../../Redux/ProfileReducer";
import {selectLogin, selectUserId} from "../../Redux/AuthReducer";
import {reinterpretGameData} from "../../Utils/Checkers";

const ProfilePageContainer = () => {

	const login = useSelector(selectLogin);
	const userId = useSelector(selectUserId);
	let games = useSelector(selectGames);
	const isGamesListLoading = useSelector(selectIsGamesListLoading);
	const isCreateGameLoading = useSelector(selectIsCreateGameLoading);
	const createdGameId = useSelector(selectCreatedGameId);
	const isCreateGameModalOpen = useSelector(selectIsCreateGameModalOpen);
	const isConnectGameModalOpen = useSelector(selectIsConnectGameModalOpen);
	const isConnectGameLoading = useSelector(selectIsConnectGameLoading);
	const connectedGameId = useSelector(selectConnectedGameId);
	const connectGameError = useSelector(selectConnectGameError);
	const dispatch = useDispatch();

	useEffect(() => {
		if (games === null && !isGamesListLoading) {
			dispatch(tryGetGamesListAsync());
		}
	});

	if (games) {
		games = games.map(game => reinterpretGameData(game, userId));
	}

	// нажатие по кнопке "Создать" для создания новой игры
	const onCreateNewGameButtonClick = () => {
		dispatch(tryCreateNewGameAsync());
	};

	// нажатие на ок для закрытия модульного окна с сообщением о созданной игре
	const onCreateNewGameModalClose = () => {
		dispatch(setIsCreateGameModalOpen(false));
		dispatch(tryGetGamesListAsync());
	};

	// установка значения открытия модульного окна "Присоединиться к игре"
	const setConnectToGameModalOpened = (open) => {
		dispatch(setIsConnectGameModalOpen(open));
		if (!open) { // если окно закрыто, значит надо обновить список игр
			dispatch(tryGetGamesListAsync());
		}
	};

	// нажатие Ок в модульном окне подключения к игре
	const onConnectToGameModalFormSubmit = (gameId) => {
		dispatch(tryConnectToGameAsync({gameId, userId}));
	}

	// упаковка props для более удобной передачи между компонентами
	const gamesBlockProps = {
		games,
		isGamesListLoading,
		isCreateGameLoading,
		onCreateNewGameButtonClick,
		setConnectToGameModalOpened,
		createGameModalProps: {
			createdGameId,
			onCreateNewGameModalClose,
			isCreateGameModalOpen
		},
		connectToGameModalProps: {
			isConnectGameModalOpen,
			isConnectGameLoading,
			connectedGameId,
			connectGameError,
			setConnectToGameModalOpened,
			onConnectToGameModalFormSubmit
		}
	};

	return (
		<ProfilePage login={login} gamesBlockProps={gamesBlockProps}/>
	);
}

export default withAuthRedirect(ProfilePageContainer);