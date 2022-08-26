import { useEffect, useState, useContext } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { loginData } from "../ultis/RequestData";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Login = () => {
	const [account, setAccount] = useState("");

	const [password, setPassword] = useState("");

	const [handleShowPass, setHandleShowPass] = useState(false);

	const [loading, setLoading] = useState(false);

	const { login } = useContext(UserContext);

	let navigate = useNavigate();

	useEffect(() => {
		let token = localStorage.getItem("token");

		token && navigate("/");
	});

	const handleLoginData = async () => {
		setLoading(true);

		let response = await loginData(account.trim(), password);

		if (response && response.token) {
			navigate("/");
			login(account, response.token);
		}

		if (response.status === 400) {
			toast.error(response.data.error);
		}

		setLoading(false);
	};

	const handleGoBack = () => {
		navigate("/");
	};

	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			handleLoginData();
		}
	};

	return (
		<>
			<Container>
				<div className='form__login col-12 col-sm-4'>
					<div className='form__login--title'>Log in</div>

					<div className='form__login--input'>
						<label>Email or username ( eve.holt@reqres.in )</label>

						<input
							value={account}
							type='text'
							placeholder='  Email or username'
							onChange={(event) => setAccount(event.target.value)}
						/>

						<div className='form__login--password'>
							<input
								value={password}
								type={handleShowPass === true ? "text" : "password"}
								placeholder='  Password'
								onChange={(event) => setPassword(event.target.value)}
								onKeyPress={(event) => handleKeyPress(event)}
							/>

							<i
								onClick={() => setHandleShowPass(!handleShowPass)}
								className={
									handleShowPass === true
										? "fa-solid fa-eye"
										: "fa-solid fa-eye-slash"
								}></i>
						</div>
					</div>

					<div className='form__login--btn'>
						<button
							onClick={handleLoginData}
							type='button'
							disabled={account && password ? false : true}
							className={account && password ? "active__btn" : ""}>
							{loading && <i className='fas fa-sync fa-spin'></i>} Log in
						</button>
					</div>

					<div className='form__login--back'>
						<i className='fa-solid fa-angle-left'></i>{" "}
						<span onClick={handleGoBack}>Go back</span>
					</div>
				</div>
			</Container>
		</>
	);
};

export default Login;
