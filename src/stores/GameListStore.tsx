import { observable } from 'mobx';
import createFormData from '../common/api/Image/createFormData';
import { RequestDelete, RequestGet, RequestPost, RequestPut } from '../common/api/Request';

const GameListStore = observable({
	partyList: [],

	async getAllParty() {
		let success = false;

		await RequestGet({
			api: '/party/',
			func_success: async (res) => {
				this.partyList = res;

				success = true;
			},
			func_fail: () => {
				success = false;
			},
		});

		return success;
	},

	async createParty(name: string, profileImg: any, quota: string) {
		let success = {
			isSuccess: false,
			response: null,
		};

		const requestBody =
			profileImg.fileName?.length > 0
				? createFormData({ photo: profileImg, name, quota })
				: {
						name,
						quota,
				  };

		await RequestPost({
			api: `/party/`,
			body: requestBody,
			func_success: async (res) => {
				const addParty = [res, ...this.partyList];
				this.partyList = addParty;

				success = {
					isSuccess: true,
					response: res,
				};
			},
			func_fail: (err) => {
				success = {
					isSuccess: false,
					response: err,
				};
			},
		});

		return success;
	},

	async joinParty(gameCode: string) {
		let success = {
			isSuccess: false,
			response: null,
		};

		await RequestPut({
			api: '/party/',
			body: {
				code: gameCode,
			},
			func_success: (res) => {
				this.partyList = [res, ...this.partyList];

				success = {
					isSuccess: true,
					response: res,
				};
			},
			func_fail: (err) => {
				success = {
					isSuccess: false,
					response: err,
				};
			},
		});

		return success;
	},

	async editParty(manitoPartyId: number, name: string, profileImg: any, quota: string) {
		let success = {
			isSuccess: false,
			response: null,
		};

		const targetIndex = this.partyList.findIndex((party) => party.id === manitoPartyId);

		const requestBody =
			profileImg.fileName?.length > 0
				? createFormData({
						photo: profileImg,
						name,
						quota,
				  })
				: {
						name,
						quota,
				  };

		await RequestPut({
			api: `/party/${manitoPartyId}/`,
			body: requestBody,
			func_success: (res: any) => {
				const modifiedPartyList = [
					...this.partyList.slice(0, targetIndex),
					res,
					...this.partyList.slice(targetIndex + 1, this.partyList.length),
				];

				this.partyList = modifiedPartyList;

				success = {
					isSuccess: true,
					response: res,
				};
			},
			func_fail: (err: any) => {
				success = {
					isSuccess: false,
					response: err,
				};
			},
		});

		return success;
	},

	async deleteParty(manitoPartyId: number) {
		let success = {
			isSuccess: false,
			response: null,
		};

		await RequestDelete({
			api: `/party/${manitoPartyId}/profile/`,
			func_success: () => {
				this.partyList = this.partyList.filter((party) => party.id !== manitoPartyId);

				success = {
					isSuccess: true,
					response: null,
				};
			},
			func_fail: () => {
				success = {
					isSuccess: false,
					response: null,
				};
			},
		});

		return success;
	},
});

export { GameListStore };
