import React from 'react';
import useStore from '../../../stores/stores';
import ManiCardLong from '../card/ManiCardLong';

interface ManiModalProps {
	user?: any; // create has no user
	target: 'master' | 'manito' | 'manitee' | 'user';
	onClickClose(): any;

	manitoPartyId?: number;

	setProfile?: any;
}

export const ConfirmTargetModal = (props: ManiModalProps) => {
	return (
		<ManiCardLong
			type="confirm"
			target={props.target}
			btnText="확인"
			onClickBtn={() => props.onClickClose()}
			userProfile={props.user.profile}
		/>
	);
};

interface ProfileInfoProps {
	name: string;
	profile?: any;
}

export const CreateManitoProfileModal = (props: ManiModalProps) => {
	const { ProfileStore } = useStore();

	const createProfile = async (propsCreate: ProfileInfoProps) => {
		ProfileStore.CreateManitoProfileModal(
			props.manitoPartyId,
			propsCreate.name,
			propsCreate.profile,
		);
		props.onClickClose();
	};

	return (
		<ManiCardLong
			type="create"
			target={props.target}
			btnText="생성하기"
			onClickBtn={(props: any) => createProfile(props)}
		/>
	);
};

export const EditProfileModal = (props: ManiModalProps) => {
	const { ProfileStore, UserStore } = useStore();

	const editProfile = async (propsEdit: ProfileInfoProps) => {
		if (props.target === 'user') {
			UserStore.editUserProfile(propsEdit.name, propsEdit.profile);
		} else {
			ProfileStore.editManitoProfile(props.manitoPartyId, propsEdit.name, propsEdit.profile);
		}
		props.onClickClose();
	};

	return (
		<ManiCardLong
			type="edit"
			target={props.target}
			btnText="저장하기"
			onClickBtn={(props: any) => editProfile(props)}
			onClickClose={() => props.onClickClose()}
			userProfile={props.user.profile}
			manitee={props.user.manitee}
		/>
	);
};
