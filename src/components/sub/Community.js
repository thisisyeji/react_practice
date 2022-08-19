import Layout from '../common/Layout';
import { useRef, useState, useEffect } from 'react';

function Community() {
	const input = useRef(null);
	const textarea = useRef(null);
	const inputEdit = useRef(null);
	const textareaEdit = useRef(null);

	// 로컬스토리지에서 데이터 불러오기
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		return JSON.parse(data);
	};

	// 초기 Posts 스테이트에 로컬스토리지의 데이터를 가져와서 저장
	const [Posts, setPosts] = useState(getLocalData());

	// 모드 변경을 위한 state 기본값
	const [Allowed, setAllowed] = useState(true);

	// 기존 폼요소 초기화 함수
	const resetForm = () => {
		input.current.value = '';
		textarea.current.value = '';
	};

	// 글 저장 함수
	const createPost = () => {
		// 입력시 공백 삭제 및 공백 입력 방지
		if (!input.current.value.trim() || !textarea.current.value.trim()) {
			return alert('제목과 본문을 모두 입력하세요');
		}
		// 글 저장 버튼 클릭해서 해당 함수가 실행이 되면
		// 기존 배열인 Posts 스테이트 값을 deepCopy(불변성유지)
		// 복사된 빈 배열에 참조객체로부터 전달받은 제목과 본문을 객체리터럴로 만들어서 스테이트를 변경
		// 빈 배열에는 해당 게시글 정보로 만들어진 객체가 추가됨
		setPosts([
			{
				title: input.current.value,
				content: textarea.current.value,
			},
			...Posts,
		]);
		resetForm();
	};

	// 글 삭제 함수
	const deletePost = (index) => {
		// 기존 Posts 스테이트의 배열값을 filter로 반복돌면서 현재 반복도는 순번값과 index 파라미터로 전달된 삭제할 순번이 같지 않은 글만 반환
		const newPosts = Posts.filter((_, idx) => idx !== index);
		// 삭제 순번의 글만 제외되서 반환된 데이터로 다시 state 변경
		// 해당 setPosts시 전개연산자를 쓰지 않는 이유는 filter메서드 자체가 새로운 배열을 이미 deepCopy해서 반환하기 때문
		setPosts(newPosts);
	};

	// 실제 글 수정 함수
	const updatePost = (index) => {
		if (!inputEdit.current.value.trim() || !textareaEdit.current.value.trim()) {
			resetForm();
			return alert('수정할 내용과 본문을 모두 입력하세요.');
		}

		setPosts(
			Posts.map((post, idx) => {
				if (idx === index) {
					post.title = inputEdit.current.value;
					post.content = textareaEdit.current.value;
					post.enableUpdate = false;
				}
				return post;
			})
		);

		setAllowed(true);
	};

	// 글 수정모드 변경함수
	const enableUpdate = (index) => {
		if (!Allowed) return;
		setAllowed(false);
		setPosts(
			Posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = true;
				return post;
			})
		);
	};

	// 글 출력모드 변경함수
	const disableUpdate = (index) => {
		setAllowed(true);
		setPosts(
			Posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = false;
				return post;
			})
		);
	};

	// Posts 값이 변경될때마다 로컬 스토리지에 기존 데이터를 다시 문자열로 변환해서 저장
	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Posts));
	}, [Posts]);

	return (
		<Layout name={'Community'}>
			<div className='inputBox'>
				<input type='text' placeholder='제목을 입력하세요' ref={input} /> <br />
				<textarea
					placeholder='본문을 입력하세요'
					cols='30'
					rows='3'
					ref={textarea}></textarea>
				<br />
				<div className='btnSet'>
					<button>CANCEL</button>
					<button onClick={createPost}>WRITE</button>
				</div>
			</div>

			<div className='showBox'>
				{/* 배열에 객체값이 추가가 되면 반복을 돌면서 리턴문으로 목록 출력 */}
				{Posts.map((post, idx) => {
					return (
						<article key={idx}>
							{post.enableUpdate ? (
								// 수정모드
								<>
									<div className='editTxt'>
										<input
											type='text'
											defaultValue={post.title}
											ref={inputEdit}
										/>
										<br />
										<textarea
											cols='30'
											rows='3'
											defaultValue={post.content}
											ref={textareaEdit}></textarea>
										<br />
										<div className='btnSet'>
											<button
												onClick={() => {
													disableUpdate(idx);
												}}>
												CANCEL
											</button>
											<button onClick={() => updatePost(idx)}>UPDATE</button>
										</div>
									</div>
								</>
							) : (
								// 출력모드
								<>
									<div className='txt'>
										<h2>{post.title}</h2>
										<p>{post.content}</p>
									</div>

									<div className='btnSet'>
										<button onClick={() => enableUpdate(idx)}>EDIT</button>
										{/* 각 게시글 목록을 생성할때 삭제 버튼까지 같이 생성, 삭제버튼 클릭시 삭제하려고 하는 해당 순번을 인수로 전달*/}
										<button onClick={() => deletePost(idx)}>DELETE</button>
									</div>
								</>
							)}
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Community;

/*
CRUD
Create - 데이터 베이스에 정보 생성(저장)
Read - 데이터 베이스에 정보 불러오기 (데이터 출력)
Update -  데이터 베이스에 정보 업데이트 (수정)
Delete - 데이터 베이스에 정보 삭제 (데이터 제거)

*/
