import React from 'react';
import { launchImageLibrary } from 'react-native-image-picker';

const options = {
	mediaType: 'photo',
	storageOptions: {
		skipBackup: false,
		path: 'images',
	},
};

const uploadImage = (setImg: any) => {
	// console.log('edit');
	launchImageLibrary(options, (response: any) => {
		console.log('Response = ', response);

		if (response.didCancel) {
			console.log('User cancelled image picker');
		} else if (response.error) {
			console.log('ImagePicker Error: ', response.error);
		} else {
			// here we can call a API to upload image on server
			setImg(response);
		}
	});
};

export default uploadImage;
