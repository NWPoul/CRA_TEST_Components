import React, { useMemo }     from 'react'

import './App.css'
import { TableSimple, }       from './components/TableSimple'
import { DefaultColumnFilter,
         SelectColumnFilter } from './components/TableSimple/filters'

import { MOCK_DATA }          from "./mockData"


const COLUMNS = [
    { name: 'Id',       field: 'id', },
    { name: 'Date', },
    { name: 'Time', },
    { name: 'Name',     field: 'name', filter: DefaultColumnFilter, },
    { name: 'Phone',    field: 'phone', },
    { name: 'email', },
    { name: 'Notes', },
    { name: 'Payment',                 filter: SelectColumnFilter, },
]

const DATA    = MOCK_DATA.payments


function App() {
    const data    = useMemo( () => DATA, [])

    return (
        <div className="App">
            <TableSimple
                rawColumns = {COLUMNS}
                data       = {data}
            />
        </div>
    )
}

export default App
