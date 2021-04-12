import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import { RouteProp } from '@react-navigation/native';
import ManageMissionScreen from './manageMission/ManageMissionScreen';
import SetMissionScreen from './manageMission/SetMissionScreen';

import { ManitoChatStackParamList } from '../../ManitoChatRouter';

export type ManageMissionStackParamList = {
	ManageMission: {
		manitoPartyId: number;
		dueDate: string;
	};
	SetMission: {
		manitoPartyId: number;
		mode: 'create' | 'edit';
		missionInfo?: any;
	};
};

const Stack = createStackNavigator<ManageMissionStackParamList>();

interface Props {
	navigation: StackNavigationProp<ManageMissionStackParamList, 'ManageMission'>;
	route: RouteProp<ManageMissionStackParamList, 'ManageMission'>;
}

export const ManageMissionRouter = ({ route, navigation }: Props) => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="ManageMission"
				component={ManageMissionScreen}
				initialParams={{ manitoPartyId: route.params.manitoPartyId }}
			/>
			<Stack.Screen name="SetMission" component={SetMissionScreen} />
		</Stack.Navigator>
	);
};
