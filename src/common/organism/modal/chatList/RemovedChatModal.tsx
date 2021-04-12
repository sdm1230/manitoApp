import React, { useState } from 'react';
import Modal from 'react-native-modal';
import NoticeModal from '../template/NoticeModal';

interface RemovedChatModalProps {
	modalVisible: boolean;
	onCloseModal(): any;
	gameTitle?: string;
}

const RemovedChatModal = (props: RemovedChatModalProps) => {
	const contents = props.gameTitle
		? [`<${props.gameTitle}>`, '마니또장에 의해 게임이 강제 종료되었어요.']
		: ['마니또장에 의해 게임이 강제 종료되었어요.'];

	return (
		<Modal
			isVisible={props.modalVisible} // isVisible Props에 State 값을 물려주어 On/off control
			useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
			hideModalContentWhileAnimating
			onBackdropPress={() => props.onCloseModal()}
			style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}
		>
			<NoticeModal contents={contents} onCloseModal={() => props.onCloseModal()} />
		</Modal>
	);
};

export default RemovedChatModal;
