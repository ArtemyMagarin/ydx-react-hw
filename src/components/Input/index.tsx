import cn from "classnames/bind";
import React, { useRef } from "react";
import { ReactComponent as ClearIcon } from "../../icons/clear.svg";
import styles from "./Input.module.css";

const cx = cn.bind(styles);

interface Props extends React.ComponentPropsWithoutRef<"input"> {
	clearable?: boolean;
	error?: string;
}

export const Input: React.FC<Props> = ({
	value,
	onChange,
	className,
	clearable = true,
	error,
	...props
}) => {
	const ref = useRef<HTMLInputElement>(null);

	const reset = () => {
		onChange?.({
			target: { name: props.name, value: "" },
		} as React.ChangeEvent<HTMLInputElement>);
		ref.current?.focus();
	};

	return (
		<div className={cx("wrapper")}>
			<input
				className={cn(
					cx("input", {
						"with-clear-button": clearable,
						error: Boolean(error),
					}),
					className
				)}
				value={value}
				onChange={onChange}
				{...props}
				ref={ref}
			/>
			{clearable && value !== undefined && value !== "" && (
				<button
					tabIndex={-1}
					type="button"
					className={cx("clear-value-button")}
					aria-label="clear input value"
					onClick={reset}
				>
					<ClearIcon />
				</button>
			)}
			{error && <p className={cx("errorMessage")}>{error}</p>}
		</div>
	);
};
