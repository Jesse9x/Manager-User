import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const Header = () => {
	const { logout, user } = useContext(UserContext);

	let navigate = useNavigate();

	const handleLogout = () => {
		logout();

		navigate("/");
	};

	return (
		<>
			<Navbar bg='light' expand='lg'>
				<Container>
					<Navbar.Brand>
						<i className='fa-solid fa-users'></i>
					</Navbar.Brand>

					<Navbar.Toggle aria-controls='basic-navbar-nav' />

					<Navbar.Collapse id='basic-navbar-nav'>
						{((user && user.auth === true) ||
							window.location.pathname === "/") && (
							<>
								<Nav className='me-auto'>
									<NavLink to='/' className='nav-link'>
										User Manager
									</NavLink>
								</Nav>

								<Nav className='ms-auto'>
									{user && user.email ? (
										<Nav.Link>Welcome {user.email}</Nav.Link>
									) : null}

									{user && user.auth === true ? (
										<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
									) : (
										<NavLink to='/login' className='nav-link'>
											Login
										</NavLink>
									)}
								</Nav>
							</>
						)}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default Header;
