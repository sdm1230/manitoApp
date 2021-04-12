import React from 'react';
import { View, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import Images from '../../customImage';

interface ImageMiddleProps {
	url: string;
}

const ImageMiddle = (props: ImageMiddleProps) => {
	return (
		<FastImage
			source={props.url ? { uri: `${props.url}?time=${new Date()}` } : Images.img.profileBig}
			style={{ height: 100, width: 100, borderRadius: 100 }}
			resizeMode="cover"
		/>
	);
};

export default ImageMiddle;
