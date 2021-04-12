import React from 'react';
import { StatusBar, Text, View, SafeAreaView } from 'react-native';
import { whiteColor } from '../../atom/color';
import { HEIGHT_TOPBAR } from '../../atom/constants';

interface TabHeaderProps {
	title: string;
}

export const TabHeader = ({ title }: TabHeaderProps) => {
	return (
		<View
			style={{
				height: HEIGHT_TOPBAR,
				justifyContent: 'center',
				alignItems: 'center',
				marginBottom: 10,
			}}
		>
			<StatusBar barStyle="light-content" />

			<SafeAreaView forcInset={{ bottom: 'never' }}>
				<Text
					style={{
						fontSize: 24,
						color: whiteColor,
					}}
				>
					{title}
				</Text>
			</SafeAreaView>
		</View>
	);
};
