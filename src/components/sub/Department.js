import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Department() {
	const path = process.env.PUBLIC_URL;
	// json 파일을 담을 빈 배열 필요
	const [Members, setMembers] = useState([]);

	// axios 이용하여 json 파일 받아오기
	useEffect(() => {
		axios.get(path + '/DB/members.json').then((json) => {
			setMembers(json.data.members);
		});
	}, []);

	/*useEffect(() => {
		fetch(process.env.PUBLIC_URL + '/DB/members.json')
			.then((data) => data.json())
			.then((json) => console.log(json));
	}, []);
	*/

	return (
		<Layout name={'Department'}>
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
