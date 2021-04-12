import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { masterColor, timeColor, whiteColor } from '../../../atom/color';
import Images from '../../../atom/customImage';
import { CheckConfirmBtn } from '../../../atom/btnText/confirm/CheckConfirm';

interface MissionAlarmProps {
	newMissionList: any;
	onCloseModal(): any;
}

const MissionAlarm = (props: MissionAlarmProps) => {
	const [pageIndex, setPageIndex] = useState(0);
	const numPages = props.newMissionList?.length;

	const onClickConfirm = () => {
		if (pageIndex < numPages - 1) {
			setPageIndex(pageIndex + 1);
		} else {
			props.onCloseModal();
		}
	};
	const header = () => {
		return (
			<View style={{ alignItems: 'center', justifyContent: 'center' }}>
				<View style={{ flexDirection: 'row' }}>
					<Text>ㅡ</Text>
					<Text
						style={{
							fontSize: 18,
							fontWeight: 'bold',
							color: timeColor,
							marginHorizontal: 12,
						}}
					>
						미션이 도착했어요
					</Text>
					<Text>ㅡ</Text>
				</View>
				<View style={{ marginTop: 5 }}>
					<Text style={{ fontSize: 12, color: timeColor }}>
						미션 수행 후 마니또 채팅방에 공유!
					</Text>
				</View>
			</View>
		);
	};

	const profileImg = () => {
		return (
			<View
				style={{
					height: 170,
					width: 170,
					borderRadius: 170,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Image
					source={Images.img.mission}
					style={{ height: 160, width: 160, borderRadius: 160 }}
				/>
			</View>
		);
	};

	const footer = () => {
		return (
			<CheckConfirmBtn
				onClickBtn={() => onClickConfirm()}
				title={pageIndex === numPages - 1 ? '보러가기' : '다음'}
			/>
		);
	};

	const content = () => {
		return (
			<View style={{ justifyContent: 'center', width: '60%' }}>
				<View
					style={{
						alignItems: 'center',
						borderBottomWidth: 1,
						borderBottomColor: timeColor,
						padding: 5,
					}}
				>
					<Text style={{ fontSize: 18, color: timeColor }}>
						{props.newMissionList[pageIndex]?.title}
					</Text>
				</View>

				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignSelf: 'stretch',
						padding: 5,
					}}
				>
					<Text style={{ fontSize: 12, color: timeColor }}>
						{props.newMissionList[pageIndex]?.start_date}
					</Text>
					<Text style={{ fontSize: 12, color: timeColor }}>~</Text>
					<Text style={{ fontSize: 12, color: timeColor }}>
						{props.newMissionList[pageIndex]?.due_date}
					</Text>
				</View>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
				{header()}
			</View>

			<View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
				{profileImg()}
			</View>

			<View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
				{content()}
			</View>

			<View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-start' }}>
				{footer()}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 300,
		height: 485,
		borderRadius: 30,
		backgroundColor: whiteColor,
	},
});

export default MissionAlarm;
