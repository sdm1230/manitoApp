import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Image, SafeAreaView } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useObserver } from 'mobx-react';
import { HomeStackParamList } from './HomeRouter';

import { whiteColor, timeColor } from '../../../common/atom/color';

import Images from '../../../common/atom/customImage';
import { ToCreateGame } from '../../../common/atom/btnText/routing/HomeTab';
import { JoinGameWrapper } from '../../../common/atom/btnText/wrapper/BroadBtn';
import JoinGameBox from '../../../common/organism/box/JoinGameBox';
import WelcomeUserModal from '../../../common/organism/modal/guideModal/firstUser/GuideHome/WelcomeUser';
import { HEIGHT_BOTTOMBAR, HEIGHT_SCREEN, WIDTH_SCREEN } from '../../../common/atom/constants';
import useStore from '../../../stores/stores';

interface Props {
	navigation: StackNavigationProp<HomeStackParamList, 'Home'>;
	route: RouteProp<HomeStackParamList, 'Home'>;
}

const HomeScreen = ({ navigation, route }: Props) => {
	const [warpperVisible, setWarpperVisible] = useState(true);
	const { UserStore } = useStore();

	const [tutorialVisible, setTutorialVisible] = useState(UserStore.user?.is_first_time || false);

	const confirmTutorial = async () => {
		UserStore.confirmTutorial();
	};

	return useObserver(() => (
		<View
			style={{
				width: WIDTH_SCREEN,
				height: HEIGHT_SCREEN - HEIGHT_BOTTOMBAR,
				backgroundColor: timeColor,
			}}
		>
			<View style={{ flex: 3 }}>
				<SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Image
						source={Images.logo.appLogoText}
						style={{ width: 270, height: 270 }}
						resizeMode="contain"
					/>
				</SafeAreaView>
			</View>

			<View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
				{warpperVisible ? (
					<JoinGameWrapper onClickBtn={() => setWarpperVisible(false)} />
				) : (
					<JoinGameBox
						bottomTabNavi={route.params.bottomTabNavi}
						setWarpperVisible={setWarpperVisible}
					/>
				)}
			</View>

			<View
				style={{
					flex: 2,
					backgroundColor: whiteColor,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<ToCreateGame
					onClickBtn={() => {
						setWarpperVisible(true);
						navigation.navigate('CreateGame');
					}}
				/>
			</View>

			<WelcomeUserModal
				userNickname={UserStore.user?.profile?.nickname || '신규유저'}
				modalVisible={tutorialVisible}
				onCloseModal={() => {
					setTutorialVisible(false);
					confirmTutorial();
				}}
			/>
		</View>
	));
};

export default HomeScreen;
