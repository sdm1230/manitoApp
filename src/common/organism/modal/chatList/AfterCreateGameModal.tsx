import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { useObserver } from 'mobx-react';
import NoticeModal from '../template/NoticeModal';

import useStore from '../../../../stores/stores';

const AfterCreateGameModal = () => {
	const { ModalStore } = useStore();

	const [pageIndex, setPageIndex] = useState(0);
	const [contents, setContents] = useState([
		`참가코드 <${ModalStore.createGameModal.gameCode}>가 복사되었어요.`,
		'친구들에게 전송하고 함께 게임을 즐겨요!',
	]);

	const onClickBtn = () => {
		if (pageIndex === 0) {
			setContents([
				'게임방을 위로 스와이프하면 나갈 수 있어요.',
				'게임 진행 중에는 나갈 수 없으니 유의해줘요!',
			]);
			setPageIndex(1);
		} else {
			setInit();
			ModalStore.closeCreateGameModal();
		}
	};

	const setInit = () => {
		setPageIndex(0);
		setContents([
			`참가코드 <${ModalStore.createGameModal.gameCode}>가 복사되었어요.`,
			'친구들에게 전송하고 함께 게임을 즐겨요!',
		]);
	};

	return useObserver(() => (
		<Modal
			isVisible={ModalStore.createGameModal.visible} // isVisible Props에 State 값을 물려주어 On/off control
			useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
			hideModalContentWhileAnimating
			onBackdropPress={() => onClickBtn()}
			style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}
		>
			<NoticeModal contents={contents} onCloseModal={() => onClickBtn()} />
		</Modal>
	));
};

export default AfterCreateGameModal;
