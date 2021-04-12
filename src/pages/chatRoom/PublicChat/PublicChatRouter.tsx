import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import { RouteProp } from '@react-navigation/native';
import PublicChatRoomScreen from './PublicChatRoomScreen';
import GroupingScreen from './menu/matching/GroupingScreen';
import MatchingScreen from './menu/matching/MatchingScreen';

import { StackParamList } from '../../Router';
import ResultScreen from './menu/matching/ResultScreen';
import EditGameScreen from './menu/EditGameScreen';

export type ChatRoomStackParamList = {
	ChatRoom: {
		id: number;
		stackNavi: any;
	};
	Grouping: {
		id: number;
		members: any;
	};
	Matching: {
		id: number;
	};
	Result: {
		id: number;
		modalVisible?: boolean;
	};
	EditGame: {
		id: number;
		partyInfo: any;
		getInit: any;
	};
};
const Stack = createStackNavigator<ChatRoomStackParamList>();

interface PublicChatRouterProps {
	navigation: StackNavigationProp<StackParamList, 'PublicChat'>;
	route: RouteProp<StackParamList, 'PublicChat'>;
}
const PublicChatRouter = ({ navigation, route }: PublicChatRouterProps) => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="ChatRoom"
				component={PublicChatRoomScreen}
				initialParams={{
					id: route.params.id,
					stackNavi: route.params.stackNavi,
				}}
			/>
			<Stack.Screen
				name="Grouping"
				component={GroupingScreen}
				initialParams={{ id: route.params.id }}
			/>
			<Stack.Screen
				name="Matching"
				component={MatchingScreen}
				initialParams={{ id: route.params.id }}
			/>
			<Stack.Screen
				name="Result"
				component={ResultScreen}
				initialParams={{ id: route.params.id }}
			/>
			<Stack.Screen
				name="EditGame"
				component={EditGameScreen}
				initialParams={{ id: route.params.id }}
			/>
		</Stack.Navigator>
	);
};

export default PublicChatRouter;
