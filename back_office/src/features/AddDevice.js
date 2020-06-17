import React, { useState, useEffect } from "react";

import axios from "axios";
import AddDeviceForm from "./AddDeviceForm";

function AddDevice() {
  const [device, setdevice] = useState(false);

  const token = localStorage.getItem("token");

  async function addDevicePost(deviceInfos) {
    const result = await axios.post(
      "http://my-app.fr/device/register",
      deviceInfos,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );
    setdevice(result.data);
  }

  useEffect(() => {
    setdevice(false);
  }, []);

  if (device) {
    console.log("ddddd", device);
    return <div>device</div>;
  }

  return (
    <div>
      <AddDeviceForm
        onSubmit={data => {
          console.log("form", data);
          addDevicePost(data);
        }}
      />
    </div>
  );
}

export default AddDevice;
