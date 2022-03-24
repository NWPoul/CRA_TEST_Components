import React from 'react'

import './App.css'
import { TableSimple }  from './components/TableSimple'
import { DefaultColumnFilter,
         SelectColumnFilter } from './components/TableSimple/filters'

import { MOCK_DATA }   from "./mockData"

const COLUMNS = [
    { Header: 'id',       accessor: 'id',      disableFilters: true,},
    { Header: 'Date',     accessor: 'Date',    disableFilters: true,},
    { Header: 'Time',     accessor: 'Time',    disableFilters: true,},
    { Header: 'name',     accessor: 'name',    Filter: DefaultColumnFilter,},
    { Header: 'phone',    accessor: 'phone',   disableFilters: true,},
    { Header: 'email',    accessor: 'email',   disableFilters: true,},
    { Header: 'Notes',    accessor: 'Notes',   disableFilters: true,},
    { Header: 'Payment',  accessor: 'Payment', Filter: SelectColumnFilter,},
]

const DATA    = MOCK_DATA.payments


function App() {
    const columns = React.useMemo(() => COLUMNS, [])
    const data    = React.useMemo(() => DATA, [])

    return (
        <div className="App">
            <TableSimple
                columns = {columns}
                data    = {data}
            />
        </div>
    )
}

export default App
