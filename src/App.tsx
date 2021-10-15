import React, { useCallback, useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import { Settings } from "./pages/Settings";
import { BuildHistory } from "./pages/BuildHistory";
import { StartScreen } from "./pages/StartScreen";
import { RepoSettings } from "./types/RepoSettings";

function App() {
	const [currentRepo, setCurrentRepo] = useState<RepoSettings>();

	const openRepo = useCallback(
		async (data: RepoSettings | null) =>
			new Promise<void>((resolve) => {
				if (!data) {
					resolve();
				} else {
					setTimeout(() => {
						setCurrentRepo(data);
						resolve();
					}, Math.random() * 5000);
				}
			}),
		[]
	);

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/">
						{currentRepo ? (
							<BuildHistory repoSettings={currentRepo} />
						) : (
							<StartScreen />
						)}
					</Route>
					<Route exact path="/settings">
						<Settings openRepo={openRepo} initialState={currentRepo} />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
