import cn from "classnames/bind";
import styles from "./Button.module.css";

const cx = cn.bind(styles);

type Props = React.ComponentPropsWithoutRef<"button"> & {
	size: "small" | "default";
	variant: "primary" | "secondary";
};

export const Button: React.FC<Props> = ({
	className,
	size = "default",
	variant = "primary",
	children,
	...props
}) => {
	return (
		<button
			className={cn(
				cx("button", `size_${size}`, `variant_${variant}`),
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
};
