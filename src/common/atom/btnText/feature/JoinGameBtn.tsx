import React from 'react';
import { timeColor, whiteColor } from '../../color';
import Btn from '../template/Btn';

interface JoinGameBtnProps {
	onClickBtn(): any;
	inActive: boolean;
}

export const JoinGameBtn = (props: JoinGameBtnProps) => {
	return (
		<Btn
			backGroundColor={timeColor}
			textColor={whiteColor}
			textSize={18}
			title="입장"
			width={81}
			height={50}
			shadow={false}
			onClickBtn={() => props.onClickBtn()}
			inActive={props.inActive}
		/>
	);
};
