import './App.css';
import React from "react";
import {Layout} from "antd";
import {Content, Footer} from "antd/es/layout/layout";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import AppFooter from "./Components/Footer/Footer";
import AppHeader from "./Components/Header/Header";
import LoaderFullSpace from "./Components/Common/LoaderFullSpace/LoaderFullSpace";

const Login = React.lazy(() => import ("./Components/Login/Login"));
const GamePageContainer = React.lazy(() => import ("./Components/GamePage/GamePageContainer"));
const ProfilePageContainer = React.lazy(() => import ("./Components/ProfilePage/ProfilePageContainer"));
const PageNotFound = React.lazy(() => import ("./Components/PageNotFound/PageNotFound"));
const Registration = React.lazy(() => import ("./Components/Registration/Registration"));

function App() {
	return (
		// HashRouter only for GitHub pages
		// <BrowserRouter basename={process.env.PUBLIC_URL}> // use instead HashRouter in real project
		<HashRouter>
			<Layout className="main-wrapper">
				<AppHeader/>
				<Content>
					<React.Suspense fallback={<LoaderFullSpace/>}>
						<Routes>
							<Route path="/" element={<Navigate to="/profile"/>}/>
							<Route path="/profile" element={<ProfilePageContainer/>}/>
							<Route path="/game" element={<GamePageContainer/>}>
								<Route path=":gameId" element={<GamePageContainer/>}/>
							</Route>
							<Route path="/login" element={<Login/>}/>
							<Route path="/registration" element={<Registration/>}/>
							<Route path="*" element={<PageNotFound/>}/>
						</Routes>
					</React.Suspense>
				</Content>
				<Footer>
					<div className="center1000px">
						<AppFooter/>
					</div>
				</Footer>
			</Layout>
		</HashRouter>
	);
}

export default App;
