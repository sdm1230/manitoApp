import React from 'react';
import { View, Text } from 'react-native';
import { textColor, textColorFaint, timeColor, whiteColor } from '../../atom/color';
import { CloseModalBtn } from '../../atom/icon';

interface MissionDetailProps {
	missionInfo: any;

	// 모달일 경우
	isModal?: boolean;
}

const MissionDetail = (props: MissionDetailProps) => {
	return (
		<View
			style={{
				width: 306,
				height: 306,
				borderWidth: props.isModal ? 0 : 1,
				borderRadius: 30,
				borderColor: whiteColor,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<View
				style={{
					width: 300,
					height: 300,
					borderRadius: 30,
					backgroundColor: whiteColor,
					paddingHorizontal: 20,
				}}
			>
				<View
					style={{
						height: 60,
						borderBottomColor: timeColor,
						borderBottomWidth: 1,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Text style={{ color: timeColor, fontSize: 20 }}>
						{props.missionInfo.title}
					</Text>
				</View>

				<View style={{ height: 150, justifyContent: 'center', paddingLeft: 20 }}>
					<Text style={{ color: textColor, fontSize: 18 }}>
						{props.missionInfo.content}
					</Text>
				</View>

				<View
					style={{
						height: 30,
						alignItems: 'flex-end',
						flexDirection: 'row',
						justifyContent: 'center',
					}}
				>
					<Text style={{ color: timeColor, fontSize: 16 }}>
						{props.missionInfo.due_date}
					</Text>
					<Text style={{ color: timeColor, fontSize: 13, marginLeft: 10 }}>
						자정까지 완료해주셔야해요 !
					</Text>
				</View>

				<View style={{ height: 60, alignItems: 'center', justifyContent: 'center' }}>
					<Text style={{ color: textColorFaint, fontWeight: 'bold', fontSize: 11 }}>
						게임방 상단에 미션 종료까지 남은 시간을 공지해드려요!
					</Text>
				</View>
			</View>
		</View>
	);
};

export default MissionDetail;
