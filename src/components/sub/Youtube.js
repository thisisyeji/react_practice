import Layout from '../common/Layout';
import Pop from '../common/Pop';
// import axios from 'axios';

import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

function Youtube() {
	const icon = useRef(null);

	// 유튜브 리스트
	// const [Vids, setVids] = useState([]);

	// 팝업
	const pop = useRef(null);

	// 현재 클릭된 순서값
	const [Index, setIndex] = useState(0);

	// const dispatch = useDispatch();
	const Vids = useSelector((store) => store.youtubeReducer.youtube);

	// 이곳에 가상돔을 제어하는 코드를 집어넣으면 동작되지 않음
	// 이곳은 리턴문이 실행되서 가상돔의 화면에 출력(mount) 되기 전이기 때문

	/*// 폰트어썸 svg 불러오기
	// -> 동적 생성된 Vids 배열 요소 안쪽의 컨텐츠를 useRef 참조값으로 활용하기 위해서는
	// 의존성 배열에 해당 state값을 등록하고 useEffect 안쪽에서 호출
	// 의존성 배열에 Vids를 등록했기 때문에 해당 useEffect문은 axios호출이 끝나고 비어있는 Vids스테이트에 실제 데이터가 담기면서 article이라는 반복둠이 생성되는 순간에 호출됨
	// article이 생성이 되어야지 만들어지는 폰트어썸 요소를 참조했기 때문에 이곳에서만 useRef icon값을 확인 가능함
		useEffect(() => {
		console.log(icon);
	}, [Vids]);
	*/

	// 최종 정리
	// 일반적인 가상돔을 useRef로 참조한 객체는 의존성배열이 비어있는 useEffect안쪽에서 활용가능
	// 스테이트에 의해서 동적으로 생성되는 가상돔 안쪽에 있는 참조객체를 활용할때는 해당 스테이트를 의존성 배열로 등록한 useEffect 안쪽에서 활용가능

	return (
		<>
			<Layout name={'Youtube'}>
				{Vids.map((vid, idx) => (
					// 각 동영상마다 고유의 id가 있으므로 idx로 키값을 받을 필요없음
					<article key={vid.id}>
						<h2>
							{vid.snippet.title.length > 30
								? vid.snippet.title.substr(0, 30) + '...'
								: vid.snippet.title}
						</h2>
						<div className='txt'>
							<p>
								{vid.snippet.description.length > 200
									? vid.snippet.description.substr(0, 200) + '...'
									: vid.snippet.description}
							</p>
							<span>{vid.snippet.publishedAt.split('T')[0]}</span>
						</div>
						<div className='pic'>
							<FontAwesomeIcon
								icon={faYoutube}
								ref={icon}
								onClick={() => {
									pop.current.open();
									// 현재 클릭된 순서값 담기
									setIndex(idx);
								}}
							/>
							<img
								src={vid.snippet.thumbnails.maxres.url}
								alt={vid.snippet.title}
							/>
						</div>
					</article>
				))}
			</Layout>

			<Pop ref={pop}>
				{Vids.length !== 0 && (
					<iframe
						src={`https://www.youtube.com/embed/${Vids[Index].snippet.resourceId.videoId}`}
						frameBorder='0'
						allowFullScreen></iframe>
				)}
			</Pop>
		</>
	);
}

export default Youtube;
