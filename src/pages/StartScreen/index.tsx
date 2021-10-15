import { useHistory } from "react-router-dom";
import { CommonPage } from "../../components/CommonPage";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { ReactComponent as SettingsIcon } from "../../icons/settings.svg";
import { ReactComponent as LogoIcon } from "../../icons/logo.svg";
import styles from "./StartScreen.module.css";

export const StartScreen: React.FC = () => {
	const history = useHistory();

	const openSettings = () => {
		history.push("/settings");
	};

	return (
		<CommonPage>
			<Header title={"School CI server"}>
				<Button
					onClick={openSettings}
					variant={"secondary"}
					size={"small"}
					withIcon
				>
					<SettingsIcon />
					Settings
				</Button>
			</Header>
			<main className={styles.content}>
				<LogoIcon />
				<p className={styles.text}>
					Configure repository connection
					<br />
					and synchronization settings
				</p>
				<Button onClick={openSettings}>Open settings</Button>
			</main>
		</CommonPage>
	);
};
