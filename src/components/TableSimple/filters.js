import {useMemo} from 'react'




const commonFilteerStyles = {
    borderRadius: '0.5em',
    textAlign: 'center'
}

export function SelectColumnFilter({column: { filterValue, setFilter, preFilteredRows, id },}) {
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
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}



export function NumberRangeColumnFilter({column: { filterValue = [], preFilteredRows, setFilter, id },}) {
    const [min, max] = useMemo(() => {
      let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
      let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
      preFilteredRows.forEach(row => {
        min = Math.min(row.values[id], min)
        max = Math.max(row.values[id], max)
      })
      return [min, max]
    }, [id, preFilteredRows])

    return (
      <div
        style={{
          display: 'flex',
        }}
      >
        <input
          value={filterValue[0] || ''}
          type="number"
          onChange={e => {
            const val = e.target.value
            setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
          }}
          placeholder={`Min (${min})`}
          style={{
            width: '70px',
            marginRight: '0.5rem',
          }}
        />
        to
        <input
          value={filterValue[1] || ''}
          type="number"
          onChange={e => {
            const val = e.target.value
            setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
          }}
          placeholder={`Max (${max})`}
          style={{
            width: '70px',
            marginLeft: '0.5rem',
          }}
        />
      </div>
    )
}


export function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter }}) {
    const count = preFilteredRows.length
    return (
        <input
            style       = {commonFilteerStyles}
            value       = {filterValue || ""}
            onChange    = {(e) => { setFilter(e.target.value || undefined) }}
            placeholder = {`filter`}
        />
    )
}