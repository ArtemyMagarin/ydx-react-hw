import cn from "classnames/bind";
import styles from "./CommonPage.module.css";

interface Props {}

const cx = cn.bind(styles);

export const CommonPage: React.FC<Props> = ({ children }) => {
	return (
		<>
			<div className={cx("container")}>{children}</div>
			<footer className={cx("footer")}>
				<div className={cx("container", "footerInner")}>
					<div className={cx("footerInnerSection")}>
						<a href="#support" className={cx("footerLink")}>
							Support
						</a>
						<a href="#learning" className={cx("footerLink")}>
							Learning
						</a>
						<a href="#rus" className={cx("footerLink")}>
							Русская версия
						</a>
					</div>
					<div className={cx("footerInnerSection")}>
						<span className={cx("footerCopyright")}>&copy; 2020 Your Name</span>
					</div>
				</div>
			</footer>
		</>
	);
};
