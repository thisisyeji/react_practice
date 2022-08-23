import Layout from '../common/Layout';
import Pop from '../common/Pop';
import Masonry from 'react-masonry-component';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../redux/actionType';

function Gallery() {
	const dispatch = useDispatch();

	const frame = useRef(null);
	const input = useRef(null);

	// 추후 자식 컴포넌트인 pop에서 forwardRef로 전달되는 객체값을 참조하기 위한 빈 참조객체 생성
	const pop = useRef(null);

	// store에 있는 flickr 데이터를 가져옴 (처음 사이클에서는 빈 배열 가져옴)
	const Pics = useSelector((store) => store.flickrReducer.flickr);

	const [Index, setIndex] = useState(0);
	const [Loading, setLoading] = useState(true);
	const [EnableClick, setEnableClick] = useState(false);

	//masonry 전환속도 옵션객체 설정
	const masonryOptions = { transitionDuration: '0.5s' };

	const user = '196138805@N05';

	// saga로 전달될 axios 호출 시 필요한 옵션값이 담길 state
	const [Opt, setOpt] = useState({ type: 'user', user: user });

	// interest 요청 함수
	const showInterest = () => {
		if (!EnableClick) return;
		setLoading(true);
		frame.current.classList.remove('on');
		//Opt값 변경 (interest)
		setOpt({ type: 'interest' });
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

		//Opt값 변경 (search)
		setOpt({ type: 'search', tag: result });

		setTimeout(() => {
			input.current.value = '';
		}, 500);
	};

	// user 요청 함수
	const showUser = (e) => {
		if (!EnableClick) return;
		setLoading(true);
		frame.current.classList.remove('on');

		// Opt값 변경 (user)
		setOpt({
			type: 'user',
			user: e.target.getAttribute('user'),
		});

		setEnableClick(false);
	};

	// 데이터가 로딩완료되면 로딩바 제거하고 frame 출력하는 함수
	const endLoading = () => {
		setTimeout(() => {
			frame.current.classList.add('on');
			setLoading(false);
			setTimeout(() => setEnableClick(true), 600);
		}, 1000);
	};

	// Opt값이 변경될 때마다 dispath로 변경된 해당 Opt값을 Flickr_start액션객체에 담아서 saga에 전달
	useEffect(() => {
		// FLICKR_START 액션타입의 액션 객체를 saga로 전달
		dispatch({ type: types.FLICKR.start, Opt });
	}, [Opt]);

	// flickr 데이터가 변경될때마다 (새로운 데이터 요청을 해서 해당 요청이 완료될때마다) 로딩 제거함수 호출
	useEffect(() => endLoading, [Pics]);

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
						src={process.env.PUBLIC_URL + '/img/loading.gif'}
					/>
				)}

				<div className='frame' ref={frame}>
					{/* masonry를 적용한 요소들의 부모컴포넌트를 Masonry로 만들고 태그명 지정하고 옵션객체 연결 */}
					<Masonry elementType='div' options={masonryOptions}>
						{Pics.map((pic, idx) => {
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
				{Pics.length !== 0 && (
					<img
						src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`}
						alt={Pics[Index].title}
					/>
				)}
			</Pop>
		</>
	);
}

export default Gallery;
