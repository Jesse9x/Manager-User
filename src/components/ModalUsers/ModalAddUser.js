import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

import { postData } from "../ultis/RequestData";

const ModalAddUser = ({ handleClose, show, handleUpdate }) => {
	//TODO : State Input Form
	const [name, setName] = useState("");

	const [email, setEmail] = useState("");

	//TODO : Post API Users
	const handleSaveChanges = async () => {
		const respone = await postData(name, email);

		console.log(respone);

		if (respone && respone.id) {
			setName("");

			setEmail("");

			handleClose();

			handleUpdate({ first_name: respone.name, id: respone.id, email: email });

			toast.success("Added New User");
		} else {
			toast.error("Error Adding New User");
		}
	};

	return (
		<>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop='static'
				keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Add New Users</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form>
						<Form.Group className='mb-3' controlId='formBasicEmail'>
							<Form.Label>Name</Form.Label>

							<Form.Control
								value={name}
								type='text'
								onChange={(event) => setName(event.target.value)}
							/>
						</Form.Group>

						<Form.Group className='mb-3' controlId='formBasicPassword'>
							<Form.Label>Job</Form.Label>

							<Form.Control
								value={email}
								type='text'
								onChange={(event) => setEmail(event.target.value)}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>

				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button variant='primary' onClick={handleSaveChanges}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ModalAddUser;
