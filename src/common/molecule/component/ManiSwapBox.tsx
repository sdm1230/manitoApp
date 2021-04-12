import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { timeColor, whiteColor } from '../../atom/color';
import { ArrowBothImg, ArrowRightImg } from '../../atom/icon';

interface ManiSwapBoxProps {
	selected: any;
	onClickSwapBtn(): any;
	onClickUser(user: any): any;
}

const ManiSwapBox = (props: ManiSwapBoxProps) => {
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
					<TouchableOpacity onPress={() => props.onClickUser(props.selected[0])}>
						<Image
							source={{ uri: props.selected[0]?.profile.thumbnail_image_url || null }}
							style={{
								width: 35,
								height: 35,
								borderRadius: 35,
								backgroundColor: whiteColor,
								borderColor: timeColor,
								borderWidth: 1,
							}}
						/>
					</TouchableOpacity>

					<ArrowBothImg />

					<TouchableOpacity onPress={() => props.onClickUser(props.selected[1])}>
						<Image
							source={{ uri: props.selected[1]?.profile.thumbnail_image_url || null }}
							style={{
								width: 35,
								height: 35,
								borderRadius: 35,
								backgroundColor: whiteColor,
								borderColor: timeColor,
								borderWidth: 1,
							}}
						/>
					</TouchableOpacity>
				</View>

				<View
					style={{
						position: 'absolute',
						bottom: 0,
						height: 35,
						width: 179,
					}}
				>
					<TouchableOpacity
						onPress={() => props.onClickSwapBtn()}
						style={{
							width: '100%',
							height: '100%',
							borderRadius: 35,
							backgroundColor: timeColor,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Text style={{ fontSize: 14, color: whiteColor }}>두 사람 자리 바꾸기</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default ManiSwapBox;
