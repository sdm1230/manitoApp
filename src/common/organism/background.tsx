import React from 'react';
import { StatusBar, View, Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { timeColor, whiteColor } from '../atom/color';

const Width = Dimensions.get('screen').width;
const Height = Dimensions.get('screen').height;

export const ScreenBackgroundHalf = () => {
	return (
		<View
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: whiteColor,
			}}
		>
			<StatusBar barStyle="light-content" />

			<View
				style={{
					flex: 1,
					marginBottom: 140,

					backgroundColor: timeColor,
					borderBottomRightRadius: 30,
					borderBottomLeftRadius: 30,

					...styles.shadow,
				}}
			/>

			<View
				style={{
					flex: 1,
					marginTop: 140,

					backgroundColor: timeColor,
					borderTopRightRadius: 30,
					borderTopLeftRadius: 30,

					...styles.shadow,
				}}
			/>
		</View>
	);
};
export function ScreenBackgroundAlmost() {
	return (
		<View
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: whiteColor,
			}}
		>
			<StatusBar barStyle="light-content" />

			<View
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: 0,
					bottom: 300,

					backgroundColor: timeColor,
					borderBottomRightRadius: 30,
					borderBottomLeftRadius: 30,

					...styles.shadow,
				}}
			/>
			<View
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					bottom: 0,
					height: 100,

					backgroundColor: timeColor,
					borderTopRightRadius: 30,
					borderTopLeftRadius: 30,

					...styles.shadow,
				}}
			/>
		</View>
	);
}

export function ScreenBackgroundAll() {
	return (
		<View
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: timeColor,
			}}
		>
			<StatusBar barStyle="light-content" />
		</View>
	);
}

const styles = StyleSheet.create({
	shadow: {
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.07,
		shadowRadius: 15,
		shadowColor: '#000000',
	},
});
