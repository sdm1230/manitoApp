import React from 'react';
import { timeColor, whiteColor } from '../../color';
import Btn from '../template/Btn';

interface CheckConfirmBtnProps {
	onClickBtn(): any;
	title?: string;
}

export const CheckConfirmBtn = (props: CheckConfirmBtnProps) => {
	return (
		<Btn
			backGroundColor={timeColor}
			textColor={whiteColor}
			textSize={18}
			title={props.title || '확인'}
			width={115}
			height={50}
			shadow={false}
			onClickBtn={props.onClickBtn}
		/>
	);
};
