import { Dimensions } from 'react-native';

export const API_BASE_URL = 'https://manito.shop';
export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';

export const HEIGHT_TOPBAR = 100;

export const DISTANCE_CARD = 20;

export const HEIGHT_SCREEN = Dimensions.get('screen').height;
export const WIDTH_SCREEN = Dimensions.get('screen').width;
export const HEIGHT_BOTTOMBAR = HEIGHT_SCREEN / WIDTH_SCREEN > 2 ? 75 : 48;
