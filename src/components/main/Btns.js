import { useRef, useEffect } from 'react';
import Anime from '../../assets/Anime';

function Btns({ setScrolled, setPos }) {
	const pos = useRef([]);
	const btnRef = useRef(null);
	const speed = 500;
	const num = 4;

	// 섹션의 세로 위치값을 구하는 함수
	const getPos = () => {
		// 기존값 초기화
		pos.current = [];
		// className='myScroll'인 섹션들을 모두 선택해서 반복문으로 setoffTop값 배열에 넣어주기
		const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');
		for (const sec of secs) pos.current.push(sec.offsetTop);
		setPos(pos.current);
	};

	// 스크롤 위치에 따라서 버튼 활성화 함수
	const activation = () => {
		// 버튼 활성화 지점 커스터마이징
		const base = -window.innerHeight / 4;

		const scroll = window.scrollY;
		const btns = btnRef.current.children;
		const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');

		setScrolled(scroll);

		// pos.current에 등록된 각 섹션의 세로 위치값을 반복
		pos.current.map((pos, idx) => {
			// 현재 스크롤된 거리값이 각 섹션의 위치값보다 같거나 크면 기존 버튼 모두 비활성화 시키고 해당 순번의 버튼만 활성화
			if (scroll >= pos + base) {
				for (const btn of btns) btn.classList.remove('on');
				for (const sec of secs) sec.classList.remove('on');
				btns[idx].classList.add('on');
				secs[idx].classList.add('on');
			}
		});
	};

	useEffect(() => {
		btnRef.current.children[0].classList.add('on');
		btnRef.current.parentElement
			.querySelectorAll('.myScroll')[0]
			.classList.add('on');

		getPos();
		// 브라우저 리사이즈시 offsetTop값 가져오는 함수 실행
		window.addEventListener('resize', getPos);
		window.addEventListener('scroll', activation);
		// 함수 삭제
		return () => {
			window.removeEventListener('resize', getPos);
			window.removeEventListener('scroll', activation);
		};
	}, []);

	return (
		<ul className='scroll_navi' ref={btnRef}>
			{Array(num)
				.fill()
				.map((_, idx) => {
					return (
						<li
							key={idx}
							onClick={() => {
								new Anime(window, {
									prop: 'scroll',
									value: pos.current[idx],
									duration: speed,
								});
							}}></li>
					);
				})}
		</ul>
	);
}

export default Btns;
