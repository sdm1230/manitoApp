import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { whiteColor } from '../../../../../atom/color';
import NoticeFocusBigBtnModal from '../../../template/NoticeFocusBigBtnModal';

interface GuideHomeJoinGameModalProps {
	onCloseModal: any;
}

const Width = Dimensions.get('screen').width;

const GuideHomeJoinGameModal = (props: GuideHomeJoinGameModalProps) => {
	const content = '마니또장에게 받은 참가 코드로 입장해요!';
	const btnTitle = '마니또 게임 입장하기';

	return (
		<View style={{ width: Width, alignItems: 'center', justifyContent: 'center' }}>
			<NoticeFocusBigBtnModal
				contents={[content]}
				onCloseModal={() => props.onCloseModal()}
				btnTitle={btnTitle}
				btnBackColor={whiteColor}
			/>
		</View>
	);
};

export default GuideHomeJoinGameModal;
