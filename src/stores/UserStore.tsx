import { observable } from 'mobx';
import KakaoLogins from '@react-native-seoul/kakao-login';
import createFormData from '../common/api/Image/createFormData';
import { RequestDelete, RequestGet, RequestPut } from '../common/api/Request';
import { clearAllToken } from '../common/api/Tokening';

const UserStore = observable({
	user: {},

	async getLoginUser() {
		let success = false;

		await RequestGet({
			api: '/user/',
			func_success: (res) => {
				this.user = res;
				success = true;
			},
			func_fail: () => {
				success = false;
			},
		});

		return success;
	},

	async confirmTutorial() {
		await RequestPut({
			api: '/user/',
			body: {
				is_first_time: false,
			},
			func_success: (res) => {
				this.user = res;
			},
		});
	},

	async editUserProfile(name: string, profileImg: any) {
		let isSuccess = false;

		const requestBody =
			profileImg.fileName?.length > 0
				? createFormData({ photo: profileImg, nickname: name })
				: {
						nickname: name,
				  };

		await RequestPut({
			api: `/user/`,
			body: requestBody,
			func_success: (res: any) => {
				const modifiedUser = res;

				this.user = modifiedUser;

				isSuccess = true;
			},
			func_fail: (err: any) => {
				isSuccess = false;
			},
		});

		return isSuccess;
	},

	async deleteUser() {
		let isSuccess = false;

		await RequestDelete({
			api: '/auth/leave/',
			func_success: () => {
				clearAllToken();
				this.user = {};

				isSuccess = true;

				KakaoLogins.logout()
					.then((result) => {
						console.log('====Kakao logOut() success====');
						console.log(result);
					})
					.catch((err) => {
						console.log('====Kakao logOut() error====');
						console.error(err);
					});

				KakaoLogins.unlink()
					.then((result) => {
						console.log('====Kakao unlink() success====');
						console.log(result);
					})
					.catch((err) => {
						console.log('====Kakao unlink() error====');
						console.error(err);
					});
			},
			func_fail: () => {
				isSuccess = false;
			},
		});

		return isSuccess;
	},

	async signOutUser() {
		clearAllToken();
		this.user = {};
	},
});

export { UserStore };
