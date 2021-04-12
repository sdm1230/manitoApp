import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { whiteColor } from '../../atom/color';
import { HEIGHT_TOPBAR } from '../../atom/constants';
import { BackBtn, ClosePageBtn, ClosePageBtnV2 } from '../../atom/icon';

interface ModalPageHeaderProps {
	title: string;
	onClickBack?(): any;
	onClickClose?(): any;

	version?: number;
}

export const ModalPageHeader = (props: ModalPageHeaderProps) => {
	return (
		<View style={styles.header}>
			<View style={{ width: 50, alignItems: 'center', zIndex: 1 }}>
				{props.onClickBack ? <BackBtn onClickBtn={() => props.onClickBack()} /> : <View />}
			</View>

			<View style={{ flex: 1, alignItems: 'center' }}>
				<Text style={{ fontSize: 25, color: whiteColor }}>{props.title}</Text>
			</View>

			<View style={{ width: 50, alignItems: 'center', zIndex: 1 }}>
				{props.onClickClose ? (
					props.version === 2 ? (
						<ClosePageBtnV2 onClickBtn={() => props.onClickClose()} />
					) : (
						<ClosePageBtn onClickBtn={() => props.onClickClose()} />
					)
				) : (
					<View />
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
		height: HEIGHT_TOPBAR,
		zIndex: 1,
	},
});
