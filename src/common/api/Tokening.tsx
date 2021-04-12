import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../atom/constants';

export const setAccessToken = async (token: string) => {
	try {
		console.log(`[set Access token]:${token}\n`);
		await AsyncStorage.setItem(ACCESS_TOKEN, token);
	} catch (err) {
		console.error(err);
	}
};

export const getAccessToken = async () => {
	// token 없으면 null 반환
	try {
		const token = await AsyncStorage.getItem(ACCESS_TOKEN);
		if (token !== null) {
			// value previously stored
			await console.log(`[got Access token]:${token}\n`);
			return token;
		}
		return null;
	} catch (e) {
		// error reading value
		console.error(e);
		return null;
	}
};

export const setRefreshToken = async (token: string) => {
	try {
		console.log(`[set Refresh token]:${token}\n`);
		await AsyncStorage.setItem(REFRESH_TOKEN, token);
	} catch (err) {
		console.error(err);
	}
};

export const getRefreshToken = async () => {
	// token 없으면 null 반환
	try {
		const token = await AsyncStorage.getItem(REFRESH_TOKEN);
		if (token !== null) {
			// value previously stored
			await console.log(`[got Refresh token]:${token}\n`);
		}
		return token;
	} catch (e) {
		// error reading value
		console.error(e);
		return null;
	}
};

export const clearAllToken = async () => {
	try {
		console.log('[clear all tokens]');
		AsyncStorage.clear();
	} catch (e) {
		console.error(e);
	}
};
