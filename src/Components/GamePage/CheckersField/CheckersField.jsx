import React from "react";
import styles from "./CheckersField.module.css"
import blackKing from "../../../Assets/Img/Chekers/BlackKing.svg";
import whiteKing from "../../../Assets/Img/Chekers/WhiteKing.svg";
import blackChecker from "../../../Assets/Img/Chekers/Black.svg";
import whiteChecker from "../../../Assets/Img/Chekers/White.svg";
import {CHECKER_COLOR_BLACK, CHECKER_TYPE_CHECKER} from "../../../Redux/GameReducer";

const Checker = ({type, color, selected, onSelectChecker, position, playerColor}) => {
	const checkerOnClick = () => {
		onSelectChecker(position);
	};

	return (
		<img
			className={styles.checker + (selected ? (" " + styles.checkerSelected) : "") + (playerColor === color ? (" " + styles.checkerPlayer) : "")}
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

const Cell = ({isBlack, checker, selected, onSelectChecker, position, playerColor}) => {
	return (
		<div className={(isBlack ? styles.blackCell : styles.whiteCell)}>
			{
				checker
					? <Checker type={checker.type} color={checker.color} selected={selected} onSelectChecker={onSelectChecker} position={position} playerColor={playerColor}/>
					: <div></div>
			}
		</div>
	);
}

const Row = ({rowNumber, gameField, selectedCheckerPosition, onSelectChecker, playerColor}) => {
	const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
	let isBlack = rowNumber % 2 !== 1; // вычисление цвета первой клетки ряда
	const cells = letters.map(letter => {
		isBlack = !isBlack;
		const position = letter + rowNumber; // позиция в шашечной нотации, например: a1 или g5
		let selected = false;
		const checker = gameField.find(elem => {
			if (elem.position === position) {
				if (position === selectedCheckerPosition)
					selected = true;
				return elem;
			} else return false;
		});

		return <Cell key={position} isBlack={isBlack} checker={checker} selected={selected} onSelectChecker={onSelectChecker} position={position} playerColor={playerColor}/>
	});

	return (
		<div className={styles.checkersFieldRow}>
			{cells}
		</div>
	);
}

const CheckersField = ({gameField, playerColor, selectedCheckerPosition, onSelectChecker}) => {

	let numbers = [8, 7, 6, 5, 4, 3, 2, 1];
	const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

	if (playerColor === CHECKER_COLOR_BLACK)
		numbers = numbers.reverse()

	const rows = numbers.map(number => <Row key={number} rowNumber={number} gameField={gameField} selectedCheckerPosition={selectedCheckerPosition} onSelectChecker={onSelectChecker} playerColor={playerColor}/>)

	const numbersSide = numbers.map(number => {
		return <div key={number + " " + number}>{number}</div>
	});

	const lettersSide = letters.map(letter => {
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