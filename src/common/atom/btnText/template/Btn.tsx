import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface BtnProps {
	backGroundColor: string;
	textColor: string;
	textSize: number;

	title: string;
	width: number;
	height: number;
	shadow: boolean;
	onClickBtn(): any;
	inActive?: boolean;
}

const Btn = (props: BtnProps) => {
	return (
		<TouchableOpacity onPress={() => props.onClickBtn()} disabled={!!props.inActive}>
			<View
				style={
					props.shadow
						? {
								width: props.width,
								height: props.height,
								backgroundColor: props.backGroundColor,
								borderRadius: 30,
								alignItems: 'center',
								justifyContent: 'center',

								shadowColor: '#000000',
								shadowRadius: 15,
								shadowOpacity: 0.07,
								shadowOffset: { width: 0, height: 0 },
						  }
						: {
								width: props.width,
								height: props.height,
								backgroundColor: props.backGroundColor,
								borderRadius: 30,
								alignItems: 'center',
								justifyContent: 'center',
						  }
				}
			>
				<Text
					style={{
						fontSize: props.textSize,
						color: props.textColor,
						fontWeight: 'bold',
						opacity: props.inActive ? 0.5 : 1,
						fontFamily: 'AppleSDGothicNeo-Regular',
					}}
				>
					{props.title}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default Btn;
