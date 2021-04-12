import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';
import { useObserver } from 'mobx-react';
import FastImage from 'react-native-fast-image';
import { textColor, timeColor, whiteColor } from '../../atom/color';
import { EditBtnWhite } from '../../atom/icon';
import Images from '../../atom/customImage';
import { EditProfileModal } from '../modal/ManiModal';
import stylesShadow from '../../styles/shadow';
import useStore from '../../../stores/stores';

interface ManiCardShortProps {
	target: 'manito' | 'manitee' | 'user' | 'master';
	user: any;
	manitoParty?: any;
}

const ManiCardShort = (props: ManiCardShortProps) => {
	const [editModalVisible, setEditModalVisible] = useState(false);

	const { ProfileStore } = useStore();

	const title =
		props.target === 'manito'
			? Images.logo.manitoWhite
			: props.target === 'master'
			? Images.logo.masterWhite
			: Images.logo.mynameWhite;

	return useObserver(() => (
		<View style={styles.container}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					height: 60,
					alignItems: 'center',
				}}
			>
				<View style={{ borderBottomColor: timeColor, borderBottomWidth: 1 }}>
					<Image source={title} style={{ width: 160 }} resizeMode="contain" />
				</View>

				<View style={{ position: 'absolute', right: 40 }}>
					<EditBtnWhite onClickBtn={() => setEditModalVisible(true)} />
				</View>
			</View>

			<View
				style={{
					backgroundColor: timeColor,
					height: props.target === 'user' ? 230 : 300,
					borderRadius: 30,
					...stylesShadow.shadowBig,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<View
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						height: 100,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Text style={{ color: whiteColor, fontSize: 12 }}>
						{props.user?.is_new ? 'NEW' : ''}
					</Text>
					<Text style={{ color: whiteColor, fontSize: 20 }}>
						{props.manitoParty?.name}
					</Text>
				</View>

				<View
					style={{
						alignItems: 'center',
						justifyContent: 'center',
						height: 150,
						width: 150,
						borderRadius: 150,
						backgroundColor: whiteColor,
						zIndex: 1,
					}}
				>
					<Image
						source={
							ProfileStore.loading
								? Images.img.loading
								: props.user?.profile?.profile_image_url
								? {
										uri: `${
											props.user?.profile?.profile_image_url
										}?time=${new Date()}`,
								  }
								: Images.img.profileBig
						}
						style={{ height: 120, width: 120, borderRadius: 120 }}
					/>
				</View>

				<View
					style={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						right: 0,
						height: props.target === 'user' ? 60 : 100,
						borderRadius: 30,
						backgroundColor: whiteColor,
						alignItems: 'center',
						justifyContent: 'center',

						...stylesShadow.shadowSmallReverse,
					}}
				>
					{props.user && (
						<Text style={{ fontSize: 16, color: timeColor }}>
							{props.user?.profile?.nickname || null}
						</Text>
					)}
					{props.target !== 'user' && (
						<Text style={{ fontSize: 13, color: textColor, marginTop: 4 }}>
							{props.user?.manitee
								? `당신은 ${props.user.manitee}님의 마니또예요.`
								: '당신은 특별한 마니또장이에요.'}
						</Text>
					)}
				</View>
			</View>

			<Modal
				isVisible={editModalVisible} // isVisible Props에 State 값을 물려주어 On/off control
				useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
				hideModalContentWhileAnimating
				onBackdropPress={() => setEditModalVisible(false)}
				style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}
			>
				<EditProfileModal
					user={props.user}
					target={props.target}
					onClickClose={() => setEditModalVisible(false)}
					manitoPartyId={props.manitoParty?.id}
				/>
			</Modal>
		</View>
	));
};

const styles = StyleSheet.create({
	container: {
		width: 300,
		backgroundColor: timeColor,
		borderRadius: 30,
	},
});

export default ManiCardShort;
