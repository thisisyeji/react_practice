function Pics({ Scrolled, currentPos }) {
	// position - 전체 스크롤 거리값에서 해당 섹션 요소의 세로위치값을 뺀 값
	// 해당 박스가 활성화 된 순간의 position 값은 0이므로 더 정밀한 모션작업 가능
	const position = Scrolled - currentPos || 0;
	return (
		<section id='pics' className='myScroll'>
			<h1 style={{ left: position * 4 }}>FLICKR</h1>
			<h2 style={{ left: position / 2 }}>GALLARY</h2>

			<div
				className='box'
				style={{
					transform: `scale(${1 + position / 1000})`,
					opacity: 1 - position / 1000,
				}}></div>
		</section>
	);
}

export default Pics;
