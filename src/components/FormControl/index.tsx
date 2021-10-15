import cn from "classnames/bind";
import styles from "./FormControl.module.css";

interface Props {
	label: string;
	required?: boolean;
}

const cx = cn.bind(styles);

export const FormControl: React.FC<Props> = ({
	label,
	required = false,
	children,
}) => {
	return (
		<div className={cx("wrapper")}>
			<label className={cx("formControl")}>
				<span className={cx("label", { required })}>{label}</span>
				{children}
			</label>
		</div>
	);
};
