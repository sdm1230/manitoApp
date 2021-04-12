import React, { useState } from 'react';
import Modal from 'react-native-modal';
import NoticeModal from '../template/NoticeModal';

interface ClickCodeModalProps {
	modalVisible: boolean;
	setModalVisible: any;
}

const ClickCodeModal = (props: ClickCodeModalProps) => {
	const contents = ['참가 코드가 복사되었어요.', '친구들에게 전송하고 함께 게임을 즐겨요!'];

	return (
		<Modal
			isVisible={props.modalVisible} // isVisible Props에 State 값을 물려주어 On/off control
			useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
			hideModalContentWhileAnimating
			onBackdropPress={() => props.setModalVisible(false)}
			style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}
		>
			<NoticeModal contents={contents} onCloseModal={() => props.setModalVisible(false)} />
		</Modal>
	);
};

export default ClickCodeModal;
