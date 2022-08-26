import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Container from "react-bootstrap/Container";
import { Table, Button, Form } from "react-bootstrap";
import _, { debounce } from "lodash";
import "./UserDataTable.scss";

import { getData } from "../ultis/RequestData";
import ModalAddUser from "../ModalUsers/ModalAddUser";
import ModalEditUser from "../ModalUsers/ModalEditUser";
import ModalDeleteUser from "../ModalUsers/ModalDeleteUser";
import ExportData from "../DataProcess/ExportData";
import ImportData from "../DataProcess/ImportData";

const UserDataTable = () => {
	//TODO :  List State
	const [dataListUsers, setDataListUsers] = useState([]);

	const [totalPages, setTotalPages] = useState(0);

	//TODO : Modal Add User
	const [showModalAddUser, setShowModalAddUser] = useState(false);

	//TODO : Modal Edit User
	const [showModalEdit, setShowModalEdit] = useState(false);

	const [dataUserEdit, setDataUserEdit] = useState({});

	const handleEdit = (userEdit) => {
		setShowModalEdit(true);
		setDataUserEdit(userEdit);
	};

	const handleEditTable = (user) => {
		let cloneListUser = JSON.parse(JSON.stringify(dataListUsers));

		let index = dataListUsers.findIndex((items) => items.id === user.id);

		cloneListUser[index].first_name = user.first_name;

		cloneListUser[index].email = user.email;

		setDataListUsers(cloneListUser);
	};

	//TODO : Modal Delete User
	const [showModalDelete, setShowModalDelete] = useState(false);

	const [userDelete, setUserDelete] = useState({});

	const handleDelete = (user) => {
		setShowModalDelete(true);

		setUserDelete(user);
	};

	const handleDeleteTableUser = (user) => {
		let cloneListUser = JSON.parse(JSON.stringify(dataListUsers));

		cloneListUser = cloneListUser.filter((items) => items.id !== user.id);

		setDataListUsers(cloneListUser);
	};

	//TODO : Close All Modal
	const handleClose = () => {
		setShowModalAddUser(false);

		setShowModalEdit(false);

		setShowModalDelete(false);
	};

	//TODO :  Call API
	useEffect(() => {
		getDataUsers(1);
	}, []);

	//TODO :  Get API
	const getDataUsers = async (page) => {
		const response = await getData(page);

		response && response.data && setDataListUsers(response.data);

		setTotalPages(response.total_pages);
	};

	//TODO : Pagination Page Users
	const handlePageClick = (event) => {
		getDataUsers(event.selected + 1);
	};

	//TODO : Update List Users
	const handleUpdate = (user) => {
		setDataListUsers([user, ...dataListUsers]);
	};

	//TODO : Sort List User
	const handleSort = (sortBy, sortField) => {
		let cloneListUser = JSON.parse(JSON.stringify(dataListUsers));

		cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);

		setDataListUsers(cloneListUser);
	};

	//TODO : Search List User
	const handleSearch = debounce((event) => {
		let cloneListUser = JSON.parse(JSON.stringify(dataListUsers));

		let terms = event.target.value;

		if (terms) {
			cloneListUser = cloneListUser.filter((items) =>
				items.email.includes(terms)
			);

			setDataListUsers(cloneListUser);
		} else {
			getDataUsers(1);
		}
	}, 500);

	//TODO : Covert CSV to JS
	const handleImportCsv = (files) => {
		setDataListUsers(files);
	};

	return (
		<>
			<Container>
				<div className='mt-5 table__header'>
					<h5>Data Sheet</h5>

					<div className='d-flex'>
						<ImportData handleImportCsv={handleImportCsv} />

						<ExportData dataListUsers={dataListUsers} />

						<Button
							className='modal__button'
							variant='success'
							onClick={() => setShowModalAddUser(true)}>
							<i className='fa-solid fa-circle-plus'></i> Add New
						</Button>
					</div>
				</div>

				<Form.Group
					style={{ width: "20rem" }}
					className='my-3'
					controlId='exampleForm.ControlInput1'>
					<Form.Control
						onChange={(event) => handleSearch(event)}
						type='text'
						placeholder='Search.....'
					/>
				</Form.Group>

				<div className='scollme'>
					<Table striped bordered hover>
						<thead className='table-info'>
							<tr>
								<th>
									<div className='table__sort--header'>
										<span>ID</span>

										<span className='table__sort--icon'>
											<i
												onClick={() => handleSort("desc", "id")}
												className='fa-solid fa-sort-down'></i>

											<i
												onClick={() => handleSort("esc", "id")}
												className='fa-solid fa-sort-up'></i>
										</span>
									</div>
								</th>

								<th>
									<div className='table__sort--header'>
										<span>Email</span>

										<span className='table__sort--icon'>
											<i
												onClick={() => handleSort("desc", "email")}
												className='fa-solid fa-sort-down'></i>

											<i
												onClick={() => handleSort("esc", "email")}
												className='fa-solid fa-sort-up'></i>
										</span>
									</div>
								</th>

								<th>
									<div className='table__sort--header'>
										<span>First Name</span>

										<span className='table__sort--icon'>
											<i
												onClick={() => handleSort("desc", "first_name")}
												className='fa-solid fa-sort-down'></i>

											<i
												onClick={() => handleSort("esc", "first_name")}
												className='fa-solid fa-sort-up'></i>
										</span>
									</div>
								</th>

								<th>
									<div className='table__sort--header'>
										<span>Last Name</span>

										<span className='table__sort--icon'>
											<i
												onClick={() => handleSort("desc", "last_name")}
												className='fa-solid fa-sort-down'></i>

											<i
												onClick={() => handleSort("esc", "last_name")}
												className='fa-solid fa-sort-up'></i>
										</span>
									</div>
								</th>

								<th>
									<div className='table__sort--header'>
										<span>Action</span>

										<span className='table__sort--icon'>
											<i className='fa-solid fa-sort-down'></i>
											<i className='fa-solid fa-sort-up'></i>
										</span>
									</div>
								</th>
							</tr>
						</thead>
						<tbody>
							{dataListUsers.map((data, index) => (
								<tr key={index}>
									<td>{data.id}</td>
									<td>{data.email}</td>
									<td>{data.first_name}</td>
									<td>{data.last_name}</td>
									<td>
										<Button
											variant='warning'
											className='mx-3'
											onClick={() => handleEdit(data)}>
											Edit
										</Button>
										<Button variant='danger' onClick={() => handleDelete(data)}>
											Delete
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>

				<ReactPaginate //TODO : Pagination Page
					nextLabel='Next'
					onPageChange={handlePageClick}
					pageCount={totalPages}
					previousLabel='Previous'
					pageClassName='page-item'
					pageLinkClassName='page-link'
					previousClassName='page-item'
					previousLinkClassName='page-link'
					nextClassName='page-item'
					nextLinkClassName='page-link'
					breakLabel='...'
					breakClassName='page-item'
					breakLinkClassName='page-link'
					containerClassName='pagination'
					activeClassName='active'
					renderOnZeroPageCount={null}
				/>

				<ModalAddUser
					show={showModalAddUser}
					handleClose={handleClose}
					handleUpdate={handleUpdate}
				/>

				<ModalEditUser
					show={showModalEdit}
					handleClose={handleClose}
					dataUserEdit={dataUserEdit}
					handleEditTable={handleEditTable}
				/>

				<ModalDeleteUser
					show={showModalDelete}
					handleClose={handleClose}
					userDelete={userDelete}
					handleDeleteTableUser={handleDeleteTableUser}
				/>
			</Container>
		</>
	);
};

export default UserDataTable;
