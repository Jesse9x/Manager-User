import Papa from "papaparse";
import { toast } from "react-toastify";

const ImportData = ({ handleImportCsv }) => {
	const handleImportCSV = (event) => {
		let file = event.target.files[0];

		if (file.type !== "text/csv") {
			toast.error("Only Accept CSV File");
		}

		//* Papaparse Local CSV File
		Papa.parse(file, {
			complete: (results) => {
				let rawCSV = results.data;

				if (rawCSV.length > 0) {
					if (rawCSV[0].length === 4) {
						if (
							rawCSV[0][0] === "id" ||
							rawCSV[0][1] === "email" ||
							rawCSV[0][2] === "first_name" ||
							rawCSV[0][3] === "last_name"
						) {
							let results = [];

							rawCSV.map((items, index) => {
								if (index > 0) {
									let obj = {};
									obj.id = items[0];
									obj.email = items[1];
									obj.first_name = items[2];
									obj.last_name = items[3];

									results.push(obj);
								}
							});

							handleImportCsv(results);
						} else {
							toast.error("Wrong Header CSV File");
						}
					} else {
						toast.error("Wrong Format CSV File");
					}
				} else {
					toast.error("Not Found Data CSV File");
				}
			},
		});
	};

	return (
		<>
			<label htmlFor='id' className='btn btn-primary'>
				<i className='fa-solid fa-file-import'></i> Import
			</label>
			<input
				type='file'
				id='id'
				hidden
				onChange={(event) => handleImportCSV(event)}
			/>
		</>
	);
};

export default ImportData;
