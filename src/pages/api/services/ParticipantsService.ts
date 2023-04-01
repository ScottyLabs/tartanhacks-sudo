import { ApiClient } from "../ApiClient";

export interface Participant {
	_id: string;
	admin: boolean;
	email: string;
	status: string;
	judge: boolean;
}

const getParticipants = async (name: string, token: string): Promise<Participant[]> => {
	return await ApiClient.get(`/participants`, {
		params: { name },
		headers: {
			'x-access-token': token
		}
	}).then(function ({ data }: { data: Participant[] }) {
		return data;
	}).catch(function (res) {
		console.log(res)
		return [];
	});
}

export const ParticipantsService = {
	getParticipants
}