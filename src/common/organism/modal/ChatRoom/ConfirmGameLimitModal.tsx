import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { textColor, timeColor, whiteColor } from '../../../atom/color';
import NoticeModal from '../template/NoticeModal';

interface ConfirmGameLimitModalProps {
	modalVisible: boolean;
	setModalVisible: any;
	gameLimit: string;
	isSetDue: boolean;
}

const ConfirmGameLimitModal = (props: ConfirmGameLimitModalProps) => {
	const date = props.gameLimit.split(' ')[0].split('-');
	const time = props.gameLimit.split(' ')[1];

	const body = props.isSetDue ? (
		<View>
			<View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
				<Text style={styles.optionValue}>{date[0]}</Text>
				<Text style={styles.optionLabel}>년</Text>
				<Text style={styles.optionValue}>{date[1]}</Text>
				<Text style={styles.optionLabel}>월</Text>
				<Text style={styles.optionValue}>{date[2]}</Text>
				<Text style={styles.optionLabel}>일</Text>

				<Text style={styles.optionValue}>{time}</Text>
				<Text style={styles.optionLabel}>시</Text>
			</View>

			<View style={{ marginTop: 5 }}>
				<Text style={{ color: textColor, fontSize: 13 }}>
					에 게임 종료 후 매칭결과가 공개돼요.
				</Text>
			</View>
		</View>
	) : (
		<View>
			<Text style={{ color: textColor, fontSize: 13 }}>
				아직 마니또장이 종료일을 설정하지 않았어요!
			</Text>
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

const styles = StyleSheet.create({
	optionLabel: {
		color: textColor,
		fontSize: 16,
		marginRight: 6,
	},

	optionValue: {
		color: timeColor,
		fontSize: 20,
	},
});

export default ConfirmGameLimitModal;
