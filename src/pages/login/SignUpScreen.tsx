import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import Modal from 'react-native-modal';
import { useObserver } from 'mobx-react';
import { StackParamList } from '../Router';

import { timeColor } from '../../common/atom/color';

import ManiCardLong from '../../common/organism/card/ManiCardLong';
import NoticeModal from '../../common/organism/modal/template/NoticeModal';
import useStore from '../../stores/stores';

interface Props {
	navigation: StackNavigationProp<StackParamList, 'SignUp'>;
	route: RouteProp<StackParamList, 'SignUp'>;
}

interface ProfileInfoProps {
	name: string;
	profile?: any;
}

const SignUpScreen = ({ navigation, route }: Props) => {
	const [alertModalVisible, setAlertModalVisible] = useState(false);

	const { UserStore } = useStore();

	const editProfile = async (propsEdit: ProfileInfoProps) => {
		if (propsEdit.name.length > 10 && propsEdit.name.length === 0) {
			setAlertModalVisible(true);
		} else {
			UserStore.editUserProfile(propsEdit.name, propsEdit.profile);
			navigation.navigate('Main');
		}
	};

	useEffect(() => {
		UserStore.getLoginUser();
		console.log(JSON.stringify(UserStore.user.profile));
	}, []);

	return useObserver(() => (
		<View
			style={{
				flex: 1,
				backgroundColor: timeColor,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<ManiCardLong
				type="create"
				target="user"
				btnText="가입하기"
				onClickBtn={(props: any) => editProfile(props)}
				userProfile={UserStore.user?.profile}
			/>

			<Modal
				isVisible={alertModalVisible} // isVisible Props에 State 값을 물려주어 On/off control
				useNativeDriver // 아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
				hideModalContentWhileAnimating
				onBackdropPress={() => setAlertModalVisible(false)}
			>
				<NoticeModal
					contents={['이름을 10자 이내로 지어주세요.']}
					onCloseModal={() => setAlertModalVisible(false)}
				/>
			</Modal>
		</View>
	));
};

export default SignUpScreen;
