import React from "react";
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
import {selectLogin} from "../../Redux/AuthReducer";

const ProfilePageContainer = () => {

	const login = useSelector(selectLogin);
	const games = useSelector(selectGames);
	const isGamesListLoading = useSelector(selectIsGamesListLoading);
	const isCreateGameLoading = useSelector(selectIsCreateGameLoading);
	const createdGameId = useSelector(selectCreatedGameId);
	const isCreateGameModalOpen = useSelector(selectIsCreateGameModalOpen);
	const isConnectGameModalOpen = useSelector(selectIsConnectGameModalOpen);
	const isConnectGameLoading = useSelector(selectIsConnectGameLoading);
	const connectedGameId = useSelector(selectConnectedGameId);
	const connectGameError = useSelector(selectConnectGameError);
	const dispatch = useDispatch();

	if (games === null) {
		dispatch(tryGetGamesListAsync());
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
	};

	const onConnectToGameModalFormSubmit = (gameId) => {
		dispatch(tryConnectToGameAsync(gameId));
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