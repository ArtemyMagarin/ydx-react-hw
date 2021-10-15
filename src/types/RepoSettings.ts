export interface RepoSettings {
	repositoryName: string;
	buildCommand: string;
	mainBranch?: string;
	synchronizeTimeout: number;
}
