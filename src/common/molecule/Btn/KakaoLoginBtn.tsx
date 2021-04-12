import React from 'react';
import { Image, Alert, TouchableOpacity } from 'react-native';

import KakaoLogins, { KAKAO_AUTH_TYPES } from '@react-native-seoul/kakao-login';
import axios from 'axios';
import Images from '../../atom/customImage';

import { setAccessToken, setRefreshToken } from '../../api/Tokening';

const api = 'https://manito.shop';

interface KakaoLoginBtnProps {
	navigation: any;
}

export const KakaoLoginBtn = (props: KakaoLoginBtnProps) => {
	const kakaoLogin = () => {
		KakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account]) // KAKAO_AUTH_TYPES.ACCOUNT 뺌
			.then((result) => {
				console.log(`Login Finished:${JSON.stringify(result)}`);

				axios
					.post(`${api}/auth/kakao/signin/`, {
						access_token: result.accessToken,
						refresh_token: result.refreshToken,
					})

					.then((response) => {
						setAccessToken(response.data.token.access);
						setRefreshToken(response.data.token.refresh);

						if (response.status === 200) {
							// SignIn
							console.log('====signin success===');
							props.navigation.navigate('Main');
						} else if (response.status === 201) {
							// SignUp
							console.log('====goto signup===');
							props.navigation.navigate('SignUp', {
								user: response.data.user,
							});
						}
					})

					.catch((err) => {
						console.log('====failed signIn api===');
						console.error(err);
						if (err.status >= 500) {
							Alert.alert('일시적인 서버 오류입니다.');
						}
					});
			})
			.catch((err) => {
				if (err.code === 'E_CANCELLED_OPERATION') {
					console.log(`Login Cancelled:${err.message}`);
				} else {
					console.log(`Login Failed:${err.code} ${err.message}`);
				}
			});
	};

	return (
		<TouchableOpacity onPress={() => kakaoLogin()}>
			<Image
				source={Images.btn.kakao_login_medium_wide}
				style={{ width: '100%', height: 50 }}
			/>
		</TouchableOpacity>
	);
};
