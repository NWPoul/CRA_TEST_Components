import React, {
    CSSProperties,
    MouseEventHandler,
    PropsWithChildren,
    ReactElement,
    useMemo
} from 'react'

import {
    Filters,
    TablePropGetter,
    UseTableColumnOptions,
    UseFiltersColumnProps,

    Cell,
    CellProps,
    ColumnInstance,
    FilterProps,
    HeaderGroup,
    HeaderProps,
    Hooks,
    Meta,
    Row,
    TableInstance,
    TableOptions,
    ColumnInterface,
    useColumnOrder,
    useExpanded,
    useFilters,
    useFlexLayout,
    useGroupBy,
    usePagination,
    useResizeColumns,
    useRowSelect,
    useSortBy,
    useTable,
} from 'react-table'



// const getCustomStyles = (customSlyles = {}) => {
//     const { tableStyle  = {},
//             headerStyle = {},
//             cellStyle   = {} } = customSlyles

//     //possible ToDo => some additional logic here

//     return { tableStyle,
//              thStyle: headerStyle,
//              tdStyle: cellStyle }
// }

type sourceDataRec = {
    "id"     : string,
    "Date"   : string,
    "Time"   : string,
    "name"   : string,
    "phone"  ?: string,
    "email"  ?: string,
    "Notes"  ?: string,
    "Payment": string,
}

export type sourceData = sourceDataRec[]

export type rawColum   = {
    name:    string,
    field?:  string,
    // FIND shprt way!
    filter?: <T extends Record<string, unknown>>({ column }: FilterProps<T>) => JSX.Element,
}

export type rawColumns = rawColum[]

export interface CustomTableOptions {
    rawColumns: rawColumns;
    data      : sourceData;
}

export const getColumns = (rawColumns: rawColumns) => {
    return rawColumns.map(column => {

         // FIND CORRECT TYPE !!!
        let resultColumnObject: any = { // FIND CORRECT TYPE !!!
            Header:   column.name,
            accessor: column.field  || column.name,
        }

        if ( column.filter ) {
            resultColumnObject.Filter         = column.filter
        } else {
            resultColumnObject.disableFilters = true
        }

        return resultColumnObject
    })
}


// TableSimple<T extends Record<string, unknown>>(props: PropsWithChildren<TableOptions<T>>): ReactElement
export function TableSimple<T extends Record<string, unknown>>(props: PropsWithChildren<CustomTableOptions>): ReactElement {
    const { rawColumns, data } = props

    const columns = useMemo( () => getColumns(rawColumns), [])
    // const { tableStyle,
    //         thStyle,
    //         tdStyle } = getCustomStyles(customSlyles)

    // const filterTypes = useMemo(
    //     () => ({
    //         text: (rows: any, id: any, filterValue: any) => {
    //             return rows.filter((row) => {
    //                 const rowValue = row.values[id]
    //                 return rowValue !== undefined
    //                     ? String(rowValue)
    //                         .toLowerCase()
    //                         .startsWith(String(filterValue).toLowerCase())
    //                     : true
    //             })
    //         }
    //     }), []
    // )


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        { columns,
          data, },
        useFilters,
        useSortBy,
    )

    return (<div className="tableSimple-container">
        <table
            {...getTableProps()}
             className={"tableSimple"}
            //  style={tableStyle}
        >
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                // style={thStyle}
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
                                        // style={tdStyle}
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