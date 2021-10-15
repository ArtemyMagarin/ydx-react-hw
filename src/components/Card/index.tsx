import cn from "classnames/bind";
import styles from "./Card.module.css";

const cx = cn.bind(styles);

export const Card: React.FC = ({ children }) => {
	return <div className={cx("card")}>{children}</div>;
};
