/*
takeLatest: 액션요청이 여러번 들어오면 제일 최근 요청 하나만 실행 (takeEvery: 들어오는 요청 모두 처리)
all: 여러 개의 요청함수를 병렬식으로 동시에 처리
call: 특정 함수를 동기적으로 호출 (api 요청시 주로 사용, 두번째 인수로 api 요청에 필요한 옵션값 전달)
fork: saga 실행 함수
put: 리듀서로 action 객체를 전달하는 함수(dispatch)
*/

import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { getFlickr, getYoutube, getMembers } from './api';
import * as types from './actionType';

//Flickr saga
//컴포넌트에서 받은 인수값을 api.js에 있는 axios함수에 연결해서 호출하는 함수
export function* returnFlickr(action) {
	try {
		const response = yield call(getFlickr, action.Opt);
		yield put({
			type: types.FLICKR.success,
			payload: response.data.photos.photo,
		});
	} catch (err) {
		yield put({ type: types.FLICKR.err, payload: err });
	}
}

//요청받은 action타입에 따라서 함수 호출
export function* callFlickr() {
	// console.log('callFlickr');
	yield takeLatest(types.FLICKR.start, returnFlickr);
}

// Members saga
export function* returnMembers() {
	try {
		const response = yield call(getMembers);
		yield put({ type: types.MEMBERS.success, payload: response.data.members });
	} catch (err) {
		yield put({ type: types.MEMBERS.err, payload: err });
	}
}

export function* callMembers() {
	yield takeLatest(types.MEMBERS.start, returnMembers);
}

// Youtube saga
export function* returnYoutube(action) {
	try {
		const response = yield call(getYoutube);
		yield put({ type: types.YOUTUBE.success, payload: response.data.items });
	} catch (err) {
		yield put({ type: types.YOUTUBE.err, payload: err });
	}
}

export function* callYoutube() {
	yield takeLatest(types.YOUTUBE.start, returnYoutube);
}

//store.js에 의해서 reducer에 적용될 rootSaga함수 생성
export default function* rootSaga() {
	// console.log('rootSaga');
	yield all([fork(callFlickr), fork(callMembers), fork(callYoutube)]);
}
