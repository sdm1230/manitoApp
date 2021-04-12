import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { View, StyleSheet, SafeAreaView } from 'react-native';

import { whiteColor, textColor, chatRoomBackgroundColor, timeColor } from '../../atom/color';
import { CheckBtn, PlusBtn } from '../../atom/icon';
import { HEIGHT_BOTTOMBAR, WIDTH_SCREEN } from '../../atom/constants';
import uploadImage from '../../api/Image/uploadImage';
import { RequestPost } from '../../api/Request';
import createFormData from '../../api/Image/createFormData';

interface ChatBarProps {
	ws: any;
	manitoPartyId: number;
	type: 'public' | 'manito';
}

const ChatBar = (props: ChatBarProps) => {
	const [chat, setChat] = useState('');
	const [loading, setLoading] = useState(false);
	const [imgChat, setImgChat] = useState(null);

	const submitChatMessage = () => {
		if (loading) return;

		setLoading(true);
		console.log('===click send message ===');

		const connection = props.ws.readyState;

		if (connection === 1 && chat.length > 0) {
			console.log('===start send message===');
			props.ws.send(
				JSON.stringify({
					content: chat,
				}),
			); // send a messag
		} else {
			console.log(`Socket Connection State:${connection}`);
		}

		setChat('');
		setLoading(false);
	};

	const postImg = async (img: any) => {
		if (img) {
			console.log('===posting img request===');
			await RequestPost({
				api: `/chatroom/${props.manitoPartyId}/${props.type}/chat/`,
				body: createFormData({ photo: img }),
				func_success: () => {
					setImgChat(null);
					console.log('===posting img sucess===');
				},
				func_fail: () => {
					console.error('===posting img failed===');
				},
			});
		}
	};

	useEffect(() => {
		postImg(imgChat);
	}, [imgChat]);

	return (
		<View style={styles.bottomBar}>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<PlusBtn onClickBtn={() => uploadImage(setImgChat)} />
			</View>

			<View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
				<TextInput
					style={{
						fontSize: 20,
						color: textColor,
						backgroundColor: chatRoomBackgroundColor,
						paddingLeft: 10,
						borderRadius: 6,

						height: 40,
						width: 240,
					}}
					onChangeText={(value: string) => setChat(value)}
					value={chat}
					autoCapitalize="none"
					autoCorrect={false}
					onSubmitEditing={() => submitChatMessage()}
				/>
			</View>

			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<CheckBtn onClickBtn={() => submitChatMessage()} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	bottomBar: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: HEIGHT_BOTTOMBAR,
		flexDirection: 'row',
		width: WIDTH_SCREEN,
		paddingBottom: HEIGHT_BOTTOMBAR > 50 ? 20 : 0,

		backgroundColor: timeColor,
	},
});

export default ChatBar;
