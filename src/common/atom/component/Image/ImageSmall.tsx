import React from 'react';
import { View, Image } from 'react-native';
import Images from '../../customImage';

interface ImageSmallProps {
	url: string;
}

const ImageSmall = (props: ImageSmallProps) => {
	return (
		<Image
			source={props.url ? { uri: props.url } : Images.img.profileSmall}
			style={{ height: 40, width: 40, borderRadius: 40 }}
		/>
	);
};

export default ImageSmall;
