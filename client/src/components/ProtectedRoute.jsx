import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../api/client';
import { setUserData } from '../redux/AppSlice';
import Loading from './Loading';

const ProtectedRoute = ({ children }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(true)


	useEffect(() => {
		let user = getUserProfile()
		user.then(res => {
			if (res.error) {
				navigate('/login')
			} else {
				dispatch(setUserData(res.data))
			}
			setIsLoading(false)
		})
	}, [])

	return (<>
		{isLoading ? <Loading /> : children}
	</>)
};

export default ProtectedRoute;
