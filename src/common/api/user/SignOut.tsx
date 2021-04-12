import React from 'react';

import { clearAllToken } from '../Tokening';

export default async function signOutUser() {
	clearAllToken();
}
