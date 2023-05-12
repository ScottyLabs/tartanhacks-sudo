import { ApiClient } from "../ApiClient";

export interface CheckInItemType
{
    id_: string;
    points: string;
    active: boolean;
    name: string;
    description: string;
    startTime: number;
    endTime: number;

}

const checkInItems = async (token:string): Promise<CheckInItemType[]> => 
{return await ApiClient.get(`/check-in/`, {headers: {'x-access-token': token}
    }).then(function({data}: {data: CheckInItemType[]})
    {
        return data;
    }).catch(function (res) {
		console.log(res)
		return [];
	});
};

export const CheckIn = {
    checkInItems
  }