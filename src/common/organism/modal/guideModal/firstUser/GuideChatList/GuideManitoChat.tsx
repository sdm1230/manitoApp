import React, { useState } from 'react';
import Modal from 'react-native-modal';
import NoticeModal from '../../../template/NoticeModal';

interface GuideManitoChatModalProps {
	modalVisible: boolean;
	setModalVisible: any;
}

const GuideManitoChatModal = (props: GuideManitoChatModalProps) => {
	const content = [
		'마니또장을 제외한 유저들은 익명이에요.',
		'따뜻한 마음을 나누며 마니또를 추리해봐요!',
	];

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

export default GuideManitoChatModal;
