import React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Router } from './src/pages/Router';

const api = 'https://manito.shop';

const App = () => {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<Router />
			</NavigationContainer>
		</SafeAreaProvider>
	);
};

export default App;
