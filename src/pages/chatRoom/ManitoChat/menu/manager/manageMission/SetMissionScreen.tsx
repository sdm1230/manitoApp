import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, TouchableOpacity } from 'react-native';

import { TextInput } from 'react-native-gesture-handler';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Modal from 'react-native-modal';
import { ManageMissionStackParamList } from '../ManageMissionRouter';
import { ModalPageHeader } from '../../../../../../common/molecule/header/ModalPageHeader';
import { textColor, timeColor, whiteColor } from '../../../../../../common/atom/color';
import InputBox from '../../../../../../common/molecule/input/InputBox';
import { DeleteTextBtn } from '../../../../../../common/atom/icon';
import { SetMission } from '../../../../../../common/atom/btnText/save/CreateMission';

import DatePickerModal from '../../../../../../common/organism/modal/feature/DatePickerModal';
import { RequestPost, RequestPut } from '../../../../../../common/api/Request';

interface Props {
	navigation: StackNavigationProp<ManageMissionStackParamList, 'SetMission'>;
	route: RouteProp<ManageMissionStackParamList, 'SetMission'>;
}

const HEIGHT_CARD = 100;
const WIDTH_CARD = 300;

const SetMissionScreen = ({ navigation, route }: Props) => {
	const [title, setTitle] = useState(route.params.missionInfo?.title || '');
	const [content, setContent] = useState(route.params.missionInfo?.content || '');
	const [startDate, setStartDate] = useState(
		route.params.missionInfo?.start_date || new Date().toISOString().split('T')[0],
	);
	const [dueDate, setDueDate] = useState(
		route.params.missionInfo?.due_date || new Date().toISOString().split('T')[0],
	);

	const [startDatePickerModal, setStartDatePickerModal] = useState(false);
	const [dueDatePickerModal, setDueDatePickerModal] = useState(false);

	const onClickSetBtn = () => {
		if (title.length > 20) Alert.alert('미션 제목을 20자 이내로 지어주세요.');
		if (content.length > 50) Alert.alert('미션 내용을 50자 이내로 지어주세요.');

		if (route.params.mode === 'create') {
			RequestPost({
				api: `/party/${route.params.manitoPartyId}/mission/`,
				body: {
					title,
					content,
					start_date: startDate,
					due_date: dueDate,
				},
				func_success: () => {
					navigation.goBack();
				},
				func_fail: () => {
					navigation.goBack();
					Alert.alert('일시적인 서버 문제로 미션이 생성되지 않았어요.');
				},
			});
		} else if (route.params.mode === 'edit') {
			RequestPut({
				api: `/party/${route.params.missionInfo.manito_party}/mission/${route.params.missionInfo.id}/`,
				body: {
					title,
					content,
					start_date: startDate,
					due_date: dueDate,
				},
				func_success: () => {
					navigation.goBack();
				},
				func_fail: () => {
					navigation.goBack();
					Alert.alert('일시적인 서버 문제로 미션이 수정되지 않았어요.');
				},
			});
		}
	};

	return (
		<View style={styles.container}>
			<View
				style={{
					flex: 2,
					backgroundColor: timeColor,
					borderBottomLeftRadius: 30,
					borderBottomRightRadius: 30,
					alignItems: 'center',
				}}
			>
				<SafeAreaView style={{ flex: 1, alignSelf: 'stretch' }}>
					<ModalPageHeader
						title={route.params.mode === 'create' ? '미션 생성하기' : '미션 수정하기'}
						onClickBack={() => navigation.goBack()}
						version={2}
					/>
				</SafeAreaView>

				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignSelf: 'stretch',
						alignItems: 'center',
					}}
				>
					<View
						style={{
							borderBottomWidth: 1,
							borderBottomColor: whiteColor,
							width: '80%',
							height: 50,
						}}
					>
						<InputBox
							description="미션 이름을 입력해주세요."
							value={title}
							setValue={setTitle}
							noContainer
							maxWidth={230}
							maxLength={15}
						/>
					</View>
				</View>

				<View style={{ flex: 1, alignItems: 'center' }}>
					<View style={{ position: 'absolute', bottom: -HEIGHT_CARD / 2 }}>
						<View
							style={{
								flexDirection: 'row',
								height: 30,
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Text
								style={{
									fontSize: 20,
									color: whiteColor,
									marginRight: 5,
								}}
							>
								미션 설명
							</Text>
							<Text style={{ fontSize: 12, color: whiteColor }}>
								최대 50자를 입력할 수 있어요.
							</Text>
						</View>

						<View
							style={{
								backgroundColor: whiteColor,
								width: WIDTH_CARD,
								height: HEIGHT_CARD,
								borderRadius: 30,
								shadowOffset: { width: 0, height: 0 },
								shadowOpacity: 0.07,
								shadowRadius: 15,
								shadowColor: '#000000',

								padding: 20,

								flexDirection: 'row',
							}}
						>
							<TextInput
								placeholder="미션 내용을 입력해주세요."
								placeholderTextColor={timeColor}
								style={{
									flex: 1,
									fontSize: 16,
									color: timeColor,
								}}
								value={content}
								onChangeText={(text) => setContent(text)}
								numberOfLines={3}
								autoCorrect={false}
								autoCapitalize="none"
							/>
							<View style={{ justifyContent: 'center', zIndex: 1 }}>
								<DeleteTextBtn onClickBtn={() => setContent('')} />
							</View>
						</View>
					</View>
				</View>
			</View>

			<View style={{ flex: 1 }} />

			<View
				style={{
					flex: 1,
					backgroundColor: timeColor,
					borderTopLeftRadius: 30,
					borderTopRightRadius: 30,
					alignItems: 'center',
				}}
			>
				<View style={{ position: 'absolute', top: -HEIGHT_CARD / 2 }}>
					<View
						style={{
							backgroundColor: whiteColor,
							width: WIDTH_CARD,
							height: HEIGHT_CARD,
							borderRadius: 30,
							shadowOffset: { width: 0, height: 0 },
							shadowOpacity: 0.07,
							shadowRadius: 15,
							shadowColor: '#000000',

							padding: 20,
						}}
					>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<View
								style={{
									flex: 1,
									alignItems: 'center',
									justifyContent: 'center',
									flexDirection: 'row',
								}}
							>
								<TouchableOpacity
									onPress={() => setStartDatePickerModal(true)}
									disabled={
										route.params.missionInfo?.status_display === 'IN_PROGRESS'
									}
								>
									<View
										style={{
											borderTopWidth: 1,
											borderBottomWidth: 1,
											borderColor:
												route.params.missionInfo?.status_display ===
												'IN_PROGRESS'
													? whiteColor
													: timeColor,
											flexDirection: 'row',
											padding: 2,
											alignItems: 'center',
										}}
									>
										<Text style={styles.textNumber}>
											{startDate.split('-')[0]}
										</Text>
										<Text style={styles.dateLabel}>년</Text>
										<Text style={styles.textNumber}>
											{startDate.split('-')[1]}
										</Text>
										<Text style={styles.dateLabel}>월</Text>
										<Text style={styles.textNumber}>
											{startDate.split('-')[2]}
										</Text>
										<Text style={styles.dateLabel}>일</Text>
									</View>
								</TouchableOpacity>
							</View>
							<View style={{ flex: 1 }}>
								<Text style={{ fontSize: 15, color: textColor }}>
									땡하면 공지가 되고
								</Text>
							</View>
						</View>

						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<View
								style={{
									flex: 1,
									alignItems: 'center',
									justifyContent: 'center',
									flexDirection: 'row',
								}}
							>
								<TouchableOpacity onPress={() => setDueDatePickerModal(true)}>
									<View
										style={{
											borderTopWidth: 1,
											borderBottomWidth: 1,
											borderColor: timeColor,
											flexDirection: 'row',
											padding: 2,
											alignItems: 'center',
										}}
									>
										<Text style={styles.textNumber}>
											{dueDate.split('-')[0]}
										</Text>
										<Text style={styles.dateLabel}>년</Text>
										<Text style={styles.textNumber}>
											{dueDate.split('-')[1]}
										</Text>
										<Text style={styles.dateLabel}>월</Text>
										<Text style={styles.textNumber}>
											{dueDate.split('-')[2]}
										</Text>
										<Text style={styles.dateLabel}>일</Text>
									</View>
								</TouchableOpacity>
							</View>
							<View style={{ flex: 1 }}>
								<Text style={{ fontSize: 15, color: textColor }}>
									자정에 종료가 돼요!
								</Text>
							</View>
						</View>
					</View>

					<View
						style={{
							flexDirection: 'row',
							height: 30,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Text
							style={{
								fontSize: 20,
								color: whiteColor,
								marginRight: 5,
							}}
						>
							미션 일정
						</Text>
						<Text style={{ fontSize: 12, color: whiteColor }}>
							미션 수행할 기간을 설정해요.
						</Text>
					</View>
				</View>

				<SafeAreaView
					forceInset={{ top: 'never' }}
					style={{ flex: 1, justifyContent: 'center', marginTop: HEIGHT_CARD / 2 + 30 }}
				>
					<SetMission
						onClickBtn={() => onClickSetBtn()}
						inActive={!(title && content && startDate && dueDate)}
						mode={route.params.mode}
					/>
				</SafeAreaView>
			</View>

			<Modal
				isVisible={startDatePickerModal} // isVisible Props에 State 값을 물려주어 On/off control
				useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
				hideModalContentWhileAnimating
				onBackdropPress={() => setStartDatePickerModal(false)}
				style={{ alignItems: 'center', justifyContent: 'center', margin: 0 }}
			>
				<DatePickerModal
					date={startDate}
					setDate={setStartDate}
					onClickClose={() => setStartDatePickerModal(false)}
				/>
			</Modal>

			<Modal
				isVisible={dueDatePickerModal} // isVisible Props에 State 값을 물려주어 On/off control
				useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
				hideModalContentWhileAnimating
				onBackdropPress={() => setDueDatePickerModal(false)}
				style={{ alignItems: 'center', justifyContent: 'center', margin: 0 }}
			>
				<DatePickerModal
					date={dueDate}
					setDate={setDueDate}
					onClickClose={() => setDueDatePickerModal(false)}
				/>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: whiteColor,
	},
	textNumber: {
		fontSize: 15,
		color: timeColor,
		marginHorizontal: 2,
	},
	dateLabel: {
		fontSize: 15,
		color: timeColor,
	},
});

export default SetMissionScreen;
