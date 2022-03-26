import {useMemo} from 'react'
import CSS       from 'csstype'

import { FilterProps, }    from 'react-table'



const commonFilteerStyles: CSS.Properties = {
    borderRadius: '0.5em',
    textAlign:    'center'
}

export function SelectColumnFilter<T extends Record<string, unknown>>({ column }: FilterProps<T>) {
    const {id, preFilteredRows, filterValue, setFilter} = column
    const options = useMemo(() => {
        const options = new Set()
            preFilteredRows.forEach(row => {
                options.add(row.values[id])
            })
        return [...options.values()]
    }, [id, preFilteredRows])

    return (
        <select
            style    = {commonFilteerStyles}
            value    = {filterValue}
            onChange = {e => { setFilter(e.target.value || undefined) }}
        >
            <option value="">All</option>
            {options.map((option, i) => {
                // KOSTYL!!!
                const typedOption = typeof option === 'number' ? option as number : option as string
                return <option
                    key={i}
                    value={typedOption}
                >
                    {typedOption}
                </option>
            })}
        </select>
    )
}




export function DefaultColumnFilter<T extends Record<string, unknown>>({ column }: FilterProps<T>) {
    const { filterValue, setFilter } = column
    return (
        <input
            style       = {commonFilteerStyles}
            value       = {filterValue || ""}
            onChange    = {(e) => { setFilter(e.target.value || undefined) }}
            placeholder = {`filter`}
        />
    )
}