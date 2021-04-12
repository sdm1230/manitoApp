import React from 'react';
import { TouchableOpacity, View, Platform } from 'react-native';
import axios from 'axios';

import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';

import KakaoLogins from '@react-native-seoul/kakao-login';

const api = 'https://manito.shop';

async function onAppleButtonPress() {
	KakaoLogins.unlink()
		.then((result) => {
			console.log('====Kakao unlink() success====');
			console.log(result);
		})
		.catch((err) => {
			console.log('====Kakao unlink() error====');
			console.error(err);
		});

	/*
	// performs login request
	const appleAuthRequestResponse = await appleAuth.performRequest({
		requestedOperation: appleAuth.Operation.LOGIN,
		requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
	});

	// get current authentication state for user
	// /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
	const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

	// use credentialState response to ensure the user is authenticated
	if (credentialState === appleAuth.State.AUTHORIZED) {
		// user is authenticated
		console.log('===success AppleLogin===')
		
	}
	*/
}

export const AppleLoginBtn = () => {
	return (
		<View>
			{Platform.OS === 'ios' && (
				<AppleButton
					buttonStyle={AppleButton.Style.WHITE}
					buttonType={AppleButton.Type.SIGN_IN}
					style={{
						width: '100%', // You must specify a width
						height: 50, // You must specify a height
					}}
					onPress={() => onAppleButtonPress()}
				/>
			)}
		</View>
	);
};
