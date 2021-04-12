import React from 'react';
import { View, Text, Dimensions } from 'react-native';

import { whiteColor, timeColor } from '../../atom/color';

const Width = Dimensions.get('screen').width;

const NoticeBar = (props: { content: string }) => {
	return (
		<View
			style={{
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: timeColor,
				width: Width * 0.9,
				paddingVertical: 8,
				borderRadius: 10,
				opacity: 0.9,

				shadowColor: '#000000',
				shadowOffset: { width: 0, height: 0 },
				shadowOpacity: 0.07,
				shadowRadius: 15,
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
	);
};

export default NoticeBar;
