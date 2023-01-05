import React from "react";
import PageWithDefaultMenuSidebar from "../PageWithSideMenu/PageWithStandartMenu";
import withAuthRedirect from "../HOC/withAuthRedirect";

const Comp = (props) => {
	return (
		<p>{props.number}</p>
	);
}


const UserPage = () => {
	return (
		<PageWithDefaultMenuSidebar>
			<h1>Profile page</h1>
			<Comp number={1}/>
			<Comp number={2}/>
			<Comp number={3}/>
			<Comp number={3}/>
			<Comp number={4}/>
			<Comp number={1}/>
			<Comp number={2}/>
			<Comp number={3}/>
			<Comp number={3}/>
			<Comp number={4}/>
			<Comp number={1}/>
			<Comp number={2}/>
			<Comp number={3}/>
			<Comp number={3}/>
			<Comp number={4}/>
			<Comp number={1}/>
			<Comp number={2}/>
			<Comp number={3}/>
			<Comp number={3}/>
			<Comp number={4}/>
			<Comp number={1}/>
			<Comp number={2}/>
			<Comp number={3}/>
		</PageWithDefaultMenuSidebar>
	);
}

export default withAuthRedirect(UserPage);