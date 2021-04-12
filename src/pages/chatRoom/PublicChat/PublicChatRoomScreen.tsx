import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import jwt_decode from 'jwt-decode';
import Modal from 'react-native-modal';
import { useObserver } from 'mobx-react';
import { ChatRoomStackParamList } from './PublicChatRouter';

import { RoomHeader } from '../../../common/molecule/header/RoomHeader';
import NoticeBar from '../../../common/molecule/bar/NoticeBar';

import { whiteColor } from '../../../common/atom/color';
import { RequestGet } from '../../../common/api/Request';
import { HEIGHT_TOPBAR } from '../../../common/atom/constants';

import { getAccessToken } from '../../../common/api/Tokening';

import PublicChatMenu from '../../../common/organism/modal/ChatRoom/menu/PublicChatMenu';
import RenderChatService from '../components/RenderChatService';

import useStore from '../../../stores/stores';

interface Props {
	navigation: StackNavigationProp<ChatRoomStackParamList, 'ChatRoom'>;
	route: RouteProp<ChatRoomStackParamList, 'ChatRoom'>;
}

const PublicChatRoomScreen = ({ navigation, route }: Props) => {
	const [partyInfo, setPartyInfo] = useState({});
	const [roomInfo, setRoomInfo] = useState({});
	const [chatLog, setChatLog] = useState([]);
	const [content, setConTent] = useState('공지 메시지입니다');
	const [ws, setWs] = useState(null);

	const [isManager, setIsManager] = useState(false);

	const [menuVisible, setMenuVisible] = useState(false);

	// const [pageChat,setPageChat] = useState(1);

	const { UserStore } = useStore();

	const getInit = async () => {
		console.log('===get initial data===');

		await RequestGet({
			api: `/party/${route.params.id}/`,
			func_success: async (res) => {
				await setIsManager(res.manager?.id === UserStore.user.id);
				await setPartyInfo(res);
			},
		});

		await RequestGet({
			api: `/chatroom/${route.params.id}/public/`,
			func_success: async (res) => {
				setRoomInfo(res);
			},
		});
	};

	const [isChatNext, setIsChatNext] = useState(null);
	const [countChat, setCountChat] = useState(0);

	const getChatLog = async (pageChat: number) => {
		console.log(`===get ChatLog ===Page${pageChat}`);
		await RequestGet({
			api: `/chatroom/${route.params.id}/public/chat/?page=${pageChat}`,
			func_success: async (res) => {
				await setChatLog(res.results);
				setIsChatNext(res.next);
				setCountChat(res.count);
			},
			func_fail: () => {},
		});
	};

	const url = `wss://manito.shop/ws/chat/${route.params.id}/public`;

	const openSocket = async () => {
		const token = await getAccessToken();

		await console.log('===socket connect start===');

		setWs(new WebSocket(`${url}?token=${token}`));
	};

	const confirmRemovedGame = () => {
		route.params.stackNavi.replace('Main');
	};

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getInit();
			getChatLog(1);
		});

		return unsubscribe;
	}, [navigation]);

	useEffect(() => {
		// 마운트 되고 한 번만 실행

		openSocket();
	}, []);

	useEffect(() => {
		if (partyInfo.num_members > 0) {
			if (partyInfo.manito_phase < 4) {
				if (partyInfo.quota > partyInfo.num_members) {
					if (isManager) {
						setConTent(
							`기대했던 인원보다는 ${
								partyInfo.quota - partyInfo.num_members
							}명이 덜 들어왔어요.`,
						);
					} else {
						setConTent(`아직 입장하지 않은 친구들이 있어요!`);
					}
				} else if (partyInfo.quota === partyInfo.num_members) {
					if (isManager) {
						setConTent('채팅방 메뉴에서 마니또 매칭을 해보세요!');
					} else {
						setConTent(`마니또장이 매칭하면 마니또 게임방에서 게임이 시작돼요.`);
					}
				} else if (isManager) {
					setConTent('설정된 인원보다 많은 인원이 들어와 있어요.');
				} else {
					setConTent(`마니또장이 매칭하면 마니또 게임방에서 게임이 시작돼요.`);
				}
			} else if (partyInfo.manito_phase < 6) {
				if (isManager) {
					setConTent('게임방 목록에 새롭게 생긴 마니또 게임방으로 가볼까요?');
				} else {
					setConTent('게임방 목록에 새롭게 생긴 마니또 게임방으로 가볼까요?');
				}
			} else if (isManager) {
				setConTent('게임이 종료됐어요. 마니또장의 역할을 잘 수행해줘서 고마워요.');
			} else {
				setConTent(`게임이 종료됐어요. 마니또에게 감사의 인사를 건네볼까요?`);
			}
		}
	}, [partyInfo, isManager]);

	useEffect(() => {
		// componentWillUnMount
		return () => {
			console.log('===close PublicChatRoomScreen===');
			console.log('===close socket===');
			ws?.close();
			setMenuVisible(false);
		};
	}, []);

	return useObserver(() => (
		<View style={styles.container}>
			<RoomHeader
				title={partyInfo?.name || ''}
				category="프리 채팅방"
				onClickBack={() => navigation.goBack()}
				onClickList={() => setMenuVisible(true)}
				numMembers={roomInfo?.num_members}
			/>

			<View
				style={{
					position: 'absolute',
					top: HEIGHT_TOPBAR,
					left: 0,
					right: 0,

					alignItems: 'center',
					paddingTop: 10,
					zIndex: 2,
				}}
			>
				<NoticeBar content={content} />
			</View>

			{chatLog.length > 0 && (isChatNext !== null || (countChat > 0 && countChat <= 50)) && (
				<RenderChatService
					ws={ws}
					roomInfo={roomInfo}
					loginUserId={UserStore.user.id}
					chatLog={chatLog}
					type="public"
					manitoPartyId={route.params.id}
					confirmRemovedGame={confirmRemovedGame}
					getInit={getInit}
					isChatNext={isChatNext}
				/>
			)}

			<Modal
				isVisible={menuVisible} // isVisible Props에 State 값을 물려주어 On/off control
				useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
				hideModalContentWhileAnimating
				onBackdropPress={() => setMenuVisible(false)}
				style={{ alignItems: 'center', justifyContent: 'flex-end', margin: 0 }}
			>
				{roomInfo?.num_members > 0 && (
					<PublicChatMenu
						roomInfo={roomInfo}
						navigation={navigation}
						onCloseModal={() => setMenuVisible(false)}
						partyInfo={partyInfo}
						isManager={partyInfo.manager?.id === UserStore.user.id}
						getInit={getInit}
					/>
				)}
			</Modal>
		</View>
	));
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: whiteColor,
	},
});

export default PublicChatRoomScreen;
