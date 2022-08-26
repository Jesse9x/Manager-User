import { Routes, Route } from "react-router-dom";
import UserDataTable from "../components/dataUsers/UserDataTable";
import Login from "../components/Form/Login";
import PrivateRoutes from "./PrivateRoutes";
import NotFound from "./NotFound";

const AppRoutes = () => {
	return (
		<>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route
					path='/'
					element={
						<PrivateRoutes>
							<UserDataTable />
						</PrivateRoutes>
					}
				/>
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	);
};

export default AppRoutes;
