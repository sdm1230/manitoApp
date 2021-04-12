import { useObserver } from 'mobx-react';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import useStore from '../../../../stores/stores';
import NoticeModal from '../template/NoticeModal';

const AfterJoinGameModal = () => {
	const { ModalStore } = useStore();

	const [pageIndex, setPageIndex] = useState(0);
	const [contents, setContents] = useState([
		'게임방 목록에 게임이 추가되었어요!',
		'프리 채팅방에서 다른 친구들을 기다려봐요!',
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
			ModalStore.closeJoinGameModal();
		}
	};

	const setInit = () => {
		setPageIndex(0);
		setContents([
			'게임방 목록에 게임이 추가되었어요!',
			'프리 채팅방에서 다른 친구들을 기다려봐요!',
		]);
	};

	return useObserver(() => (
		<Modal
			isVisible={ModalStore.joinGameModal.visible} // isVisible Props에 State 값을 물려주어 On/off control
			useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
			hideModalContentWhileAnimating
			onBackdropPress={() => onClickBtn()}
			style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}
		>
			<NoticeModal contents={contents} onCloseModal={() => onClickBtn()} />
		</Modal>
	));
};

export default AfterJoinGameModal;
