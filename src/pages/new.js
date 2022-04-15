import React from "react";
import MaterialTable from "material-table";
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
export default function New() {
  const tableRef = React.createRef();

  const handleClose = (rowData) => {
    console.log(rowData);
    tableRef.current.onToggleDetailPanel(
      [rowData.tableData.id],
      tableRef.current.props.detailPanel
    );
  };

  return (
    <div className="App">
      <MaterialTable
        title="Detail Panel Close Demo"
        columns={[
          {
            title: "Avatar",
            field: "avatar",
            sorting: false,
            render: (rowData) => (
              <img
                style={{ height: 36, borderRadius: "50%" }}
                src={rowData.avatar}
                alt={rowData.avatar}
              />
            )
          },
          { title: "Id", field: "id" },
          { title: "First Name", field: "first_name" },
          {
            title: "Last Name",
            field: "last_name",
            render: (rowData) => (
              <Button onClick={() => handleClose(rowData)}>
                {rowData.last_name}
              </Button>
            )
          }
        ]}
        options={{
          paging: false,
          search: false,
          draggable: false,
          sorting: false
        }}
        data={(query) =>
          new Promise((resolve) => {
            let url = "https://reqres.in/api/users?";
            url += "per_page=" + query.pageSize;
            url += "&page=" + (query.page + 1);

            console.debug(`request url: ${url}`);
            fetch(url)
              .then((response) => response.json())
              .then((result) => {
                resolve({
                  data: result.data,
                  page: result.page - 1,
                  totalCount: result.total
                });
              });
          })
        }
        tableRef={tableRef}
        detailPanel={(rowData) => {
          return (
            <p>
              {rowData.first_name} {rowData.last_name} <br />
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<CloseIcon />}
                onClick={() => handleClose(rowData)}
              >
                Close
              </Button>
            </p>
          );
        }}
      />
    </div>
  );
}