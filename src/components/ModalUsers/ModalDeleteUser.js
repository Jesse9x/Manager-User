import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { deleteData } from "../ultis/RequestData";

const ModalDeleteUser = ({
	handleClose,
	show,
	userDelete,
	handleDeleteTableUser,
}) => {
	const handleDeleteUser = async () => {
		const respone = await deleteData(userDelete.id);

		if (respone && respone.statusCode === 204) {
			toast.success("Delete User Successfully");

			handleClose();

			handleDeleteTableUser(userDelete);
		} else {
			toast.error("Delete Failed User");
		}
	};

	return (
		<>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop='static'
				keyboard={false}>
				<Modal.Header closeButton></Modal.Header>

				<Modal.Body>
					Confirm Delete User <strong>{userDelete.first_name}</strong> With
					Email <strong>{userDelete.email}</strong>
				</Modal.Body>

				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button variant='danger' onClick={handleDeleteUser}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ModalDeleteUser;
