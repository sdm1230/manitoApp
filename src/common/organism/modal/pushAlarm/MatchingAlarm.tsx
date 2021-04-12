import React, { useState } from 'react';
import Modal from 'react-native-modal';
import NoticeModal from '../template/NoticeModal';

interface MatchingAlarmProps {
	modalVisible: boolean;
	setModalVisible: any;
	isManager: boolean;
}

const MatchingAlarm = (props: MatchingAlarmProps) => {
	const content = props.isManager
		? ['김미승님, 수고많으셨어요.', '친구들과 즐거운 시간 보내시길 바라요!']
		: ['당신의 마니띠를 알려줄게요!', '새롭게 개설된 마니또 게임방으로 가볼까요?'];

	return (
		<Modal
			isVisible={props.modalVisible} // isVisible Props에 State 값을 물려주어 On/off control
			useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
			hideModalContentWhileAnimating
			onBackdropPress={() => props.setModalVisible(false)}
			style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}
		>
			<NoticeModal contents={content} onCloseModal={() => props.setModalVisible(false)} />
		</Modal>
	);
};

export default MatchingAlarm;
