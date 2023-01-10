import React from "react";
import {Spin} from "antd";
import styles from "./LoaderFullSpace.module.css"

// блок загрузки, занимающий сто процентов пространства
const LoaderFullSpace = ({message="Загрузка", size="large"}) => {
	return (
		<div className={styles.loadingContainer}>
			<Spin tip={message} size={size} className={styles.loader}/>
		</div>
	);
}

export default LoaderFullSpace;