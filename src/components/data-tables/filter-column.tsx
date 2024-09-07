import { Column, Table } from '@tanstack/react-table';
import { useMemo } from 'react';
import DebounceInput from './debounce-input';

interface FilterColumnProps<TData> {
  column: Column<TData, unknown>;
  table: Table<TData>;
}

const FilterColumn = <TData,>({ column, table }: FilterColumnProps<TData>) => {
  const firstValue = useMemo(
    () => table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id),
    [table, column.id],
  );
  const columnFilterValue = useMemo(() => column.getFilterValue(), [column]);
  const sortedUniqueValues = useMemo(() => {
    if (typeof firstValue === 'number') {
      return [];
    }
    return Array.from(column.getFacetedUniqueValues().keys()).sort();
  }, [column, firstValue]);

  return (
    <div>
      {typeof firstValue === 'number' ? (
        <div className="flex space-x-2">
          <DebounceInput
            max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
            min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
            value={(columnFilterValue as [number, number])?.[0] ?? ''}
            placeholder={`Min ${
              column.getFacetedMinMaxValues()?.[0]
                ? `(${column.getFacetedMinMaxValues()?.[0]})`
                : ''
            }`}
            className="w-24 border shadow rounded"
            type="number"
            onChange={(value) =>
              column.setFilterValue((old: [number, number]) => [
                value,
                old?.[1],
              ])
            }
          />
          <DebounceInput
            max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
            min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
            value={(columnFilterValue as [number, number])?.[1] ?? ''}
            placeholder={`Max ${
              column.getFacetedMinMaxValues()?.[1]
                ? `(${column.getFacetedMinMaxValues()?.[1]})`
                : ''
            }`}
            className="w-24 border shadow rounded"
            type="number"
            onChange={(value) =>
              column.setFilterValue((old: [number, number]) => [
                old?.[0],
                value,
              ])
            }
          />
        </div>
      ) : (
        <>
          <datalist id={`${column.id}list`}>
            {sortedUniqueValues.slice(0, 5000).map((value) => (
              <option key={value} value={value} />
            ))}
          </datalist>
          <DebounceInput
            list={`${column.id}list`}
            value={(columnFilterValue ?? '') as string}
            placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
            className="w-36 border shadow rounded"
            type="text"
            onChange={(value) => column.setFilterValue(value)}
          />
        </>
      )}
      <div className="h-1" />
    </div>
  );
};

export default FilterColumn;
