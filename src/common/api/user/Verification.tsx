import React, { useState } from 'react';
import axios from 'axios';
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from '../Tokening';

const api = 'https://manito.shop';

export const verificationUser = async () => {
	// 엑세스 토큰 체크
	let isLogin = false;

	console.log('=== check Access Token Valid ===');
	const token = await getAccessToken();
	await axios
		.post(`${api}/auth/token/verify/`, {
			token,
		})
		.then((res) => {
			// 엑세스토큰 유효
			console.log('=== valid ===');
			isLogin = true;
		})
		.catch(async (err) => {
			// 엑세스 토큰 유효 안함
			console.log('=== invalid ===');

			console.log('=== check Refresh Token Valid ===');
			// 리프레시 토큰 체크
			const tokenRefresh = await getRefreshToken();

			await axios
				.post(`${api}/auth/token/verify/`, {
					token: tokenRefresh,
				})
				.then(async (res) => {
					// 리프레쉬 토큰 유효
					console.log('=== valid ===');
					await axios
						.post(`${api}/auth/token/refresh/`, {
							token: tokenRefresh,
						})
						.then(async (res) => {
							// 리프레쉬 토큰으로 재발급 성공
							console.log('=== valid ===');
							await setAccessToken(res.access);
							setRefreshToken(res.refresh);

							await console.log('=== check new Access Token Valid ===');
							const newToken = await getAccessToken();
							await axios
								.post(`${api}/auth/token/verify/`, {
									token: newToken,
								})
								.then((res) => {
									// 엑세스토큰 유효
									console.log('=== valid ===');
									isLogin = true;
								})
								.catch((err) => {
									console.error(err);
									console.error('=== failed refresh ACCESSTOKEN ===');
									isLogin = false;
								});
						})
						.catch((err) => {
							// 리프레쉬 토큰으로 재발급 실패
							console.error(err);
							console.error('=== failed refresh using refreshToken ===');
							isLogin = false;
						});
				}) // 리프레쉬 토큰 유효하지않음
				.catch((err) => {
					// 로그인 정보 없음
					console.log('=== invalid ===');
					isLogin = false;
				});
		});

	return isLogin;
};
