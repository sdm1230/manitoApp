import React from 'react';
import { View, Text, Image } from 'react-native';
import { timeColor, whiteColor } from '../../../atom/color';
import { CloseModalBtn } from '../../../atom/icon';
import Images from '../../../atom/customImage';

interface NoticeFocusBigBtnModalProps {
	contents: any;
	onCloseModal(): any;
	btnTitle: string;
	btnBackColor: string;
}

const NoticeFocusBigBtnModal = (props: NoticeFocusBigBtnModalProps) => {
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
				}}
			>
				<Image source={Images.logo.appLogo} style={{ width: 90 }} resizeMode="contain" />
			</View>

			<View
				style={{
					height: 50,
					width: 300,
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: whiteColor,
					borderRadius: 30,
					marginVertical: 20,
				}}
			>
				{props.contents.map((content: string, index: any) => (
					<Text style={{ fontSize: 16, color: timeColor }} key={index}>
						{content}
					</Text>
				))}
			</View>

			<View
				style={{
					width: 300,
					height: 115,
					backgroundColor: props.btnBackColor,
					borderRadius: 30,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Text
					style={{
						fontSize: 20,
						color: props.btnBackColor === whiteColor ? timeColor : whiteColor,
						fontWeight: 'bold',
					}}
				>
					{props.btnTitle}
				</Text>
			</View>
		</View>
	);
};

export default NoticeFocusBigBtnModal;
