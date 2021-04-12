import React, { useState } from 'react';
import { ConfirmTargetModal, CreateManitoProfileModal } from '../ManiModal';

interface ManitoChatRegisterProps {
	id: number;
	manitee: any;
	onCloseModal(): any;
}

const ManitoChatRegister = (props: ManitoChatRegisterProps) => {
	const [pageIndex, setPageIndex] = useState(0);

	return pageIndex === 0 ? (
		<ConfirmTargetModal
			user={props.manitee}
			target="manitee" // 마니또 게임 후 결과발표시 manito로 타겟바뀜
			onClickClose={() => setPageIndex(1)}
		/>
	) : (
		<CreateManitoProfileModal
			target="manito"
			onClickClose={() => props.onCloseModal()}
			manitoPartyId={props.id}
		/>
	);
};

export default ManitoChatRegister;
