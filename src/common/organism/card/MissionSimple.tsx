import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { textColor, timeColor, whiteColor } from '../../atom/color';
import { EditBtnRed, DetailBtnRed } from '../../atom/icon';

interface MissionSimpleProps {
	missionInfo: any;
	target: 'manager' | 'participant';
	isEndGame: boolean;
}

const MissionSimple = (props: MissionSimpleProps) => {
	const title = () => {
		if (
			props.target === 'participant' &&
			props.missionInfo.status_display === 'READY' &&
			!props.isEndGame
		)
			return `${props.missionInfo.days_before_start}일 뒤에 공개될 예정이에요!`;
		return props.missionInfo.title;
	};

	return (
		<View
			style={{
				width: 306,
				height: 106,
				borderWidth: 1,
				borderRadius: 30,
				borderColor:
					!props.isEndGame && props.missionInfo.status_display === 'IN_PROGRESS'
						? whiteColor
						: timeColor,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<View
				style={{
					width: 300,
					height: 100,
					borderRadius: 30,
					backgroundColor: whiteColor,
					padding: 20,
				}}
			>
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'flex-start',
						flexDirection: 'row',
						opacity:
							!props.isEndGame && props.missionInfo.status_display === 'ENDED'
								? 0.5
								: 1,
					}}
				>
					<Text style={{ color: textColor, fontSize: 16, fontWeight: 'bold' }}>
						{title()}
					</Text>

					<View style={{ position: 'absolute', right: 0 }}>
						{props.target === 'manager' ? (
							props.missionInfo.status_display !== 'ENDED' ? (
								<EditBtnRed onClickBtn={() => {}} />
							) : null
						) : props.isEndGame ||
						  props.missionInfo.status_display === 'IN_PROGRESS' ? (
							<DetailBtnRed onClickBtn={() => {}} />
						) : null}
					</View>
				</View>

				<View
					style={{
						flex: 1,
						justifyContent: 'space-between',
						alignItems: 'flex-end',
						flexDirection: 'row',
						opacity:
							!props.isEndGame && props.missionInfo.status_display === 'ENDED'
								? 0.5
								: 1,
					}}
				>
					<Text style={{ color: timeColor, fontSize: 16 }}>
						{props.missionInfo.start_date}
					</Text>
					<Text style={{ color: timeColor }}>~</Text>
					<Text style={{ color: timeColor, fontSize: 16 }}>
						{props.missionInfo.due_date}
					</Text>
				</View>
			</View>
		</View>
	);
};

export default MissionSimple;
