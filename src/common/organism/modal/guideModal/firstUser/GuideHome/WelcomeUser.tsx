import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';
import NoticeModal from '../../../template/NoticeModal';
import GuideHomeModal from './GuideHome';

interface WelComeUserModalProps {
	modalVisible: boolean;
	onCloseModal: any;
	userNickname: string;
}

const WelcomeUserModal = (props: WelComeUserModalProps) => {
	const [guideHomeModalVisible, setGuideHomeModalVisible] = useState(false);

	const content = `${props.userNickname}님, 환영해요!`;

	return (
		<Modal
			isVisible={props.modalVisible} // isVisible Props에 State 값을 물려주어 On/off control
			useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
			hideModalContentWhileAnimating
			onBackdropPress={() => {
				props.onCloseModal();
				setGuideHomeModalVisible(true);
			}}
			style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}
		>
			{!guideHomeModalVisible && (
				<NoticeModal
					contents={[content]}
					onCloseModal={() => {
						setGuideHomeModalVisible(true);
					}}
				/>
			)}
			{guideHomeModalVisible && <GuideHomeModal onCloseModal={() => props.onCloseModal()} />}
		</Modal>
	);
};

export default WelcomeUserModal;
