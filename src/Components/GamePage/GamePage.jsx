import React from "react";
import CheckersField from "./CheckersField/CheckersField";
import PageWithDefaultMenuSidebar from "../PageWithSideMenu/PageWithStandartMenu";
import {useDispatch, useSelector} from "react-redux";
import {CHECKER_COLOR_BLACK, CHECKER_TYPE_CHECKER, CHECKER_TYPE_QUEEN, selectAvailableFields, selectGameField, selectPlayerColor, selectSelectedCheckerPosition, setAvailableFields, setSelectedCheckerPosition} from "../../Redux/GameReducer";

export const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

// получение объекта шашки на позиции
export const findChecker = (gameField, position) => {
	return gameField.find(elem => {
		if (elem.position === position) {
			return elem;
		} else return false;
	});
}

const GamePage = () => {

	const gameField = useSelector(selectGameField);
	const playerColor = useSelector(selectPlayerColor);
	const selectedCheckerPosition = useSelector(selectSelectedCheckerPosition);
	const availableFields = useSelector(selectAvailableFields);

	const dispatch = useDispatch();

	const onSelectChecker = (position) => {

		let numbers = [8, 7, 6, 5, 4, 3, 2, 1];
		if (playerColor === CHECKER_COLOR_BLACK)
			numbers = numbers.reverse()

		let availableFields = []; // поля, куда можно походить выбранной шашкой

		// координаты выбранной шашки
		const letter = position[0];
		const number = position[1];

		// индексы элементов координат в массиве
		const letterIndex = letters.findIndex(elem => elem === letter);
		const numberIndex = numbers.findIndex(elem => elem === Number(number));

		const checker = findChecker(gameField, position); // получение объекта шашки на позиции

		// функция поиска ходов для шашек
		// isRight - булево значение, которое определяет направление поиска - право или лево
		const addAvailableCellsForChecker = (isRight) => {
			const m = isRight ? 1 : -1; // multiplier - множитель, который отвечает за право или лево

			// поиск соседа на клетке выше
			const neighbourPosition = letters[letterIndex + (1 * m)] + numbers[numberIndex - 1];
			const neighbour = findChecker(gameField, neighbourPosition); // получение объекта шашки на позиции
			if (neighbour) {
				// если сосед есть, то проверить - можно ли его съесть
				if (neighbour.color !== playerColor) { // своего есть нельзя
					// проверка свободно ли место за соседней шашкой (можно ли съесть врага)
					if (!findChecker(gameField, letters[letterIndex + (2 * m)] + numbers[numberIndex - 2]))
						availableFields.push(letters[letterIndex + (2 * m)] + numbers[numberIndex - 2]);
				}
			} else { // если соседа нет, то можно ходить
				availableFields.push(letters[letterIndex + (1 * m)] + numbers[numberIndex - 1]);
			}
		};

		// добавление доступных для хода клеток
		if (checker.type === CHECKER_TYPE_CHECKER || checker.type === CHECKER_TYPE_QUEEN) {
			if (letterIndex + 1 <= letters.length) { // проверка существует ли колонка правее
				addAvailableCellsForChecker(true);
			}
			if (letterIndex - 1 >= 0) { // проверка существует ли колонка левее
				addAvailableCellsForChecker(false);
			}
		}

		dispatch(setSelectedCheckerPosition(position));
		dispatch(setAvailableFields(availableFields));
	}

	return (
		<PageWithDefaultMenuSidebar>
			<CheckersField
				gameField={gameField}
				playerColor={playerColor}
				selectedCheckerPosition={selectedCheckerPosition}
				onSelectChecker={onSelectChecker}
				availableFields={availableFields}
			/>
		</PageWithDefaultMenuSidebar>
	);
}

export default GamePage;