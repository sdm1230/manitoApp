import React from 'react';
import { View, Image } from 'react-native';
import Images from '../../customImage';

interface ImageTinyProps {
	url: string;
}

const ImageTiny = (props: ImageTinyProps) => {
	return (
		<View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
			<Image
				source={props.url ? { uri: props.url } : Images.img.profileSmall}
				style={{ height: 32, width: 32, borderRadius: 32 }}
			/>
		</View>
	);
};

export default ImageTiny;
