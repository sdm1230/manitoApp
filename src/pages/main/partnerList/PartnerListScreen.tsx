import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, SafeAreaView } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import { useObserver } from 'mobx-react';
import { MainTabParamList } from '../MainRouter';
import ManiCardShort from '../../../common/organism/card/ManiCardShort';
import { timeColor } from '../../../common/atom/color';
import { TabHeader } from '../../../common/molecule/header/TabHeader';

import useStore from '../../../stores/stores';

interface PartnerListScreenProps {
	navigation: StackNavigationProp<MainTabParamList, 'PartnerList'>;
	route: RouteProp<MainTabParamList, 'PartnerList'>;
}

const PartnerListScreen = ({ navigation, route }: PartnerListScreenProps) => {
	const { ProfileStore, UserStore } = useStore();

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			ProfileStore.getManitoProfiles();
			UserStore.getLoginUser();
		});

		return unsubscribe;
	}, [navigation]);

	return useObserver(() => (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" />

			<TabHeader title="프로필" />

			<ScrollView contentContainerStyle={{ alignItems: 'center', alignSelf: 'stretch' }}>
				<View style={{ marginVertical: 10 }}>
					<ManiCardShort target="user" user={UserStore.user} />
				</View>

				{ProfileStore.manitoProfiles.length > 0 &&
					ProfileStore.manitoProfiles.map((manito: any, index: any) => (
						<View style={{ marginVertical: 10 }} key={manito.id}>
							<ManiCardShort
								target={manito.is_manager ? 'master' : 'manito'}
								user={manito}
								manitoParty={manito.manito_party}
							/>
						</View>
					))}
			</ScrollView>
		</View>
	));
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: timeColor,
		justifyContent: 'center',
	},
});

export default PartnerListScreen;
