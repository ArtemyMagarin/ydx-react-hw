import cn from "classnames/bind";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Button } from "../../components/Button";
import { CommonPage } from "../../components/CommonPage";
import { FormControl } from "../../components/FormControl";
import { Input } from "../../components/Input";
import { Header } from "../../components/Header";
import { RepoSettings } from "../../types/RepoSettings";
import styles from "./Settings.module.css";
const cx = cn.bind(styles);

interface Props {
	openRepo: (data: RepoSettings | null) => Promise<void>;
	initialState?: RepoSettings;
}

const initialFormState: RepoSettings = {
	buildCommand: "",
	repositoryName: "",
	synchronizeTimeout: 10,
	mainBranch: "",
};

const RepoSchema = Yup.object().shape({
	buildCommand: Yup.string().required("Build сommand is a required field"),
	repositoryName: Yup.string().required("Repository is a required field"),
	mainBranch: Yup.string(),
	synchronizeTimeout: Yup.number().min(1).required(),
});

export const Settings: React.FC<Props> = ({
	openRepo,
	initialState = initialFormState,
}) => {
	const history = useHistory();

	const onSubmit = async (values: RepoSettings) => {
		try {
			await openRepo(values);
			history.push("/");
		} catch (e) {}
	};

	const formik = useFormik<RepoSettings>({
		initialValues: initialState,
		validationSchema: RepoSchema,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: onSubmit,
	});

	return (
		<CommonPage>
			<Header title={"School CI server"} />
			<h1 className={cx("title")}>Settings</h1>

			<p className={cx("description")}>
				Configure repository connection and synchronization settings.
			</p>

			<form onSubmit={formik.handleSubmit}>
				<FormControl label="GitHub repository" required>
					<Input
						autoFocus
						placeholder={"user-name/repo-name"}
						name={"repositoryName"}
						value={formik.values.repositoryName}
						error={formik.errors.repositoryName}
						onChange={formik.handleChange}
					/>
				</FormControl>
				<FormControl label="Build command" required>
					<Input
						placeholder={"npm ci && npm run build"}
						name={"buildCommand"}
						value={formik.values.buildCommand}
						error={formik.errors.buildCommand}
						onChange={formik.handleChange}
					/>
				</FormControl>
				<FormControl label="Main branch">
					<Input
						placeholder={"main"}
						name={"mainBranch"}
						value={formik.values.mainBranch}
						error={formik.errors.mainBranch}
						onChange={formik.handleChange}
					/>
				</FormControl>
				<div className={cx("horizontalFormControl")}>
					<span>Synchronize every</span>
					<Input
						className={cx("smallInput")}
						clearable={false}
						inputMode="numeric"
						type={"number"}
						value={formik.values.synchronizeTimeout}
						name={"synchronizeTimeout"}
						onChange={formik.handleChange}
					/>
					<span>minutes</span>
				</div>
				<div className={cx("buttonsWrapper")}>
					<Button type="submit" disabled={formik.isSubmitting}>
						{formik.isSubmitting ? "Saving..." : "Save"}
					</Button>
					<Button
						type="button"
						variant="secondary"
						disabled={formik.isSubmitting}
						onClick={() => history.push("/")}
					>
						Cancel
					</Button>
				</div>
			</form>
		</CommonPage>
	);
};
