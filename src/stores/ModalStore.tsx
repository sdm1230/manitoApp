import { observable } from 'mobx';

const ModalStore = observable({
	joinGameModal: {
		visible: false,
	},
	createGameModal: {
		visible: false,
		gameCode: '',
	},

	openJoinGameModal() {
		this.joinGameModal = {
			visible: true,
		};
	},
	closeJoinGameModal() {
		this.joinGameModal = {
			visible: false,
		};
	},

	openCreateGameModal(gameCode: string) {
		this.createGameModal = {
			visible: true,
			gameCode,
		};
	},
	closeCreateGameModal() {
		this.createGameModal = {
			visible: false,
			gameCode: '',
		};
	},
});

export { ModalStore };
