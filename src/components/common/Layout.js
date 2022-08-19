import { useEffect, useRef } from 'react';

function Layout({ children, name }) {
	// 공통 레이아웃 프레임인 section을 담은 참조객체 생성
	const frame = useRef(null);

	// 해당 컴포넌트가 마운트 되자마자 참조객체에 담겨있는 section 요소에 on클래스 추가
	useEffect(() => {
		frame.current.classList.add('on');
	}, []);

	return (
		<section className={`content ${name}`} ref={frame}>
			<figure>
				<img src={`${process.env.PUBLIC_URL}/img/${name}.jpg`} alt={name} />
				<h1>{name}</h1>
			</figure>

			<div className='inner'>
				<h1>{name}</h1>
				{children}
			</div>
		</section>
	);
}

export default Layout;
