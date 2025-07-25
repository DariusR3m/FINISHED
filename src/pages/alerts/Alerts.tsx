import { useState } from "react";
import "./alerts.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { alerts } from "../../data";

const columns: GridColDef[] = [
  { field: "id", headerName: "No.", width: 75 },
  {
    field: "title",
    type: "string",
    headerName: "Alert ID",
    width: 200,
  },
  {
    field: "timestamp",
    type: "string",
    headerName: "Timestamp",
    width: 200,
  },
  {
    field: "rule",
    type: "string",
    headerName: "Rule ID",
    width: 125,
  },
  {
    field: "level",
    headerName: "Severity Level",
    type: "string",
    width: 125,
  },
  {
    field: "agent",
    headerName: "Agent",
    width: 200,
    type: "string",
  },
  {
    field: "description",
    headerName: "Description",
    width: 400,
    type: "string",
  },
];

const Alerts = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className="alerts">
      <div className="info">
        <h1>Alerts</h1>
        <button onClick={() => setOpen(true)}>Add New Alert</button>
      </div>
      <DataTable slug="alerts" columns={columns} rows={alerts} />
      {open && <Add slug="alert" columns={columns} setOpen={setOpen} />}
    </div>
  )
}

export default Alerts
