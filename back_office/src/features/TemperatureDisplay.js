import React, { useState, useEffect } from "react";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";

export default function DisplayTemp(props) {
  const deviceId = props.match.params.deviceId;
  console.log(deviceId);
  const [temperatures, setTemperatures] = useState(false);

  async function getDeviceTemp(deviceId) {
    const result = await axios.get(
      `http://my-app.fr/temperature/get/${deviceId}`
    );
    console.log(result);
    setTemperatures(result);
  }
  useEffect(() => {
    getDeviceTemp(deviceId);
  }, []);

  if (!temperatures) {
    return <div>loading</div>;
  }

  return (
    <div>
      <Paper>
        <div> value de device {deviceId}</div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Value C°</TableCell>
              <TableCell>DeviceId</TableCell>
              <TableCell>upload_At UTC</TableCell>
            </TableRow>
          </TableHead>
          {temperatures && (
            <TableBody>
              {temperatures.data.map(temperatures => (
                <TableRow key={temperatures.id}>
                  <TableCell>{temperatures.value}</TableCell>
                  <TableCell>{temperatures.deviceId}</TableCell>
                  <TableCell>{temperatures.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </Paper>
    </div>
  );
}
