import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './login/LoginScreen';
import SignUpScreen from './login/SignUpScreen';

import MainRouter from './main/MainRouter';

import PublicChatRouter from './chatRoom/PublicChat/PublicChatRouter';
import ManitoChatRouter from './chatRoom/ManitoChat/ManitoChatRouter';
import StartLoadingScreen from './loading/StartLoadingScreen';

export type StackParamList = {
	StartLoading: undefined;

	Login: undefined;

	SignUp: {
		user: any;
	};

	Main: undefined;

	PublicChat: {
		id: number;
		stackNavi: any;
	};
	ManitoChat: {
		id: number;
		stackNavi: any;
	};
};

const Stack = createStackNavigator<StackParamList>();

export const Router = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="StartLoading" component={StartLoadingScreen} />

			<Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Manito' }} />
			<Stack.Screen name="SignUp" component={SignUpScreen} />

			<Stack.Screen name="Main" component={MainRouter} />

			<Stack.Screen name="PublicChat" component={PublicChatRouter} />
			<Stack.Screen name="ManitoChat" component={ManitoChatRouter} />
		</Stack.Navigator>
	);
};
