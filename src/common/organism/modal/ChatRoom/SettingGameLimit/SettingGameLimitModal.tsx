import React, { useState } from 'react';
import Modal from 'react-native-modal';
import NoticeModal from '../../template/NoticeModal';
import SelectModal from '../../template/SelectModal';

interface ConfirmMatchingModalProps {
	modalVisible: boolean;
	setModalVisible: any;
}

const ConfirmMatchingModal = (props: ConfirmMatchingModalProps) => {
	const [content, setContent] = useState('게임 종료 시 매칭 결과가 발표돼요!');

	const onClickBtn = () => {};

	return (
		<Modal
			isVisible={props.modalVisible} // isVisible Props에 State 값을 물려주어 On/off control
			useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
			hideModalContentWhileAnimating
			onBackdropPress={() => props.setModalVisible(false)}
			style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}
		>
			<SelectModal
				contents={[content]}
				onCloseModal={() => props.setModalVisible(false)}
				btnTitle="종료"
				onClickBtn={() => onClickBtn()}
			/>
		</Modal>
	);
};

export default ConfirmMatchingModal;