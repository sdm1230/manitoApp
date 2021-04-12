import React, { useState } from 'react';
import Modal from 'react-native-modal';
import NoticeModal from '../../template/NoticeModal';
import SelectModal from '../../template/SelectModal';

interface ConfirmGameLimitProps {
	modalVisible: boolean;
	setModalVisible: any;
	limit: string;
}

const ConfirmGameLimit = (props: ConfirmGameLimitProps) => {
	const contents = [
		`${props.limit.split(' ')[0].split('-')[0]}년 ${
			props.limit.split(' ')[0].split('-')[1]
		}월 ${props.limit.split(' ')[0].split('-')[2]}일 ${props.limit.split(' ')[1]}시`,
		'에 게임 종료 후 매칭 결과가 공개돼요.',
	];

	return (
		<Modal
			isVisible={props.modalVisible} // isVisible Props에 State 값을 물려주어 On/off control
			useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
			hideModalContentWhileAnimating
			onBackdropPress={() => props.setModalVisible(false)}
			style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}
		>
			<NoticeModal contents={contents} onCloseModal={() => props.setModalVisible(false)} />
		</Modal>
	);
};

export default ConfirmGameLimit;
