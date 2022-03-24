import React                 from 'react'

import { useTable,
         useSortBy,
         useFilters, }       from 'react-table'



const tableStyle = { border: 'solid 1px blue' }

const thStyle    = {
    borderBottom: 'solid 3px red',
    background:   'aliceblue',
    color:        'black',
    fontWeight:   'bold',
}

const tdStyle    = {
    padding: '10px',
    border: 'solid 1px gray',
    background: 'papayawhip',
}












export function TableSimple({ columns, data }) {
    const filterTypes = React.useMemo(
        () => ({
            text: (rows, id, filterValue) => {
                return rows.filter((row) => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true
                })
            }
        }), []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        visibleColumns,
    } = useTable(
        { columns,
          data,
          filterTypes, },
        useFilters,
        useSortBy,
    )

    return (<div className="tableSimple-container">
        <table {...getTableProps()} className={"tableSimple"} style={tableStyle}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                style={thStyle}
                            >
                                <div>
                                {column.render('Header')}
                                {column.isSorted
                                    ? column.isSortedDesc ? ' 🔽' : ' 🔼'
                                    : ''
                                }
                                </div>
                                <div>{column.canFilter ? column.render("Filter") : null}</div>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>

            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            { row.cells.map(cell => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        style={tdStyle}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                )
                            }) }
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>)
}


export default TableSimple