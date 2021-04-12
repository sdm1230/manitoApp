import { RouteProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import Modal from 'react-native-modal';

import Clipboard from '@react-native-community/clipboard';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScreenBackgroundHalf } from '../../../common/organism/background';
import { HomeStackParamList } from './HomeRouter';

import CreateGameBox from '../../../common/organism/box/CreateGameBox';
import { SetGame } from '../../../common/atom/btnText/save/SetGame';
import { CreatingGameBtnNote } from '../../../common/molecule/component/Note';
import { ModalPageHeader } from '../../../common/molecule/header/ModalPageHeader';
import NoticeModal from '../../../common/organism/modal/template/NoticeModal';

import { HEIGHT_BOTTOMBAR, HEIGHT_SCREEN, WIDTH_SCREEN } from '../../../common/atom/constants';
import useStore from '../../../stores/stores';

interface Props {
	navigation: StackNavigationProp<HomeStackParamList, 'CreateGame'>;
	route: RouteProp<HomeStackParamList, 'CreateGame'>;
}

const CreateGameScreen = ({ navigation, route }: Props) => {
	const [gameTitle, setGameTitle] = useState('');
	const [gameProfile, setGameProfile] = useState('');
	const [gameQuota, setGameQuota] = useState('');

	const [alertModalVisible, setAlertModalVisible] = useState(false);
	const [alertContent, setAlertContent] = useState('');

	const { GameListStore, ModalStore } = useStore();

	const isCreatable =
		gameTitle.length > 0 &&
		gameQuota.length > 0 &&
		gameTitle.length <= 20 &&
		gameQuota.length < 3;

	async function onCreateGame() {
		if (Number(gameQuota) < 4) {
			await setAlertContent('최소정원은 마니또장 포함 4명이에요!');
			await setAlertModalVisible(true);
		} else {
			const success = await GameListStore.createParty(gameTitle, gameProfile, gameQuota);

			if (success.isSuccess) {
				await Clipboard.setString(success.response?.invitation_code);
				await ModalStore.openCreateGameModal(success.response?.invitation_code);

				await route.params.bottomTabNavi.navigation.reset({
					index: 0,
					routes: [
						{
							name: 'ChatList',
						},
					],
				});
			} else {
				if (success.response?.status === 400) {
					await setAlertContent('동일한 이름의 마니또 게임이 있어요!');
				} else {
					await setAlertContent('서버에 문제가 생겼어요! 잠시 후에 시도해주세요.');
				}
				await setAlertModalVisible(true);
			}
		}
	}

	return (
		<KeyboardAwareScrollView contentContainerStyle={styles.container} scrollEnabled={false}>
			<ScreenBackgroundHalf />

			<View style={{ flex: 1, alignSelf: 'stretch' }}>
				<ModalPageHeader
					onClickBack={() => navigation.goBack()}
					title="마니또 게임방 만들기"
				/>
			</View>

			<CreateGameBox
				gameTitle={gameTitle}
				gameQuota={gameQuota}
				gameProfile={gameProfile}
				setGameTitle={(text) => setGameTitle(text)}
				setGameQouta={(text) => setGameQuota(text)}
				setGameProfile={(img) => setGameProfile(img)}
				editableQuota
			/>

			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<SetGame onClickBtn={() => onCreateGame()} inActive={!isCreatable} mode="create" />

				<View style={{ marginTop: 8 }}>
					<CreatingGameBtnNote />
				</View>
			</View>

			<Modal
				isVisible={alertModalVisible} // isVisible Props에 State 값을 물려주어 On/off control
				useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
				hideModalContentWhileAnimating
				onBackdropPress={() => setAlertModalVisible(false)}
			>
				<NoticeModal
					contents={[alertContent]}
					onCloseModal={() => setAlertModalVisible(false)}
				/>
			</Modal>
		</KeyboardAwareScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		height: HEIGHT_SCREEN - HEIGHT_BOTTOMBAR,
		width: WIDTH_SCREEN,
	},
});

export default CreateGameScreen;
