import cn from "classnames/bind";
import styles from "./Button.module.css";

const cx = cn.bind(styles);

interface Props extends React.ComponentPropsWithoutRef<"button"> {
	size?: "small" | "default";
	variant?: "primary" | "secondary" | "outline";
	withIcon?: boolean;
}

export const Button: React.FC<Props> = ({
	className,
	size = "default",
	variant = "primary",
	children,
	withIcon = false,
	...props
}) => {
	return (
		<button
			className={cn(
				cx("button", `size_${size}`, `variant_${variant}`, {
					with_icon: withIcon,
				}),
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
};
