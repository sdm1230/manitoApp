import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import { RouteProp } from '@react-navigation/native';
import SettingScreen from './SettingScreen';

export type SettingStackParamList = {
	Setting: {
		stackNavi: any;
	};
};

const Stack = createStackNavigator<SettingStackParamList>();

interface Props {
	navigation: StackNavigationProp<SettingStackParamList, 'Setting'>;
	route: RouteProp<SettingStackParamList, 'Setting'>;
}

export const SettingRouter = ({ navigation, route }: Props) => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="Setting"
				component={SettingScreen}
				initialParams={{ stackNavi: route.params.stackNavi }}
			/>
		</Stack.Navigator>
	);
};
