import React, { useLayoutEffect, useState } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RequestGet } from '../../api/Request';
import { textColor, timeColor, whiteColor } from '../../atom/color';
import { WIDTH_SCREEN } from '../../atom/constants';
import Images from '../../atom/customImage';

interface ChattingProps {
	type: 'TEXT' | 'IMG';
	content: string;
	isAuthor: boolean;
	time: string;
	diffUser: boolean;

	previousAuthorProfile: any;
}

const Chatting = (props: ChattingProps) => {
	return (
		<View
			style={{
				margin: 3,
				alignSelf: 'stretch',
			}}
		>
			<View
				style={{
					flexDirection: props.isAuthor ? 'row-reverse' : 'row',
					marginHorizontal: 10,
					alignItems: 'flex-end',
				}}
			>
				{props.type === 'TEXT' && (
					<View
						style={{
							backgroundColor: timeColor,
							padding: 8,
							borderRadius: 10,

							borderTopRightRadius: props.isAuthor ? 0 : 10,
							borderTopLeftRadius: props.isAuthor ? 10 : 0,

							shadowColor: '#000000',
							shadowOffset: { width: 0, height: 0 },
							shadowOpacity: 0.05,
							shadowRadius: 10,
							maxWidth: WIDTH_SCREEN - 80,
						}}
					>
						<Text
							style={{
								fontSize: 14,
								color: whiteColor,
							}}
						>
							{props.content}
						</Text>
					</View>
				)}

				{props.type === 'IMG' && (
					<FastImage
						source={props.content ? { uri: props.content } : Images.img.loading}
						style={{ height: 170, width: 170 }}
					/>
				)}

				<Text
					style={{
						paddingHorizontal: 8,
						fontSize: 12,
						color: timeColor,
					}}
				>
					{props.time}
				</Text>
			</View>

			{props.diffUser && (
				<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
					<Image
						source={
							props.previousAuthorProfile?.thumbnail_image_url
								? { uri: props.previousAuthorProfile.thumbnail_image_url }
								: Images.img.profileSmall
						}
						style={{
							height: 40,
							width: 40,
							borderRadius: 40,
							borderWidth: 3,
							borderColor: whiteColor,
						}}
					/>
					<Text style={{ fontSize: 16, marginLeft: 5, color: textColor }}>
						{props.previousAuthorProfile?.nickname}
					</Text>
				</View>
			)}
		</View>
	);
};

export default React.memo(Chatting);
