import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { timeColor } from '../../../../../atom/color';
import NoticeFocusBigBtnModal from '../../../template/NoticeFocusBigBtnModal';

interface GuideHomeCreateGameModalProps {
	onCloseModal: any;
}

const Width = Dimensions.get('screen').width;

const GuideHomeCreateGameModal = (props: GuideHomeCreateGameModalProps) => {
	const content = '새로운 방을 생성하면 참가 코드를 드려요!';
	const btnTitle = '마니또 게임 생성하기';

	return (
		<View style={{ width: Width, alignItems: 'center', justifyContent: 'center' }}>
			<NoticeFocusBigBtnModal
				contents={[content]}
				onCloseModal={() => props.onCloseModal()}
				btnTitle={btnTitle}
				btnBackColor={timeColor}
			/>
		</View>
	);
};

export default GuideHomeCreateGameModal;
