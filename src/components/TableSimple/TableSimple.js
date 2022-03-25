import React                  from 'react'

import { useTable,
         useSortBy,
         useFilters, }        from 'react-table'



const getCustomStyles = (customSlyles = {}) => {
    const { tableStyle  = {},
            headerStyle = {},
            cellStyle   = {} } = customSlyles

    //possible ToDo => some additional logic here

    return { tableStyle,
             thStyle: headerStyle,
             tdStyle: cellStyle }
}



export function TableSimple({ columns, data, customSlyles }) {
    const { tableStyle,
            thStyle,
            tdStyle } = getCustomStyles(customSlyles)

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