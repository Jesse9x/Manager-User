import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import { useEffect, useContext } from "react";
import { UserContext } from "./Context/UserContext";
import AppRoutes from "./routes/AppRoutes";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => {
	const { login } = useContext(UserContext);

	useEffect(() => {
		if (localStorage.getItem("token")) {
			login(localStorage.getItem("email"), localStorage.getItem("token"));
		}
	}, []);

	return (
		<>
			<Header />
			<AppRoutes />
			<ToastContainer autoClose={2000} />
		</>
	);
};

export default App;
