import Layout from '../common/Layout';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Members() {
	const history = useHistory();

	// 입력값이 담길 초기값을 객체로 생성
	const initVal = {
		userid: '',
		email: '',
		pwd1: '',
		pwd2: '',
		gender: null,
		interests: null,
		edu: '',
		comments: '',
	};
	const [Val, setVal] = useState(initVal);

	//인증 조건 실패시 출력될 에러메시지가 항목별로 담길 state 추가
	const [Err, setErr] = useState({});

	// 전송 버튼 클릭 유무를 담을 state 추가
	const [Submit, setSubmit] = useState(false);

	//인증 처리 함수
	const check = (value) => {
		const errs = {};

		// 인증처리할 조건 정규표현식 (pwd)
		const eng = /[a-zA-z]/;
		const num = /[0-9]/;
		const spc = /[~!@#$%^&*()_+\]]/;

		// user id 인증 처리
		if (value.userid.length < 5) {
			// 5글자 미만이면 errs 객체에 하기 키, 밸류 값 추가
			errs.userid = '아이디를 5글자 이상 입력하세요';
		}

		// email 인증처리
		if (value.email.length < 8 || !/@/.test(value.email)) {
			errs.email = '이메일은 8글자 이상 @를 포함하세요';
		}

		// pwd1 인증처리
		if (
			value.pwd1.length < 6 ||
			!eng.test(value.pwd1) ||
			!num.test(value.pwd1) ||
			!spc.test(value.pwd1)
		) {
			errs.pwd1 =
				'비밀번호는 6글자 이상, 영문, 숫자, 특수문자를 모두 포함하세요';
		}

		// pwd2 인증처리
		if (value.pwd1 !== value.pwd2 || value.pwd2 === '') {
			errs.pwd2 = '비밀번호를 동일하게 입력하세요';
		}

		// gender 인증처리
		if (!value.gender) {
			errs.gender = '성별을 선택하세요';
		}

		// interests 인증처리
		if (!value.interests) {
			errs.interests = '관심사를 하나 이상 선택하세요';
		}

		// edu 인증처리
		if (value.edu === '') {
			errs.edu = '최종학력을 선택하세요';
		}

		// comments 인증처리
		if (value.comments.length < 10) {
			errs.comments = '남기는 말을 10자 이상 입력하세요';
		}

		// 모든 조건 충족시 빈값 그대로 리턴
		return errs;
	};

	// submit 이벤트 발생 시 실행할 함수
	const handleSubmit = (e) => {
		// 이벤트의 기본 기능을 막아서 서버 전송 방지
		e.preventDefault();

		// check 함수에 인수로 val 값을 넣어서 인증 검사 후
		// 반환된 에러객체값을 Err스테이트에 옮겨담음 (해당 값 or 빈 값)
		setErr(check(Val));
	};

	// 현재 입력하고 있는 input값을 state에 저장해주는 함수
	const handleChange = (e) => {
		const { name, value } = e.target;
		// name='user id'
		// 객체에 키값을 변수로 저장이 안됨(es5)
		// 객체에서 키값을 변수로 치환하고자 할때는 키에 들어갈 변수를 대괄호로 감싸줌 (es6)
		setVal({ ...Val, [name]: value });
	};

	// radio 인풋 전용 함수
	const handleRadio = (e) => {
		const { name } = e.target;
		const isCheck = e.target.checked;
		setVal({ ...Val, [name]: isCheck });
	};

	// checkbox 인풋 전용 함수
	const handleCheck = (e) => {
		let isCheck = false;
		const { name } = e.target;
		const inputs = e.target.parentElement.querySelectorAll('input');

		inputs.forEach((el) => {
			if (el.checked) isCheck = true;
		});

		setVal({ ...Val, [name]: isCheck });
	};

	// select 전용 함수
	const handleSelect = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	useEffect(() => {
		// 전송 클릭시 에레메세지를 가지고 있는 값이 Err 스테이트 객체에 하나도 없으면 인증통과
		// Object.keys(확인할 객체) : 특정 객체의 키 값을 배열로 반환해주는 객체 전용 내장함수
		const len = Object.keys(Err).length;
		// 에러메세지가 하나도 없고 submit 버튼을 클릭했을 시 두개 조건 모두 만족해야 인증성공 처리
		if (len === 0 && Submit) {
			alert('회원 가입이 완료되었습니다. 메인페이지로 이동합니다');
			// 메인페이지 강제 이동
			history.push('/');
		}
	}, [Err]);

	return (
		<Layout name={'Members'}>
			{/* 폼 자체에 onSubmit 이벤트 걸어 handleSubmit 함수 호출*/}
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend className='h'>회원가입폼 양식</legend>
					<table border='1' width='600'>
						<caption className='h'>회원가입 정보 입력</caption>
						<tbody>
							{/* userid */}
							<tr>
								<th scope='row'>
									<label htmlFor='userid'>USERID</label>
								</th>
								<td>
									<input
										type='text'
										placeholder='아이디를 입력하세요'
										name='userid'
										id='userid'
										// value={Val.userid}
										onChange={
											handleChange
											// onChange 이벤트가 발생할 때마다 기존의 Val 스테이트값을 복사해서 현재 입력하고 있는 값으로 바꿔치기 -> 함수로
										}
									/>
									{/* 에러가 있다면 에러 메세지 출력 */}
									<span className='err'>{Err.userid}</span>
								</td>
							</tr>

							{/* password */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd1'>PASSWORD</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd1'
										id='pwd1'
										// value={Val.pwd1}
										placeholder='비밀번호를 입력하세요'
										onChange={handleChange}
									/>
									<span className='err'>{Err.pwd1}</span>
								</td>
							</tr>

							<tr>
								<th scope='row'>
									<label htmlFor='pwd2'>RE-PASSWORD</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd2'
										id='pwd2'
										// value={Val.pwd2}
										placeholder='비밀번호를 재입력하세요'
										onChange={handleChange}
									/>
									<span className='err'>{Err.pwd2}</span>
								</td>
							</tr>

							{/* email */}
							<tr>
								<th scope='row'>
									<label htmlFor='email'>E-MAIL</label>
								</th>
								<td>
									<input
										type='text'
										id='email'
										name='email'
										// value={Val.email}
										placeholder='이메일 주소를 입력하세요'
										onChange={handleChange}
									/>
									<span className='err'>{Err.email}</span>
								</td>
							</tr>

							{/* gender */}
							<tr>
								<th scope='row'>GENDER</th>
								<td>
									<label htmlFor='male'>MALE</label>
									<input
										type='radio'
										id='male'
										name='gender'
										onChange={handleRadio}
									/>

									<label htmlFor='female'>FEMALE</label>
									<input
										type='radio'
										id='female'
										name='gender'
										onChange={handleRadio}
									/>
									<span className='err'>{Err.gender}</span>
								</td>
							</tr>

							{/* interests */}
							<tr>
								<th scope='row'>INTERESTS</th>
								<td>
									<label htmlFor='sports'>SPORTS</label>
									<input
										type='checkbox'
										name='interests'
										id='sports'
										onChange={handleCheck}
									/>
									<label htmlFor='music'>MUSIC</label>
									<input
										type='checkbox'
										name='interests'
										id='music'
										onChange={handleCheck}
									/>
									<label htmlFor='game'>GAME</label>
									<input
										type='checkbox'
										name='interests'
										id='game'
										onChange={handleCheck}
									/>
									<span className='err'>{Err.interests}</span>
								</td>
							</tr>

							{/* edu */}
							<tr>
								<th scope='row'>
									<label htmlFor='edu'>EDUCATION</label>
								</th>
								<td>
									<select name='edu' id='edu' onChange={handleSelect}>
										<option value=''>최종학력을 선택하세요</option>
										<option value='elementary-school'>초등학교 졸업</option>
										<option value='middle-school'>중학교 졸업</option>
										<option value='high-school'>고등학교 졸업</option>
										<option value='college'>대학교 졸업</option>
									</select>
									<span className='err'>{Err.edu}</span>
								</td>
							</tr>

							{/* comments */}
							<tr>
								<th scope='row'>
									<label htmlFor='comments'>COMMENTS</label>
								</th>
								<td>
									<textarea
										name='comments'
										id='comments'
										cols='30'
										rows='3'
										placeholder='남기는 말을 입력하세요'
										onChange={handleChange}></textarea>
									<span className='err'>{Err.comments}</span>
								</td>
							</tr>

							{/* btnSet */}
							<tr>
								<th colSpan='2'>
									<input type='reset' value='cancel' />
									<input
										type='submit'
										value='submit'
										onClick={() => setSubmit(true)}
									/>
								</th>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}

export default Members;
