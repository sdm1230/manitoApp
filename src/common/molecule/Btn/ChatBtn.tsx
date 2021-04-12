import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {
	appColor1,
	appColor2,
	appColor3,
	appColor4,
	appColor5,
	whiteColor,
} from '../../atom/color';

interface ChatBtnProps {
	title: string;
	isActive: boolean;
	btnFunc: any;
}

export const ChatBtnGra = (props: ChatBtnProps) => {
	return (
		<TouchableHighlight
			onPress={props.btnFunc}
			style={{
				...styles.btnBox,
				opacity: props.isActive ? 1 : 0.5,
			}}
			disabled={!props.isActive}
		>
			<LinearGradient
				colors={[appColor2, appColor5, appColor4, appColor3, appColor1]}
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					flex: 1,
					borderRadius: 12,
				}}
				start={{ x: 0, y: 0.5 }}
				end={{ x: 1, y: 0.5 }}
			>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text
						style={{
							fontSize: 18,
							color: whiteColor,
						}}
					>
						{props.title}
					</Text>
				</View>
			</LinearGradient>
		</TouchableHighlight>
	);
};

export const ChatBtn = (props: ChatBtnProps) => {
	return (
		<TouchableHighlight
			onPress={props.btnFunc}
			style={{
				...styles.btnBox,
				opacity: props.isActive ? 1 : 0.5,
				backgroundColor: appColor1,
			}}
			disabled={!props.isActive}
		>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text
					style={{
						fontSize: 18,
						color: whiteColor,
					}}
				>
					{props.title}
				</Text>
			</View>
		</TouchableHighlight>
	);
};

const styles = StyleSheet.create({
	btnBox: {
		height: 40,
		width: 140,
		borderRadius: 12,
	},
});
