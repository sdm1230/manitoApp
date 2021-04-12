import React from 'react';
import { View, Image } from 'react-native';

import { UserBoxColumn } from './UserBox';

import { textColor } from '../../atom/color';
import Images from '../../atom/customImage';

interface ManiPariProps {
	manitoProfile: any;
	maniteeProfile: any;
}

export const ManiPairRow = (props: ManiPariProps) => {
	return (
		<View style={{ width: 150, flexDirection: 'row', alignItems: 'center' }}>
			<UserBoxColumn userProfile={props.manitoProfile} textColor={textColor} />
			<View style={{ flex: 1, alignItems: 'center', paddingBottom: 15 }}>
				<Image source={Images.img.arrowRight} />
			</View>
			<UserBoxColumn userProfile={props.maniteeProfile} textColor={textColor} />
		</View>
	);
};
