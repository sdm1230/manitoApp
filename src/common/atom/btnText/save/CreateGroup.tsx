import React from 'react';
import { View } from 'react-native';
import { textColor, whiteColor } from '../../color';
import Btn from '../template/Btn';

interface CreateGroupProps {
	onClickBtn(): any;
	inActive: boolean;
}

const CreateGroup = (props: CreateGroupProps) => {
	return (
		<View style={{ borderColor: textColor, borderWidth: 1, borderRadius: 30 }}>
			<Btn
				backGroundColor={whiteColor}
				textColor={textColor}
				textSize={16}
				title="그룹 만들기"
				width={100}
				height={40}
				shadow
				onClickBtn={props.onClickBtn}
				inActive={props.inActive}
			/>
		</View>
	);
};

export default CreateGroup;
