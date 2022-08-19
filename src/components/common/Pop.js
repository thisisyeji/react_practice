import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 부모요소에서 해당 컴포넌트를 참조할 수 있도록 forwardRef의 인수값으로 자기자신함수를 그대로 전달
const Pop = forwardRef(({ children }, ref) => {
	// 내부적으로 팝업의 컨텐츠 출력여부를 결정할 OpenState 생성
	const [Open, setOpen] = useState(false);

	// 팝업 열어주는 함수를 open이라는 키값에 담아서 객체를 리턴해주는 useImperativeHandle 함수 호출
	// 부모요소에서는 해당 리턴값을 참조하게됨
	// 만약 해당 함수가 없으면 부모요소는 Pop 컴포넌트 자체를 참조하게 됨
	useImperativeHandle(ref, () => {
		return {
			open: () => setOpen(true),
		};
	});

	useEffect(() => {
		// 팝업 생성시 스크롤 기능 비활성화, 팝업 소멸시 스크롤 기능 다시 활성화
		Open
			? (document.body.style.overflowY = 'hidden')
			: (document.body.style.overflowY = 'auto');
	}, [Open]);

	return (
		<>
			{/* Open 스테이트 값이 true 일때만 내부 컨텐츠 출력 */}
			{Open && (
				<AnimatePresence>
					<motion.aside
						className='pop'
						initial={{ opacity: 0, scale: 0 }}
						animate={{
							opacity: 1,
							scale: 1,
							transition: { duration: 0.5, delay: 0 },
						}}
						exit={{
							opacity: 0,
							scale: 0,
							transition: { duration: 0.5, delay: 0.5 },
						}}>
						<motion.div
							className='con'
							initial={{ opacity: 0 }}
							animate={{
								opacity: 1,
								transition: { duration: 0.5, delay: 0.5 },
							}}
							exit={{
								opacity: 0,
								transition: { duration: 0.5, delay: 0 },
							}}>
							{children}
						</motion.div>
						<motion.span
							className='close'
							onClick={() => setOpen(false)}
							initial={{ opacity: 0, x: 100 }}
							animate={{
								opacity: 1,
								x: 0,
								transition: { duration: 0.5, delay: 1 },
							}}
							exit={{
								opacity: 0,
								x: 100,
								transition: { duration: 0.5, delay: 0 },
							}}>
							close
						</motion.span>
					</motion.aside>
				</AnimatePresence>
			)}
		</>
	);
});

export default Pop;
