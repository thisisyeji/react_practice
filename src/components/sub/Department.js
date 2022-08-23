import Layout from '../common/Layout';
import { useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

function Department() {
	// 해당 컴포넌트에서 만들어질 액션 객체를 리듀서에 전달해주는 dispatch함수 활성화
	// const dispatch = useDispatch();
	const path = process.env.PUBLIC_URL;
	const Members = useSelector((store) => store.memberReducer.members);

	/*// json 파일을 담을 빈 배열 필요
	const [Members, setMembers] = useState([]);
*/
	/*// axios 이용하여 json 파일 받아오기
	useEffect(() => {
		axios.get(path + '/DB/members.json').then((json) => {
			setMembers(json.data.members);
		});
	}, []);
*/
	/*useEffect(() => {
		fetch(process.env.PUBLIC_URL + '/DB/members.json')
			.then((data) => data.json())
			.then((json) => console.log(json));
	}, []);
	*/

	return (
		<Layout name={'Department'}>
			{/* <button
				onClick={() => {
					// 불변성 유지를 위해서 기존 데이터를 deep copy 후 copy된 데이터를 변경
					const newMembers = [...Members];
					newMembers[0].name = 'Elizabath';
					// 변경된 데이터를 action.js에서 가져온 액션 생성함수로 액션 객체 반환 받고 반환받은 액션객체를 바로 dispatch함수의 인수로 넣어서 리듀서에 전달
					dispatch(setMembers(newMembers));
				}}>
				Member Change
			</button> */}
			<br />
			{Members.map((member, idx) => (
				<article key={idx}>
					<div className='inner'>
						<div className='picFrame'>
							<div className='reflect'>
								<img src={`${path}/img/${member.pic}`} alt={member.name} />
							</div>
							<div className='pic'>
								<img src={`${path}/img/${member.pic}`} alt={member.name} />
							</div>
						</div>

						<h2>{member.name}</h2>
						<p>{member.position}</p>
					</div>
				</article>
			))}
		</Layout>
	);
}

export default Department;
