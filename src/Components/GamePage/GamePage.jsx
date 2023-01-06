import React from "react";
import CheckersField from "./CheckersField/CheckersField";
import PageWithDefaultMenuSidebar from "../PageWithSideMenu/PageWithStandartMenu";
import {useDispatch, useSelector} from "react-redux";
import {CHECKER_COLOR_BLACK, CHECKER_TYPE_CHECKER, selectAvailableFields, selectGameField, selectPlayerColor, selectSelectedCheckerPosition, setAvailableFields, setSelectedCheckerPosition} from "../../Redux/GameReducer";

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
		// searchRight - булево значение, которое определяет направление поиска - право или лево
		// возвращаемые значения: [hasToEat, position]
		// hasToEat - показывает обязана ли шашка есть в этом направлении
		// position - позиция (в шашечной нотации) с координатой хода
		const findAvailableCellsForChecker = (searchRight) => {
			const m = searchRight ? 1 : -1; // multiplier - множитель, который отвечает за право или лево

			// поиск соседа на клетке выше
			const neighbourPosition = letters[letterIndex + (1 * m)] + numbers[numberIndex - 1];
			const neighbour = findChecker(gameField, neighbourPosition); // получение объекта шашки на позиции
			if (neighbour) {
				// если сосед есть, то проверить - можно ли его съесть
				if (neighbour.color !== playerColor) { // своего есть нельзя
					// проверка свободно ли место за соседней шашкой (можно ли съесть врага)
					if (!findChecker(gameField, letters[letterIndex + (2 * m)] + numbers[numberIndex - 2])) {
						return [true, letters[letterIndex + (2 * m)] + numbers[numberIndex - 2]];
					}
				}
			} else { // если соседа нет, то можно ходить
				return [false, letters[letterIndex + (1 * m)] + numbers[numberIndex - 1]];
			}
			return [false, null];
		};

		// функция поиска ходов для дамки в одном направлении
		// searchTop - булево значение, которое определяет направление поиска - вверх или вниз
		// searchRight - булево значение, которое определяет направление поиска - право или лево
		// возвращаемые значения: [hasToEat, cells]
		// hasToEat - показывает обязана ли дамка есть в этом направлении
		// cells - массив с доступными клетками для хода
		const findAvailableCellsForQueen = (searchTop, searchRight) => {
			let cells = []; // массив в который будут добавлены возможные ходы
			let hasToEat = false; // необходимость есть

			// начальные условия (задание индексов)
			let letInd = searchRight ? (letterIndex + 1) : (letterIndex - 1); // индекс отвечает за буквы
			let numbInd = searchTop ? (numberIndex - 1) : (numberIndex + 1); // индекс отвечает за цифры

			// условие остановки для букв, в зависимости от направления поиска (право/лево)
			const letterCondition = (letInd) => {
				if (searchRight)
					return letInd < letters.length;
				else return letInd >= 0;
			}

			// условие остановки для чисел, в зависимости от направления поиска (верх/низ)
			const numberCondition = (numbInd) => {
				if (searchTop)
					return numbInd >= 0;
				else return numbInd < numbers.length;
			}

			for (letInd; letterCondition(letInd) && numberCondition(numbInd); letInd = searchRight ? (letInd + 1) : (letInd - 1)) {
				// поиск соседа на клетке
				const neighbourPosition = letters[letInd] + numbers[numbInd];
				const neighbour = findChecker(gameField, neighbourPosition); // получение объекта шашки на позиции
				if (neighbour) { // если сосед есть
					if (neighbour.color === playerColor) { // за своего ходить нельзя, поэтому цикл обрывается
						break;
					} else { // если это шашка соперника, то попробовать её съесть
						// вычисление координат следующей клетки
						const afterNeighbourLetter = searchRight ? (letInd + 1) : (letInd - 1);
						const afterNeighbourNumber = searchTop ? (numbInd - 1) : (numbInd + 1);
						// проверка свободно ли место за соседней шашкой (можно ли съесть врага)
						// при этом также проверяется является ли это первым врагом
						if (!hasToEat && !findChecker(gameField, letters[afterNeighbourLetter] + numbers[afterNeighbourNumber])) {
							cells = []; // если есть враг, которого можно съесть, то дамка обязана это сделать, поэтому предыдущие клетки перестают быть доступными для хода
							hasToEat = true;
						} else break;
					}
				} else
					cells.push(letters[letInd] + numbers[numbInd]); // если соседей нет, то добавить клетку в список свободных для хода

				if (searchTop) // правила изменения индекса для обхода по числам
					numbInd--;
				else numbInd++;
			}

			return [hasToEat, cells];
		}

		// добавление доступных для хода клеток
		if (checker.type === CHECKER_TYPE_CHECKER) { // если выбрана шашка
			let hasToEat1, hasToEat2, pos1, pos2;
			if (letterIndex + 1 <= letters.length) { // проверка существует ли колонка правее
				[hasToEat1, pos1] = findAvailableCellsForChecker(true);
			}
			if (letterIndex - 1 >= 0) { // проверка существует ли колонка левее
				[hasToEat2, pos2] = findAvailableCellsForChecker(false);
			}
			if (!(hasToEat1 || hasToEat2)) { // если у шашки нет обязанности есть, то добавляются возможные для хода клетки
				if (pos1) availableFields.push(pos1);
				if (pos2) availableFields.push(pos2);
			} else { // если шашка обязанна есть, то добавляются ходы, где она обязана есть
				if (hasToEat1) availableFields.push(pos1);
				if (hasToEat2) availableFields.push(pos2);
			}
		} else { // если выбрана дамка
			// собираются данные по всем направлениям
			let hasToEat = [];
			let cells = [];
			[hasToEat[1], cells[1]] = findAvailableCellsForQueen(true, true);
			[hasToEat[2], cells[2]] = findAvailableCellsForQueen(true, false);
			[hasToEat[3], cells[3]] = findAvailableCellsForQueen(false, true);
			[hasToEat[4], cells[4]] = findAvailableCellsForQueen(false, false);

			if (!(hasToEat[1] || hasToEat[2] || hasToEat[3] || hasToEat[4])) { // если у дамки нет обязанности есть шашку
				cells.forEach(arr => availableFields.push(...arr)); // тогда добавляем все возможные ходы в массив
			} else {
				// иначе добавляются только те направления, в которых дамка обязана есть
				for (let i = 0; i < hasToEat.length; i++) {
					if (hasToEat[i])
						availableFields.push(...cells[i])
				}
			}
		}

		dispatch(setSelectedCheckerPosition(position)); // добавление выбранной шашки в редакс
		dispatch(setAvailableFields(availableFields)); // добавление возможных для шашки ходов в редакс
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