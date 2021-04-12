import { RouteProp } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	StatusBar,
	Dimensions,
	SafeAreaView,
	Alert,
	TouchableOpacity,
} from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import { ChatRoomStackParamList } from '../../PublicChatRouter';
import { timeColor, whiteColor } from '../../../../../common/atom/color';
import { ManiSampleBox } from '../../../../../common/molecule/component/ManiSampleBox';
import { MatchingNote } from '../../../../../common/molecule/component/Note';
import { ModalPageHeader } from '../../../../../common/molecule/header/ModalPageHeader';
import { ManiCycleTable } from '../../../../../common/organism/body/ManiCycleTable';
import { RequestDelete, RequestGet, RequestPut } from '../../../../../common/api/Request';
import ConfirmMatchingModal from '../../../../../common/organism/modal/ChatRoom/Matching/ConfirmMatchingModal';
import ManiSwapBox from '../../../../../common/molecule/component/ManiSwapBox';

const Width = Dimensions.get('screen').width;
const Height = Dimensions.get('screen').height;

const HeightBtn = 50;
const WidthBtn = 300;

interface Props {
	navigation: StackNavigationProp<ChatRoomStackParamList, 'Matching'>;
	route: RouteProp<ChatRoomStackParamList, 'Matching'>;
}

const MatchingScreen = ({ navigation, route }: Props) => {
	const [matched, setMatched] = useState([]);
	const [confirmModal, setConfirmModal] = useState(false);
	const [isModified, setIsModified] = useState(false);

	const [selected, setSelected] = useState([]);

	const onClickUser = (user: any) => {
		if (selected.length === 0) {
			setSelected([user]);
		} else if (selected.length === 1) {
			if (selected[0] === user) {
				setSelected([]);
			} else {
				setSelected([selected[0], user]);
			}
		} else {
			setSelected(selected.filter((selectedUser) => selectedUser !== user));
		}
	};

	const onClickSwap = () => {
		const selectedUserOneIndex = matched.findIndex((member) => member === selected[0]);
		const selectedUserOtherIndex = matched.findIndex((member) => member === selected[1]);

		if (selectedUserOneIndex > selectedUserOtherIndex) {
			setMatched([
				...matched.slice(0, selectedUserOtherIndex),
				selected[0],
				...matched.slice(selectedUserOtherIndex + 1, selectedUserOneIndex),
				selected[1],
				...matched.slice(selectedUserOneIndex + 1, matched.length),
			]);
		} else {
			setMatched([
				...matched.slice(0, selectedUserOneIndex),
				selected[1],
				...matched.slice(selectedUserOneIndex + 1, selectedUserOtherIndex),
				selected[0],
				...matched.slice(selectedUserOtherIndex + 1, matched.length),
			]);
		}
		setSelected([]);
		setIsModified(true);
	};

	const getMatchingResult = async () => {
		await RequestGet({
			api: `/party/${route.params.id}/matching/`,
			func_success: (res) => {
				setMatched(res);
			},
			func_fail: (err) => {
				Alert.alert('데이터를 받아오지 못했어요');
			},
		});
	};

	useEffect(() => {
		getMatchingResult();
	}, []);

	const onClickBack = () => {
		RequestDelete({
			api: `/party/${route.params.id}/matching/`,
			func_success: (res) => {
				navigation.goBack();
			},
			func_fail: (err) => {
				Alert.alert('매칭전으로 돌아가지 못해요.');
			},
		});
	};

	const onClickClose = () => {
		navigation.popToTop();
	};

	const onClickConfirm = () => {
		setConfirmModal(false);

		RequestPut({
			api: `/party/${route.params.id}/matching/`,
			body: {
				is_modified: isModified,
				modified_list: matched.map((member: any) => member.user_id), // 이름바꾸자
			},
			func_success: (res) => {
				navigation.navigate('Result', {
					id: route.params.id,
					modalVisible: true,
				});
			},
		});
	};

	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" />

			<SafeAreaView style={styles.boxContainer}>
				<ModalPageHeader
					title="마니또 매칭결과"
					onClickBack={onClickBack}
					onClickClose={onClickClose}
				/>
				{selected.length === 0 ? (
					<ManiSampleBox />
				) : (
					<ManiSwapBox
						selected={selected}
						onClickSwapBtn={onClickSwap}
						onClickUser={onClickUser}
					/>
				)}

				<MatchingNote />
			</SafeAreaView>

			{matched.length > 0 && (
				<View
					style={{
						position: 'absolute',
						top: Height * 0.6 - 300 / 2,
						left: (Width - 300) / 2,
						height: 300,
						width: 300,
						backgroundColor: whiteColor,
						borderRadius: 30,

						...styles.shadow,
					}}
				>
					<ManiCycleTable
						matchResult={matched}
						size="middle"
						editable
						selected={selected}
						onClickUser={onClickUser}
					/>
				</View>
			)}

			<View
				style={{
					marginTop: 300 / 2 + 20,
					marginLeft: (Width - WidthBtn) / 2,
					alignItems: 'center',
					justifyContent: 'center',
					width: WidthBtn,
					height: HeightBtn,
					borderRadius: 30,

					backgroundColor: timeColor,
					...styles.shadow,
				}}
			>
				<TouchableOpacity
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
					}}
					onPress={() => setConfirmModal(true)}
				>
					<Text style={{ fontSize: 18, color: whiteColor }}>마니또 매칭 확정하기</Text>
				</TouchableOpacity>
			</View>

			<ConfirmMatchingModal
				modalVisible={confirmModal}
				onCloseModal={() => setConfirmModal(false)}
				onClickConfirm={() => onClickConfirm()}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: whiteColor,
	},
	boxContainer: {
		backgroundColor: timeColor,
		height: Height * 0.6,
		borderRadius: 30,
		alignItems: 'center',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'stretch',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
		height: 40,
	},
	tipText: {
		fontSize: 12,
		color: whiteColor,
		marginVertical: 3,
	},
	shadow: {
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 15,
		shadowOpacity: 0.07,
	},
});

export default MatchingScreen;
