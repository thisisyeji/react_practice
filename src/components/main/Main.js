import Header from '../common/Header';
import Visual from './Visual';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Btns from './Btns';

import { useState, useEffect } from 'react';

function Main() {
	const [Scrolled, setScrolled] = useState(0);
	const [Pos, setPos] = useState([]);

	useEffect(() => {
		console.log(Scrolled);
	}, [Scrolled]);

	return (
		<>
			<Header type={'main'} />
			<Visual />
			<News />
			<Pics Scrolled={Scrolled} currentPos={Pos[2]} />
			<Vids />
			<Btns setScrolled={setScrolled} setPos={setPos} />
		</>
	);
}

export default Main;

/*
useRef : state와는 달리 useRef의 담겨있는 값이 변경이 되도 화면이 재렌더링되지 않으면서 만약 다른 state 변경으로 화면이 재렌더링 되었을 때 일반 변수값처럼 useRef에 담겨 있는 값은 사라지지 않음

state: 해당 값이 변경되면 무조건 해당 컴포넌트는 재렌더링 일어남 (화면의 변경점을 담당하는 화면 UI에 관련 데이터)
지역변수: 컴포넌트가 재렌더링될때마다 해당 변수에 있는 값은 유지가 안되고 다시 초기화 (권장사항 아님)

useRef: 컴포넌트가 재렌더링 되더라도 값이 유지가 됨, 해당 값이 변경되어도 화면을 재렌더링하지 않음 (화면 UI에 직접적인 변경사항은 아니나 특정 정보값을 단기간에 엄청 많이 변경해야될때)
*/
