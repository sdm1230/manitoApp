import React from 'react';
import { timeColor, whiteColor } from '../../color';
import Btn from '../template/Btn';

interface CreateConfirmBtnProps {
	onClickBtn(): any;
	title: string;
}

const CreateConfirmBtn = (props: CreateConfirmBtnProps) => {
	return (
		<Btn
			backGroundColor={timeColor}
			textColor={whiteColor}
			textSize={18}
			title={props.title}
			width={115}
			height={50}
			shadow={false}
			onClickBtn={props.onClickBtn}
		/>
	);
};

export default CreateConfirmBtn;
