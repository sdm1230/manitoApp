import React from 'react';

import { Alert } from 'react-native';
import { RequestPut } from '../Request';
import createFormData from '../Image/createFormData';

interface EditUserProps {
	nickname: string;
	image?: any;
	func_success(res?: any): any;
	func_fail(err?: any): any;
}

export default async function editUser(props: EditUserProps) {
	const requestBody =
		props.image.fileName?.length > 0
			? createFormData({ photo: props.image, nickname: props.nickname })
			: {
					nickname: props.nickname,
			  };

	if (props.nickname.length <= 10 && props.nickname.length > 0) {
		await RequestPut({
			api: `/user/`,
			body: requestBody,
			func_success: (res) => {
				props.func_success(res);
			},
			func_fail: (err) => {
				props.func_fail(err);
			},
		});
	} else {
		Alert.alert('이름을 1 ~ 10자 이내로 지어주세요.');
	}
}
