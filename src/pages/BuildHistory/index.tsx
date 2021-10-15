import cn from "classnames/bind";
import { useHistory } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
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
import styles from "./BuildHistory.module.css";

const cx = cn.bind(styles);

interface Props {
	repoSettings: RepoSettings;
}

export const BuildHistory: React.FC<Props> = ({ repoSettings }) => {
	const history = useHistory();
	const [showModal, setShowModal] = useState(false);
	const [commitHash, setCommitHash] = useState('');

	const [data, setData] = useState<BuildInfo[]>([]);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	const loadMore = useCallback(() => {
		setLoading(true);
		setTimeout(() => {
			let newData: BuildInfo[] = [];
			setData((data) => {
				newData = [
					...data,
					...buildHistory.slice(data.length, data.length + 4),
				];
				return [...newData];
			});
			setLoading(false);
			setHasMore(newData.length < buildHistory.length);
		}, Math.random() * 3000);
	}, []);

	useEffect(() => loadMore(), [loadMore]);

	useEffect(() => {
		if (!showModal) {
			setCommitHash('')
		}
	}, [showModal])

	const onRunBuild = (e: React.FormEvent) => {
		e.preventDefault();
		buildHistory.unshift({
			...buildHistory[0],
			id: buildHistory[0].id + 1,
			commit: commitHash.slice(0, 8),
			status: 'pending',
			title: commitHash,
			startDate: new Date(),
			author: 'Cool Reviewer'
		});
		setData(buildHistory.slice(0, data.length + 1));
		setShowModal(false);
	}

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
						onChange={e => setCommitHash(e.target.value)}
						placeholder={"Commit hash"}
						clearable
						name="commitHash"
					/>
					<div className={cx("modalButtons")}>
						<Button type="submit">Run build</Button>
						<Button type="button" variant="outline" onClick={() => setShowModal(false)}>
							Cancel
						</Button>
					</div>
				</form>
			</Modal>
		</CommonPage>
	);
};
