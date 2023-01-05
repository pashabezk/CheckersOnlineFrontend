import React from "react";
import CheckersField from "./CheckersField/CheckersField";
import PageWithDefaultMenuSidebar from "../PageWithSideMenu/PageWithStandartMenu";
import {useDispatch, useSelector} from "react-redux";
import {selectGameField, selectPlayerColor, selectSelectedCheckerPosition, setSelectedCheckerPosition} from "../../Redux/GameReducer";

const GamePage = () => {

	const gameField = useSelector(selectGameField);
	const playerColor = useSelector(selectPlayerColor);
	const selectedCheckerPosition = useSelector(selectSelectedCheckerPosition);

	const dispatch = useDispatch();

	const onSelectChecker = (position) => {
		dispatch(setSelectedCheckerPosition(position));
	}

	return (
		<PageWithDefaultMenuSidebar>
			<CheckersField
				gameField={gameField}
				playerColor={playerColor}
				selectedCheckerPosition={selectedCheckerPosition}
				onSelectChecker={onSelectChecker}
			/>
		</PageWithDefaultMenuSidebar>
	);
}

export default GamePage;