import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CloseModalBtn } from '../../../../../atom/icon';
import ScrollIndicator from '../../../../../molecule/indicator/ScrollIndicator';
import GuideHomeCreateGameModal from './GuideHomeCreateGame';
import GuideHomeJoinGameModal from './GuideHomeJoinGame';

interface GuideHomeModalProps {
	onCloseModal: any;
}

const Height = Dimensions.get('screen').height;

const GuideHomeModal = (props: GuideHomeModalProps) => {
	const pageNum = 2;
	const [targetPageIndex, setTargetPageIndex] = useState(0);

	const handleScroll = (event: any) => {
		const pos = event.nativeEvent.contentOffset.x / event.nativeEvent.contentSize.width;
		console.log(pos + 1 / (2 * pageNum)); // 스크롤의 중간위치
		setTargetPageIndex(Math.floor((pos + 1 / (pageNum * 2)) * pageNum));
	};

	return (
		<View style={{ flex: 1, alignItems: 'center' }}>
			<View style={{ position: 'absolute', right: 50, top: 100, zIndex: 2 }}>
				<CloseModalBtn onClickBtn={() => props.onCloseModal()} />
			</View>

			<View style={{ flex: 1 }}>
				<ScrollView
					onMomentumScrollEnd={(event) => handleScroll(event)}
					horizontal
					showsHorizontalScrollIndicator={false} // 아래 스크롤 정도 표시
					decelerationRate={0} // Disable deceleration
					pagingEnabled
				>
					<GuideHomeCreateGameModal onCloseModal={props.onCloseModal} />
					<GuideHomeJoinGameModal onCloseModal={props.onCloseModal} />
				</ScrollView>
			</View>

			<View style={{ alignItems: 'center', position: 'absolute', bottom: Height * 0.1 }}>
				<ScrollIndicator num={pageNum} target={targetPageIndex} />
			</View>
		</View>
	);
};

export default GuideHomeModal;
