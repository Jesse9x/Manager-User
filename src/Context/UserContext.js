import { useState } from "react";
import { createContext } from "react";

const UserContext = createContext({ email: "", auth: false });

const UserProvider = ({ children }) => {
	const [user, setUser] = useState({ email: "", auth: true });

	const login = (email, token) => {
		setUser((user) => ({
			email: email,
			auth: true,
		}));
		localStorage.setItem("token", token);
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUser((user) => ({
			email: "",
			auth: false,
		}));
	};

	return (
		<>
			<UserContext.Provider value={{ user, login, logout }}>
				{children}
			</UserContext.Provider>
		</>
	);
};

export { UserContext, UserProvider };
