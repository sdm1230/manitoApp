import React from 'react';
import { View } from 'react-native';

import DatePicker from 'react-native-date-picker';
import { CheckConfirmBtn } from '../../../atom/btnText/confirm/CheckConfirm';
import { whiteColor } from '../../../atom/color';

interface DatePickerModalProps {
	date: string;
	setDate: any;
	onClickClose(): any;
}

const DatePickerModal = (props: DatePickerModalProps) => {
	return (
		<View
			style={{
				height: 200,
				width: 300,
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: 30,
				backgroundColor: whiteColor,
			}}
		>
			<DatePicker
				date={new Date(props.date)}
				onDateChange={(date) => props.setDate(date.toISOString().split('T')[0])}
				mode="date"
				locale="ko"
			/>
			<View style={{ position: 'absolute', top: 250 }}>
				<CheckConfirmBtn onClickBtn={() => props.onClickClose()} />
			</View>
		</View>
	);
};

export default DatePickerModal;
