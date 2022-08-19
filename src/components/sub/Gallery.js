import Layout from '../common/Layout';
import Pop from '../common/Pop';
import Masonry from 'react-masonry-component';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';

function Gallery() {
	const frame = useRef(null);
	const input = useRef(null);

	// 추후 자식 컴포넌트인 pop에서 forwardRef로 전달되는 객체값을 참조하기 위한 빈 참조객체 생성
	const pop = useRef(null);

	const [Items, setItems] = useState([]);
	const [Index, setIndex] = useState(0);

	const [Loading, setLoading] = useState(true);
	const [EnableClick, setEnableClick] = useState(false);

	//masonry 전환속도 옵션객체 설정
	const masonryOptions = { transitionDuration: '0.5s' };

	const num = 50;
	const user = '196138805@N05';

	// wrapping 함수로 감싸주기 (axios는 이미 promise 리턴 기능 내장)
	// wrapping 함수 앞에 async 키워드 지정
	const getFlickr = async (opt) => {
		const key = 'ca6bb9623cb117b2c44bd339126530e9';
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';
		let url = '';

		// 객체로 전달되는 타입에 따라 호출한 url을 새로 만들고 axios에 전달
		if (opt.type === 'interest')
			url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
		if (opt.type === 'user')
			url = `https://www.flickr.com/services/rest/?method=${method_user}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&user_id=${opt.user}`;
		if (opt.type === 'search')
			url = `https://www.flickr.com/services/rest/?method=${method_search}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&tags=${opt.tag}`;
		// promise 객체를 반환하는 함수 앞쪽에 await 키워드 지정
		await axios.get(url).then((json) => {
			console.log(json.data.photos.photo);
			if (json.data.photos.photo.length === 0)
				return alert('해당 검색어의 결과값이 없습니다.');
			setItems(json.data.photos.photo);
		});

		// masonry 박스정렬 시간동안 기다린 후 리스트 출력
		setTimeout(() => {
			// await로 지정된 함수가 끝날때까지 그 다음 코드는 동기화
			// console.log('데이터 호출 완료, frame 모션 시작');
			frame.current.classList.add('on');

			setLoading(false);
			setEnableClick(true);
		}, 1000);
	};

	// interest 요청 함수
	const showInterest = () => {
		if (!EnableClick) return;
		setLoading(true);
		frame.current.classList.remove('on');
		getFlickr({ type: 'interest' });
		setEnableClick(false);
	};

	// search 요청 함수
	const showSearch = () => {
		const result = input.current.value.trim();
		if (!result) return alert('검색어를 입력하세요');
		// 재클릭 방지
		if (!EnableClick) return;
		setEnableClick(false);
		setLoading(true);
		frame.current.classList.remove('on');
		// 객체 형태로 필요값 전달
		getFlickr({ type: 'search', tag: result });
		setTimeout(() => {
			input.current.value = '';
		}, 500);
	};

	// user 요청 함수
	const showUser = (e) => {
		if (!EnableClick) return;
		setLoading(true);
		frame.current.classList.remove('on');
		// user 갤러리 호출시에는 추가로 user 키값에 검색하고자 하는 유저 아이디 가져오기
		getFlickr({ type: 'user', user: e.target.getAttribute('user') });
		setEnableClick(false);
	};

	// 처음 호출시에는 interest방식으로 호출
	useEffect(() => getFlickr({ type: 'user', user: user }), []);

	return (
		<>
			<Layout name={'Gallery'}>
				<button user={user} onClick={showUser}>
					My Gallery
				</button>

				<button onClick={showInterest}>Interest Gallery</button>

				<div className='searchBox'>
					<input
						type='text'
						ref={input}
						onKeyUp={(e) => {
							if (e.key === 'Enter') showSearch();
						}}
					/>
					<button onClick={showSearch}>Search</button>
				</div>

				{Loading && (
					<img
						className='loading'
						src={process.env.PUBLIC_URL + 'img/loading.gif'}
					/>
				)}

				<div className='frame' ref={frame}>
					{/* masonry를 적용한 요소들의 부모컴포넌트를 Masonry로 만들고 태그명 지정하고 옵션객체 연결 */}
					<Masonry elementType='div' options={masonryOptions}>
						{Items.map((pic, idx) => {
							return (
								<article key={idx}>
									<div className='inner'>
										<div
											className='pic'
											onClick={() => {
												setIndex(idx);
												pop.current.open();
											}}>
											<img
												src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
												alt={pic.title}
											/>
										</div>
										<h2>{pic.title}</h2>
										<div className='profile'>
											<img
												src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
												alt={pic.owner}
												onError={(e) => {
													e.target.setAttribute(
														'src',
														'https://www.flickr.com/images/buddyicon.gif'
													);
												}}
											/>
											<span user={pic.owner} onClick={showUser}>
												{pic.owner}
											</span>
										</div>
									</div>
								</article>
							);
						})}
					</Masonry>
				</div>
			</Layout>

			{/* Pop 컴포넌트에 참조객체 pop연결 - 원래 컴포넌트에는 참조객체연결이 불가하나 forwardRef로 전달되고 있으면 참조가능 */}
			<Pop ref={pop}>
				{/* Pop의 틀 자체는 부모요소에 계속 마운트되어 있다보니 아직 Items의 값이 불러와지지 않았을때에는 오류 발생 */}
				{/* Items의 값이 비어있지 않을때 img가 Pop에 출력되도록 조건 */}
				{Items.length !== 0 && (
					<img
						src={`https://live.staticflickr.com/${Items[Index].server}/${Items[Index].id}_${Items[Index].secret}_b.jpg`}
						alt={Items[Index].title}
					/>
				)}
			</Pop>
		</>
	);
}

export default Gallery;
