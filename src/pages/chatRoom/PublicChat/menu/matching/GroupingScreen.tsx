import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	StatusBar,
	Dimensions,
	SafeAreaView,
	Alert,
	TouchableOpacity,
	ScrollView,
} from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import { ChatRoomStackParamList } from '../../PublicChatRouter';
import { textColor, timeColor, whiteColor } from '../../../../../common/atom/color';
import GroupBox from '../../../../../common/organism/card/GroupBox';
import { DISTANCE_CARD, WIDTH_SCREEN } from '../../../../../common/atom/constants';
import ScrollIndicator from '../../../../../common/molecule/indicator/ScrollIndicator';
import CreateGroupBox from '../../../../../common/organism/box/CreateGroupBox';
import { RequestPost } from '../../../../../common/api/Request';
import { ModalPageHeader } from '../../../../../common/molecule/header/ModalPageHeader';

const Width = Dimensions.get('screen').width;
const Height = Dimensions.get('screen').height;

const HeightBtn = 50;
const WidthBtn = 300;

interface Props {
	navigation: StackNavigationProp<ChatRoomStackParamList, 'Grouping'>;
	route: RouteProp<ChatRoomStackParamList, 'Grouping'>;
}

const mockGroups = [
	{
		id: 1,
		title: '조건1',
		members: [
			{
				nickname: '배로나',
			},
			{
				nickname: '민설아',
			},
		],
	},
	{
		id: 2,
		title: '조건2',
		members: [
			{
				nickname: '이나은',
			},
			{
				nickname: '현빈',
			},
		],
	},
	{
		id: 3,
		title: '조건3',
		members: [
			{
				nickname: '신예은',
			},
			{
				nickname: '신혜선',
			},
		],
	},
];

