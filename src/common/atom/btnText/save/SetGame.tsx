import React from 'react';
import { timeColor, whiteColor } from '../../color';
import Btn from '../template/Btn';

interface SetGameProps {
	onClickBtn(): any;
	inActive: boolean;
	mode: 'create' | 'edit';
}

export const SetGame = (props: SetGameProps) => {
	return (
		<Btn
			backGroundColor={whiteColor}
			textColor={timeColor}
			textSize={18}
			title={props.mode === 'create' ? '마니또 게임 생성하기' : '저장하기'}
			width={300}
			height={50}
			shadow
			onClickBtn={props.onClickBtn}
			inActive={props.inActive}
		/>
	);
};
