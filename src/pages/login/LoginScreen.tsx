import React, { useEffect } from 'react';
import { View, Dimensions, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { StackParamList } from '../Router';

import { KakaoLoginBtn } from '../../common/molecule/Btn/KakaoLoginBtn';
import { AppleLoginBtn } from '../../common/molecule/Btn/AppleLoginBtn';

import Images from '../../common/atom/customImage';
import { timeColor } from '../../common/atom/color';

const Width = Dimensions.get('screen').width;

interface Props {
	navigation: StackNavigationProp<StackParamList, 'Login'>;
}

const LoginScreen = ({ navigation }: Props) => {
	/*
	useEffect(() => {
		// onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
		return appleAuth.onCredentialRevoked(async () => {
		  console.warn('If this function executes, User Credentials have been Revoked');
		});
	  }, []); // passing in an empty array as the second argument ensures this is only ran once when component mounts initially.
	*/

	return (
		<View style={{ flex: 1, backgroundColor: timeColor }}>
			<SafeAreaView style={{ flex: 1 }}>
				<View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
					<Image
						source={Images.logo.appLogoText}
						style={{ width: 270, height: 270 }}
						resizeMode="contain"
					/>
				</View>

				<View style={{ flex: 2, justifyContent: 'center' }}>
					<View style={{ paddingHorizontal: Width * 0.1, marginBottom: 30 }}>
						<KakaoLoginBtn navigation={navigation} />
					</View>

					<View style={{ paddingHorizontal: Width * 0.1, marginBottom: 30 }}>
						<AppleLoginBtn />
					</View>
				</View>
			</SafeAreaView>
		</View>
	);
};

export default LoginScreen;
