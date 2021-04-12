import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { textColor, whiteColor } from '../../atom/color';
import { DISTANCE_CARD } from '../../atom/constants';
import { EditBtnRed } from '../../atom/icon';
import { UserBoxRow } from '../../molecule/component/UserBox';
import GroupCreateModal from '../modal/ChatRoom/Matching/GroupCreateModal';

const Width = Dimensions.get('screen').width;

interface GroupBoxProps {
	id: number;
	title: string;
	members: any;
	groups: any;
	setGroups: any;
	freeMembers: any;
}

const GroupBox = (props: GroupBoxProps) => {
	const [editModalVisible, setEditModalVisible] = useState(false);

	const onClickDeleteGroup = () => {
		const newGroups = props.groups.filter((group: any) => group.id !== props.id);
		props.setGroups(newGroups);
	};

	const editGroup = (title: string, members: any) => {
		const modifiedGroups = [
			...props.groups.slice(0, props.id),
			{
				title,
				members,
			},
			...props.groups.slice(props.id + 1, props.groups.length),
		];
		props.setGroups(modifiedGroups);
		setEditModalVisible(false);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
					<Text style={{ fontSize: 18, color: textColor, marginRight: 3 }}>
						{props.title}
					</Text>
					<Text style={{ fontSize: 12, color: textColor }}>{props.members.length}</Text>
				</View>

				<View style={{ position: 'absolute', right: 24 }}>
					<EditBtnRed onClickBtn={() => setEditModalVisible(true)} />
				</View>
			</View>

			<View style={{ marginLeft: 30 }}>
				<ScrollView>
					{props.members.map((user: any, index: any) => (
						<UserBoxRow
							userProfile={user.profile}
							textColor={textColor}
							key={user.user_id}
						/>
					))}
				</ScrollView>
			</View>

			<Modal
				isVisible={editModalVisible} // isVisible Props에 State 값을 물려주어 On/off control
				useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
				hideModalContentWhileAnimating
				onBackdropPress={() => setEditModalVisible(false)}
				style={{ margin: 0, alignItems: 'center', justifyContent: 'flex-end' }}
			>
				<GroupCreateModal
					freeMembers={[...props.members, ...props.freeMembers]}
					onClickBtn={(title: string, members: any) => editGroup(title, members)}
					onCloseModal={() => setEditModalVisible(false)}
					selectedMembers={props.members}
					title={props.title}
					deleteGroup={onClickDeleteGroup}
				/>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: whiteColor,
		width: 300,
		height: 300,
		borderRadius: 30,
		marginHorizontal: DISTANCE_CARD / 2,
		zIndex: 1,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'stretch',
		justifyContent: 'center',
		marginVertical: 24,
	},
	optionLabel: {
		color: textColor,
		fontSize: 16,
	},
});

export default GroupBox;
