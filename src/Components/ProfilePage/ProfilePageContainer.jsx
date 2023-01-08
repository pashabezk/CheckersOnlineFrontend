import React from "react";
import withAuthRedirect from "../HOC/withAuthRedirect";
import ProfilePage from "./ProfilePage";
import {useDispatch, useSelector} from "react-redux";
import {selectGames, selectIsGamesListLoading, tryGetGamesListAsync} from "../../Redux/ProfileReducer";

const ProfilePageContainer = () => {

	const games = useSelector(selectGames);
	const isGamesListLoading = useSelector(selectIsGamesListLoading);
	const dispatch = useDispatch();

	if(games===null) {
		dispatch(tryGetGamesListAsync());
	}

	return (
		<ProfilePage
			games={games}
			isGamesListLoading={isGamesListLoading}
		/>
	);
}

export default withAuthRedirect(ProfilePageContainer);