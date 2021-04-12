import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView, Alert } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import Modal from 'react-native-modal';
import { ChatRoomStackParamList } from '../../PublicChatRouter';
import { timeColor, whiteColor } from '../../../../../common/atom/color';
import { ManiSampleBox } from '../../../../../common/molecule/component/ManiSampleBox';
import { ModalPageHeader } from '../../../../../common/molecule/header/ModalPageHeader';
import { ManiCycleTable } from '../../../../../common/organism/body/ManiCycleTable';
import { RequestGet } from '../../../../../common/api/Request';
import NoticeResultModal from '../../../../../common/organism/modal/ChatRoom/Matching/NoticeResultModal';
import stylesShadow from '../../../../../common/styles/shadow';

interface Props {
	navigation: StackNavigationProp<ChatRoomStackParamList, 'Result'>;
	route: RouteProp<ChatRoomStackParamList, 'Result'>;
}

const ResultScreen = ({ navigation, route }: Props) => {
	const [resultModalVisible, setResultModalVisible] = useState(
		route.params.modalVisible || false,
	);

	const onClickClose = () => {
		navigation.popToTop();
	};

	const [matchResult, setMatchResult] = useState([]);

	const getResult = async () => {
		await RequestGet({
			api: `/party/${route.params.id}/matching/`,
			func_success: (res) => {
				setMatchResult(res);
			},
			func_fail: (err) => {
				Alert.alert('데이터를 받아오지 못했어요');
			},
		});
	};

	useEffect(() => {
		getResult();
	}, []);

	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" />

			<SafeAreaView style={{ alignItems: 'center', zIndex: 1 }}>
				<ModalPageHeader title="마니또 매칭결과" onClickClose={onClickClose} />

				<ManiSampleBox />

				<View
					style={{
						marginVertical: 30,

						width: 300,
						backgroundColor: whiteColor,
						borderRadius: 30,
						alignItems: 'center',

						...stylesShadow.shadowSmall,
					}}
				>
					{matchResult.length > 0 && <ManiCycleTable matchResult={matchResult} />}
				</View>
			</SafeAreaView>

			<NoticeResultModal
				modalVisible={resultModalVisible}
				onCloseModal={() => setResultModalVisible(false)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: timeColor,
	},
});

export default ResultScreen;
