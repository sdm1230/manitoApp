import React from 'react';
import { View } from 'react-native';
import { DotFillImg, DotUnFillImg } from '../../atom/icon';

interface ScrollIndicatorProps {
	num: number;
	target: number;
}
const ScrollIndicator = (props: ScrollIndicatorProps) => {
	return (
		<View style={{ flexDirection: 'row' }}>
			{[...Array(props.num).keys()].map((index) => (
				<View style={{ marginHorizontal: 2 }} key={index}>
					{index === props.target ? <DotFillImg /> : <DotUnFillImg />}
				</View>
			))}
		</View>
	);
};

export default ScrollIndicator;
