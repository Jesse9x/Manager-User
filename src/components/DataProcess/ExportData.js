import { CSVLink } from "react-csv";
import { useState } from "react";

const ExportData = ({ dataListUsers }) => {
	const [dataExport, setDataExport] = useState([]);

	const getUserExport = (event, done) => {
		let result = [];

		if (dataListUsers) {
			result.push(["id", "email", "first_name", "last_name"]);

			dataListUsers.map((items) => {
				let arr = [];
				arr[0] = items.id;
				arr[1] = items.email;
				arr[2] = items.first_name;
				arr[3] = items.last_name;

				result.push(arr);
			});
		}

		setDataExport(result);
		done();
	};

	return (
		<>
			<CSVLink //TODO : Convert Javascript from File CSV
				data={dataExport}
				filename={"Users.csv"}
				className='btn btn-primary mx-3'
				asyncOnClick={true}
				onClick={getUserExport}>
				<i className='fa-solid fa-file-export'></i> Export
			</CSVLink>
		</>
	);
};

export default ExportData;
