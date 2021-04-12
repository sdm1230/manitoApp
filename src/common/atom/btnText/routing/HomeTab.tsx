import React from 'react';
import { timeColor, whiteColor } from '../../color';
import Btn from '../template/Btn';

export const ToCreateGame = (props: { onClickBtn(): any }) => {
	return (
		<Btn
			backGroundColor={timeColor}
			textColor={whiteColor}
			textSize={18}
			title="마니또 게임 생성하기"
			width={300}
			height={115}
			shadow={false}
			onClickBtn={props.onClickBtn}
		/>
	);
};
