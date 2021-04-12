import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { textColor, whiteColor } from '../../atom/color';

export const MatchingNote = () => {
	return (
		<View>
			<View
				style={{
					borderBottomColor: whiteColor,
					borderBottomWidth: 1,
					marginBottom: 2,
				}}
			>
				<Text style={styles.tipText}>NOTE</Text>
			</View>
			<View>
				<Text style={styles.tipText}>매칭 결과를 조금씩 수정할 수 있어요.</Text>
				<Text style={styles.tipText}>
					참가자를 클릭해서 원하는 자리에 두어 위치를 바꿔봐요!
				</Text>
			</View>
		</View>
	);
};

export const SettingGameLimitNote = () => {
	return (
		<View>
			<View
				style={{
					borderBottomColor: whiteColor,
					borderBottomWidth: 1,
					marginBottom: 2,
				}}
			>
				<Text style={styles.tipText}>NOTE</Text>
			</View>
			<View>
				<Text style={styles.tipText}>
					종료일이 지나면 매칭 결과가 발표되어 수정할 수 없어요.
				</Text>
			</View>
		</View>
	);
};

export const CreatingGameInputNote = () => {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text style={{ fontSize: 11, color: textColor, opacity: 0.8 }}>
				마니또 매칭 전에 입장하지 못한 인원 수를 알려드릴게요!
			</Text>
		</View>
	);
};

export const CreatingGameBtnNote = () => {
	return (
		<Text style={{ fontSize: 12, color: whiteColor, fontWeight: 'bold' }}>
			방 이름과 인원은 게임 방이 생성된 후 수정이 가능해요.
		</Text>
	);
};

const styles = StyleSheet.create({
	tipText: {
		fontSize: 12,
		color: whiteColor,
		marginVertical: 3,
		fontWeight: 'bold',
	},
});
