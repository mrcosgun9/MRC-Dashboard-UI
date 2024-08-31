import DataTable from '@/components/elements/DataTable'
import React from 'react'
import { columns, statusOptions, users } from "@/data/data";
const DataTablePage = () => {
  const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];
  return (
    <div>
      <DataTable
        columns={columns}
        data={users}
        filteredRowName={['name', 'role', 'email']}
        defaultSort={{
          column: "age",
          direction: "ascending",
        }} />
    </div>
  )
}

export default DataTablePage