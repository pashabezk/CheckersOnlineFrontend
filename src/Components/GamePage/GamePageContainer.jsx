import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {CHECKER_COLOR_BLACK, CHECKER_TYPE_CHECKER, selectAvailableFields, selectGameField, selectPlayerColor, selectSelectedCheckerPosition, setAvailableFields, setSelectedCheckerPosition} from "../../Redux/GameReducer";
import GamePage from "./GamePage";

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

		// TODO нет проверки на конец поля впереди (возможно, что с боков тоже)
		// TODO ошибка с дамкой, которая может съесть, но при этом конец поля

		// функция поиска ходов для шашек
		// searchRight - булево значение, которое определяет направление поиска - право или лево
		// searchBack - булево значение, которое определяет направление поиска - вперед или назад (по умолчанию вперед)
		// возвращаемые значения: [hasToEat, position]
		// hasToEat - показывает обязана ли шашка есть в этом направлении
		// position - позиция (в шашечной нотации) с координатой хода
		const findAvailableCellsForChecker = (searchRight, searchBack = false) => {
			const m = searchRight ? 1 : -1; // multiplier - множитель, который отвечает за право или лево

			// поиск соседа на клетке рядом
			const neighbourNumbPos = numbers[searchBack ? (numberIndex + 1) : (numberIndex - 1)]; //
			if (!neighbourNumbPos) // если клетка вылетает за пределы массива (undefined), то дальше проверять нет смысла
				return [false, null];
			const neighbourPosition = letters[letterIndex + (1 * m)] + neighbourNumbPos;
			const neighbour = findChecker(gameField, neighbourPosition); // получение объекта шашки на позиции
			if (neighbour) {
				// если сосед есть, то проверить - можно ли его съесть
				if (neighbour.color !== playerColor) { // своего есть нельзя
					// теперь необходимо проверить свободно ли место за соседней шашкой (можно ли съесть врага)
					const neighbourNumbPos = numbers[searchBack ? (numberIndex + 2) : (numberIndex - 2)]; //
					if (!neighbourNumbPos) // если клетка вылетает за пределы массива (undefined), то дальше проверять нет смысла
						return [false, null];
					const afterNeighbourPos = letters[letterIndex + (2 * m)] + neighbourNumbPos;
					if (!findChecker(gameField, afterNeighbourPos)) {
						return [true, afterNeighbourPos];
					}
				}
			} else { // если соседа нет, то можно ходить
				if (!searchBack) // простой ход можно совершать только вперед
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
						// при этом также проверяется: является ли это первым врагом
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
			let hasToEatArr = [];
			let positions = [];
			if (letterIndex + 1 <= letters.length) { // проверка существует ли колонка правее
				[hasToEatArr[0], positions[0]] = findAvailableCellsForChecker(true);
				[hasToEatArr[1], positions[1]] = findAvailableCellsForChecker(true, true);
			}
			if (letterIndex - 1 >= 0) { // проверка существует ли колонка левее
				[hasToEatArr[2], positions[2]] = findAvailableCellsForChecker(false);
				[hasToEatArr[3], positions[3]] = findAvailableCellsForChecker(false, true);
			}
			if (!(hasToEatArr[0] || hasToEatArr[1] || hasToEatArr[2] || hasToEatArr[3])) { // если у шашки нет обязанности есть, то добавляются возможные для хода клетки
				if (positions[0]) availableFields.push(positions[0]);
				if (positions[2]) availableFields.push(positions[2]);
			} else { // иначе добавляются только те направления, в которых шашка обязана есть
				for (let i = 0; i < hasToEatArr.length; i++) {
					if (hasToEatArr[i])
						availableFields.push(positions[i]);
				}
			}
		} else { // если выбрана дамка
			// собираются данные по всем направлениям
			let hasToEatArr = [];
			let cells = [];
			[hasToEatArr[0], cells[0]] = findAvailableCellsForQueen(true, true);
			[hasToEatArr[1], cells[1]] = findAvailableCellsForQueen(true, false);
			[hasToEatArr[2], cells[2]] = findAvailableCellsForQueen(false, true);
			[hasToEatArr[3], cells[3]] = findAvailableCellsForQueen(false, false);

			if (!(hasToEatArr[0] || hasToEatArr[1] || hasToEatArr[2] || hasToEatArr[3])) { // если у дамки нет обязанности есть шашку
				cells.forEach(arr => availableFields.push(...arr)); // тогда добавляем все возможные ходы в массив
			} else {
				// иначе добавляются только те направления, в которых дамка обязана есть
				for (let i = 0; i < hasToEatArr.length; i++) {
					if (hasToEatArr[i])
						availableFields.push(...cells[i]);
				}
			}
		}

		dispatch(setSelectedCheckerPosition(position)); // добавление выбранной шашки в редакс
		dispatch(setAvailableFields(availableFields)); // добавление возможных для шашки ходов в редакс
	}

	const checkersFieldProps = {
		gameField: gameField,
		playerColor: playerColor,
		selectedCheckerPosition: selectedCheckerPosition,
		onSelectChecker: onSelectChecker,
		availableFields: availableFields,
	}

	return (
		<GamePage checkersFieldProps={checkersFieldProps}/>
	);
}

export default GamePageContainer;