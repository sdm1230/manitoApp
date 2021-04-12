import { RouteProp } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
	View,
	StyleSheet,
	Text,
	ScrollView,
	Dimensions,
	Image,
	Alert,
	TouchableOpacity,
} from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import Clipboard from '@react-native-community/clipboard';

import { useObserver } from 'mobx-react';
import { MainTabParamList } from '../MainRouter';

import { timeColor, whiteColor } from '../../../common/atom/color';
import { ScreenBackgroundAlmost } from '../../../common/organism/background';
import GameBox from '../../../common/organism/card/GameBox';
import ImageMiddle from '../../../common/atom/component/Image/ImageMiddle';
import ScrollIndicator from '../../../common/molecule/indicator/ScrollIndicator';
import { DISTANCE_CARD } from '../../../common/atom/constants';
import ClickCodeModal from '../../../common/organism/modal/chatList/ClickCodeModal';
import GuideChatListModal from '../../../common/organism/modal/guideModal/firstUser/GuideChatList/GuideChatList';
import AfterJoinGameModal from '../../../common/organism/modal/chatList/AfterJoinGameModal';
import AfterCreateGameModal from '../../../common/organism/modal/chatList/AfterCreateGameModal';
import { TabHeader } from '../../../common/molecule/header/TabHeader';
import { CrownImg } from '../../../common/atom/icon';

import useStore from '../../../stores/stores';

interface Props {
	navigation: StackNavigationProp<MainTabParamList, 'ChatList'>;
	route: RouteProp<MainTabParamList, 'ChatList'>;
}

const Width = Dimensions.get('screen').width;
const WIDTH_CARD = 300;
const HEIGHT_CARD = 300;

const ChatListScreen = ({ navigation, route }: Props) => {
	const [targetGameIndex, setTargetGameIndex] = useState(0);
	const [duplicateModalVisible, setDuplicateModalVisible] = useState(false);

	const [firstModalVisible, setFirstModalVisible] = useState(false);

	const { UserStore, GameListStore, ModalStore } = useStore();

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', async () => {
			const loadingData = await GameListStore.getAllParty();

			if (loadingData) {
				GameListStore.partyList.length === 0
					? setFirstModalVisible(true)
					: setFirstModalVisible(false);
			} else {
				Alert.alert('일시적인 서버 문제가 생겼어요. 잠시 후에 시도해주세요!');
			}
		});

		return unsubscribe;
	}, [navigation]);

	const body = (gameInfo: any) => {
		return (
			<View style={{ flex: 1 }}>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<CrownImg />
					<View
						style={{
							width: 100,
							height: 100,
							borderRadius: 100,

							shadowColor: '#000000',
							shadowOffset: { width: 0, height: 0 },
							shadowOpacity: 0.14,
							shadowRadius: 15,
						}}
					>
						<ImageMiddle url={gameInfo?.manager?.profile_image_url || null} />
					</View>
				</View>

				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<TouchableOpacity
						onPress={() => {
							Clipboard.setString(gameInfo.code);
							setDuplicateModalVisible(true);
						}}
					>
						{gameInfo.code && (
							<View style={{ flexDirection: 'row' }}>
								{gameInfo.code.split('').map((char: string, index: any) => (
									<View
										style={{
											padding: 5,
											backgroundColor: whiteColor,
											borderRadius: 5,
											marginHorizontal: 3,
										}}
										key={index}
									>
										<Text style={{ color: timeColor, fontSize: 15 }}>
											{char}
										</Text>
									</View>
								))}
							</View>
						)}
					</TouchableOpacity>

					<View style={{ marginTop: 20 }}>
						<Text style={{ fontSize: 24, color: whiteColor }}>{gameInfo.name}</Text>
					</View>
				</View>
			</View>
		);
	};

	const renderGameBox = (gameInfo: any, index: any) => {
		return (
			<GameBox
				key={index}
				gameProfileUrl={gameInfo.profile_image_url}
				onClickLeft={() =>
					route?.params?.stackNavi.navigate('PublicChat', {
						id: gameInfo.id,
						stackNavi: route.params.stackNavi,
					})
				}
				onClickRight={() =>
					route?.params?.stackNavi.navigate('ManitoChat', {
						id: gameInfo.id,
						stackNavi: route.params.stackNavi,
					})
				}
				manitoPartyId={gameInfo.id}
				manitoPhase={gameInfo.manito_phase}
				isManager={gameInfo.manager?.id === UserStore.user.id}
				isNewMessagePublic={gameInfo.has_new_public_message}
				isNewMessageManito={gameInfo.has_new_manito_message}
				gameTitle={gameInfo.name}
			/>
		);
	};

	const handleScroll = (event: any) => {
		const pos = event.nativeEvent.contentOffset.x / event.nativeEvent.contentSize.width;
		console.log(pos + 1 / (2 * GameListStore.partyList.length)); // 스크롤의 중간위치
		setTargetGameIndex(
			Math.floor(
				(pos + 1 / (GameListStore.partyList.length * 2)) * GameListStore.partyList.length,
			),
		);
	};

	return useObserver(() => (
		<View style={styles.container}>
			<ScreenBackgroundAlmost />

			<View
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: 0,
					bottom: 300,
					paddingBottom: 50,
				}}
			>
				<TabHeader title="채팅" />

				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					{GameListStore.partyList.length > 0 &&
						body(GameListStore.partyList[targetGameIndex])}
				</View>
			</View>

			<View
				style={{ position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center' }}
			>
				<View style={{ height: HEIGHT_CARD + 50 }}>
					{GameListStore.partyList.length > 0 && (
						<ScrollView
							onMomentumScrollEnd={(event) => handleScroll(event)}
							horizontal
							showsHorizontalScrollIndicator={false} // 아래 스크롤 정도 표시
							decelerationRate={1} // Disable deceleration : 만약 0으로하면 다시 천천히 스와이프됨
							snapToInterval={WIDTH_CARD + DISTANCE_CARD} // 스크롤 모멘텀
							contentContainerStyle={{
								paddingHorizontal: (Width - WIDTH_CARD - DISTANCE_CARD) / 2,
								alignItems: 'flex-end',
							}}
						>
							{GameListStore.partyList.map((gameInfo, index) =>
								renderGameBox(gameInfo, index),
							)}
						</ScrollView>
					)}
				</View>

				<View style={{ height: 50, justifyContent: 'center' }}>
					<ScrollIndicator
						num={GameListStore.partyList.length}
						target={targetGameIndex}
					/>
				</View>
			</View>

			<ClickCodeModal
				modalVisible={duplicateModalVisible}
				setModalVisible={setDuplicateModalVisible}
			/>
			<GuideChatListModal
				modalVisible={firstModalVisible}
				onCloseModal={() => {
					setFirstModalVisible(false);
					navigation.reset({
						index: 0,
						routes: [
							{
								name: 'HomeRouter',
							},
						],
					});
				}}
			/>
			<AfterCreateGameModal />
			<AfterJoinGameModal />
		</View>
	));
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default ChatListScreen;
