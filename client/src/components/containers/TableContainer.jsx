import React from 'react'
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
  } from "@nextui-org/react";
const TableContainer = ({aria,columns,users,id,renderCell}) => {
  return (
    <Table aria-label={aria} style={{backgroundColor:"#181818",color:"#ffffff"}}>
        <TableHeader columns={columns} style={{backgroundColor:"#353535"}}>
          {(column) => (
            <TableColumn
              style={{backgroundColor:"#353535"}}
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item) => (
            <TableRow key={item[id]}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
  )
}

export default TableContainer