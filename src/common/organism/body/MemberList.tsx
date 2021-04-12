import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { textColor } from '../../atom/color';
import { UserBoxRow } from '../../molecule/component/UserBox';
import Images from '../../atom/customImage';

interface MemberListProps {
	members: any;
}

const MemberList = (props: MemberListProps) => {
	return (
		<ScrollView>
			{props.members.map((member: any, index: any) => (
				<View style={{ flexDirection: 'row', alignItems: 'center' }} key={index}>
					<UserBoxRow userProfile={member.profile} textColor={textColor} />

					{member.is_manager && (
						<Image
							source={Images.img.master}
							style={{ width: 12, marginHorizontal: 5 }}
							resizeMode="contain"
						/>
					)}

					{member.is_myself && (
						<Image
							source={Images.img.user}
							style={{ width: 12 }}
							resizeMode="contain"
						/>
					)}
				</View>
			))}
		</ScrollView>
	);
};

export default MemberList;
