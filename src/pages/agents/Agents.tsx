import { useState } from "react";
import "./agents.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { agents } from "../../data";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 75 },
  {
    field: "img",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "title",
    type: "string",
    headerName: "Name",
    width: 200,
  },
  {
    field: "status",
    type: "string",
    headerName: "Status",
    width: 125,
  },
  {
    field: "ip",
    type: "string",
    headerName: "IP",
    width: 125,
  },
  {
    field: "os",
    headerName: "OS",
    type: "string",
    width: 125,
  },
  {
    field: "version",
    headerName: "Version",
    width: 125,
    type: "string",
  },
  {
    field: "registeredDate",
    headerName: "Registered Date",
    width: 125,
    type: "string",
  },
  {
    field: "lastSeen",
    headerName: "Last Seen",
    width: 125,
    type: "string",
  },
  {
    field: "registeredIP",
    headerName: "Registered IP",
    width: 125,
    type: "string",
  },
];

const Agents = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className="agents">
      <div className="info">
        <h1>Agents</h1>
        <button onClick={() => setOpen(true)}>Add New Agent</button>
      </div>
      <DataTable slug="agents" columns={columns} rows={agents} />
      {open && <Add slug="agent" columns={columns} setOpen={setOpen} />}
    </div>
  )
}

export default Agents
