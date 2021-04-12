import React from 'react';
import { View, Image } from 'react-native';
import LinearGradation from 'react-native-linear-gradient';
import Images from '../../customImage';

interface ImageBigProps {
	url: string;
}

const ImageBig = (props: ImageBigProps) => {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Image
				source={props.url ? { uri: props.url } : Images.img.profileBig}
				style={{ height: 242, width: 242, borderRadius: 30 }}
			/>
		</View>
	);
};

export const ImageBigGra = (props: ImageBigProps) => {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Image
				source={props.url ? { uri: props.url } : Images.img.profileGame}
				style={{ height: 242, width: 242, borderRadius: 15 }}
			/>

			<LinearGradation
				colors={['#00000000', '#000000']}
				style={{
					position: 'absolute',
					top: 30,
					left: 0,
					right: 0,
					bottom: 30,
					borderRadius: 15,
					opacity: 0.7,
				}}
				start={{ x: 0.5, y: 0.5 }}
				end={{ x: 0.5, y: 1 }}
			/>
		</View>
	);
};

export default ImageBig;
