import React, { useState } from 'react';
import Modal from 'react-native-modal';
import NoticeModal from '../../template/NoticeModal';
import SelectModal from '../../template/SelectModal';

interface ConfirmMatchingModalProps {
	modalVisible: boolean;
	onCloseModal(): any;
	onClickConfirm(): any;
}

const ConfirmMatchingModal = (props: ConfirmMatchingModalProps) => {
	const content = '매칭 확정 후에는 수정을 할 수 없어요!';

	return (
		<Modal
			isVisible={props.modalVisible} // isVisible Props에 State 값을 물려주어 On/off control
			useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
			hideModalContentWhileAnimating
			onBackdropPress={() => props.onCloseModal()}
			style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}
		>
			<SelectModal
				contents={[content]}
				onCloseModal={() => props.onCloseModal()}
				btnTitle="매칭"
				onClickBtn={() => props.onClickConfirm()}
			/>
		</Modal>
	);
};

export default ConfirmMatchingModal;
