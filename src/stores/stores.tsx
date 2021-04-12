import { ProfileStore } from './ProfileStore';
import { UserStore } from './UserStore';
import { GameListStore } from './GameListStore';
import { ModalStore } from './ModalStore';

const useStore = () => {
	return {
		ProfileStore,
		UserStore,
		GameListStore,
		ModalStore,
	};
};

export default useStore;
