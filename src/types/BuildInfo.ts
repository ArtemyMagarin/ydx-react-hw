export interface BuildInfo {
	id: number;
	status: "pending" | "success" | "error";
	title: string;
	author: string;
	branch: string;
	commit: string;
	startDate: Date;
	duration: string;
}
