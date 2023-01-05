import React from "react";
import styles from "./CheckersField.module.css"
import blackKing from "../../../Assets/Img/Chekers/BlackKing.svg";
import whiteKing from "../../../Assets/Img/Chekers/WhiteKing.svg";
import blackChecker from "../../../Assets/Img/Chekers/Black.svg";
import whiteChecker from "../../../Assets/Img/Chekers/White.svg";
import {CHECKER_COLOR_BLACK, CHECKER_TYPE_CHECKER} from "../../../Redux/GameReducer";
import {letters} from "../GamePage";

const Checker = ({type, color, selected, onSelectChecker, position, playerColor}) => {
	const checkerOnClick = () => {
		onSelectChecker(position);
	};

	return (
		<img
			className={styles.checker + (selected ? (" " + styles.checkerSelected) : (playerColor === color ? (" " + styles.checkerPlayer) : ""))}
			src={
				color === CHECKER_COLOR_BLACK
					? (type === CHECKER_TYPE_CHECKER ? blackChecker : blackKing)
					: (type === CHECKER_TYPE_CHECKER ? whiteChecker : whiteKing)
			}
			alt="checker"
			onClick={playerColor === color ? checkerOnClick : undefined}
		/>
	);
}

const Cell = ({isBlack, checker, selected, onSelectChecker, position, playerColor, isAvailable}) => {
	return (
		<div className={(isBlack ? styles.blackCell : styles.whiteCell) + (isAvailable ? (" " + styles.availableCell) : "")}>
			{
				checker
					? <Checker type={checker.type} color={checker.color} selected={selected} onSelectChecker={onSelectChecker} position={position} playerColor={playerColor}/>
					: <div></div>
			}
		</div>
	);
}

const Row = ({rowNumber, gameField, selectedCheckerPosition, onSelectChecker, playerColor, availableFields}) => {
	let isBlack = rowNumber % 2 !== 1; // вычисление цвета первой клетки ряда
	const cells = letters.map(letter => {
		isBlack = !isBlack;
		const position = letter + rowNumber; // позиция в шашечной нотации, например: a1 или g5
		let selected = false; // является ли шашка на позиции выбранной
		const checker = gameField.find(elem => { // поиск: есть ли шашка на этой позиции
			if (elem.position === position) {
				if (position === selectedCheckerPosition)
					selected = true;
				return elem;
			} else return false;
		});

		// является ли отрисовываемая клетка доступной к ходу
		const isAvailable = availableFields.find(elem => {
			return elem === position;
		});

		return <Cell
			key={position}
			isBlack={isBlack}
			checker={checker}
			selected={selected}
			onSelectChecker={onSelectChecker}
			position={position}
			playerColor={playerColor}
			isAvailable={isAvailable}
		/>
	});

	return (
		<div className={styles.checkersFieldRow}>
			{cells}
		</div>
	);
}

const CheckersField = ({gameField, playerColor, selectedCheckerPosition, onSelectChecker, availableFields}) => {

	let numbers = [8, 7, 6, 5, 4, 3, 2, 1]; // ряд чисел для составления доски

	if (playerColor === CHECKER_COLOR_BLACK) // если игрок играет за черные шашки, то поле надо перевернуть
		numbers = numbers.reverse()

	const rows = numbers.map(number => // формирование строк в которые будут помещены клетки с игрой
		<Row key={number}
			 rowNumber={number}
			 gameField={gameField}
			 selectedCheckerPosition={selectedCheckerPosition}
			 onSelectChecker={onSelectChecker}
			 playerColor={playerColor}
			 availableFields={availableFields}
		/>
	);

	const numbersSide = numbers.map(number => { // формирование блоков для нумерации доски
		return <div key={number + " " + number}>{number}</div>
	});

	const lettersSide = letters.map(letter => { // формирование блоков для нумерации доски с помощью букв
		return <div key={letter + letter}>{letter}</div>
	});

	return (
		<div className={styles.checkersField}>
			<div className={styles.lettersTop + " " + styles.letters}>{lettersSide}</div>
			<div className={styles.numbersLeft + " " + styles.numbers}>{numbersSide}</div>
			<div className={styles.cellsField}>
				{rows}
			</div>
			<div className={styles.numbersRight + " " + styles.numbers}>{numbersSide}</div>
			<div className={styles.lettersBottom + " " + styles.letters}>{lettersSide}</div>
		</div>
	);
}

export default CheckersField;