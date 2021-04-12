import React, { useState, useEffect } from 'react';

import Modal from 'react-native-modal';
import useStore from '../../../../stores/stores';
import NoticeModal from '../template/NoticeModal';
import SelectModal from '../template/SelectModal';

interface ModalProps {
	modalVisible: boolean;
	onCloseModal(): any;
	onClickConfirm(): any;
}

const LeaveUserModal = (props: ModalProps) => {
	const [pageIndex, setPageIndex] = useState(0);
	const [content, setContent] = useState(['탈퇴하시면 모든 정보가 삭제돼요.']);
	const [confirmModalVisible, setConfirmModalVisible] = useState(false);

	const { UserStore } = useStore();

	const onClickBtn = () => {
		if (pageIndex === 0) {
			setContent([
				'친구들의 게임 진행에 피해를 주지 않게',
				'진행중인 게임이 종료되면 자동처리돼요.',
			]);
			setPageIndex(1);
		} else {
			setContent([
				`${UserStore.user.profile.nickname}님, 탈퇴가 접수되었어요!`,
				'최대 6개월의 시간이 소요될 수 있어요.',
			]);
			setConfirmModalVisible(true);
		}
	};

	const getInit = () => {
		setContent(['탈퇴하시면 모든 정보가 삭제돼요.']);
		setPageIndex(0);
	};

	useEffect(() => {
		getInit();
	}, []);

	return (
		<Modal
			isVisible={props.modalVisible} // isVisible Props에 State 값을 물려주어 On/off control
			useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
			hideModalContentWhileAnimating
			onBackdropPress={() => {
				confirmModalVisible ? props.onClickConfirm() : props.onCloseModal();
				getInit();
			}}
			style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}
		>
			{!confirmModalVisible && (
				<SelectModal
					contents={content}
					onCloseModal={() => props.onCloseModal()}
					btnTitle="회원탈퇴"
					onClickBtn={() => onClickBtn()}
				/>
			)}

			{confirmModalVisible && (
				<NoticeModal contents={content} onCloseModal={() => props.onClickConfirm()} />
			)}
		</Modal>
	);
};

export default LeaveUserModal;
