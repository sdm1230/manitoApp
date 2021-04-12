import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Image,
	Platform,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { whiteColor, textColor, chatRoomLineColor } from '../../../../atom/color';
import { WIDTH_SCREEN } from '../../../../atom/constants';
import { DeleteTextBtnBrown, SelectedBtn, UnSelectedBtn } from '../../../../atom/icon';
import { UserBoxColumn } from '../../../../molecule/component/UserBox';

interface GroupCreateModalProps {
	freeMembers: any;
	onClickBtn(title: string, members: any): any;
	onCloseModal(): any;

	selectedMembers?: any;
	title?: string;
	deleteGroup?(): any;
}

const Width = Dimensions.get('screen').width;
const Height = Dimensions.get('screen').height;

function GroupCreateModal(props: GroupCreateModalProps) {
	const [groupName, setGroupName] = useState(props.title || '');
	const [selected, setSelected] = useState(props.selectedMembers || []);

	const onClickCircle = (member: any) => {
		if (selected.find((joined) => joined === member)) {
			const removed = selected.filter((joined) => joined !== member);
			setSelected(removed);
		} else {
			setSelected([...selected, member]);
		}
	};

	const isCreatable = groupName.length > 0 && selected.length > 1;

	return (
		<View style={styles.container}>
			<View
				style={{
					...styles.optionContainer,
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<TextInput
					placeholder="그룹 이름을 입력해주세요."
					placeholderTextColor={textColor}
					style={{
						fontSize: 16,
						color: textColor,
					}}
					onChangeText={(text) => setGroupName(text)}
					value={groupName}
					autoCapitalize="none"
					autoCorrect={false}
					maxLength={15}
				/>
				<DeleteTextBtnBrown onClickBtn={() => setGroupName('')} />
			</View>

			<View
				style={{
					...styles.optionContainer,
					height: 80,
					flexDirection: 'row',
					justifyContent: 'flex-start',
				}}
			>
				{selected.map((joined, index) => (
					<View style={{ alignItems: 'center', width: 50 }} key={joined.user_id}>
						<UserBoxColumn userProfile={joined.profile} textColor={textColor} />
					</View>
				))}
			</View>

			<View style={{ ...styles.optionContainer, borderBottomWidth: 0 }}>
				<Text style={styles.optionLabel}>참가자들</Text>
				<ScrollView style={{ marginTop: 10 }}>
					{props.freeMembers.map((member: any, index: any) => (
						<View style={{ flexDirection: 'row', alignItems: 'center' }} key={index}>
							<Image
								source={{ uri: member.profile.thumbnail_image_url }}
								style={{
									height: 40,
									width: 40,
									borderRadius: 100,
									marginVertical: 8,
									marginRight: 15,
								}}
							/>

							<Text style={styles.optionLabel}>{member.profile.nickname}</Text>

							<View style={{ position: 'absolute', right: 0 }}>
								{selected.find((joined) => joined === member) ? (
									<SelectedBtn onClickBtn={() => onClickCircle(member)} />
								) : (
									<UnSelectedBtn onClickBtn={() => onClickCircle(member)} />
								)}
							</View>
						</View>
					))}
				</ScrollView>
			</View>

			<View
				style={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					height: 70,
					...styles.shadowBox,

					backgroundColor: whiteColor,
					flexDirection: 'row',
				}}
			>
				<View style={{ flex: 1, borderRightWidth: 1, borderRightColor: textColor }}>
					<TouchableOpacity
						onPress={() => props.onCloseModal()}
						style={{
							alignItems: 'center',
							justifyContent: 'center',
							width: WIDTH_SCREEN / 2,
							height: 70,
						}}
					>
						<Text style={{ fontSize: 16, color: textColor }}>
							{props.deleteGroup ? '삭제' : '취소'}{' '}
						</Text>
					</TouchableOpacity>
				</View>

				<View style={{ flex: 1 }}>
					<TouchableOpacity
						onPress={() => {
							props.onClickBtn(groupName, selected);
						}}
						disabled={!isCreatable}
						style={{
							alignItems: 'center',
							justifyContent: 'center',
							width: WIDTH_SCREEN / 2,
							height: 70,
						}}
					>
						<Text
							style={{
								fontSize: 16,
								color: textColor,
								opacity: isCreatable ? 1 : 0.5,
							}}
						>
							{props.deleteGroup ? '저장' : '생성'}{' '}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: 300,
		height: Height * 0.8,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,

		backgroundColor: whiteColor,
		alignItems: 'center',
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

export default GroupCreateModal;
