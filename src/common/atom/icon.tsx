import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import Images from './customImage';
import stylesIcon from '../styles/icon';

interface BtnProps {
	onClickBtn(param?: any): any;
	title?: string;
	color?: string;
}

// ChatRoom
export const BackBtn = (props: BtnProps) => {
	return (
		<TouchableOpacity onPress={props.onClickBtn}>
			<Image
				source={Images.btn.backWhite}
				resizeMode="contain"
				style={stylesIcon.middleIcon}
			/>
		</TouchableOpacity>
	);
};

export const ListBtn = (props: BtnProps) => {
	return (
		<TouchableOpacity onPress={props.onClickBtn}>
			<Image source={Images.btn.menu} resizeMode="contain" style={stylesIcon.middleIcon} />
		</TouchableOpacity>
	);
};

export const PlusBtn = (props: BtnProps) => {
	return (
		<TouchableOpacity onPress={props.onClickBtn}>
			<Image
				source={Images.btn.plusChat}
				resizeMode="contain"
				style={stylesIcon.middleIcon}
			/>
		</TouchableOpacity>
	);
};

export const CheckBtn = (props: BtnProps) => {
	return (
		<TouchableOpacity onPress={props.onClickBtn}>
			<Image
				source={Images.btn.sendChat}
				resizeMode="contain"
				style={stylesIcon.middleIcon}
			/>
		</TouchableOpacity>
	);
};

export const ClosePageBtn = (props: BtnProps) => {
	return (
		<TouchableOpacity onPress={props.onClickBtn}>
			<Image
				source={Images.btn.closePage}
				resizeMode="contain"
				style={stylesIcon.middleIcon}
			/>
		</TouchableOpacity>
	);
};
export const ClosePageBtnV2 = (props: BtnProps) => {
	return (
		<TouchableOpacity onPress={props.onClickBtn}>
			<Image
				source={Images.btn.deleteMissionWhite}
				resizeMode="contain"
				style={stylesIcon.middleIcon}
			/>
		</TouchableOpacity>
	);
};

// PartnerTab

export const EditBtnWhite = (props: BtnProps) => {
	return (
		<TouchableOpacity onPress={props.onClickBtn}>
			<Image
				source={Images.btn.editWhite}
				resizeMode="contain"
				style={stylesIcon.middleIcon}
			/>
		</TouchableOpacity>
	);
};

export const PlusImgBtn = (props: BtnProps) => {
	return (
		<TouchableOpacity
			onPress={props.onClickBtn}
			style={{ zIndex: 1, ...stylesIcon.middleIcon, padding: 0 }}
		>
			<Image source={Images.btn.plus} style={stylesIcon.middleIcon} resizeMode="contain" />
		</TouchableOpacity>
	);
};

export const DeleteTextBtn = (props: BtnProps) => {
	return (
		<TouchableOpacity onPress={props.onClickBtn}>
			<Image
				source={Images.btn.deleteTextRed}
				style={stylesIcon.middleIcon}
				resizeMode="contain"
			/>
		</TouchableOpacity>
	);
};
export const DeleteTextBtnBrown = (props: BtnProps) => {
	return (
		<TouchableOpacity onPress={props.onClickBtn}>
			<Image
				source={Images.btn.deleteTextBrown}
				style={stylesIcon.middleIcon}
				resizeMode="contain"
			/>
		</TouchableOpacity>
	);
};

export const CloseModalBtn = (props: BtnProps) => {
	return (
		<TouchableOpacity onPress={props.onClickBtn}>
			<Image
				source={Images.btn.closeModal}
				resizeMode="contain"
				style={stylesIcon.middleIcon}
			/>
		</TouchableOpacity>
	);
};

// Mission
export const EditBtnRed = (props: BtnProps) => {
	return (
		<TouchableOpacity onPress={props.onClickBtn}>
			<Image source={Images.btn.editRed} resizeMode="contain" style={stylesIcon.smallIcon} />
		</TouchableOpacity>
	);
};

export const DetailBtnRed = (props: BtnProps) => {
	return (
		<TouchableOpacity onPress={props.onClickBtn}>
			<Image
				source={Images.btn.searchRed}
				resizeMode="contain"
				style={stylesIcon.smallIcon}
			/>
		</TouchableOpacity>
	);
};

// ChatList

export const ExitRoomBtn = () => {
	return (
		<Image source={Images.btn.exitRoom} resizeMode="contain" style={stylesIcon.middleIcon} />
	);
};

// Card

export const SelectedBtn = (props: BtnProps) => {
	return (
		<TouchableOpacity onPress={props.onClickBtn}>
			<Image
				source={Images.btn.selected}
				resizeMode="contain"
				style={stylesIcon.middleIcon}
			/>
		</TouchableOpacity>
	);
};
export const UnSelectedBtn = (props: BtnProps) => {
	return (
		<TouchableOpacity onPress={props.onClickBtn}>
			<Image
				source={Images.btn.unSelected}
				resizeMode="contain"
				style={stylesIcon.middleIcon}
			/>
		</TouchableOpacity>
	);
};

// img

export const DotFillImg = () => {
	return <Image source={Images.img.dotFill} resizeMode="contain" style={stylesIcon.tinyIcon} />;
};

export const DotUnFillImg = () => {
	return <Image source={Images.img.dotUnFill} resizeMode="contain" style={stylesIcon.tinyIcon} />;
};

export const TriangleImg = () => {
	return (
		<Image
			source={Images.img.triangle}
			resizeMode="contain"
			style={{ width: 13, height: 11 }}
		/>
	);
};

export const ArrowRightImg = () => {
	return (
		<Image source={Images.img.arrowRight} resizeMode="contain" style={stylesIcon.middleIcon} />
	);
};

export const ArrowBothImg = () => {
	return (
		<Image source={Images.img.arrowBoth} resizeMode="contain" style={stylesIcon.middleIcon} />
	);
};

export const CrownImg = () => {
	return <Image source={Images.img.crown} resizeMode="contain" style={stylesIcon.middleIcon} />;
};

export const LockImg = () => {
	return <Image source={Images.img.lock} resizeMode="contain" style={stylesIcon.middleIcon} />;
};

export const FreeChatImg = () => {
	return (
		<Image source={Images.img.freeChat} resizeMode="contain" style={stylesIcon.middleIcon} />
	);
};

export const ManitoChatImg = () => {
	return (
		<Image source={Images.img.manitoChat} resizeMode="contain" style={stylesIcon.middleIcon} />
	);
};
