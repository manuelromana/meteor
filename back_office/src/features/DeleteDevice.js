import axios from "axios";

export default async function DeleteDevice(idDevice) {
  const result = await axios.post("http://my-app.fr/device/delete", {
    deviceId: idDevice
  });
  console.log("axios", result);
  if (result.status === 200) {
    return true;
  }
  return false;
}
