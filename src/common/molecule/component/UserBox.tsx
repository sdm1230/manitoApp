import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { timeColor } from '../../atom/color';
import ImageSmall from '../../atom/component/Image/ImageSmall';
import Images from '../../atom/customImage';

interface UserBoxProps {
	userProfile: any;
	textColor: string;

	isBorder?: boolean;
}

export const UserBoxRow = (props: UserBoxProps) => {
	return (
		<View style={{ flexDirection: 'row', alignItems: 'center' }}>
			<View
				style={{
					marginVertical: 4,
					marginRight: 15,
				}}
			>
				<ImageSmall url={props.userProfile?.thumbnail_image_url} />
			</View>

			<Text style={{ fontSize: 16, color: props.textColor }}>
				{props.userProfile?.nickname}
			</Text>
		</View>
	);
};

export const UserBoxColumn = (props: UserBoxProps) => {
	return (
		props.userProfile && (
			<View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
				<Image
					source={
						props.userProfile?.thumbnail_image_url
							? { uri: props.userProfile.thumbnail_image_url }
							: Images.img.profileSmall
					}
					style={{ height: 32, width: 32, borderRadius: 32 }}
				/>

				<Text
					style={{
						fontSize: 12,
						color: props.textColor,
						paddingTop: 5,
						fontWeight: 'bold',

						maxWidth: 49,
					}}
					numberOfLines={1}
				>
					{props.userProfile?.nickname}
				</Text>
			</View>
		)
	);
};

export const UserBoxColumnMiddle = (props: UserBoxProps) => {
	useEffect(() => {
		console.log(props.isBorder);
	});

	return (
		props.userProfile && (
			<View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
				<View
					style={{
						height: 42,
						width: 42,
						borderRadius: 42,
						borderWidth: props.isBorder ? 2 : 0,
						borderColor: timeColor,

						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Image
						source={
							props.userProfile?.thumbnail_image_url
								? { uri: props.userProfile.thumbnail_image_url }
								: Images.img.profileSmall
						}
						style={{ height: 35, width: 35, borderRadius: 35 }}
					/>
				</View>

				<Text
					style={{
						fontSize: 14,
						color: props.textColor,
						paddingTop: 5,
						fontWeight: 'bold',

						maxWidth: 66,
					}}
					numberOfLines={1}
				>
					{props.userProfile?.nickname}
				</Text>
			</View>
		)
	);
};
