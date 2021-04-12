import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RequestGet } from '../../../common/api/Request';

import { whiteColor } from '../../../common/atom/color';
import {
	HEIGHT_BOTTOMBAR,
	HEIGHT_SCREEN,
	HEIGHT_TOPBAR,
	WIDTH_SCREEN,
} from '../../../common/atom/constants';
import ChatBar from '../../../common/molecule/bar/ChatBar';
import RemovedChatModal from '../../../common/organism/modal/chatList/RemovedChatModal';
import RenderChatting from './RenderChatting';

interface RenderChatServiceProps {
	ws: any;
	chatLog: any;
	roomInfo: any;
	loginUserId: string;
	type: 'manito' | 'public';
	manitoPartyId: number;
	confirmRemovedGame: any;

	getInit: any;
	isChatNext: any;

	setNewMissionList?(res: any): any;
	setNewMissionReceiveModal?(): any;
}

const RenderChatService = (props: RenderChatServiceProps) => {
	const [loadingChat, setLodaingChat] = useState(false);
	const [chatting, setChatting] = useState(props.chatLog);

	const [removedGameNoticeModalVisible, setRemovedGameNoticeModalVisible] = useState(false);

	if (props.ws?.readyState === 1) {
		props.ws.onmessage = async (e: any) => {
			if (loadingChat) return;

			await setLodaingChat(true);
			// a message was received
			await console.log('===receiving at Chat===');

			const JsonData = JSON.parse(e.data);
			await console.log(JsonData);

			if (JsonData.type === 'DOWN') {
				// 실시간 게임종료
				setRemovedGameNoticeModalVisible(true);
			}

			if (JsonData.type === 'MIS') {
				// 실시간 미션받기
				console.log('MIS');
				await props.setNewMissionList(JSON.parse(JsonData.content));
				await props.setNewMissionReceiveModal();
			}

			if (JsonData.type === 'ENTER' || JsonData.type === 'EXIT') {
				props.getInit();
			}

			if (
				JsonData.type === 'TEXT' ||
				JsonData.type === 'IMG' ||
				JsonData.type === 'ENTER' ||
				JsonData.type === 'EXIT'
			) {
				await setChatting([JsonData, ...chatting]);
			}

			await setLodaingChat(false);
		};
	} else {
		console.log(props.ws?.readyState);
	}

	useEffect(() => {
		setChatting(props.chatLog);
	}, []);

	const [loading, setLoading] = useState(false);
	const [isChatNext, setIsChatNext] = useState(props.isChatNext);

	const domainLength = 'https://manito.shop'.length;

	const getChatLog = async () => {
		setLoading(true);
		console.log('===get ChatLog Again===');
		await RequestGet({
			api: isChatNext.slice(domainLength, isChatNext.length),
			func_success: async (res) => {
				await setChatting([...chatting, ...res.results]);
				setIsChatNext(res.next);
				setLoading(false);
			},
			func_fail: () => {
				setLoading(false);
			},
		});
	};

	const onEndReached = async () => {
		if (!(loading || isChatNext === null)) {
			getChatLog();
		}
	};
	return (
		<View style={{ flex: 1, zIndex: 1 }}>
			<KeyboardAwareScrollView
				contentContainerStyle={{
					height: HEIGHT_SCREEN,
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
				}}
			>
				<ChatBar ws={props.ws} manitoPartyId={props.manitoPartyId} type={props.type} />

				<View
					style={{
						zIndex: -1,
						flex: 1,
						marginBottom: HEIGHT_BOTTOMBAR,
						marginTop: HEIGHT_TOPBAR + 50,
						backgroundColor: whiteColor,
					}}
				>
					{chatting && (
						<RenderChatting
							chats={chatting}
							roomInfo={props.roomInfo}
							loginUserId={props.loginUserId}
							type={props.type}
							manitoPartyId={props.manitoPartyId}
							onEndReached={onEndReached}
						/>
					)}
				</View>
			</KeyboardAwareScrollView>

			<RemovedChatModal
				modalVisible={removedGameNoticeModalVisible}
				onCloseModal={() => {
					setRemovedGameNoticeModalVisible(false);
					props.confirmRemovedGame();
				}}
			/>
		</View>
	);
};

export default RenderChatService;
