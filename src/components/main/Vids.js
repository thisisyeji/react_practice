// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import Pop from '../common/Pop';

function Vids() {
	const pop = useRef(null);
	const [Index, setIndex] = useState(0);
	const { youtube } = useSelector((store) => store.youtubeReducer);

	return (
		<>
			<section id='vids' className='myScroll'>
				<Swiper
					navigation={true}
					pagination={{ clickable: true }}
					modules={[Pagination, Navigation, Autoplay]}
					// 오토 플레이
					autoplay={{ delay: 2000, disableOnInteraction: true }}
					// 간격
					spaceBetween={50}
					// 순환
					loop={true}
					// 한번에 보여질 슬라이드 갯수
					slidesPerView={3}
					// 1번 슬라이드를 센터로
					centeredSlides={true}>
					{youtube.map((vid, idx) => {
						if (idx >= 4) return;
						return (
							<SwiperSlide key={vid.id}>
								<div className='inner'>
									<div
										className='pic'
										onClick={() => {
											setIndex(idx);
											pop.current.open();
										}}>
										<img
											src={vid.snippet.thumbnails.maxres.url}
											alt={vid.snippet.title}
										/>
									</div>
									<h2>{vid.snippet.title}</h2>
								</div>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</section>

			<Pop ref={pop}>
				{youtube.length !== 0 && (
					<iframe
						src={`https://www.youtube.com/embed/${youtube[Index].snippet.resourceId.videoId}`}
						frameBorder='0'
						allowFullScreen></iframe>
				)}
			</Pop>
		</>
	);
}

export default Vids;
