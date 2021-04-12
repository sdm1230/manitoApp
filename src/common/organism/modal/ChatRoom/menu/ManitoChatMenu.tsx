import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Image,
	Platform,
	TouchableOpacity,
} from 'react-native';

import { whiteColor, textColor, chatRoomLineColor } from '../../../../atom/color';
import { LockImg } from '../../../../atom/icon';
import MemberList from '../../../body/MemberList';
import ConfirmGameLimitModal from '../ConfirmGameLimitModal';

interface ManitoChatMenuProps {
	roomInfo: any;
	navigation: any;
	onCloseModal: any;
	partyInfo: any;
	isManager: boolean;
}

const Width = Dimensions.get('screen').width;
const Height = Dimensions.get('screen').height;

function ManitoChatMenu(props: ManitoChatMenuProps) {
	const lockVisible = !props.isManager;
	const disabledSetLimit = props.partyInfo.manitoPhase >= 6;

	const [confirmGameLimitVisible, setConfirmGameLimitVisible] = useState(false);

	return (
		<View style={styles.container}>
			<View style={styles.optionContainer}>
				{lockVisible ? (
					<Text
						style={styles.optionLabel}
						onPress={() => {
							setConfirmGameLimitVisible(true);
						}}
					>
						게임 종료일 확인하기
					</Text>
				) : (
					<TouchableOpacity
						onPress={() => {
							props.onCloseModal();
							props.navigation.navigate('SettingLimit', {
								manitoPartyId: props.partyInfo.id,
								dueDate: props.partyInfo.due_date,
							});
						}}
						disabled={disabledSetLimit}
						style={{
							opacity: disabledSetLimit ? 0.5 : 1,
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<Text style={styles.optionLabel}>게임 종료일 설정하기</Text>
						{disabledSetLimit && <LockImg />}
					</TouchableOpacity>
				)}
			</View>

			<View style={styles.optionContainer}>
				<TouchableOpacity
					onPress={() => {
						props.onCloseModal();
						props.navigation.navigate('ManageMission', {
							manitoPartyId: props.partyInfo.id,
						});
					}}
					disabled={props.partyInfo.manitoPhase >= 6 || lockVisible}
					style={{
						opacity: lockVisible ? 0.5 : 1,
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<Text style={styles.optionLabel}>미션 관리</Text>
					{lockVisible && <LockImg />}
				</TouchableOpacity>
			</View>

			<View style={styles.optionContainer}>
				<Text
					style={styles.optionLabel}
					onPress={() => {
						props.onCloseModal();
						props.navigation.navigate('MissionList', {
							manitoPartyId: props.partyInfo.id,
							isEndGame: props.partyInfo.manitoPhase >= 6,
						});
					}}
				>
					미션 목록
				</Text>
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

			<ConfirmGameLimitModal
				modalVisible={confirmGameLimitVisible}
				setModalVisible={setConfirmGameLimitVisible}
				gameLimit={props.partyInfo.due_date}
				isSetDue={props.partyInfo.is_due_selected}
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

export default ManitoChatMenu;
