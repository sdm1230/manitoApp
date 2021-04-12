import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import uploadImage from '../../api/Image/uploadImage';
import { masterColor, textColor, timeColor, whiteColor } from '../../atom/color';
import { CloseModalBtn, PlusImgBtn } from '../../atom/icon';
import Images from '../../atom/customImage';

import { ManiPairRow } from '../../molecule/component/ManiPair';
import InputBox from '../../molecule/input/InputBox';
import { CheckConfirmBtn } from '../../atom/btnText/confirm/CheckConfirm';
import CreateConfirmBtn from '../../atom/btnText/confirm/CreateConfrimBtn';
import SaveConfirmBtn from '../../atom/btnText/confirm/SaveConfrimBtn';
import useStore from '../../../stores/stores';

interface ManiCardLongProps {
	type: 'confirm' | 'create' | 'edit';
	target: 'manito' | 'manitee' | 'user' | 'master';
	btnText: string;
	onClickBtn(props?: any): any;
	onClickClose?(): any;
	userProfile?: any;

	manitee?: string;
}

const ManiCardLong = (props: ManiCardLongProps) => {
	const isImgWrapped = props.type === 'confirm' && props.target === 'manito';
	const [imgWrapperVisible, setImgWrapperVisible] = useState(isImgWrapped);

	const [name, setName] = useState(props.userProfile?.nickname || '');
	const [image, setImage] = useState({ uri: props.userProfile?.profile_image_url } || '');

	const { UserStore } = useStore();

	const description = () => {
		if (props.target === 'manito') {
			if (props.type === 'create') return '프로필에서 다시 수정할 수 있어요.';
			if (props.type === 'confirm') return '당신의 마니또를 공개합니다!';
			return `당신은 ${props.manitee}님의 마니또입니다.`;
		}
		if (props.target === 'manitee') {
			return `당신은 ${props.userProfile.nickname}님의 마니또입니다.`;
		}
		if (props.target === 'master') {
			return `당신은 특별한 마니또장이에요.`;
		}
		return '';
	};

	const title =
		props.target === 'manito'
			? Images.logo.manitoRed
			: props.target === 'manitee'
			? Images.logo.maniteeRed
			: props.target === 'master'
			? Images.logo.masterRed
			: Images.logo.mynameRed;

	const header = () => {
		return (
			<View style={{ alignItems: 'center', justifyContent: 'center' }}>
				<Image source={title} style={{ width: 160 }} resizeMode="contain" />
			</View>
		);
	};

	const ImgWrapper = () => {
		return (
			<View
				style={{
					position: 'absolute',
					height: 170,
					width: 170,
					borderRadius: 170,
					justifyContent: 'center',
				}}
			>
				<View
					style={{
						height: 170,
						width: 170,
						borderRadius: 170,
						backgroundColor: 'black',
						opacity: 1,
						position: 'absolute',
					}}
				/>
				<TouchableOpacity
					onPress={() => setImgWrapperVisible(false)}
					style={{
						alignItems: 'center',
						height: 170,
						width: 170,
						borderRadius: 170,
						justifyContent: 'center',
					}}
				>
					<Text style={{ fontWeight: 'bold', color: whiteColor, fontSize: 16 }}>
						마니또
					</Text>
					<Text style={{ fontWeight: 'bold', color: whiteColor, fontSize: 16 }}>
						확인하기
					</Text>
				</TouchableOpacity>
			</View>
		);
	};
	const ImgOpenning = () => {
		return (
			<View
				style={{
					position: 'absolute',
					height: 170,
					width: 170,
					borderRadius: 170,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<View
					style={{
						height: 170,
						width: 170,
						borderRadius: 170,
						backgroundColor: 'black',
						opacity: 0.5,
						position: 'absolute',
					}}
				/>

				<Text style={{ fontWeight: 'bold', color: whiteColor, fontSize: 16 }}>
					{props.userProfile.nickname}
				</Text>
			</View>
		);
	};

	const onClickAddProfile = () => {
		uploadImage(setImage);
	};

	const profileImg = () => {
		return (
			<View
				style={{
					height: 170,
					width: 170,
					borderRadius: 170,
					borderWidth: 3,
					alignItems: 'center',
					justifyContent: 'center',
					borderColor: props.target === 'master' ? timeColor : whiteColor,
					zIndex: 1,
				}}
			>
				<Image
					source={
						image.uri
							? { uri: `${image.uri}?time=${new Date()}` }
							: Images.img.profileBig
					}
					style={{ height: 160, width: 160, borderRadius: 160 }}
				/>

				{isImgWrapped ? (imgWrapperVisible ? ImgWrapper() : ImgOpenning()) : null}

				{props.type !== 'confirm' && (
					<View
						style={{
							position: 'absolute',
							right: 10,
							bottom: 10,
							zIndex: 1,
							padding: 0,
						}}
					>
						<PlusImgBtn onClickBtn={() => onClickAddProfile()} />
					</View>
				)}
			</View>
		);
	};

	const footer = () => {
		if (props.type === 'confirm') {
			return <CheckConfirmBtn onClickBtn={() => props.onClickBtn()} />;
		}
		if (props.type === 'create') {
			return (
				<CreateConfirmBtn
					onClickBtn={() =>
						props.onClickBtn({
							name,
							profile: image,
						})
					}
					title={props.btnText}
				/>
			);
		} // edit
		return (
			<SaveConfirmBtn
				onClickBtn={() =>
					props.onClickBtn({
						name,
						profile: image,
					})
				}
			/>
		);
	};

	const content = () => {
		return props.target === 'master' ? (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text style={{ fontSize: 12, color: timeColor, marginBottom: 5 }}>
					S P E C I A L
				</Text>
				<Text style={{ fontSize: 18, color: timeColor }}>
					{props.userProfile?.nickname}
				</Text>
				<Text style={{ fontSize: 13, color: textColor, marginTop: 3 }}>
					{description()}
				</Text>
			</View>
		) : props.target === 'manito' && props.type === 'confirm' ? (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignSelf: 'stretch',
					alignItems: 'center',
				}}
			>
				{imgWrapperVisible ? (
					<ManiPairRow
						manitoProfile={{ nickname: '마니또' }}
						maniteeProfile={UserStore.user.profile}
					/>
				) : (
					<ManiPairRow
						manitoProfile={props.userProfile}
						maniteeProfile={UserStore.user.profile}
					/>
				)}
			</View>
		) : (
			<View style={{ flex: 1, alignItems: 'center' }}>
				<View
					style={{
						flex: 1,
						width: '70%',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					{props.type !== 'confirm' ? (
						<InputBox
							description="이름을 입력해요."
							value={name}
							setValue={(text) => setName(text)}
							maxLength={10}
						/>
					) : (
						<Text
							style={{
								fontSize: 18,
								fontWeight: 'bold',
								color: textColor,
							}}
						>
							{props.userProfile?.nickname}
						</Text>
					)}
				</View>

				<View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
					<Text style={{ fontSize: 13, color: textColor, marginTop: 3 }}>
						{description()}
					</Text>
				</View>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			{props.type === 'edit' && (
				<View
					style={{
						position: 'absolute',
						right: 20,
						top: 20,
						zIndex: 1,
					}}
				>
					<CloseModalBtn onClickBtn={() => props.onClickClose()} />
				</View>
			)}

			<View style={{ height: 120, alignItems: 'center', justifyContent: 'center' }}>
				{header()}
			</View>

			<View style={{ height: 160, alignItems: 'center', justifyContent: 'center' }}>
				{profileImg()}
			</View>

			<View style={{ height: 120 }}>{content()}</View>

			<View
				style={{
					height: 85,
					alignItems: 'center',
					justifyContent: 'flex-start',
					zIndex: 2,
				}}
			>
				{footer()}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 300,
		height: 485,
		borderRadius: 30,
		backgroundColor: whiteColor,
		zIndex: 1,
	},
});

export default ManiCardLong;
