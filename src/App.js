import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as types from './redux/actionType';

//common
import Header from './components/common/Header';
import Footer from './components/common/Footer';

//main
import Main from './components/main/Main';

//sub
import Department from './components/sub/Department';
import Community from './components/sub/Community';
import Gallery from './components/sub/Gallery';
import Youtube from './components/sub/Youtube';
import Location from './components/sub/Location';
import Members from './components/sub/Members';

import './scss/style.scss';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: types.YOUTUBE.start });
		dispatch({ type: types.MEMBERS.start });
		dispatch({
			type: types.FLICKR.start,
			Opt: { type: 'user', user: '196138805@N05' },
		});
	}, []);

	return (
		<>
			{/*Switch - 중복되는 라우터 경로가 있을때 처음 연결된 라우터 하나만 연결(헤더 분리위해) */}
			<Switch>
				{/* 메인페이지 전용 라우터 */}
				{/* 라우터 안에 넣기, main에만 나오게 하려면 주소 앞에 exact를 붙여줌  */}
				{/* header 분리위해 type 주기 */}
				<Route exact path='/' component={Main} />

				{/* 서브페이지 전용 헤더 라우터 */}
				<Route path='/' render={() => <Header type={'sub'} />} />
			</Switch>

			{/* 라우터 안에 컴포넌트 하나일때 축약형 */}
			<Route path='/department' component={Department} />
			<Route path='/community' component={Community} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/location' component={Location} />
			<Route path='/members' component={Members} />

			<Footer />
		</>
	);
}

export default App;