const GroupingScreen = ({ navigation, route }: Props) => {
	const participants = route.params.members.filter((member: any) => member.is_manager === false);

	const [groups, setGroups] = useState([]);
	const [selectedGroup, setSelectedGroup] = useState(0);
	const [freeMembers, setFreeMembers] = useState(participants);

	const handleScroll = (event: any) => {
		const pos = event.nativeEvent.contentOffset.x / event.nativeEvent.contentSize.width;
		// console.log(pos + 1 / (2*(groups.length+1)) ); // 스크롤의 중간위치
		setSelectedGroup(Math.floor((pos + 1 / ((groups.length + 1) * 2)) * (groups.length + 1)));
	};

	const onClickMatching = async (useGroup: boolean) => {
		// 마니또 매칭하기 조건있이 & 매칭결과 매칭스크린에 보내기
		const requsetGroups = {};
		let defaultGroupIds = [];
		let requestbody = {};

		if (useGroup) {
			console.log('====그룹사용====');
			groups.forEach((group) => {
				requsetGroups[group.title] = group.members.map((member: any) => member.user_id);
			});
			defaultGroupIds = freeMembers.map((member: any) => member.user_id);

			requestbody = {
				groups: {
					...requsetGroups,
					default: defaultGroupIds,
				},
			};
		} else {
			defaultGroupIds = participants.map((member: any) => member.user_id);

			requestbody = {
				groups: {
					...requsetGroups,
					default: defaultGroupIds,
				},
			};
		}

		await RequestPost({
			api: `/party/${route.params.id}/`,
			body: requestbody,
			func_success: (res) => {
				navigation.navigate('Matching', {
					id: route.params.id,
				});
			},
			func_fail: (err) => {
				Alert.alert(err);
			},
		});
	};

	const onClickClose = () => {
		navigation.popToTop();
	};

	const onCreateGroup = (newGroup: any) => {
		setGroups([...groups, newGroup]);

		let leftMembers = freeMembers;

		newGroup.members.forEach((joined: any) => {
			leftMembers = leftMembers.filter((member: any) => member.user_id !== joined.user_id);
		});

		setFreeMembers(leftMembers);
	};

	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" />

			<SafeAreaView style={styles.boxContainer}>
				<ModalPageHeader title="마니또 매칭하기" onClickClose={onClickClose} />

				<View
					style={{
						height: 330,
						marginVertical: 20,
						alignItems: 'center',
					}}
				>
					<ScrollView
						onMomentumScrollEnd={(event) => handleScroll(event)}
						horizontal
						showsHorizontalScrollIndicator={false} // 아래 스크롤 정도 표시
						decelerationRate={0} // Disable deceleration
						snapToInterval={300 + DISTANCE_CARD} // 스크롤 모멘텀
						contentContainerStyle={{
							paddingHorizontal: (WIDTH_SCREEN - 300 - DISTANCE_CARD) / 2,
						}}
					>
						{groups.map((group, index) => (
							<GroupBox
								key={index}
								id={index}
								title={group.title}
								members={group.members}
								groups={groups}
								setGroups={(newGroups: any) => setGroups(newGroups)}
								freeMembers={freeMembers}
							/>
						))}
						<CreateGroupBox
							value={groups}
							setValue={(newGroup: any) => onCreateGroup(newGroup)}
							freeMembers={freeMembers}
						/>
					</ScrollView>
					<ScrollIndicator num={groups.length + 1} target={selectedGroup} />
				</View>

				<View style={{ flex: 1, justifyContent: 'flex-start' }}>
					<View
						style={{
							borderBottomColor: whiteColor,
							borderBottomWidth: 1,
							marginBottom: 2,
						}}
					>
						<Text style={styles.tipText}>TIP</Text>
					</View>
					<View>
						<Text style={{ ...styles.tipText, marginBottom: 10 }}>
							최적화된 매칭으로 게임을 즐길 수 있게 조건을 설정해
						</Text>
						<Text style={styles.tipText}>
							같은 그룹으로 지정하면 서로의 마니또가 되지 않아요!
						</Text>
						<Text style={styles.tipText}>
							비슷한 특징을 가진 사람들을 모아 새 조건을 만들까요?
						</Text>
					</View>
				</View>
			</SafeAreaView>

			<View
				style={{
					...styles.btn,
					top: Height * 0.8 - HeightBtn / 2,
					bottom: Height * 0.2 - HeightBtn / 2,
					backgroundColor: whiteColor,
				}}
			>
				<TouchableOpacity
					style={{
						width: '100%',
						height: '100%',
						alignItems: 'center',
						justifyContent: 'center',
					}}
					onPress={() => onClickMatching(true)}
					disabled={groups.length === 0}
				>
					<Text
						style={{
							fontSize: 18,
							color: textColor,
							opacity: groups.length === 0 ? 0.5 : 1,
						}}
					>
						이대로 매칭할게요 !
					</Text>
				</TouchableOpacity>
			</View>

			<View
				style={{
					...styles.btn,
					top: Height * 0.9 - HeightBtn / 2,
					bottom: Height * 0.1 - HeightBtn / 2,
					backgroundColor: timeColor,
				}}
			>
				<TouchableOpacity
					style={{
						width: '100%',
						height: '100%',
						alignItems: 'center',
						justifyContent: 'center',
					}}
					onPress={() => onClickMatching(false)}
				>
					<Text style={{ fontSize: 18, color: whiteColor }}>건너뛸래요 !</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: whiteColor,
	},
	boxContainer: {
		backgroundColor: timeColor,
		height: Height * 0.8,
		borderRadius: 30,
		alignItems: 'center',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'stretch',
		justifyContent: 'center',
	},
	tipText: {
		fontSize: 14,
		color: whiteColor,
		marginVertical: 3,
	},
	btn: {
		position: 'absolute',
		left: (Width - WidthBtn) / 2,
		right: (Width - WidthBtn) / 2,
		borderRadius: 30,
		alignItems: 'center',
		justifyContent: 'center',

		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 15,
		shadowOpacity: 0.07,
	},
	shadow: {
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 15,
		shadowOpacity: 0.07,
	},
});

export default GroupingScreen;
