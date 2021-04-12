import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ManitoChatStackParamList } from '../../../ManitoChatRouter';
import { timeColor, whiteColor } from '../../../../../../common/atom/color';
import { ModalPageHeader } from '../../../../../../common/molecule/header/ModalPageHeader';
import { RequestGet } from '../../../../../../common/api/Request';
import RenderMissionList from '../../../../../../common/organism/body/RenderMissionList';

interface Props {
	navigation: StackNavigationProp<ManitoChatStackParamList, 'ManageMission'>;
	route: RouteProp<ManitoChatStackParamList, 'ManageMission'>;
}

const mockMissionList = [
	{
		id: 1,
		manito_party: 1,
		title: 'mission1',
		content: 'content1',
		status_display: 'ENDED',
		start_date: '2021-01-20',
		due_date: '2021-02-10',
	},
	{
		id: 2,
		manito_party: 1,
		title: 'mission2',
		content: 'content2',
		status_display: 'IN_PROGRESS',
		start_date: '2021-01-20',
		due_date: '2021-02-10',
	},
	{
		id: 3,
		manito_party: 1,
		title: 'mission3',
		content: 'content3',
		status_display: 'IN_PROGRESS',
		start_date: '2021-01-20',
		due_date: '2021-02-10',
	},
	{
		id: 4,
		manito_party: 1,
		title: 'mission4',
		content: 'content4',
		status_display: 'READY',
		start_date: '2021-01-20',
		due_date: '2021-02-10',
	},
];

const ManageMissionScreen = ({ navigation, route }: Props) => {
	const [missionList, setMissionList] = useState(mockMissionList);
	const [selectedMission, setSelectedMission] = useState([]);

	const getMissionList = async () => {
		await RequestGet({
			api: `/party/${route.params.manitoPartyId}/mission/`,
			func_success: (res) => setMissionList(res),
		});
	};

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getMissionList();
		});

		return unsubscribe;
	}, [navigation]);

	return (
		<SafeAreaView style={styles.container}>
			<ModalPageHeader title="미션 관리하기" onClickClose={() => navigation.popToTop()} />

			<View style={{ alignItems: 'center', marginVertical: 20 }}>
				<Text
					style={{
						fontWeight: 'bold',
						color: whiteColor,
						marginVertical: 5,
						fontSize: 16,
					}}
				>
					마니또의 활발한 활동을 위해
				</Text>
				<Text
					style={{
						fontWeight: 'bold',
						color: whiteColor,
						marginVertical: 5,
						fontSize: 16,
					}}
				>
					새로운 미션을 계속 만들어볼까요?
				</Text>
			</View>

			<RenderMissionList
				missionList={missionList}
				target="manager"
				navigation={navigation}
				manitoPartyId={route.params.manitoPartyId}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: timeColor,
	},
});

export default ManageMissionScreen;
