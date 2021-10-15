import cn from "classnames/bind";
import format from "date-fns/format";
import { ru } from "date-fns/locale";
import { BuildInfo } from "../../types/BuildInfo";
import styles from "./BuildCardInfo.module.css";

interface Props {
	buildInfo: BuildInfo;
}

const cx = cn.bind(styles);

export const BuildCardInfo: React.FC<Props> = ({ buildInfo }) => {
	return (
		<div className={cx("wrapper")}>
			<div className={cx("icon", buildInfo.status)} />
			<div className={cx("data")}>
				<div className={cx("dataRow")}>
					<span className={cx("id", buildInfo.status)}>#{buildInfo.id}</span>
					<span className={cx("title")}>{buildInfo.title}</span>
				</div>
				<div className={cx("dataRow")}>
					<div className={cx("commitInfo")}>
						<span className={cx("branch")}>{buildInfo.branch}</span>
						<span className={cx("commit")}>{buildInfo.commit}</span>
					</div>
					<span className={cx("author")}>{buildInfo.author}</span>
				</div>
			</div>
			<div className={cx("timing")}>
				<span className={cx("date")}>
					{format(buildInfo.startDate, "dd MMM HH:mm", { locale: ru })}
				</span>
				<span className={cx("duration")}>{buildInfo.duration}</span>
			</div>
		</div>
	);
};
