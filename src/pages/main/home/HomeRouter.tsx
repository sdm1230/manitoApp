import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import CreateGameScreen from './CreateGameScreen';

export type HomeStackParamList = {
	Home: {
		bottomTabNavi: any;
	};
	CreateGame: {
		bottomTabNavi: any;
	};
};

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeRouter = (navigation: any) => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="Home"
				component={HomeScreen}
				initialParams={{ bottomTabNavi: navigation }}
			/>
			<Stack.Screen
				name="CreateGame"
				component={CreateGameScreen}
				initialParams={{ bottomTabNavi: navigation }}
			/>
		</Stack.Navigator>
	);
};
