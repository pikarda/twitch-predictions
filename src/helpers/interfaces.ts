interface Outcomes {
	channel_points: number;
	color: string;
	id: string;
	title: string;
	top_predictors: [];
	users: number;
}

export interface FetchData {
	title: string;
	winning_outcome_id: string;
	status: string;
	remainingTime: string;
	outcomes: Outcomes[];
	createdAt: string;
}
