import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { RequestGet } from '../../../common/api/Request';
import { dateColor, textColor, timeColor, whiteColor } from '../../../common/atom/color';
import Images from '../../../common/atom/customImage';
import Chatting from '../../../common/organism/card/Chatting';

interface RenderChattingProps {
	chats: any;
	roomInfo: any;
	loginUserId: any;
	type: 'public' | 'manito';

	manitoPartyId: number;
	onEndReached: any;
}

const RenderChatting = (props: RenderChattingProps) => {
	let chatDate = '';
	let chatUserChange = true;

	let previousAuthor = {};
	let renderingPreviousAuthor = {};
	let isPreviousChat = false;

	const LastChatIndex = props.chats.findIndex(
		(item: any) => item.type === 'TEXT' || item.type === 'IMG',
	);

	const renderDate = (date: string) => {
		return (
			date.length !== 0 && (
				<View
					style={{
						borderRadius: 5,
						backgroundColor: whiteColor,
						padding: 8,
						marginVertical: 10,

						shadowColor: '#000000',
						shadowOffset: { width: 0, height: 0 },
						shadowOpacity: 0.07,
						shadowRadius: 10,
					}}
				>
					<Text
						style={{
							color: timeColor,
							fontSize: 12,
							opacity: 0.7,
						}}
					>
						{date}
					</Text>
				</View>
			)
		);
	};

	const renderNoticeMessage = (item: any, index: number) => {
		isPreviousChat = false;
		return (
			<View
				style={{
					alignSelf: 'stretch',
				}}
			>
				{index === props.chats.length - 1 && (
					<View style={{ alignItems: 'center' }}>
						{renderDate(item.created_at.split('/')[0])}
					</View>
				)}

				<View
					style={{
						height: 50,
						opacity: 0.7,
						backgroundColor: whiteColor,
						flexDirection: 'row',
					}}
				>
					<View style={{ flex: 2 }}>
						<View
							style={{
								flex: 1,
								borderBottomColor: timeColor,
								borderBottomWidth: 1,
							}}
						/>
						<View style={{ flex: 1 }} />
					</View>

					<View
						style={{
							flex: 3,
							marginHorizontal: 30,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Text
							style={{
								fontSize: 12,
								color: timeColor,
							}}
						>
							{item.content}님께서{' '}
							{item.type === 'ENTER' ? '방에 입장하셨어요!' : '방에서 나가셨어요!'}
						</Text>
					</View>

					<View style={{ flex: 2 }}>
						<View
							style={{
								flex: 1,
								borderBottomColor: timeColor,
								borderBottomWidth: 1,
							}}
						/>
						<View style={{ flex: 1 }} />
					</View>
				</View>

				{previousAuthor.is_myself === false &&
					index > 0 &&
					(props.chats[index - 1].type === 'TEXT' ||
						props.chats[index - 1].type === 'IMG') && (
						<View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
							<Image
								source={
									previousAuthor.profile?.thumbnail_image_url
										? { uri: previousAuthor.profile.thumbnail_image_url }
										: Images.img.profileSmall
								}
								style={{
									height: 40,
									width: 40,
									borderRadius: 40,
									borderWidth: 3,
									borderColor: whiteColor,
								}}
							/>
							<Text style={{ fontSize: 16, marginLeft: 5, color: textColor }}>
								{previousAuthor.profile?.nickname}
							</Text>
						</View>
					)}
			</View>
		);
	};

	return (
		<FlatList
			onEndReachedThreshold={0.8}
			onEndReached={props.onEndReached}
			inverted
			keyExtractor={(item, index) => index.toString()} // 각각의 아이템에 고유키를 주는 것
			data={props.chats}
			renderItem={({ item, index, separators }) =>
				item.type === 'TEXT' || item.type === 'IMG'
					? props.roomInfo.members
							?.filter((member: any) =>
								props.type === 'public'
									? member.user_id === item.user_id
									: member.id === item.member_id,
							)
							.map((author: any) => {
								const date = item.created_at.split('/')[0];

								if (index === LastChatIndex) previousAuthor = author;

								renderingPreviousAuthor = previousAuthor;

								if (
									isPreviousChat &&
									!previousAuthor.is_myself &&
									(props.type === 'public'
										? previousAuthor.user_id !== author.user_id
										: previousAuthor.member_id !== author.member_id)
								) {
									chatUserChange = true;
								} else {
									chatUserChange = false;
								}

								previousAuthor = author;
								isPreviousChat = true;

								if (chatDate !== date) {
									const renderedDate = chatDate;
									chatDate = date;

									chatUserChange = false;

									return (
										<View key={index}>
											<Chatting
												type={item.type}
												content={item.content}
												isAuthor={author.is_myself}
												time={item.created_at.split('/')[1]}
												diffUser={chatUserChange}
												previousAuthorProfile={
													renderingPreviousAuthor.profile
												}
											/>
											{index > 0 &&
												(props.chats[index - 1].type === 'TEXT' ||
													props.chats[index - 1].type === 'IMG') && (
													<View style={{ alignItems: 'center' }}>
														{renderDate(renderedDate)}
													</View>
												)}
											{renderingPreviousAuthor.is_myself === false &&
												index > 0 &&
												(props.chats[index - 1]?.type === 'TEXT' ||
													props.chats[index - 1]?.type === 'IMG') && (
													<View
														style={{
															flexDirection: 'row',
															alignItems: 'center',
															margin: 5,
														}}
													>
														<Image
															source={
																renderingPreviousAuthor.profile
																	?.thumbnail_image_url
																	? {
																			uri:
																				renderingPreviousAuthor
																					.profile
																					.thumbnail_image_url,
																	  }
																	: Images.img.profileSmall
															}
															style={{
																height: 40,
																width: 40,
																borderRadius: 40,
																borderWidth: 3,
																borderColor: whiteColor,
															}}
														/>
														<Text
															style={{
																fontSize: 16,
																marginLeft: 5,
																color: textColor,
															}}
														>
															{
																renderingPreviousAuthor.profile
																	?.nickname
															}
														</Text>
													</View>
												)}
										</View>
									);
								}

								return (
									<View key={index}>
										<Chatting
											type={item.type}
											content={item.content}
											isAuthor={author.is_myself}
											time={item.created_at.split('/')[1]}
											diffUser={chatUserChange}
											previousAuthorProfile={renderingPreviousAuthor.profile}
										/>
									</View>
								);
							})
					: (item.type === 'ENTER' || item.type === 'EXIT') &&
					  renderNoticeMessage(item, index)
			}
		/>
	);
};

export default RenderChatting;
