import React, { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { timeColor } from '../../../atom/color';
import Images from '../../../atom/customImage';
import ScrollIndicator from '../../../molecule/indicator/ScrollIndicator';
import MissionDetail from '../../card/MissionDetail';

interface CurrentMissionModalProps {
	currentMissionList: any;
	onCloseModal(): any;
}

const CurrentMissionModal = (props: CurrentMissionModalProps) => {
	const pageNum = props.currentMissionList.length;
	const [targetPageIndex, setTargetPageIndex] = useState(0);

	const handleScroll = (event: any) => {
		const pos = event.nativeEvent.contentOffset.x / event.nativeEvent.contentSize.width;
		console.log(pos + 1 / (2 * pageNum)); // 스크롤의 중간위치
		setTargetPageIndex(Math.floor((pos + 1 / (pageNum * 2)) * pageNum));
	};

	return (
		<View
			style={{
				borderRadius: 30,
				alignItems: 'center',
				justifyContent: 'center',
				height: 450,
				width: 306,
			}}
		>
			<View
				style={{
					width: 90,
					height: 90,
					borderRadius: 90,
					backgroundColor: timeColor,

					alignItems: 'center',
					justifyContent: 'center',

					/*
					shadowColor: '#FF7856',
					shadowOffset: { height: 0, width: 0 },
					shadowOpacity: 1,
					shadowRadius: 15,
					*/
				}}
			>
				<Image source={Images.logo.appLogo} style={{ height: 90, width: 90 }} />
			</View>

			<ScrollView
				onMomentumScrollEnd={(event) => handleScroll(event)}
				horizontal
				showsHorizontalScrollIndicator={false} // 아래 스크롤 정도 표시
				decelerationRate={0} // Disable deceleration
				pagingEnabled
				style={{ marginVertical: 20, height: 306 }}
			>
				{props.currentMissionList.map((missionInfo: any, index: any) => (
					<MissionDetail missionInfo={missionInfo} isModal key={index} />
				))}
			</ScrollView>

			<ScrollIndicator num={pageNum} target={targetPageIndex} />
		</View>
	);
};

export default CurrentMissionModal;
