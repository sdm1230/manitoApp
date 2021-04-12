import React from 'react';
import { View, Text } from 'react-native';
import { timeColor, whiteColor } from '../../atom/color';
import { ArrowRightImg } from '../../atom/icon';

export const ManiSampleBox = () => {
	return (
		<View
			style={{
				backgroundColor: whiteColor,
				width: 300,
				height: 115,
				borderRadius: 30,
				marginVertical: 10,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<View style={{ width: 179, height: 81, alignItems: 'center' }}>
				<View
					style={{
						position: 'absolute',
						top: 0,
						flexDirection: 'row',
						justifyContent: 'space-between',
						height: 35,
						width: 135,
					}}
				>
					<View
						style={{
							width: 35,
							height: 35,
							borderRadius: 35,
							backgroundColor: timeColor,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Text style={{ fontSize: 22, color: whiteColor, fontWeight: 'bold' }}>
							A
						</Text>
					</View>
					<ArrowRightImg />
					<View
						style={{
							width: 35,
							height: 35,
							borderRadius: 35,
							backgroundColor: timeColor,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Text style={{ fontSize: 22, color: whiteColor, fontWeight: 'bold' }}>
							B
						</Text>
					</View>
				</View>

				<View
					style={{
						position: 'absolute',
						bottom: 0,
						flexDirection: 'row',
						justifyContent: 'space-between',
						height: 35,
						width: 179,
					}}
				>
					<View
						style={{
							width: 79,
							height: 35,
							borderRadius: 35,
							backgroundColor: timeColor,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Text style={{ fontSize: 14, color: whiteColor, fontWeight: 'bold' }}>
							마니또
						</Text>
					</View>

					<View
						style={{
							width: 79,
							height: 35,
							borderRadius: 35,
							backgroundColor: timeColor,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Text style={{ fontSize: 14, color: whiteColor, fontWeight: 'bold' }}>
							마니띠
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
};
