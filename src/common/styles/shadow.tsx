import React from 'react';
import { StyleSheet } from 'react-native';
import { timeColor } from '../atom/color';

const stylesShadow = StyleSheet.create({
	shadowSmall: {
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.07,
		shadowRadius: 15,

		elevation: 4,
	},
	shadowSmallReverse: {
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: -5 },
		shadowOpacity: 0.07,
		shadowRadius: 15,

		elevation: -4,
	},
	shadowBig: {
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.14,
		shadowRadius: 15,

		elevation: 8,
	},

	shadowlighting: {
		shadowColor: timeColor,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.14,
		shadowRadius: 15,

		elevation: 8,
	},
});

export default stylesShadow;
