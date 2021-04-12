import React from 'react';
import { StatusBar, Dimensions, Text, View, SafeAreaView } from 'react-native';
import { headerColor, whiteColor } from '../../atom/color';
import { HEIGHT_TOPBAR } from '../../atom/constants';
import { BackBtn, ListBtn } from '../../atom/icon';
import stylesShadow from '../../styles/shadow';

interface RoomHeaderProps {
	title: string;
	category: string;
	onClickBack: any;
	onClickList: any;

	numMembers: number;
}

const Width = Dimensions.get('screen').width;

export const RoomHeader = (props: RoomHeaderProps) => {
	return (
		<View
			style={{
				width: Width,
				height: HEIGHT_TOPBAR,
				display: 'flex',
				position: 'absolute',
				zIndex: 2,
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,

				borderBottomLeftRadius: 30,
				borderBottomRightRadius: 30,
				backgroundColor: headerColor,
				opacity: 0.9,

				...stylesShadow.shadowSmall,

				paddingBottom: 5,
				paddingHorizontal: 25,
			}}
		>
			<StatusBar barStyle="light-content" />

			<SafeAreaView
				forceInset={{ bottom: 'never' }}
				style={{
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<View>
					<BackBtn onClickBtn={props.onClickBack} />
				</View>

				<View style={{ alignItems: 'center' }}>
					<Text
						style={{
							fontSize: 20,
							color: whiteColor,
						}}
					>
						{props.title}
					</Text>
					<View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 5 }}>
						<Text
							style={{
								fontSize: 16,
								color: whiteColor,
							}}
						>
							{props.category}
						</Text>
						<Text
							style={{
								fontSize: 12,
								color: whiteColor,
							}}
						>
							{props.numMembers}
						</Text>
					</View>
				</View>

				<View>
					<ListBtn onClickBtn={() => props.onClickList()} />
				</View>
			</SafeAreaView>
		</View>
	);
};
