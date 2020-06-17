import axios from "axios";

export default async function getDeviceTemp(idDevice) {
  const result = await axios.get(
    `http://my-app.fr/temperature/get/${idDevice}`
  );
  console.log("axios", result);
}
