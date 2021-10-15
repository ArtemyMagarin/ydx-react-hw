import cn from "classnames/bind";

import styles from "./Header.module.css";

const cx = cn.bind(styles);

interface Props {
	title: string;
}

export const Header: React.FC<Props> = ({ title, children }) => {
	return (
		<header className={cx("header")}>
			<p className={cx("pageTitle")}>{title}</p>
			<div>{children}</div>
		</header>
	);
};
