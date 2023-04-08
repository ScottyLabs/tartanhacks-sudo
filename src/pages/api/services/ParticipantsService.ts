import { ApiClient } from "../ApiClient";
import { Participant } from "../../../types";

const getParticipants = async (name: string): Promise<Participant[]> => {
	return await ApiClient.get(`/participants`, {
		params: { name },
	}).then(function ({ data }: { data: Participant[] }) {
		return data;
	}).catch(function (res) {
		console.log(res);
		return [];
	});
}

export const ParticipantsService = {
	getParticipants
}