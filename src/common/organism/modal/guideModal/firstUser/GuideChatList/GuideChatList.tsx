import React, { useState } from 'react';
import Modal from 'react-native-modal';
import NoticeModal from '../../../template/NoticeModal';

interface GuideChatListModalProps {
	modalVisible: boolean;
	onCloseModal(): any;
}

const GuideChatListModal = (props: GuideChatListModalProps) => {
	const contents = ['아직 참가하는 게임이 없어요.', '방을 생성하고 친구들을 초대해볼까요?'];

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

export default GuideChatListModal;
