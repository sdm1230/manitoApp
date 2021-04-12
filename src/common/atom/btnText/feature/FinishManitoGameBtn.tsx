import React from 'react';
import { timeColor, whiteColor } from '../../color';
import Btn from '../template/Btn';

interface FinishManitoGameBtnProps {
	onClickBtn(): any;
}

const FinishManitoGameBtn = (props: FinishManitoGameBtnProps) => {
	return (
		<Btn
			backGroundColor={whiteColor}
			textColor={timeColor}
			textSize={18}
			title="지금 종료하고 싶으신가요?"
			width={300}
			height={50}
			shadow
			onClickBtn={props.onClickBtn}
		/>
	);
};

export default FinishManitoGameBtn;
