import React,{ useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { validateEmail } from "../../utils/helper";
import axiosInstance from '../../utils/axiosInstance';
const Signup = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate=useNavigate();
	const handleSignup = async (e) => {
		e.preventDefault();
		if(!firstName){
			setError("Please enter your first Name");
			return;
		}
		if(!lastName){
			setError("Please enter your Last Name");
			return;
		}
		if(!validateEmail(email)){
			setError("please enter a valid email id");
			return;
		}
		if(!password){
			setError("Please enter the password");
		}
		setError('');
		//sign up api call
		try{
			const response = await axiosInstance.post("/create-account",{
				firstName: firstName,
    			lastName: lastName,
				email: email,
				password: password,
			});
			//to handle error in registration 
			if(response.data && response.data.error){
				setError(response.data.message);
				return;
			}
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
		<><Navbar />
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Log in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSignup}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={(e)=>setFirstName(e.target.value)}
							value={firstName}
							className={styles.input} />
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={(e)=>setLastName(e.target.value)}
							value={lastName}
							className={styles.input} />
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={(e)=>setEmail(e.target.value)}
							value={email}
							className={styles.input} />
						<input
							type="password"
							placeholder="Password"
							name="password"
							required
							onChange={(e)=>setPassword(e.target.value)}
							value={password}
							className={styles.input} />
						{error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div></>
	);
};

export default Signup;
