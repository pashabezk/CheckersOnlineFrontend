import React from "react";
import PageWithDefaultMenuSidebar from "../PageWithSideMenu/PageWithStandartMenu";
import withAuthRedirect from "../HOC/withAuthRedirect";



const MessagesPage = () => {
	return (
		<PageWithDefaultMenuSidebar>
			<h1>Message page</h1>
		</PageWithDefaultMenuSidebar>
	);
}

export default withAuthRedirect(MessagesPage);