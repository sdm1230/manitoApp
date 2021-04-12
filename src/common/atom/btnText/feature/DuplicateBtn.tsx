import React from 'react';
import { timeColor, whiteColor } from '../../color';
import Btn from '../template/Btn';

interface DuplicateBtnProps {
	onClickBtn(): any;
}

export const DuplicateBtn = (props: DuplicateBtnProps) => {
	return (
		<Btn
			backGroundColor={whiteColor}
			textColor={timeColor}
			textSize={14}
			title="복사하기"
			width={63}
			height={18}
			shadow={false}
			onClickBtn={props.onClickBtn}
		/>
	);
};
