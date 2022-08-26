import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

import { putData } from "../ultis/RequestData";

const ModalEditUser = ({
	handleClose,
	show,
	dataUserEdit,
	handleEditTable,
}) => {
	//TODO : State Input Form
	const [name, setName] = useState("");

	const [email, setEmail] = useState("");

	useEffect(() => {
		setName(dataUserEdit.first_name);
	}, [dataUserEdit]);

	const handleEditUser = async () => {
		const respone = await putData(name, email);

		if (respone && respone.updatedAt) {
			handleEditTable({
				email: email,
				first_name: name,
				id: dataUserEdit.id,
			});

			handleClose();

			toast.success("User Update Successful");
		} else {
			toast.error("User Update Failed");
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
					<Modal.Title>Edit A Users</Modal.Title>
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
							<Form.Label>Email</Form.Label>

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
					<Button variant='warning' onClick={handleEditUser}>
						Confirm
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ModalEditUser;
