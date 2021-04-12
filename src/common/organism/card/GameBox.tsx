import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import GestureRecognizer from 'react-native-swipe-gestures';
import useStore from '../../../stores/stores';
import { whiteColor } from '../../atom/color';
import { ImageBigGra } from '../../atom/component/Image/ImageBig';
import { DISTANCE_CARD } from '../../atom/constants';
import { FreeChatImg, ExitRoomBtn, ManitoChatImg } from '../../atom/icon';
import ExitChatModal from '../modal/chatList/ExitChatModal';
import RemovedChatModal from '../modal/chatList/RemovedChatModal';

interface GameBoxProps {
	manitoPartyId: number;
	gameProfileUrl: any;
	onClickLeft(): any;
	onClickRight(): any;

	manitoPhase: number;

	isManager: boolean;

	isNewMessagePublic: boolean;
	isNewMessageManito: boolean;

	gameTitle: string;
}

const GameBox = (props: GameBoxProps) => {
	const [exitBtnVisible, setExitBtnVisible] = useState(false);
	const [exitRoomModalVisible, setExitRoomModalVisible] = useState(false);

	const [removedAlertVisible, setRemovedAlertVisible] = useState(true);

	const { GameListStore } = useStore();

	const onConfirmRemovedGame = async () => {
		GameListStore.deleteParty(props.manitoPartyId);

		setRemovedAlertVisible(false);
	};

	const newMsgImg = () => {
		return (
			<View
				style={{
					height: 8,
					width: 8,
					borderRadius: 8,
					backgroundColor: 'red',
					position: 'absolute',
					top: 0,
					right: 20,
				}}
			/>
		);
	};

	return (
		<GestureRecognizer
			onSwipeUp={() => setExitBtnVisible(true)}
			onSwipeDown={() => setExitBtnVisible(false)}
			style={{
				alignItems: 'center',
				backgroundColor: whiteColor,
				width: 300,
				borderRadius: 30,
				marginHorizontal: DISTANCE_CARD / 2,

				shadowOffset: { width: 0, height: -5 },
				shadowOpacity: 0.07,
				shadowRadius: 15,
				shadowColor: '#000000',
			}}
		>
			<View style={styles.container}>
				<ImageBigGra url={props.gameProfileUrl} />

				<View
					style={{
						position: 'absolute',
						top: 30,
						bottom: 50,
						left: 30,
						right: 30,
						flexDirection: 'row',
						zIndex: 2,
					}}
				>
					<View
						style={{
							flex: 1,
							alignItems: 'center',
						}}
					>
						<TouchableOpacity
							onPress={() => props.onClickLeft()}
							style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
						>
							<View style={{ width: 80, height: 40, alignItems: 'center' }}>
								{props.isNewMessagePublic && newMsgImg()}

								<FreeChatImg />
								<Text
									style={{ fontSize: 14, fontWeight: 'bold', color: whiteColor }}
								>
									프리 채팅방
								</Text>
							</View>
						</TouchableOpacity>
					</View>

					{props.manitoPhase >= 4 && ( // 4부터 익명채팅방 보이게
						<View
							style={{
								flex: 1,
								alignItems: 'center',
								borderColor: whiteColor,
								borderLeftWidth: 1,
							}}
						>
							<TouchableOpacity
								onPress={() => props.onClickRight()}
								style={{
									flex: 1,
									justifyContent: 'flex-end',
									alignItems: 'center',
								}}
							>
								<View style={{ width: 80, height: 40, alignItems: 'center' }}>
									{props.isNewMessageManito && newMsgImg()}

									<ManitoChatImg />
									<Text
										style={{
											fontSize: 14,
											fontWeight: 'bold',
											color: whiteColor,
										}}
									>
										마니또 게임방
									</Text>
								</View>
							</TouchableOpacity>
						</View>
					)}
				</View>
			</View>

			<View
				style={{
					height: exitBtnVisible ? 50 : 0,
					alignItems: 'center',
					width: 300,
					justifyContent: 'center',
				}}
			>
				<TouchableOpacity
					onPress={() => {
						setExitBtnVisible(false);
						setExitRoomModalVisible(true);
					}}
				>
					<ExitRoomBtn />
				</TouchableOpacity>
			</View>

			<ExitChatModal
				modalVisible={exitRoomModalVisible}
				setModalVisible={setExitRoomModalVisible}
				manitoPartyId={props.manitoPartyId}
				manitoPhase={props.manitoPhase}
				isManager={props.isManager}
			/>

			{props.manitoPhase === 0 && ( // 게임 강제종료시
				<RemovedChatModal
					gameTitle={props.gameTitle}
					modalVisible={removedAlertVisible}
					onCloseModal={() => onConfirmRemovedGame()}
				/>
			)}
		</GestureRecognizer>
	);
};

const styles = StyleSheet.create({
	container: {
		zIndex: 1,
		width: 300,
		height: 300,

		borderRadius: 30,
		backgroundColor: whiteColor,
		marginHorizontal: DISTANCE_CARD / 2,

		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.14,
		shadowRadius: 15,
		shadowColor: '#000000',

		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default GameBox;
