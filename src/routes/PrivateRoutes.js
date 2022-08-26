import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Alert, Container } from "react-bootstrap";

const PrivateRoutes = (props) => {
	const { user } = useContext(UserContext);

	if (user && !user.auth) {
		return (
			<>
				<Container>
					<Alert variant='danger' className='mt-2'>
						<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
						<p>You don't have permission to access this route</p>
					</Alert>
				</Container>
			</>
		);
	}
	return <>{props.children}</>;
};

export default PrivateRoutes;
