import React from 'react';
import { timeColor, whiteColor } from '../../color';
import Btn from '../template/Btn';

interface SetMissionProps {
	onClickBtn(): any;
	inActive: boolean;
	mode: 'create' | 'edit';
}

export const SetMission = (props: SetMissionProps) => {
	return (
		<Btn
			backGroundColor={whiteColor}
			textColor={timeColor}
			textSize={18}
			title={props.mode === 'create' ? '생성하기' : '저장하기'}
			width={300}
			height={50}
			shadow
			onClickBtn={props.onClickBtn}
			inActive={props.inActive}
		/>
	);
};
