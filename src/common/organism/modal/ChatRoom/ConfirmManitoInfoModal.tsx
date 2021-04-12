import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import Modal from 'react-native-modal';
import { whiteColor } from '../../../atom/color';
import Images from '../../../atom/customImage';
import NoticeModal from '../template/NoticeModal';

interface ConfirmManitoInfoProps {
	modalVisible: boolean;
	setModalVisible: any;
	manitoInfo: any;
	joinedMembers: number;
}

const ConfirmManitoInfo = (props: ConfirmManitoInfoProps) => {
	const body = (
		<View
			style={{
				backgroundColor: '#000000',
				width: 242,
				height: 242,
				borderRadius: 15,
			}}
		>
			<View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
				<Image
					source={
						props.manitoInfo?.profile_image_url
							? { uri: props.manitoInfo.profile_image_url }
							: Images.img.profileGame
					}
					style={{ width: 242, height: 242, borderRadius: 15, opacity: 0.5 }}
					resizeMode="cover"
				/>
			</View>

			<View style={{ flex: 1, padding: 20 }}>
				<View
					style={{
						flex: 1,
						borderBottomWidth: 1,
						borderBottomColor: whiteColor,
						alignItems: 'center',
						justifyContent: 'center',
						padding: 10,
					}}
				>
					<Text style={{ fontSize: 18, color: whiteColor }}>{props.manitoInfo.name}</Text>
				</View>

				<View style={{ flex: 4, alignItems: 'center', justifyContent: 'flex-end' }}>
					<Text style={{ fontSize: 14, color: whiteColor }}>
						현재 ({props.joinedMembers}/{props.manitoInfo.quota})명이 게임에 들어와
						있어요.
					</Text>
				</View>
			</View>
		</View>
	);

	return (
		<Modal
			isVisible={props.modalVisible} // isVisible Props에 State 값을 물려주어 On/off control
			useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
			hideModalContentWhileAnimating
			onBackdropPress={() => props.setModalVisible(false)}
			style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}
		>
			<NoticeModal body={body} onCloseModal={() => props.setModalVisible(false)} />
		</Modal>
	);
};

export default ConfirmManitoInfo;
