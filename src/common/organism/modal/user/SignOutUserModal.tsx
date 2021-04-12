import React, { useState } from 'react';

import Modal from 'react-native-modal';
import NoticeModal from '../template/NoticeModal';
import SelectModal from '../template/SelectModal';

interface ModalProps {
	modalVisible: boolean;
	onCloseModal(): any;
	onClickConfirm(): any;
}

const SignOutUserModal = (props: ModalProps) => {
	const [confirmModalVisible, setConfirmModalVisible] = useState(false);
	const [content, setContent] = useState(['정말 로그아웃 하시겠어요?']);

	const onClickBtn = () => {
		setContent(['로그아웃 되었어요.']);
		setConfirmModalVisible(true);
	};

	return (
		<Modal
			isVisible={props.modalVisible} // isVisible Props에 State 값을 물려주어 On/off control
			useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
			hideModalContentWhileAnimating
			onBackdropPress={() =>
				confirmModalVisible ? props.onClickConfirm() : props.onCloseModal()
			}
			style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}
		>
			{!confirmModalVisible && (
				<SelectModal
					contents={content}
					onCloseModal={() => props.onCloseModal()}
					btnTitle="로그아웃"
					onClickBtn={() => onClickBtn()}
				/>
			)}

			{confirmModalVisible && (
				<NoticeModal contents={content} onCloseModal={() => props.onClickConfirm()} />
			)}
		</Modal>
	);
};

export default SignOutUserModal;
