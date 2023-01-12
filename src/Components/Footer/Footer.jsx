import React from "react";
import styles from "./Footer.module.css"
import {Tooltip} from "antd";

const AppFooter = () => {
	return (
		<div className={styles.mainFooterCentered}>
			<div className={styles.mainFooter}>
				<div>Created by</div>
				<div>
					<Tooltip title="back-end">
						<a href="https://github.com/Ferrociraptus" target="_blank" rel="noreferrer">Ferrociraptus </a>
					</Tooltip>×
					<Tooltip title="front-end">
						<a href="https://pashabezk.github.io/MainPage" target="_blank" rel="noreferrer"> pashabezk</a>
					</Tooltip>
				</div>
			</div>
		</div>
	);
}

export default AppFooter;