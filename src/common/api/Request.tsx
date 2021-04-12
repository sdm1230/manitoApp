import react from 'react';
import axios from 'axios';

import { API_BASE_URL } from '../atom/constants';
import { getAccessToken } from './Tokening';

interface RequestGetProps {
	api: string;
	func_success?(res?: any): any;
	func_fail?(err?: any): any;
}

export async function RequestGet(options: RequestGetProps) {
	await console.log(`[===start Request_Get===]`);
	const token = await getAccessToken();

	await axios
		.get(API_BASE_URL + options.api, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => {
			console.log('====Request_Get success====');
			console.log(res.data);
			options.func_success ? options.func_success(res.data) : {};
		})
		.catch((err) => {
			console.error('====Request_Get error====');
			console.error(err.response);
			options.func_fail ? options.func_fail(err.response) : {};
		});
}

export async function RequestDelete(options: RequestGetProps) {
	const token = await getAccessToken();

	await axios
		.delete(API_BASE_URL + options.api, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => {
			console.log('====Request_Delete success====');
			console.log(res.data);
			options.func_success ? options.func_success(res.data) : {};
		})
		.catch((err) => {
			console.error(`====Request_Delete error====${token}`);
			console.error(err.response);
			options.func_fail ? options.func_fail(err.response) : {};
		});
}

interface RequestPostProps {
	api: string;
	body: object;
	func_success?(res?: any): any;
	func_fail?(err?: any): any;
}

export async function RequestPost(options: RequestPostProps) {
	const token = await getAccessToken();

	await axios
		.post(API_BASE_URL + options.api, options.body, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => {
			console.log('====Request_Post success====');
			console.log(res.data);
			options.func_success ? options.func_success(res.data) : {};
		})
		.catch((err) => {
			console.error('====Request_Post error====');
			console.log(err.response);
			options.func_fail ? options.func_fail(err.response) : {};
		});
}

export async function RequestPut(options: RequestPostProps) {
	const token = await getAccessToken();

	await axios
		.put(API_BASE_URL + options.api, options.body, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => {
			console.log('====Request_Put success====');
			console.log(res.data);
			options.func_success ? options.func_success(res.data) : {};
		})
		.catch((err) => {
			console.error('====Request_Put error====');
			console.error(err.response);
			options.func_fail ? options.func_fail(err.response) : {};
		});
}
