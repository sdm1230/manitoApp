import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import Modal from 'react-native-modal';

import { useObserver } from 'mobx-react';
import { whiteColor } from '../../../common/atom/color';
import { ManitoChatStackParamList } from './ManitoChatRouter';

import { RoomHeader } from '../../../common/molecule/header/RoomHeader';

import { RequestDelete, RequestGet, RequestPost } from '../../../common/api/Request';

import { getAccessToken } from '../../../common/api/Tokening';

import ManitoChatMenu from '../../../common/organism/modal/ChatRoom/menu/ManitoChatMenu';
import ManitoChatRegister from '../../../common/organism/modal/ChatRoom/ManitoChatRegister';
import RenderChatService from '../components/RenderChatService';
import MissionAlarm from '../../../common/organism/modal/pushAlarm/MissionAlarm';
import CurrentMissionModal from '../../../common/organism/modal/ChatRoom/CurrentMissionModal';
import Images from '../../../common/atom/customImage';
import NoticeBar from '../../../common/molecule/bar/NoticeBar';
import { HEIGHT_TOPBAR } from '../../../common/atom/constants';

import useStore from '../../../stores/stores';
import { ConfirmTargetModal } from '../../../common/organism/modal/ManiModal';

interface Props {
	navigation: StackNavigationProp<ManitoChatStackParamList, 'ChatRoom'>;
	route: RouteProp<ManitoChatStackParamList, 'ChatRoom'>;
}

