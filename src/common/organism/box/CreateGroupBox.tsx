import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { textColor, timeColor, whiteColor } from '../../atom/color';
import { DISTANCE_CARD } from '../../atom/constants';

import GroupCreateModal from '../modal/ChatRoom/Matching/GroupCreateModal';

interface CreateGroupBoxProps {
	value: any;
	setValue: any;
	freeMembers: any;
}

const CreateGroupBox = (props: CreateGroupBoxProps) => {
	const [modalVisible, setModalVisible] = useState(false);

	const disableCreate = props.freeMembers.length < 2;

	const onCreateGroup = (title: string, members: any) => {
		props.setValue({
			title,
			members,
		});
		setModalVisible(false);
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => setModalVisible(true)}
				style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
				disabled={disableCreate}
			>
				<Text style={{ fontSize: 18, color: timeColor, opacity: disableCreate ? 0.5 : 1 }}>
					새로운 그룹 생성하기
				</Text>
				<Text
					style={{
						fontSize: 14,
						color: textColor,
						opacity: disableCreate ? 0.5 : 0,
						marginTop: 5,
					}}
				>
					2명 이상의 인원으로 생성할 수 있어요.
				</Text>
			</TouchableOpacity>

			<Modal
				isVisible={modalVisible} // isVisible Props에 State 값을 물려주어 On/off control
				useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
				hideModalContentWhileAnimating
				onBackdropPress={() => setModalVisible(false)}
				style={{ margin: 0, alignItems: 'center', justifyContent: 'flex-end' }}
			>
				<GroupCreateModal
					freeMembers={props.freeMembers}
					onClickBtn={(title: string, members: any) => onCreateGroup(title, members)}
					onCloseModal={() => setModalVisible(false)}
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
	},
});

export default CreateGroupBox;
