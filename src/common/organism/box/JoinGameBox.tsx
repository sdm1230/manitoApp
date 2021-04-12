import React, { useState } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import useStore from '../../../stores/stores';
import { JoinGameBtn } from '../../atom/btnText/feature/JoinGameBtn';
import { whiteColor } from '../../atom/color';
import InputBox from '../../molecule/input/InputBox';
import NoticeModal from '../modal/template/NoticeModal';

const JoinGameBox = (props: { bottomTabNavi: any; setWarpperVisible: any }) => {
	const [gameCode, setGameCode] = useState('');
	const [alertContent, setAlertContent] = useState('');
	const [alertModalVisible, setAlertModalVisible] = useState(false);

	const { GameListStore, ModalStore } = useStore();

	const onClickJoinParty = async () => {
		const success = await GameListStore.joinParty(gameCode);

		if (success.isSuccess) {
			props.setWarpperVisible(false);
			props.bottomTabNavi.navigation.navigate('ChatList');
			ModalStore.openJoinGameModal();
		} else {
			if (success.response?.status === 400) {
				setAlertContent('이미 입장한 방의 코드를 입력하셨어요!');
			} else if (success.response?.status === 404) {
				setAlertContent('존재하지 않는 코드네요. 다시 확인해봐요!');
			}
			setAlertModalVisible(true);
		}
		setGameCode('');
	};

	return (
		<View
			style={{
				width: 300,
				height: 115,
				backgroundColor: whiteColor,
				borderRadius: 30,
				flexDirection: 'row',
				alignItems: 'center',
			}}
		>
			<View style={{ flex: 3, justifyContent: 'flex-end', flexDirection: 'row' }}>
				<InputBox
					description="참여 코드 입력"
					value={gameCode}
					setValue={(text) => setGameCode(text)}
					maxLength={4}
					maxWidth={100}
				/>
			</View>

			<View style={{ flex: 2, alignItems: 'center', opacity: gameCode ? 1 : 0.5 }}>
				<JoinGameBtn
					onClickBtn={() => onClickJoinParty()}
					inActive={gameCode.length === 0}
				/>
			</View>

			<Modal
				isVisible={alertModalVisible} // isVisible Props에 State 값을 물려주어 On/off control
				useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
				hideModalContentWhileAnimating
				onBackdropPress={() => setAlertModalVisible(false)}
				style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}
			>
				<NoticeModal
					contents={[alertContent]}
					onCloseModal={() => setAlertModalVisible(false)}
				/>
			</Modal>
		</View>
	);
};

export default JoinGameBox;
