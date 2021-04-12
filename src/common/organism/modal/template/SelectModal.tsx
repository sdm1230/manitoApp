import React from 'react';
import { View, Text, Image } from 'react-native';
import { textColorFaint, timeColor, whiteColor } from '../../../atom/color';
import Images from '../../../atom/customImage';

interface SelectModalProps {
	contents: any;
	onClickBtn(): any;
	onCloseModal(): any;
	btnTitle: string;
}

const SelectModal = (props: SelectModalProps) => {
	return (
		<View style={{ alignItems: 'center', justifyContent: 'center' }}>
			<View
				style={{
					width: 90,
					height: 90,
					borderRadius: 90,
					backgroundColor: timeColor,
					alignItems: 'center',
					justifyContent: 'center',
					marginBottom: 20,
				}}
			>
				<Image source={Images.logo.appLogo} style={{ width: 90 }} resizeMode="contain" />
			</View>

			<View
				style={{
					width: 300,
					height: 60,
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: whiteColor,
					borderTopLeftRadius: 30,
					borderTopRightRadius: 30,
				}}
			>
				{props.contents.map((content: string, index: any) => (
					<Text style={{ fontSize: 14, color: timeColor, marginVertical: 5 }} key={index}>
						{content}
					</Text>
				))}
			</View>

			<View
				style={{
					width: 300,
					flexDirection: 'row',
					height: 50,
					backgroundColor: whiteColor,
					borderBottomLeftRadius: 30,
					borderBottomRightRadius: 30,
					shadowColor: '#000000',
					shadowOffset: { height: 0, width: 0 },
					shadowOpacity: 0.07,
					shadowRadius: 15,
				}}
			>
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
						borderRightColor: textColorFaint,
						borderRightWidth: 1,
					}}
				>
					<Text style={{ color: textColorFaint }} onPress={() => props.onClickBtn()}>
						{props.btnTitle}
					</Text>
				</View>

				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<Text style={{ color: textColorFaint }} onPress={() => props.onCloseModal()}>
						취소
					</Text>
				</View>
			</View>
		</View>
	);
};

export default SelectModal;
