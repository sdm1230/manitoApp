import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import useStore from '../../../../stores/stores';
import NoticeModal from '../template/NoticeModal';
import SelectModal from '../template/SelectModal';

interface ExitChatModalProps {
	manitoPartyId: number;
	modalVisible: boolean;
	setModalVisible: any;

	manitoPhase: number;
	isManager: boolean;
}

const ExitChatModal = (props: ExitChatModalProps) => {
	const availableExit = // 삭제 가능할 때
		props.manitoPhase < 3 ||
		(props.isManager ? props.manitoPhase === 7 : props.manitoPhase >= 6);

	const alertContents = // 삭제불가능할 때
		props.manitoPhase === 6 && props.isManager
			? ['모든 참가자들이 마니또를 확인해야 해요!', '다른 친구들을 위해 조금만 기다려볼까요?']
			: ['게임 종료 이후에 나갈 수 있어요!'];

	// 삭제 가능할 때
	const [pageIndex, setPageIndex] = useState(0);
	const [content, setContent] = useState(['']);
	const [confirmModalVisible, setConfirmModalVisible] = useState(false);

	const { GameListStore } = useStore();

	const getInit = () => {
		if (props.manitoPhase < 3) {
			if (props.isManager) {
				setContent(['지금 나가시면 게임이 사라져요.']);
			} else {
				setContent(['게임 시작되면 다시 입장할 수 없어요.']);
			}
		} else {
			console.log(props.manitoPhase);
			setContent(['정말 나가시겠어요?']);
		}
		setConfirmModalVisible(false);
		setPageIndex(0);
	};

	const onClickBtn = async () => {
		if (props.isManager && pageIndex === 0) {
			setPageIndex(1);
			await setContent(['정말 나가시겠어요?']);
		} else {
			const success = await GameListStore.deleteParty(props.manitoPartyId);

			if (success.isSuccess) {
				setContent(['게임이 삭제되었어요!']);
			} else if (props.manitoPhase === 6) {
				setContent([
					'프리 채팅방에서본인의 마니또를 확인해야',
					'게임방에서 나갈 수 있게 도와줄 수 있어요!',
				]);
			} else {
				setContent(['잠시 뒤에 시도해보세요!']);
			}

			await setConfirmModalVisible(true);
		}
	};

	useEffect(() => {
		getInit();
	}, []);

	const onCloseModal = () => {
		props.setModalVisible(false);
		getInit();
	};

	if (availableExit) {
		return (
			<Modal
				isVisible={props.modalVisible} // isVisible Props에 State 값을 물려주어 On/off control
				useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
				hideModalContentWhileAnimating
				onBackdropPress={() => onCloseModal()}
				style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}
			>
				{!confirmModalVisible && (
					<SelectModal
						contents={content}
						onCloseModal={() => onCloseModal()}
						btnTitle="나가기"
						onClickBtn={() => onClickBtn()}
					/>
				)}

				{confirmModalVisible && (
					<NoticeModal contents={content} onCloseModal={() => onCloseModal()} />
				)}
			</Modal>
		);
	}
	return (
		<Modal
			isVisible={props.modalVisible} // isVisible Props에 State 값을 물려주어 On/off control
			useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
			hideModalContentWhileAnimating
			onBackdropPress={() => props.setModalVisible(false)}
			style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}
		>
			<NoticeModal
				contents={alertContents}
				onCloseModal={() => props.setModalVisible(false)}
			/>
		</Modal>
	);
};

export default ExitChatModal;
