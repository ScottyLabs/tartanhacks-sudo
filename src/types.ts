export interface Participant {
	_id: string;
	admin: boolean;
	email: string;
	status: string;
	judge: boolean;
	profile: Profile;
	team: TeamLite;
}

export interface Profile {
	firstName: string;
	lastName: string;
	displayName: string;
	age: number;
	school: string;
	college: string;
	level: string;
	graduationYear: number;
	gender: string;
	genderOther: string;
	ethnicity: string;
	ethnicityOther: string;
	phoneNumber: string;
	major: string;
	coursework: string;
	languages: string;
	hackathonExperience: number;
	workPermission: string;
	workLocation: string;
	workStrengths: string;
	sponsorRanking: string[];
	github: string;
	design: string;
	website: string;
	essays: string[];
	dietaryRestrictions: string;
	shirtSize: string;
	wantsHardware: boolean;
	address: string;
	region: string;
	attendingPhysically: boolean;
}

export interface TeamLite {
	_id: string;
	members: string[];
	visible: boolean;
	name: string;
	description: string;
	admin: string;
}