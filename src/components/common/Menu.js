import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, Link } from 'react-router-dom';

// Menu 컴포넌트를 화살표 함수로 변경해서 forwardRef 메서드의 인수로 전달
const Menu = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);
	const active = { color: 'orange' };

	// 부모컴포넌트의 참조객체에 담길 객체를 리턴(Open값을 토글시켜주는 함수)
	useImperativeHandle(ref, () => {
		return {
			toggle: () => setOpen(!Open),
		};
	});

	// 브라우저폭이 웹버전대로 들어가면 자동으로 모바일 패널 닫기
	useEffect(() => {
		window.addEventListener('resize', () => {
			const wid = window.innerWidth;
			if (wid >= 1280) setOpen(false);
		});
	}, []);

	return (
		<AnimatePresence>
			{Open && (
				<motion.nav
					id='mobileGnb'
					onClick={() => setOpen(!Open)}
					initial={{ opacity: 0, x: -320 }}
					animate={{
						opacity: 1,
						x: 0,
						transition: { duration: 0.5 },
					}}
					exit={{ opacity: 0, x: -320, transition: { duration: 0.5 } }}>
					<h1>
						<Link to='/'>
							<img
								src={process.env.PUBLIC_URL + '/img/logo_w.png'}
								alt='logo'
							/>
						</Link>
					</h1>

					<ul>
						<li>
							<NavLink to='/department' activeStyle={active}>
								DEPARTMENT
							</NavLink>
						</li>
						<li>
							<NavLink to='/community' activeStyle={active}>
								COMMUNITY
							</NavLink>
						</li>
						<li>
							<NavLink to='/gallery' activeStyle={active}>
								GALLERY
							</NavLink>
						</li>
						<li>
							<NavLink to='/youtube' activeStyle={active}>
								YOUTUBE
							</NavLink>
						</li>
						<li>
							<NavLink to='/location' activeStyle={active}>
								LOCATION
							</NavLink>
						</li>
						<li>
							<NavLink to='/members' activeStyle={active}>
								MEMBERS
							</NavLink>
						</li>
					</ul>
				</motion.nav>
			)}
		</AnimatePresence>
	);
});

export default Menu;
