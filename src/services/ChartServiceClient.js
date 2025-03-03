import { ChartServiceClient } from "../grpc/chart_grpc_web_pb";
import { VN30PSRequest } from "../grpc/chart_pb";

import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";

const client = new ChartServiceClient(process.env.REACT_APP_ENVOY_URL);

export function getVN30PS() {
  const token = localStorage.getItem("token");
  const metadata = {
    Authorization: `Bearer ${token}`,
  };
  const request = new VN30PSRequest();

  const startTimestamp = new Timestamp();
  startTimestamp.setSeconds(0);

  const endTimestamp = new Timestamp();
  endTimestamp.setSeconds(999999999999);

  request.setStartTime(startTimestamp);
  request.setEndTime(endTimestamp);

  return new Promise((resolve, reject) => {
    client.vN30PS(request, metadata, (err, response) => {
      if (err) {
        console.error("gRPC Error:", err);
        return reject(err);
      }
      resolve(response.toObject());
    });
  });
}
