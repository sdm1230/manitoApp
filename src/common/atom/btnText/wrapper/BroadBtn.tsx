import React from 'react';
import { timeColor, whiteColor } from '../../color';
import Btn from '../template/Btn';

export const JoinGameWrapper = (props: { onClickBtn(): any }) => {
	return (
		<Btn
			backGroundColor={whiteColor}
			textColor={timeColor}
			textSize={18}
			title="마니또 게임 입장하기"
			width={300}
			height={115}
			shadow={false}
			onClickBtn={() => props.onClickBtn()}
		/>
	);
};
