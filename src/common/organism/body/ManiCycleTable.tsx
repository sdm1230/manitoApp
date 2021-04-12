import React from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';

import { textColor } from '../../atom/color';
import { ArrowRightImg } from '../../atom/icon';
import { UserBoxColumn, UserBoxColumnMiddle } from '../../molecule/component/UserBox';

interface ManiCycleTableProps {
	matchResult: any;
	size?: 'middle';

	editable?: boolean;
	selected?: any;
	onClickUser?(user: any): any;
}

export const ManiCycleTable = (props: ManiCycleTableProps) => {
	return (
		<ScrollView showsVerticalScrollIndicator>
			{props.matchResult && (
				<View style={{ flexDirection: 'row', width: 250, margin: 25 }}>
					<View style={{ width: 50, alignItems: 'center' }}>
						<TouchableOpacity
							onPress={() =>
								props.editable ? props.onClickUser(props.matchResult[0]) : {}
							}
							style={{
								width: '100%',
								height: '100%',
								alignItems: 'center',
								justifyContent: 'center',
							}}
							disabled={!props.editable || false}
						>
							{props.size ? (
								<UserBoxColumnMiddle
									userProfile={props.matchResult[0].profile || null}
									textColor={textColor}
									isBorder={props.selected.find(
										(selectedUser: any) =>
											selectedUser === props.matchResult[0],
									)}
								/>
							) : (
								<UserBoxColumn
									userProfile={props.matchResult[0].profile || null}
									textColor={textColor}
								/>
							)}
						</TouchableOpacity>
					</View>

					<View style={{ width: 200, flexDirection: 'row', flexWrap: 'wrap' }}>
						{props.matchResult
							.filter((member: any, index: any) => index > 0)
							.map((member: any, index: any) => (
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										height: 60,
										marginBottom: 12,
									}}
									key={index}
								>
									<View
										style={{
											width: 50,
											alignItems: 'center',
											justifyContent: 'center',
											paddingBottom: 20,
										}}
									>
										<ArrowRightImg />
									</View>

									<TouchableOpacity
										onPress={() =>
											props.editable ? props.onClickUser(member) : {}
										}
										style={{
											width: 50,
											alignItems: 'center',
											justifyContent: 'center',
										}}
										disabled={!props.editable || false}
									>
										{props.size ? (
											<UserBoxColumnMiddle
												userProfile={member.profile}
												textColor={textColor}
												isBorder={props.selected.find(
													(selectedUser: any) => selectedUser === member,
												)}
											/>
										) : (
											<UserBoxColumn
												userProfile={member.profile}
												textColor={textColor}
											/>
										)}
									</TouchableOpacity>
								</View>
							))}
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								height: 60,
								marginBottom: 12,
							}}
							key={props.matchResult[0].user_id}
						>
							<View
								style={{
									width: 50,
									alignItems: 'center',
									justifyContent: 'center',
									paddingBottom: 20,
								}}
							>
								<ArrowRightImg />
							</View>
							<View
								style={{
									width: 50,
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<TouchableOpacity
									onPress={() =>
										props.editable
											? props.onClickUser(props.matchResult[0])
											: {}
									}
									style={{
										width: '100%',
										height: '100%',
										alignItems: 'center',
										justifyContent: 'center',
									}}
									disabled={!props.editable || false}
								>
									{props.size ? (
										<UserBoxColumnMiddle
											userProfile={props.matchResult[0].profile}
											textColor={textColor}
											isBorder={props.selected.find(
												(selectedUser: any) =>
													selectedUser === props.matchResult[0],
											)}
										/>
									) : (
										<UserBoxColumn
											userProfile={props.matchResult[0].profile}
											textColor={textColor}
										/>
									)}
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			)}
		</ScrollView>
	);
};
