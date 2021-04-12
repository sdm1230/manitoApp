import React from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { timeColor, whiteColor } from '../../atom/color';
import { ClosePageBtnV2, DeleteTextBtn, DeleteTextBtnBrown } from '../../atom/icon';
import stylesIcon from '../../styles/icon';

interface InputBoxProps {
	description: string;
	value: string;
	setValue(text: string): any;

	noContainer?: boolean;

	maxLength?: number;
	maxWidth?: number;
}

const InputBox = (props: InputBoxProps) => {
	return (
		<View
			style={{
				flex: 1,
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				zIndex: 1,
			}}
		>
			<View style={stylesIcon.smallIcon} />

			<KeyboardAwareScrollView
				contentContainerStyle={{ width: '100%', alignItems: 'center' }}
				scrollEnabled={false}
			>
				<TextInput
					placeholder={props.description}
					placeholderTextColor={props.noContainer ? whiteColor : timeColor}
					style={{
						fontSize: 16,
						color: props.noContainer ? whiteColor : timeColor,
						fontWeight: 'bold',
						maxWidth: props.maxWidth ? props.maxWidth : 500,
					}}
					value={props.value}
					maxLength={props.maxLength || 200}
					autoCapitalize="none"
					autoCorrect={false}
					onChangeText={(text) => props.setValue(text)}
					numberOfLines={1}
					multiline={false}
				/>
			</KeyboardAwareScrollView>

			{props.noContainer ? (
				<ClosePageBtnV2 onClickBtn={() => props.setValue('')} />
			) : (
				<DeleteTextBtn onClickBtn={() => props.setValue('')} />
			)}
		</View>
	);
};

export default InputBox;
