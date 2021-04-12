import React from 'react';
import { timeColor, whiteColor } from '../../color';
import Btn from '../template/Btn';

interface SaveConfirmBtnProps {
	onClickBtn(): any;
}

const SaveConfirmBtn = (props: SaveConfirmBtnProps) => {
	return (
		<Btn
			backGroundColor={timeColor}
			textColor={whiteColor}
			textSize={18}
			title="저장하기"
			width={115}
			height={50}
			shadow={false}
			onClickBtn={props.onClickBtn}
		/>
	);
};

export default SaveConfirmBtn;
