import React from 'react';
import { View, Text, Image } from 'react-native';
import { timeColor, whiteColor } from '../../../atom/color';
import { CloseModalBtn, TriangleImg } from '../../../atom/icon';
import Images from '../../../atom/customImage';

interface NoticeModalProps {
	contents?: any;
	onCloseModal(): any;
	body?: any;
}

const NoticeModal = (props: NoticeModalProps) => {
	const body =
		props.body ||
		props.contents.map((content: string, index: any) => (
			<Text style={{ fontSize: 14, color: timeColor, marginVertical: 5 }} key={index}>
				{content}
			</Text>
		));

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

					/*
					shadowColor: '#FF7856',
					shadowOffset: { height: 0, width: 0 },
					shadowOpacity: 1,
					shadowRadius: 15,
					*/
				}}
			>
				<Image source={Images.logo.appLogo} style={{ width: 90 }} resizeMode="contain" />
			</View>

			<View style={{ width: 300, alignItems: 'center', marginVertical: 20 }}>
				<TriangleImg />
				<View
					style={{
						width: 300,

						alignItems: 'center',
						justifyContent: 'center',

						backgroundColor: whiteColor,
						borderRadius: 30,
						paddingHorizontal: 25,
						paddingVertical: 25,
					}}
				>
					{body}
				</View>
			</View>

			<CloseModalBtn onClickBtn={() => props.onCloseModal()} />
		</View>
	);
};

export default NoticeModal;
