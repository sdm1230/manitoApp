import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { ScrollView } from 'react-native-gesture-handler';
import { SettingStackParamList } from './SettingRouter';

import { timeColor, whiteColor } from '../../../common/atom/color';
import Images from '../../../common/atom/customImage';
import { TabHeader } from '../../../common/molecule/header/TabHeader';
import useStore from '../../../stores/stores';
import SignOutUserModal from '../../../common/organism/modal/user/SignOutUserModal';
import LeaveUserModal from '../../../common/organism/modal/user/LeaveUserModal';

interface Props {
	navigation: StackNavigationProp<SettingStackParamList, 'Setting'>;
	route: RouteProp<SettingStackParamList, 'Setting'>;
}

const SettingScreen = ({ navigation, route }: Props) => {
	const [signOutModalVisible, setSignOutModalVisible] = useState(false);
	const [leaveModalVisible, setLeaveModalVisible] = useState(false);

	const { UserStore } = useStore();

	const onClickSignOut = () => {
		UserStore.signOutUser();
		route.params.stackNavi.replace('Login');
	};

	const onClickLeave = () => {
		UserStore.deleteUser();
		route.params.stackNavi.replace('Login');
	};

	return (
		<View style={styles.container}>
			<TabHeader title="서비스 정보" />

			<ScrollView
				showsVerticalScrollIndicator={false}
				style={{ flex: 1, alignSelf: 'stretch' }}
				contentContainerStyle={{ alignItems: 'center' }}
			>
				<View
					style={{
						width: 300,
						height: 485,
						borderRadius: 30,
						backgroundColor: whiteColor,
						padding: 30,
						marginVertical: 50,
					}}
				>
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<Image
							source={Images.logo.manitoRed}
							style={{ width: 160 }}
							resizeMode="contain"
						/>
					</View>

					<View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}>
						<View
							style={{
								backgroundColor: timeColor,
								borderRadius: 100,
								height: 160,
								width: 160,
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Image
								source={Images.logo.appLogoBig}
								style={{ width: 160 }}
								resizeMode="contain"
							/>
						</View>
					</View>

					<View style={{ flex: 2 }}>
						<View
							style={{
								flex: 2,
								borderBottomColor: timeColor,
								borderBottomWidth: 1,
								justifyContent: 'flex-end',
								paddingBottom: 5,
							}}
						>
							<View style={styles.textContainer}>
								<Text style={styles.label}>Instagram</Text>
								<Text style={styles.info}>@manito.app</Text>
							</View>
							<View style={styles.textContainer}>
								<Text style={styles.label}>Email</Text>
								<Text style={styles.info}>manito.net@gmail.com</Text>
							</View>
						</View>
						<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
							<Text style={{ fontWeight: 'bold', color: timeColor, fontSize: 12 }}>
								건의 사항이 있으시면 문의 메일이나 디엠주세요!
							</Text>
						</View>
					</View>
				</View>

				<View
					style={{
						width: 300,
						height: 300,
						borderRadius: 30,
						backgroundColor: whiteColor,
						paddingHorizontal: 30,
					}}
				>
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<Image
							source={Images.logo.makersRed}
							style={{ width: 160 }}
							resizeMode="contain"
						/>
					</View>

					<View style={{ flex: 3, paddingTop: 20 }}>
						<View style={{ flex: 1, flexDirection: 'row' }}>
							<Image
								source={{}}
								style={{ height: 40, width: 40, borderRadius: 40 }}
							/>

							<View style={styles.textContainer}>
								<Text style={styles.label}>Project Owner</Text>
								<Text style={styles.info}>김미승</Text>
							</View>
						</View>

						<View style={{ flex: 1, flexDirection: 'row' }}>
							<Image
								source={{}}
								style={{ height: 40, width: 40, borderRadius: 40 }}
							/>

							<View style={styles.textContainer}>
								<Text style={styles.label}>Designer</Text>
								<Text style={styles.info}>성찬혁</Text>
							</View>
						</View>

						<View style={{ flex: 1, flexDirection: 'row' }}>
							<Image
								source={{}}
								style={{ height: 40, width: 40, borderRadius: 40 }}
							/>

							<View style={styles.textContainer}>
								<Text style={styles.label}>Frontend Engineer</Text>
								<Text style={styles.info}>신동민</Text>
							</View>
						</View>

						<View style={{ flex: 1, flexDirection: 'row' }}>
							<Image
								source={{}}
								style={{ height: 40, width: 40, borderRadius: 40 }}
							/>

							<View style={styles.textContainer}>
								<Text style={styles.label}>Backend Engineer</Text>
								<Text style={styles.info}>임은성</Text>
							</View>
						</View>
					</View>
				</View>

				<View style={{ height: 80, alignItems: 'center', justifyContent: 'center' }}>
					<View style={{ width: 300, flexDirection: 'row' }}>
						<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
							<Text
								onPress={() => setSignOutModalVisible(true)}
								style={{
									fontWeight: 'bold',
									color: whiteColor,
									fontSize: 16,
									borderBottomColor: whiteColor,
									borderBottomWidth: 1,
								}}
							>
								로그아웃
							</Text>
						</View>

						<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
							<Text
								onPress={() => setLeaveModalVisible(true)}
								style={{
									fontWeight: 'bold',
									color: whiteColor,
									fontSize: 16,
									borderBottomColor: whiteColor,
									borderBottomWidth: 1,
								}}
							>
								회원탈퇴
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>

			<SignOutUserModal
				modalVisible={signOutModalVisible}
				onCloseModal={() => setSignOutModalVisible(false)}
				onClickConfirm={() => onClickSignOut()}
			/>

			<LeaveUserModal
				modalVisible={leaveModalVisible}
				onCloseModal={() => setLeaveModalVisible(false)}
				onClickConfirm={() => onClickLeave()}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: timeColor,
		alignItems: 'center',
	},
	label: {
		fontWeight: 'bold',
		color: timeColor,
	},
	info: {
		color: timeColor,
	},
	textContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});

export default SettingScreen;
