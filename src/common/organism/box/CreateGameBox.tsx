import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import uploadImage from '../../api/Image/uploadImage';
import { inputImgColor, textColor, timeColor, whiteColor } from '../../atom/color';
import Images from '../../atom/customImage';
import { PlusImgBtn } from '../../atom/icon';

import { CreatingGameInputNote } from '../../molecule/component/Note';
import InputBox from '../../molecule/input/InputBox';

interface CreateGameBoxProps {
	editableQuota: boolean;
	gameTitle: string;
	setGameTitle(text: string): any;
	gameQuota: string;
	setGameQouta(text: string): any;
	gameProfile: any;
	setGameProfile(img: any): any;
}

const CreateGameBox = (props: CreateGameBoxProps) => {
	const header = () => {
		return (
			<View
				style={{
					flex: 1,
					borderBottomWidth: 1,
					borderBottomColor: timeColor,
					alignItems: 'center',
				}}
			>
				<Text style={{ fontSize: 18, color: timeColor, fontWeight: 'bold' }}>
					게임방 정보
				</Text>
			</View>
		);
	};

	const profileImg = () => {
		return (
			<View
				style={{
					height: 248,
					width: 248,
					padding: 6 / 2,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<View
					style={{
						flex: 1,
						borderRadius: 25,
						backgroundColor: inputImgColor,
						alignSelf: 'stretch',
					}}
				>
					<Image
						source={
							props.gameProfile?.uri
								? { uri: props.gameProfile.uri }
								: Images.img.profileGame
						}
						style={{ width: 242, height: 242, borderRadius: 30 }}
						resizeMode="contain"
					/>
				</View>

				<View
					style={{
						position: 'absolute',
						right: 0,
						bottom: 0,
					}}
				>
					<PlusImgBtn onClickBtn={() => onClickAddProfile()} color={timeColor} />
				</View>
			</View>
		);
	};

	const onClickAddProfile = () => {
		uploadImage(props.setGameProfile);
	};

	const footer = () => {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				{props.editableQuota ? (
					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<View style={{ width: 80, marginHorizontal: 5 }}>
							<InputBox
								description="0"
								value={props.gameQuota}
								setValue={(text) => props.setGameQouta(text)}
								maxLength={2}
							/>
						</View>
						<Text style={{ fontWeight: 'bold', fontSize: 14, color: textColor }}>
							명이 게임에 참여할 예정이예요.
						</Text>
					</View>
				) : (
					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Text style={{ fontWeight: 'bold', fontSize: 14, color: textColor }}>
							{props.gameQuota}명이 게임에 참여할 예정이예요.
						</Text>
					</View>
				)}

				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<CreatingGameInputNote />
				</View>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<View style={{ flex: 1, justifyContent: 'center' }}>{header()}</View>

			<View style={{ flex: 2, justifyContent: 'center' }}>
				<InputBox
					description="게임방 이름을 입력해주세요"
					value={props.gameTitle}
					setValue={(text) => props.setGameTitle(text)}
					maxLength={20}
					maxWidth={225}
				/>
			</View>

			<View style={{ alignItems: 'center', justifyContent: 'flex-end', marginBottom: 10 }}>
				{profileImg()}
			</View>

			<View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
				{footer()}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		zIndex: 1,
		width: 300,
		height: 485,
		paddingHorizontal: 52 / 2,
		paddingTop: 20,
		paddingBottom: 20,
		borderRadius: 30,
		backgroundColor: whiteColor,

		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.07,
		shadowRadius: 15,
		shadowColor: '#000000',
	},
});

export default CreateGameBox;
