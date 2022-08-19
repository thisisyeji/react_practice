import Layout from '../common/Layout';
import { useRef, useEffect, useState } from 'react';

function Location() {
	const { kakao } = window;

	// 위치별로 관리할 정보값을 객체로 묶어서 다시 배열로 그룹핑 (직접 한 것)
	const info = [
		{
			title: '삼성동 코엑스',
			latLng: new kakao.maps.LatLng(37.51271224560607, 127.06069135102807),
			imgUrl: process.env.PUBLIC_URL + '/img/marker1.png',
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '올림픽 공원',
			latLng: new kakao.maps.LatLng(37.51881764760613, 127.11633054508519),
			imgUrl: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 90) },
		},
		{
			title: '서울 시청',
			latLng: new kakao.maps.LatLng(37.566918804166775, 126.97863525321908),
			imgUrl: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 90) },
		},
	];

	const container = useRef(null);

	// 교통량 정보값이 담길 스테이트 - Traffic
	const [Location, setLocation] = useState(null);
	// traffic 출력여부를 결정할 boolean값이 담길 스테이트
	const [Traffic, setTraffic] = useState(false);

	// 해당 지도관련 정보값이 변경될때마다 화면을 다시 렌더링하고 return문을 편하게 호출하기 위해서 Info 스테이트에 옮겨담음 -> DB에서 따로 json으로 가지고 올때 / 지금은 사실 없어도됨
	const [Info] = useState(info);

	//지점 버튼 클릭시 변경되는 순서값이 저장될 스테이트 추가
	const [Index, setIndex] = useState(0);

	const option = {
		center: Info[Index].latLng,
		level: 3,
	};

	const imgSrc = Info[Index].imgUrl;
	const imgSize = Info[Index].imgSize;
	const imgPos = Info[Index].imgPos;

	const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize, imgPos);

	const marker = new kakao.maps.Marker({
		position: option.center,
		image: markerImage,
	});

	// 기존에 의존성 	배열이 비어 있을때는 그냥 컴포넌트 마운트시 지도가 한번 호출되고 마는 구조
	// 의존성 배열에 Index 스테이트를 등록하면 지점 버튼을 클릭해서 Index 스테이트가 변경될때마다 새로 변경된 Index 값 정보를 토대로 지도 재호출
	useEffect(() => {
		// Index 스테이트가 변경될때마다 기존 map프레임 안쪽의 기존 지도를 제거해서 초기화
		container.current.innerHTML = '';
		const map_instance = new kakao.maps.Map(container.current, option);
		marker.setMap(map_instance);

		// map_instance를 setLocation에 담아서 지역변수를 벗어나도(Traffic에서) 사용할 수 있도록 해줌
		setLocation(map_instance);

		// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성
		const mapTypeControl = new kakao.maps.MapTypeControl();
		// 지도 컨트롤을 지도위에 표시
		// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
		map_instance.addControl(
			mapTypeControl,
			kakao.maps.ControlPosition.BOTTOMLEFT
		);

		// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성
		const zoomControl = new kakao.maps.ZoomControl();
		map_instance.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);

		// 중심좌표 이동 함수
		const handleResize = () => {
			map_instance.setCenter(Info[Index].latLng);
		};
		// 컴포넌트 unmount시 window 전역객체에 리사이즈 이벤트 연결, 중심좌표 이동
		window.addEventListener('resize', handleResize);
		// 해당 컴포넌트가 unmount시 window 전역객체에서 핸들러 함수 제거
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [Index]);

	// Traffic 값이 바뀔때마다 호출되는 useEffect문
	useEffect(() => {
		if (!Location) return;
		// Traffic 값이 true일때 교통량 표시
		// 그렇지 않으면 교통량 표시 제거 (button 토글시 Traffic true/false)
		Traffic
			? Location.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: Location.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	return (
		<Layout name={'Location'}>
			{/* 지도를 출력하고 싶은 요소에 참조객체 등록 */}
			<div id='map' ref={container}></div>

			{/* 버튼 클릭할때마다 기존의 Traffic 정보값을 반전시킴(토글) */}
			<button onClick={() => setTraffic(!Traffic)}>
				{Traffic ? 'Traffic OFF' : 'Traffic ON'}
			</button>

			{/* 지점보기 버튼 추가 후 해당 버튼의 순서값으로 Index 스테이트 변경*/}
			<ul className='branch'>
				{/* 배열을 반복돌려서 리스트를 만듬 */}
				{Info.map((info, idx) => {
					let on = '';
					Index === idx && (on = 'on');
					return (
						<li key={idx} onClick={() => setIndex(idx)} className={on}>
							{info.title}
						</li>
					);
				})}
				{/* <li onClick={() => setIndex(0)}>삼성동 코엑스</li>
				<li onClick={() => setIndex(1)}>올림픽 공원</li>
				<li onClick={() => setIndex(2)}>서울시청</li> */}
			</ul>
		</Layout>
	);
}

export default Location;
