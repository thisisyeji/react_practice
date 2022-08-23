import axios from 'axios';

export const getFlickr = async (opt) => {
	const key = 'ca6bb9623cb117b2c44bd339126530e9';
	const method_interest = 'flickr.interestingness.getList';
	const method_user = 'flickr.people.getPhotos';
	const method_search = 'flickr.photos.search';
	const num = 50;
	let url = '';

	// 객체로 전달되는 타입에 따라 호출한 url을 새로 만들고 axios에 전달
	if (opt.type === 'interest')
		url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
	if (opt.type === 'user')
		url = `https://www.flickr.com/services/rest/?method=${method_user}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&user_id=${opt.user}`;
	if (opt.type === 'search')
		url = `https://www.flickr.com/services/rest/?method=${method_search}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&tags=${opt.tag}`;

	// promise 객체를 반환하는 함수 앞쪽에 await 키워드 지정
	return await axios.get(url); // 순수함수
};

export const getMembers = async () => {
	const url = process.env.PUBLIC_URL + '/DB/members.json';
	return await axios.get(url);
};

export const getYoutube = async () => {
	const key = 'AIzaSyD1ZRgZNZXs590CNC6IbqqDi5RFFZNf1VM';
	const playlist = 'PL4lFp_wxDge_0KaYa0XNk7f4CZEA4Z1J3';
	const num = 6;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

	return await axios.get(url);
};
/* 
redux로 관리되는 파일들은 컴포넌트 외부에서 전역으로 동작하기 때문에 부수효과를 발생시키지 않는 순수함수 형태로 제작
부수효과 (Side Effect): DOM이나 컴포넌트가 제어해야되는 화면의 변경점을 야기시키는 효과 (순수 자바스크립트가 처리할 수 없는 업무들)
순수함수 (Pure Function): 부수효과를 발생시키지 않는 함수
*/
