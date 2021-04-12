import React from 'react';

import KakaoLogins from '@react-native-seoul/kakao-login';
import { clearAllToken, getAccessToken } from '../Tokening';

import { RequestDelete } from '../Request';

export default async function deleteUser() {
	await RequestDelete({
		api: `/auth/leave/`,
	});

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

	clearAllToken();
}
