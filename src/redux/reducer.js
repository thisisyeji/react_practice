import { combineReducers } from 'redux';
import * as types from './actionType';

/*
const initMember = {
	members: [
		{
			name: 'Julia',
			position: 'President',
			pic: 'member1.jpg',
		},
		{
			name: 'David',
			position: 'Vice President',
			pic: 'member2.jpg',
		},
		{
			name: 'Emily',
			position: 'UI Designer',
			pic: 'member3.jpg',
		},
		{
			name: 'Paul',
			position: 'Front-end Engineer',
			pic: 'member4.jpg',
		},
		{
			name: 'Sara',
			position: 'Back-end Engineer',
			pic: 'member5.jpg',
		},
		{
			name: 'Michael',
			position: 'Project Manager',
			pic: 'member6.jpg',
		},
	],
};
*/

//초기데이터를 state에 저장했다가 추후 action객체가 전달되면
//action객체의 타입에 따라 기존 데이터를 변경해서 리턴
const memberReducer = (state = { members: [] }, action) => {
	switch (action.type) {
		case types.MEMBERS.start:
			return { ...state };
		case types.MEMBERS.success:
			return { ...state, members: action.payload };
		case types.MEMBERS.err:
			return { ...state, members: action.payload };
		default:
			return state;
	}
};

const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		case types.YOUTUBE.start:
			return { ...state };
		case types.YOUTUBE.success:
			return { ...state, youtube: action.payload };
		case types.YOUTUBE.err:
			return { ...state, youtube: action.payload };
		default:
			return state;
	}
};

const flickrReducer = (state = { flickr: [] }, action) => {
	switch (action.type) {
		case types.FLICKR.start:
			return { ...state };
		case types.FLICKR.success:
			return { ...state, flickr: action.payload };
		case types.FLICKR.err:
			return { ...state, flickr: action.payload };
		default:
			return state;
	}
};

//전달된 각각의 reducer를 하나로 합쳐서 반환
const reducers = combineReducers({
	memberReducer,
	youtubeReducer,
	flickrReducer,
});

export default reducers;
