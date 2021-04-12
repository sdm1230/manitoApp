import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import { RouteProp } from '@react-navigation/native';
import ManitoChatRoomScreen from './ManitoChatRoomScreen';

import { StackParamList } from '../../Router';
import MissionListScreen from './menu/participations/MissionListScreen';
import { ManageMissionRouter } from './menu/manager/ManageMissionRouter';
import SettingLimitScreen from './menu/manager/SettingLimitScreen';

export type ManitoChatStackParamList = {
	ChatRoom: {
		id: number;
		stackNavi: any;
	};
	SettingLimit: {
		manitoPartyId: number;
	};
	ManageMission: {
		manitoPartyId: number;
	};

	MissionList: {
		manitoPartyId: number;
		isEndGame: boolean;
	};
};
const Stack = createStackNavigator<ManitoChatStackParamList>();

interface Props {
	navigation: StackNavigationProp<StackParamList, 'ManitoChat'>;
	route: RouteProp<StackParamList, 'ManitoChat'>;
}

const ManitoChatRouter = ({ navigation, route }: Props) => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="ChatRoom"
				component={ManitoChatRoomScreen}
				initialParams={{
					id: route.params.id,
					stackNavi: route.params.stackNavi,
				}}
			/>
			<Stack.Screen
				name="SettingLimit"
				component={SettingLimitScreen}
				initialParams={{ manitoPartyId: route.params.id }}
			/>
			<Stack.Screen
				name="ManageMission"
				component={ManageMissionRouter}
				initialParams={{ manitoPartyId: route.params.id }}
			/>

			<Stack.Screen
				name="MissionList"
				component={MissionListScreen}
				initialParams={{ manitoPartyId: route.params.id }}
			/>
		</Stack.Navigator>
	);
};

export default ManitoChatRouter;
