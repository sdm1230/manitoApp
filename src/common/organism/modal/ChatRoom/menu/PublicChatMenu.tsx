import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native';

import { whiteColor, textColor, chatRoomLineColor } from '../../../../atom/color';
import { LockImg } from '../../../../atom/icon';
import MemberList from '../../../body/MemberList';
import ConfirmManitoInfoModal from '../ConfirmManitoInfoModal';

interface PublicChatMenuProps {
	roomInfo: any;
	navigation: any;
	onCloseModal: any;
	partyInfo: any;
	isManager: boolean;

	getInit: any;
}

const Width = Dimensions.get('screen').width;
const Height = Dimensions.get('screen').height;

function PublicChatMenu(props: PublicChatMenuProps) {
	const matchingBtnInactive = false;
	// props.partyInfo.manito_phase >= 4 || !props.isManager || props.partyInfo.num_members <= 3;
	const resultBtnInactive =
		(props.isManager && props.partyInfo.manito_phase < 4) ||
		(!props.isManager && props.partyInfo.manito_phase < 6);
	const lockVisible = !props.isManager;

	const [confirmManitoInfoVisible, setConfirmManitoInfoVisible] = useState(false);

	return (
		<View style={styles.container}>
			<View style={styles.optionContainer}>
				{props.isManager ? (
					<Text
						style={styles.optionLabel}
						onPress={() => {
							props.onCloseModal();
							props.navigation.navigate('EditGame', {
								partyInfo: props.partyInfo,
								getInit: props.getInit,
							});
						}}
					>
						게임방 정보 수정하기
					</Text>
				) : (
					<Text
						style={styles.optionLabel}
						onPress={() => {
							setConfirmManitoInfoVisible(true);
						}}
					>
						게임방 정보 확인하기
					</Text>
				)}
			</View>

			<View style={styles.optionContainer}>
				<TouchableOpacity
					onPress={() => {
						props.onCloseModal();
						if (props.partyInfo.manito_phase < 3) {
							props.navigation.navigate('Grouping', {
								id: props.partyInfo.id,
								members: props.roomInfo.members,
							});
						} else if (props.partyInfo.manito_phase === 3) {
							props.navigation.navigate('Matching', {
								id: props.partyInfo.id,
							});
						} else {
							console.log(props.partyInfo.manito_phase);
						}
					}}
					disabled={matchingBtnInactive}
					style={{
						opacity: matchingBtnInactive ? 0.5 : 1,
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<Text style={styles.optionLabel}>마니또 매칭하기</Text>
					{lockVisible && <LockImg />}
				</TouchableOpacity>
			</View>

			<View style={styles.optionContainer}>
				<TouchableOpacity
					onPress={() => {
						props.onCloseModal();
						props.navigation.navigate('Result', {
							id: props.partyInfo.id,
						});
					}}
					disabled={resultBtnInactive}
					style={{
						opacity: resultBtnInactive ? 0.5 : 1,
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<Text style={styles.optionLabel}>매칭결과 확인하기</Text>
					{lockVisible && props.partyInfo.manito_phase < 6 && <LockImg />}
				</TouchableOpacity>
			</View>

			<View style={{ ...styles.optionContainer, borderBottomWidth: 0 }}>
				<Text style={styles.optionLabel}>참가자들({props.roomInfo.num_members})</Text>

				<View style={{ marginTop: 10 }}>
					<MemberList members={props.roomInfo.members} />
				</View>
			</View>

			<View
				style={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					height: 90,
					...styles.shadowBox,
					alignItems: 'flex-end',
					justifyContent: 'center',
					paddingRight: 30,
					backgroundColor: whiteColor,
				}}
			/>

			<ConfirmManitoInfoModal
				modalVisible={confirmManitoInfoVisible}
				setModalVisible={setConfirmManitoInfoVisible}
				manitoInfo={props.partyInfo}
				joinedMembers={props.roomInfo.num_members}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: Width * 0.8,
		height: Height * 0.85,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,

		backgroundColor: whiteColor,
		alignItems: 'center',

		padding: 10,
		paddingTop: 20,
	},
	optionContainer: {
		paddingVertical: 18,
		justifyContent: 'center',
		borderBottomColor: chatRoomLineColor,
		borderBottomWidth: 2,
		width: '85%',
	},
	optionLabel: {
		color: textColor,
		fontSize: 16,
	},

	shadowBox: {
		...Platform.select({
			ios: {
				shadowColor: '#000000',
				shadowOffset: {
					width: 0,
					height: 5,
				},
				shadowOpacity: 0.07,
				shadowRadius: 15,
			},
			android: {
				elevation: 10,
			},
		}),
	},
});

export default PublicChatMenu;
