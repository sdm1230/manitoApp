import React, { useState } from 'react';
import Modal from 'react-native-modal';
import NoticeModal from '../../template/NoticeModal';

interface NoticeResultModalProps {
	modalVisible: boolean;
	onCloseModal: any;
}

const NoticeResultModal = (props: NoticeResultModalProps) => {
	const [pageIndex, setPageIndex] = useState(0);

	const content1 = ['마니또 매칭이 완료되었어요!'];
	const content2 = [
		'친구들에게는 본인의 마니띠만 알려줄게요!',
		'새롭게 개설된 마니또 게임방으로 가볼까요?',
	];

	return (
		<Modal
			isVisible={props.modalVisible} // isVisible Props에 State 값을 물려주어 On/off control
			useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
			hideModalContentWhileAnimating
			onBackdropPress={() => props.onCloseModal()}
			style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}
		>
			{pageIndex === 0 && (
				<NoticeModal contents={content1} onCloseModal={() => setPageIndex(1)} />
			)}

			{pageIndex === 1 && (
				<NoticeModal contents={content2} onCloseModal={() => props.onCloseModal()} />
			)}
		</Modal>
	);
};

export default NoticeResultModal;