const ManitoChatRoomScreen = ({ navigation, route }: Props) => {
	const [partyInfo, setPartyInfo] = useState({});
	const [roomInfo, setRoomInfo] = useState({});
	const [manitee, setmanitee] = useState({});
	const [content, setConTent] = useState('이곳은 마니또로 활동하는 공간이에요.');

	const [ws, setWs] = useState(null);

	const [menuVisible, setMenuVisible] = useState(false);
	const [registerModalVisible, setRegisterModalVisible] = useState(false);

	const [chatLog, setChatLog] = useState([]);

	const [newMissionList, setNewMissionList] = useState([]);
	const [newMissionReceiveModal, setNewMissionReceiveModal] = useState(false);

	const [currentMissionList, setCurrentMissionList] = useState([]);
	const [currentMissionModalVisible, setCurrentMissionModalVisible] = useState(false);

	const { UserStore } = useStore();

	const getInit = async () => {
		await RequestGet({
			// 마니또파티 정보 얻기
			api: `/party/${route.params.id}/`,
			func_success: async (res) => {
				await setPartyInfo(res);
				if (res.manito_phase === 6 && res.manager.id !== UserStore.user.id) {
					getManito();
				}
			},
		});

		await RequestGet({
			// 방 멤버 정보 얻기
			api: `/chatroom/${route.params.id}/manito/`,
			func_success: async (res) => {
				setRoomInfo(res);
			},
		});
	};

	const getManitee = async () => {
		await RequestGet({
			// 처음 들어왔으면 마니띠 보여주고 아니면 띄우지말고
			api: `/party/${route.params.id}/profile/`,
			func_success: async (res) => {
				if (res.is_joined) {
					console.log('=== 과거에 들어온 적 있음( 익명 프로필 존재 ) ===');
				} else {
					await setmanitee(res.manitee);
					await setRegisterModalVisible(true);
				}
			},
			func_fail: () => {
				Alert.alert('마니띠를 보여줄 수 없어요!');
			},
		});
	};

	const [manito, setManito] = useState(null);
	const [manitoModalVisible, setManitoModalVisible] = useState(false);

	const getManito = async () => {
		// await setManito(UserStore.user);
		// await setManitoModalVisible(true);

		await RequestGet({
			api: `/party/${route.params.id}/result/`,
			func_success: async (res) => {
				if (res.is_check_end_message) {
					console.log('=== 마니또를 이미 확인함 ===');
				} else {
					await setManito(res);
					await setManitoModalVisible(true);
				}
			},
			func_fail: () => {
				Alert.alert('마니또를 보여줄 수 없어요!');
			},
		});
	};

	const getCurrentMissions = async () => {
		await RequestGet({
			// 현재 진행중인 미션 받기
			api: `/party/${route.params.id}/mission/in-progress/`,
			func_success: (res: any) => {
				setCurrentMissionList(res);
			},
		});
	};

	const getNewMissions = async () => {
		console.log('=== get New missions ===');
		await RequestGet({
			// 확인하지 않은 시작한 미션 받기
			api: `/party/${route.params.id}/mission/status/`,
			func_success: async (res) => {
				await setNewMissionList(res);
				if (res.length > 0) {
					await setNewMissionReceiveModal(true);
				}
			},
		});
	};

	const [isChatNext, setIsChatNext] = useState(null);
	const [countChat, setCountChat] = useState(0);

	const getChatLog = async (pageChat: number) => {
		console.log(`===get ChatLog ===Page${pageChat}`);
		await RequestGet({
			api: `/chatroom/${route.params.id}/manito/chat/?page=${pageChat}`,
			func_success: async (res) => {
				await setChatLog(res.results);
				setIsChatNext(res.next);
				setCountChat(res.count);
			},
			func_fail: () => {},
		});
	};

	const url = `wss://manito.shop/ws/chat/${route.params.id}/manito`;

	const openSocket = async () => {
		const token = await getAccessToken();

		await console.log('===socket connect start===');

		setWs(new WebSocket(`${url}?token=${token}`));
	};

	const confirmRemovedGame = () => {
		route.params.stackNavi.replace('Main');
	};

	const confirmNewMissions = async () => {
		getCurrentMissions();
		await RequestPost({
			api: `/party/${route.params.id}/mission/status/`,
			body: {},
			func_success: async () => {
				await setNewMissionReceiveModal(false);
				await setNewMissionList([]);
				await navigation.navigate('MissionList', {
					manitoPartyId: route.params.id,
					isEndGame: partyInfo.manito_phase >= 6,
				});
			},
			func_fail: () => {
				setNewMissionReceiveModal(false);
			},
		});
	};

	useEffect(() => {
		// 마운트 되고 한 번만 실행

		getNewMissions();

		getManitee();
		openSocket();
	}, []);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getInit();
			getCurrentMissions();
			getChatLog(1);
		});

		return unsubscribe;
	}, [navigation]);

	useEffect(() => {
		// componentWillUnMount
		return () => {
			console.log('===close ManitoChatRoomScreen===');
			console.log('===close socket===');
			ws?.close();
			setMenuVisible(false);
		};
	}, []);

	const [fetching, setFetching] = useState(true);
	const loadContent = async () => {
		await setFetching(false);

		await RequestGet({
			api: `/party/${route.params.id}/notice/`,
			func_success: (res) => {
				setConTent(res.content);

				setTimeout(async () => {
					setFetching(true);
				}, 600 * 1000);
			},
		});
	};

	useEffect(() => {
		if (fetching) {
			loadContent();
		}
	}, [fetching]);

	return useObserver(() => (
		<View style={styles.container}>
			<RoomHeader
				title={partyInfo.name || ''}
				category="익명 채팅방"
				onClickBack={() => navigation.goBack()}
				onClickList={() => setMenuVisible(true)}
				numMembers={roomInfo.num_members}
			/>

			{content?.length > 0 && (
				<View
					style={{
						position: 'absolute',
						top: HEIGHT_TOPBAR,
						left: 0,
						right: 0,

						alignItems: 'center',
						paddingTop: 10,
					}}
				>
					<NoticeBar content={content} />
				</View>
			)}

			{chatLog.length > 0 && (isChatNext !== null || (countChat > 0 && countChat <= 50)) && (
				<RenderChatService
					ws={ws}
					roomInfo={roomInfo}
					loginUserId={UserStore.user.id}
					chatLog={chatLog}
					type="manito"
					manitoPartyId={route.params.id}
					confirmRemovedGame={confirmRemovedGame}
					setNewMissionList={(res: any) => setNewMissionList(res)}
					setNewMissionReceiveModal={() => setNewMissionReceiveModal(true)}
					getInit={getInit}
					isChatNext={isChatNext}
				/>
			)}

			{currentMissionList.length > 0 && (
				<View style={{ position: 'absolute', right: 20, bottom: 90, zIndex: 1 }}>
					<TouchableOpacity onPress={() => setCurrentMissionModalVisible(true)}>
						<Image
							source={Images.btn.heart}
							style={{ width: 30, height: 30 }}
							resizeMode="contain"
						/>
					</TouchableOpacity>
				</View>
			)}

			<View>
				<Modal
					isVisible={menuVisible} // isVisible Props에 State 값을 물려주어 On/off control
					useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
					hideModalContentWhileAnimating
					onBackdropPress={() => setMenuVisible(false)}
					style={{ alignItems: 'center', justifyContent: 'flex-end', marginBottom: 0 }}
				>
					{roomInfo?.num_members > 0 && (
						<ManitoChatMenu
							roomInfo={roomInfo}
							navigation={navigation}
							onCloseModal={() => setMenuVisible(false)}
							partyInfo={partyInfo}
							isManager={partyInfo.manager?.id === UserStore.user.id}
						/>
					)}
				</Modal>

				<Modal
					isVisible={currentMissionModalVisible} // isVisible Props에 State 값을 물려주어 On/off control
					useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
					hideModalContentWhileAnimating
					onBackdropPress={() => setCurrentMissionModalVisible(false)}
					style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}
				>
					<CurrentMissionModal
						currentMissionList={currentMissionList}
						onCloseModal={() => setCurrentMissionModalVisible(false)}
					/>
				</Modal>

				<Modal
					isVisible={registerModalVisible} // isVisible Props에 State 값을 물려주어 On/off control
					useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
					hideModalContentWhileAnimating
					style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}
				>
					<ManitoChatRegister
						id={route.params.id}
						manitee={manitee}
						onCloseModal={() => {
							getInit();
							getChatLog();
							setRegisterModalVisible(false);
						}}
					/>
				</Modal>

				<Modal
					isVisible={newMissionReceiveModal} // isVisible Props에 State 값을 물려주어 On/off control
					useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
					hideModalContentWhileAnimating
					onBackdropPress={() => confirmNewMissions()}
					style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}
				>
					<MissionAlarm
						newMissionList={newMissionList}
						onCloseModal={() => confirmNewMissions()}
					/>
				</Modal>

				<Modal
					isVisible={manitoModalVisible} // isVisible Props에 State 값을 물려주어 On/off control
					useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
					hideModalContentWhileAnimating
					style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}
				>
					{manito && (
						<ConfirmTargetModal
							user={manito}
							target="manito"
							onClickClose={() => {
								setManitoModalVisible(false);
								RequestDelete({
									api: `/party/${route.params.id}/result/`,
								});
							}}
						/>
					)}
				</Modal>
			</View>
		</View>
	));
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: whiteColor,
	},
});

export default ManitoChatRoomScreen;
