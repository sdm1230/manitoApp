import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Platform, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Modal from 'react-native-modal';

import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ChatRoomStackParamList } from '../PublicChatRouter';
import { ScreenBackgroundHalf } from '../../../../common/organism/background';
import CreateGameBox from '../../../../common/organism/box/CreateGameBox';
import { SetGame } from '../../../../common/atom/btnText/save/SetGame';
import { ModalPageHeader } from '../../../../common/molecule/header/ModalPageHeader';
import NoticeModal from '../../../../common/organism/modal/template/NoticeModal';
import { HEIGHT_SCREEN, WIDTH_SCREEN } from '../../../../common/atom/constants';
import useStore from '../../../../stores/stores';

interface Props {
	navigation: StackNavigationProp<ChatRoomStackParamList, 'EditGame'>;
	route: RouteProp<ChatRoomStackParamList, 'EditGame'>;
}

const EditGameScreen = ({ navigation, route }: Props) => {
	const [gameTitle, setGameTitle] = useState(route.params.partyInfo.name);
	const [gameProfile, setGameProfile] = useState({
		uri: route.params.partyInfo.profile_image_url,
	});
	const [gameQuota, setGameQuota] = useState(String(route.params.partyInfo.quota));

	const [alertModalVisible, setAlertModalVisible] = useState(false);
	const [alertContent, setAlertContent] = useState('');

	const editableQuota = route.params.partyInfo.manito_phase <= 2; // can not change quota after matching(step 3)

	const isCreatable =
		gameTitle?.length > 0 &&
		gameQuota?.length > 0 &&
		gameTitle?.length <= 20 &&
		gameQuota?.length < 3;

	const { GameListStore } = useStore();

	const onEditGame = async () => {
		if (Number(gameQuota) < 4) {
			await setAlertContent('최소정원은 마니또장 포함 4명이에요!');
		} else {
			const success = await GameListStore.editParty(
				route.params.partyInfo.id,
				gameTitle,
				gameProfile,
				gameQuota,
			);

			if (success.isSuccess) {
				setAlertContent('저장되었어요!');
				route.params.getInit();
			} else if (success.response?.status === 400) {
				setAlertContent('동일한 이름의 마니또 게임이 있어요!');
			} else {
				setAlertContent('서버에 문제가 생겼어요! 잠시 후에 시도해주세요.');
			}
		}

		setAlertModalVisible(true);
	};

	return (
		<KeyboardAwareScrollView contentContainerStyle={styles.container}>
			<ScreenBackgroundHalf />

			<View style={{ flex: 1, alignSelf: 'stretch' }}>
				<SafeAreaView>
					<ModalPageHeader
						title="게임방 정보 수정"
						onClickClose={() => navigation.popToTop()}
					/>
				</SafeAreaView>
			</View>

			<CreateGameBox
				editableQuota={editableQuota}
				gameTitle={gameTitle}
				gameQuota={gameQuota}
				gameProfile={gameProfile}
				setGameTitle={(text: string) => setGameTitle(text)}
				setGameQouta={(text: string) => setGameQuota(text)}
				setGameProfile={(img: any) => setGameProfile(img)}
			/>

			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<SetGame onClickBtn={() => onEditGame()} inActive={!isCreatable} mode="edit" />
			</View>

			<Modal
				isVisible={alertModalVisible} // isVisible Props에 State 값을 물려주어 On/off control
				useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
				hideModalContentWhileAnimating
				onBackdropPress={() => setAlertModalVisible(false)}
				style={{ margin: 0, justifyContent: 'flex-end', alignItems: 'center' }}
			>
				<View style={{ height: 300 }}>
					<NoticeModal
						contents={[alertContent]}
						onCloseModal={() => setAlertModalVisible(false)}
					/>
				</View>
			</Modal>
		</KeyboardAwareScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		height: HEIGHT_SCREEN,
		width: WIDTH_SCREEN,
	},
});

export default EditGameScreen;
