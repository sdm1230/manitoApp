import React from 'react';
import { Image } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import PartnerListScreen from './partnerList/PartnerListScreen';
import { SettingRouter } from './setting/SettingRouter';

import { StackParamList } from '../Router';
import { HomeRouter } from './home/HomeRouter';
import ChatListScreen from './chatList/ChatListScreen';
import Images from '../../common/atom/customImage';
import { HEIGHT_BOTTOMBAR } from '../../common/atom/constants';
import stylesIcon from '../../common/styles/icon';

export type MainTabParamList = {
	HomeRouter: undefined;
	ChatList: {
		stackNavi: any;
	};
	PartnerList: undefined;
	SettingRouter: {
		stackNavi: any;
	};
};

const BottomTab = createBottomTabNavigator<MainTabParamList>();

interface Props {
	navigation: StackNavigationProp<StackParamList, 'Main'>;
	route: RouteProp<StackParamList, 'Main'>;
}

const MainRouter = ({ navigation, route }: Props) => {
	return (
		<BottomTab.Navigator
			tabBarOptions={{
				showLabel: false,
				activeTintColor: '#FF878B',
				inactiveTintColor: '#ADADAD',
				style: {
					height: HEIGHT_BOTTOMBAR,
					paddingBottom: HEIGHT_BOTTOMBAR === 48 ? 0 : 20,
				},
			}}
		>
			<BottomTab.Screen
				name="HomeRouter"
				component={HomeRouter}
				options={{
					tabBarIcon: ({ color, focused }) => (
						<Image
							source={focused ? Images.btn.homeTabActive : Images.btn.homeTabInactive}
							style={stylesIcon.middleIcon}
						/>
					),
				}}
			/>
			<BottomTab.Screen
				name="PartnerList"
				component={PartnerListScreen}
				options={{
					tabBarIcon: ({ color, focused }) => (
						<Image
							source={
								focused
									? Images.btn.profileTabActive
									: Images.btn.profileTabInactive
							}
							style={stylesIcon.middleIcon}
						/>
					),
				}}
			/>
			<BottomTab.Screen
				name="ChatList"
				component={ChatListScreen}
				options={{
					tabBarIcon: ({ color, focused }) => (
						<Image
							source={
								focused
									? Images.btn.chattingTabActive
									: Images.btn.chattingTabInactive
							}
							style={stylesIcon.middleIcon}
						/>
					),
				}}
				initialParams={{ stackNavi: navigation }}
			/>
			<BottomTab.Screen
				name="SettingRouter"
				component={SettingRouter}
				options={{
					tabBarIcon: ({ color, focused }) => (
						<Image
							source={
								focused
									? Images.btn.settingTabActive
									: Images.btn.settingTabInactive
							}
							style={stylesIcon.middleIcon}
						/>
					),
				}}
				initialParams={{ stackNavi: navigation }}
			/>
		</BottomTab.Navigator>
	);
};

export default MainRouter;
