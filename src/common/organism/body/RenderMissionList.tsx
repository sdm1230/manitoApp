import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { timeColor, whiteColor } from '../../atom/color';
import MissionDetail from '../card/MissionDetail';
import MissionSimple from '../card/MissionSimple';

interface MissionListProps {
	missionList: any;
	target: 'manager' | 'participant';

	// for participant
	isEndGame?: boolean;

	// for manager
	manitoPartyId?: number;
	navigation?: any;
}

const RenderMissionList = (props: MissionListProps) => {
	const [selectedMission, setSelectedMission] = useState([]);

	const onClickDetail = (id: number) => {
		// for participant
		if (selectedMission.find((item: any) => item === id)) {
			const removeId = selectedMission.filter((item: any) => item !== id);
			setSelectedMission(removeId);
		} else {
			setSelectedMission([...selectedMission, id]);
		}
	};

	const onClickEdit = (mission: any) => {
		// for manager
		props.navigation.navigate('SetMission', {
			mode: 'edit',
			missionInfo: mission,
		});
	};
	const onClickCreate = () => {
		// for manager
		props.navigation.navigate('SetMission', {
			mode: 'create',
			manitoPartyId: props.manitoPartyId,
		});
	};

	return (
		<View style={{ flex: 1 }}>
			<ScrollView>
				{props.missionList.map((mission: any) => (
					<TouchableOpacity
						onPress={() =>
							props.target === 'manager' && mission.status_display !== 'ENDED'
								? onClickEdit(mission)
								: onClickDetail(mission.id)
						}
						key={mission.id}
						style={{ marginTop: 50 }}
						disabled={
							!props.isEndGame &&
							((props.target === 'participant' &&
								mission.status_display !== 'IN_PROGRESS') ||
								mission.status_display === 'ENDED')
						}
					>
						{selectedMission.find((item) => item === mission.id) ? (
							<MissionDetail missionInfo={mission} />
						) : (
							<MissionSimple
								missionInfo={mission}
								target={props.target}
								isEndGame={props.isEndGame || false}
							/>
						)}
					</TouchableOpacity>
				))}

				{props.target === 'manager' && (
					<TouchableOpacity onPress={() => onClickCreate()} style={{ marginTop: 50 }}>
						<View
							style={{
								width: 300,
								height: 100,
								borderRadius: 30,
								backgroundColor: whiteColor,
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Text style={{ fontSize: 16, color: timeColor, fontWeight: 'bold' }}>
								새로운 미션 생성하기
							</Text>
						</View>
					</TouchableOpacity>
				)}
			</ScrollView>
		</View>
	);
};

export default RenderMissionList;
