import React, { useEffect } from 'react';
import { View, Image } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';
import { StackParamList } from '../Router';
import { verificationUser } from '../../common/api/user/Verification';
import { timeColor } from '../../common/atom/color';
import Images from '../../common/atom/customImage';
import useStore from '../../stores/stores';

interface Props {
	navigation: StackNavigationProp<StackParamList, 'StartLoading'>;
}

const StartLoadingScreen = ({ navigation }: Props) => {
	const { UserStore } = useStore();

	const isLogin = async () => {
		const result = await (verificationUser() && UserStore.getLoginUser());

		if (result === true) {
			navigation.replace('Main');
		} else {
			navigation.replace('Login');
		}
	};

	useEffect(() => {
		isLogin();
	}, []);

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: timeColor,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<FastImage source={Images.img.loading} style={{ height: 170, width: 170 }} />
		</View>
	);
};

export default StartLoadingScreen;
