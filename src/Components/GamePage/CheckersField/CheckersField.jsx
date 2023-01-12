import React from "react";
import styles from "./CheckersField.module.css"
import blackQueen from "../../../Assets/Img/Chekers/BlackQueen.svg";
import whiteQueen from "../../../Assets/Img/Chekers/WhiteQueen.svg";
import blackChecker from "../../../Assets/Img/Chekers/Black.svg";
import whiteChecker from "../../../Assets/Img/Chekers/White.svg";
import {CHECKER_COLOR_BLACK, CHECKER_COLOR_SHORTLY_BLACK, CHECKER_TYPE_SHORTLY_CHECKER, convertFullParamsToShortly, GAME_STATUS_YOUR_TURN} from "../../../Strings";
import {letters} from "../GamePageContainer";
import LoaderFullSpace from "../../Common/LoaderFullSpace/LoaderFullSpace";
import Title from "antd/lib/typography/Title";

const Checker = ({type, color, selected, onSelectChecker, position, playerColor, gameStatus}) => {
	const checkerOnClick = () => {
		onSelectChecker(position);
	};

	return (
		<img
			className={styles.checker + (selected ? (" " + styles.checkerSelected) : (convertFullParamsToShortly(playerColor) === color ? (" " + styles.checkerPlayer) : ""))}
			src={
				color === CHECKER_COLOR_SHORTLY_BLACK
					? (type === CHECKER_TYPE_SHORTLY_CHECKER ? blackChecker : blackQueen)
					: (type === CHECKER_TYPE_SHORTLY_CHECKER ? whiteChecker : whiteQueen)
			}
			alt="checker"
			// нажатие по шашке должно происходить только в случае если это собственная шашка и если сейчас ходит игрок
			onClick={(convertFullParamsToShortly(playerColor) === color && gameStatus === GAME_STATUS_YOUR_TURN) ? checkerOnClick : undefined}
		/>
	);
}

const Cell = ({isBlack, checker, selected, onSelectChecker, position, playerColor, isAvailable, gameStatus, createCheckerStep}) => {
	return (
		<div
			className={(isBlack ? styles.blackCell : styles.whiteCell) + (isAvailable ? (" " + styles.availableCell) : "")}
			onClick={isAvailable ? () => {
				createCheckerStep(position)
			} : undefined} // если клетка доступна для хода, то надо навесить на неё обработчик нажатий
		>
			{
				checker
					? <Checker type={checker.type} color={checker.color} selected={selected} onSelectChecker={onSelectChecker} position={position} playerColor={playerColor} gameStatus={gameStatus}/>
					: <div></div>
			}
		</div>
	);
}

const Row = ({rowNumber, gameField, selectedCheckerPosition, onSelectChecker, playerColor, availableFields, gameStatus, createCheckerStep}) => {
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
			gameStatus={gameStatus}
			createCheckerStep={createCheckerStep}
		/>
	});

	return (
		<div className={styles.checkersFieldRow}>
			{cells}
		</div>
	);
}

const CheckersField = ({gameStatus, gameField, isGameFieldLoading, gameFieldError, playerColor, selectedCheckerPosition, onSelectChecker, availableFields, createCheckerStep}) => {

	if (isGameFieldLoading)
		return <LoaderFullSpace message="Загрузка шашек"/>

	if (gameFieldError) {
		return <div>
			<Title>Возникла ошибка</Title>
			<p>{gameFieldError}</p>
		</div>
	}

	let numbers = [8, 7, 6, 5, 4, 3, 2, 1]; // ряд чисел для составления доски

	if (playerColor === CHECKER_COLOR_BLACK) // если игрок играет за черные шашки, то поле надо перевернуть
		numbers = numbers.reverse()

	let rows = [];
	if (Array.isArray(gameField)) {
		rows = numbers.map(number => // формирование строк в которые будут помещены клетки с игрой
			<Row key={number}
				 rowNumber={number}
				 gameField={gameField}
				 selectedCheckerPosition={selectedCheckerPosition}
				 onSelectChecker={onSelectChecker}
				 playerColor={playerColor}
				 availableFields={availableFields}
				 gameStatus={gameStatus}
				 createCheckerStep={createCheckerStep}
			/>
		);
	}

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