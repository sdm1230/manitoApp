import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {
	appColor1,
	appColor2,
	appColor3,
	appColor4,
	appColor5,
	whiteColor,
} from '../../atom/color';

interface ConfirmBtnProps {
	title: string;
	btnFunc: any;
}

export const ConfirmBtn = (props: ConfirmBtnProps) => {
	return (
		<TouchableHighlight onPress={props.btnFunc} style={styles.btnBox}>
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
		height: '100%',
		width: '100%',
		borderRadius: 12,
		backgroundColor: appColor1,
	},
	shadowBox: {
		...Platform.select({
			ios: {
				shadowColor: '#000000',
				shadowOffset: {
					width: 0,
					height: 5,
				},
				shadowOpacity: 0.07,
				shadowRadius: 15,
			},
			android: {
				elevation: 10,
			},
		}),
	},
});
