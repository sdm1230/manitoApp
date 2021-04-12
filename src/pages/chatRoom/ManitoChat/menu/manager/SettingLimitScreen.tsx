import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import DatePicker from 'react-native-date-picker';
import SetGameLimitBtn from '../../../../../common/atom/btnText/save/SetGameLimitBtn';
import FinishManitoGameBtn from '../../../../../common/atom/btnText/feature/FinishManitoGameBtn';
import { timeColor, whiteColor } from '../../../../../common/atom/color';
import { ModalPageHeader } from '../../../../../common/molecule/header/ModalPageHeader';

import { SettingGameLimitNote } from '../../../../../common/molecule/component/Note';

import { ManitoChatStackParamList } from '../../ManitoChatRouter';
import { RequestGet, RequestPost, RequestPut } from '../../../../../common/api/Request';

interface Props {
	navigation: StackNavigationProp<ManitoChatStackParamList, 'SettingLimit'>;
	route: RouteProp<ManitoChatStackParamList, 'SettingLimit'>;
}

const SettingLimitScreen = ({ navigation, route }: Props) => {
	const [date, setDate] = useState(new Date(route.params.dueDate.slice(' ')[0]));
	const [leftDays, setLeftDays] = useState(0);
	const [leftTime, setLeftTime] = useState(0);

	const [lastMissionDueDate, setLastMissionDueDate] = useState('');

	const [noticeVisible, setNoticeVisible] = useState(false);

	const onClickEndGame = async () => {
		await RequestPost({
			api: `/party/${route.params.manitoPartyId}/set-end/`,
			body: {},
			func_success: () => {
				navigation.popToTop();
			},
			func_fail: () => {
				navigation.popToTop();
				Alert.alert('일시적인 문제로 게임종료를 실패하였어요.');
			},
		});
	};

	const onClickConfirm = async () => {
		console.log(date.toLocaleTimeString());

		const selectedDate = date.toLocaleDateString().split('/');
		const selectedTime = date.toLocaleTimeString().split(':');
		const selectedTimeOffset = date.toLocaleTimeString().split(' ')[1] === 'AM' ? 0 : 12;

		const dateFormat = `${selectedDate[2]}-${selectedDate[0]}-${selectedDate[1]} ${
			Number(selectedTime[0]) + selectedTimeOffset
		}:00`;

		await RequestPut({
			api: `/party/${route.params.manitoPartyId}/`,
			body: {
				due_date: dateFormat,
			},
			func_success: () => {
				navigation.popToTop();
			},
			func_fail: () => {
				navigation.popToTop();
				Alert.alert('일시적인 문제로 설정 실패하였어요.');
			},
		});
	};

	const getLastMission = async () => {
		await RequestGet({
			api: `/party/${route.params.manitoPartyId}/mission/last/`,
			func_success: (res) => {
				setLastMissionDueDate(res.due_date);
			},
		});
	};

	useEffect(() => {
		getLastMission();
	}, []);

	useEffect(() => {
		setNoticeVisible(
			Date.parse(date.toISOString().split('T')[0]) - Date.parse(lastMissionDueDate) <= 0,
		);

		if (
			Date.parse(date.toISOString().split('T')[0]) ===
			Date.parse(new Date().toISOString().split('T')[0])
		) {
			setLeftDays(0);
			setLeftTime(
				Number(date.toISOString().split('T')[1].split(':')[0]) -
					Number(new Date().toISOString().split('T')[1].split(':')[0]),
			);
		} else {
			const leftSecond =
				Date.parse(date.toISOString().split('T')[0]) -
				Date.parse(new Date().toISOString().split('T')[0]);
			setLeftDays(leftSecond / (1000 * 60 * 60 * 24));
		}
	}, [date]);

	return (
		<View style={styles.container}>
			<SafeAreaView
				forceInset={{ bottom: 'never' }}
				style={{
					flex: 1,
					backgroundColor: timeColor,
					borderBottomLeftRadius: 30,
					borderBottomRightRadius: 30,
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<ModalPageHeader
					title="마니또 게임 종료일 설정"
					onClickClose={() => navigation.popToTop()}
				/>

				<View style={{ alignItems: 'center' }}>
					<Text style={{ color: whiteColor, fontSize: 16, fontWeight: 'bold' }}>
						언제 게임을 종료하실 건가요?
					</Text>
					<Text style={{ color: whiteColor, fontSize: 16, fontWeight: 'bold' }}>
						{leftDays > 0
							? `${leftDays}일 후에 마니또 매칭 결과가 발표됩니다.`
							: `${leftTime}시간 후에 마니또 매칭 결과가 발표됩니다.`}
					</Text>
				</View>

				<View style={{ marginBottom: 50 }}>
					<FinishManitoGameBtn onClickBtn={() => onClickEndGame()} />
				</View>
			</SafeAreaView>

			<View
				style={{
					alignItems: 'center',
					height: 150,
					justifyContent: 'center',
				}}
			>
				<View style={{ flex: 1, justifyContent: 'center' }} />

				<View style={{ height: 80, alignItems: 'center', justifyContent: 'center' }}>
					<DatePicker
						date={date}
						onDateChange={setDate}
						mode="datetime"
						textColor={timeColor}
						minuteInterval={30}
						minimumDate={new Date()}
						style={{ height: 50 }}
						locale="ko"
					/>
				</View>

				<View style={{ flex: 1, justifyContent: 'center' }}>
					{noticeVisible && (
						<View style={{ backgroundColor: timeColor, padding: 6, borderRadius: 20 }}>
							<Text style={{ color: whiteColor, fontWeight: 'bold' }}>
								마지막 미션보다 게임이 빨리 종료돼요 !
							</Text>
						</View>
					)}
				</View>
			</View>

			<SafeAreaView
				style={{
					flex: 1,
					backgroundColor: timeColor,
					borderTopLeftRadius: 30,
					borderTopRightRadius: 30,
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<View style={{ marginTop: 50 }}>
					<SetGameLimitBtn onClickBtn={() => onClickConfirm()} />
				</View>

				<View>
					<SettingGameLimitNote />
				</View>

				<View style={{ height: 50 }} />
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default SettingLimitScreen;
