import './index.css'
import DataTable from "react-data-table-component";

const Table = ({ data, columns }) => {
    const customStyles = {
        headCells: {
            style: {
                background: '#dedede'
            }
        }
    }

    return (
        <DataTable className='table' columns={columns} data={data} fixedHeader={true} customStyles={customStyles} pagination
                   paginationRowsPerPageOptions={[5, 10, 15, 20]} />
    )
}

export default Table;
