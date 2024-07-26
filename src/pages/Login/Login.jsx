import React,{ useState } from "react";
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	// const handleChange = ({ currentTarget: input }) => {
	// 	setData({ ...data, [input.name]: input.value });
	// };

	const handleLogin = async (e) => {
		e.preventDefault();
		if(!validateEmail(email)){
			setError("please enter a valid email id");
			return;
		}
		if(!password){
			setError("Please enter the password");
		}
		setError("")
		//Login Api call
		try{
			const response = await axiosInstance.post("/login",{
				email: email,
				password: password,
			});
			//on successful login
			if(response.data&& response.data.accessToken){
				localStorage.setItem("token",response.data.accessToken);
				navigate("/dashboard");
			}
		}
		catch(error){
			//handle errors
			if(error.response && error.response.data && error.response.data.message){
				setError(error.response.data.message);
			}
			else{
				setError("Unexepcted Error Ocuured. Please try again.");
			}
		}
	};
	return (
		<>
		<Navbar/>
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleLogin}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={(e)=>setEmail(e.target.value)}
							value={email}
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							required
							onChange={(e)=>setPassword(e.target.value)}
							value={password}
							className={styles.input}
						/>
						{error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
						<button type="submit" className={styles.green_btn}>
							Log In
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
		</>
	);
};

export default Login;
