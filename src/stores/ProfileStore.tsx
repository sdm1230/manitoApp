import { observable } from 'mobx';
import createFormData from '../common/api/Image/createFormData';
import { RequestGet, RequestPost, RequestPut } from '../common/api/Request';

const ProfileStore = observable({
	manitoProfiles: [],
	loading: false,

	async getManitoProfiles() {
		let isSuccess = false;
		this.loading = true;

		await RequestGet({
			api: '/user/profile/',
			func_success: (res) => {
				this.manitoProfiles = res;
				this.loading = false;

				isSuccess = true;
			},
			func_fail: () => {
				isSuccess = false;
				this.loading = false;
			},
		});

		return isSuccess;
	},

	async CreateManitoProfileModal(manitoPartyId: number, name: string, profileImg: any) {
		let isSuccess = false;

		const requestBody =
			profileImg.fileName?.length > 0
				? createFormData({ photo: profileImg, nickname: name })
				: {
						nickname: name,
				  };

		await RequestPost({
			api: `/party/${manitoPartyId}/profile/`,
			body: requestBody,
			func_success: (res: any) => {
				const newManitoProfiles = [...this.manitoProfiles, res];

				this.manitoProfiles = newManitoProfiles;

				isSuccess = true;
			},
			func_fail: (err: any) => {
				isSuccess = false;
			},
		});

		return isSuccess;
	},

	async editManitoProfile(manitoPartyId: number, name: string, profileImg: any) {
		let isSuccess = false;
		this.loading = true;

		const targetIndex = this.manitoProfiles.findIndex(
			(manito) => manito.manito_party.id === manitoPartyId,
		);

		console.log(targetIndex);

		const requestBody =
			profileImg.fileName?.length > 0
				? createFormData({ photo: profileImg, nickname: name })
				: {
						nickname: name,
				  };

		await RequestPut({
			api: `/party/${manitoPartyId}/profile/`,
			body: requestBody,
			func_success: (res: any) => {
				const newManitoProfiles = [
					...this.manitoProfiles.slice(0, targetIndex),
					res,
					...this.manitoProfiles.slice(targetIndex + 1, this.manitoProfiles.length),
				];

				this.manitoProfiles = newManitoProfiles;
				this.loading = false;

				isSuccess = true;
			},
			func_fail: (err: any) => {
				isSuccess = false;
				this.loading = false;
			},
		});

		return isSuccess;
	},
});

export { ProfileStore };
