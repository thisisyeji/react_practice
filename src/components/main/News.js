import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function News() {
	const path = process.env.PUBLIC_URL;
	const Members = useSelector((store) => store.memberReducer.members);

	// 커뮤니티에서 함수 가져오기
	// 로컬 스토리지에 있는 데이터를 가져와서 다시 JSON 객체로 parsing해서 리턴하는 함수
	const getLocalData = () => {
		// 빈값일때 오류가 생기므로 기본 dummyPosts를 배열로 만들어서 출력
		const dummyPosts = [
			{ title: 'Hello5', content: 'Here comes description in detail.' },
			{ title: 'Hello4', content: 'Here comes description in detail.' },
			{ title: 'Hello3', content: 'Here comes description in detail.' },
			{ title: 'Hello2', content: 'Here comes description in detail.' },
			{ title: 'Hello1', content: 'Here comes description in detail.' },
		];
		const data = localStorage.getItem('post');
		if (data) {
			return JSON.parse(data);
		} else {
			return dummyPosts;
		}
	};

	// 빈 배열 state 만들기
	const [Posts] = useState(getLocalData());

	// 마운트 되었을때 로컬스토리지에서 값 가져와서 JSON 객체 생성
	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Posts));
	}, []);

	return (
		<section id='news' className='myScroll'>
			<h1>News</h1>
			{/* Posts 스테이트 값을 map 반복 */}
			{Posts.map((post, idx) => {
				// 3개만 출력하고 싶으면 조건문 return/
				if (idx >= 4) return;
				return (
					// 나머지 값 가져와서 출력
					<article key={idx}>
						<h2>{post.title}</h2>
						<p>{post.content}</p>
					</article>
				);
			})}

			<ul>
				{Members.map((member) => {
					return (
						<li key={member.name}>
							<img src={`${path}/img/${member.pic}`} alt={member.name} />
							<p>{member.name}</p>
						</li>
					);
				})}
			</ul>
		</section>
	);
}

export default News;
