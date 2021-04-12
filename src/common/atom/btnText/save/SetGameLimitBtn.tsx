import React from 'react';
import { timeColor, whiteColor } from '../../color';
import Btn from '../template/Btn';

interface SetGameLimitBtnProps {
	onClickBtn(): any;
}

const CreateGameLimitBtn = (props: SetGameLimitBtnProps) => {
	return (
		<Btn
			backGroundColor={whiteColor}
			textColor={timeColor}
			textSize={18}
			title="저장하기"
			width={300}
			height={50}
			shadow
			onClickBtn={props.onClickBtn}
		/>
	);
};

export default CreateGameLimitBtn;
