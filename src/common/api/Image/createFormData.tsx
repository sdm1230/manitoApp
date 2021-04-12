import React from 'react';
import { Platform } from 'react-native';

interface CreateFormDataProps {
	photo: any;

	// user Profile
	nickname?: string;

	// game Profile
	name?: string;
	quota?: string;
}

const createFormData = (props: CreateFormDataProps) => {
	const data = new FormData();

	data.append('image', {
		name: props.photo.fileName,
		type: props.photo.type,
		uri: Platform.OS === 'android' ? props.photo.uri : props.photo.uri.replace('file://', ''),
	});

	// for user Profile
	props.nickname && data.append('nickname', props.nickname);

	// for game Profile
	props.name && data.append('name', props.name);
	props.quota && data.append('quota', props.quota);

	// console.log(JSON.stringify(data));

	return data;
};

export default createFormData;
