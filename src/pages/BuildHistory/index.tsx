import cn from "classnames/bind";
import { useHistory } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { BuildCardInfo } from "../../components/BuildCardInfo";

import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { CommonPage } from "../../components/CommonPage";
import { ReactComponent as PlayIcon } from "../../icons/play.svg";
import { ReactComponent as SettingsIcon } from "../../icons/settings.svg";

import { buildHistory } from "../../data/buildHistory";
import { RepoSettings } from "../../types/RepoSettings";
import { Modal } from "../../components/Modal";
import { Input } from "../../components/Input";
import { BuildInfo } from "../../types/BuildInfo";
import * as buildListActions from "../../reducers/buildsListReducer/buildsListActions";
import { RootState } from "../../store";
import { BuildsListState } from "../../reducers/buildsListReducer";
import styles from "./BuildHistory.module.css";

const cx = cn.bind(styles);

interface Props {
	repoSettings: RepoSettings;
}

export const BuildHistory: React.FC<Props> = ({ repoSettings }) => {
	const history = useHistory();
	const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
	const { data, loading, hasMore } = useSelector<RootState, BuildsListState>(
		(state) => state.buildsList
	);

	const [showModal, setShowModal] = useState(false);
	const [commitHash, setCommitHash] = useState("");

	const loadMore = useCallback(() => {
		const fromId = data.length ? data[data.length - 1].id : undefined;
		dispatch(buildListActions.load(4, fromId));
	}, [data, dispatch]);

	useEffect(() => {
		loadMore();
		return () => {
			dispatch(buildListActions.clear());
		};
	}, []); // eslint-disable-line

	useEffect(() => {
		if (!showModal) {
			setCommitHash("");
		}
	}, [showModal]);

	const onRunBuild = (e: React.FormEvent) => {
		e.preventDefault();
		const item: BuildInfo = {
			...buildHistory[0],
			id: buildHistory[0].id + 1,
			commit: commitHash.slice(0, 8),
			status: "pending",
			title: commitHash,
			startDate: new Date(),
			author: "Cool Reviewer",
		};
		dispatch(buildListActions.add(item));
		setShowModal(false);
	};

	return (
		<CommonPage>
			<header className={cx("header")}>
				<h1 className={cx("title")}>{repoSettings.repositoryName}</h1>
				<div className={cx("buttonWrapper")}>
					<Button
						size="small"
						variant="secondary"
						withIcon
						onClick={() => setShowModal(true)}
					>
						<PlayIcon />
						Run build
					</Button>
					<Button
						size="small"
						variant="secondary"
						withIcon
						onClick={() => history.push("/settings")}
					>
						<SettingsIcon />
					</Button>
				</div>
			</header>
			<ul className={cx("cardsList")}>
				{data.map((item) => (
					<li key={item.id} className={cx("cardListItem")}>
						<Card>
							<BuildCardInfo buildInfo={item} />
						</Card>
					</li>
				))}
			</ul>
			{hasMore && (
				<div>
					<Button
						variant="secondary"
						className={cx("showMoreButton")}
						disabled={loading}
						onClick={loadMore}
					>
						{loading ? "Loading..." : "Show more"}
					</Button>
				</div>
			)}

			<Modal isOpen={showModal} closeModal={() => setShowModal(false)}>
				<form onSubmit={onRunBuild} className={cx("modalBody")}>
					<h1 className={cx("modalTitle")}>New build</h1>
					<p className={cx("modalText")}>
						Enter the commit hash which you want to build.
					</p>
					<Input
						autoFocus
						required
						value={commitHash}
						onChange={(e) => setCommitHash(e.target.value)}
						placeholder={"Commit hash"}
						clearable
						name="commitHash"
					/>
					<div className={cx("modalButtons")}>
						<Button type="submit">Run build</Button>
						<Button
							type="button"
							variant="outline"
							onClick={() => setShowModal(false)}
						>
							Cancel
						</Button>
					</div>
				</form>
			</Modal>
		</CommonPage>
	);
};
