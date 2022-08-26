import Alert from "react-bootstrap/Alert";

const NotFound = () => {
	return (
		<>
			<Alert variant='danger text-center mt-4'>
				<Alert.Heading>404</Alert.Heading>
				<h2>Not Found</h2>
			</Alert>
		</>
	);
};

export default NotFound;
