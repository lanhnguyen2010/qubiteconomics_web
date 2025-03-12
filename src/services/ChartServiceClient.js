import { ChartServiceClient } from "../grpc/chart_grpc_web_pb";
import { VN30PSRequest, FBFSRequest, RollingBUSDRequest } from "../grpc/chart_pb";

import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";

const client = new ChartServiceClient(process.env.REACT_APP_ENVOY_URL);
const token = localStorage.getItem("token");
  const metadata = {
    Authorization: `Bearer ${token}`,
};

export function getVN30PS(startTimestampSeconds, endTimestampSeconds) {
  const request = new VN30PSRequest();

  const startTimestamp = new Timestamp();
  startTimestamp.setSeconds(startTimestampSeconds);

  const endTimestamp = new Timestamp();
  endTimestamp.setSeconds(endTimestampSeconds);

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

export function getFbFs(startTimestampSeconds, endTimestampSeconds) {
  const request = new FBFSRequest();

  const startTimestamp = new Timestamp();
  startTimestamp.setSeconds(startTimestampSeconds);

  const endTimestamp = new Timestamp();
  endTimestamp.setSeconds(endTimestampSeconds);

  request.setStartTime(startTimestamp);
  request.setEndTime(endTimestamp);

  return new Promise((resolve, reject) => {
    client.fBFS(request, metadata, (err, response) => {
      if (err) {
        console.error("gRPC Error:", err);
        return reject(err);
      }
      resolve(response.toObject());
    });
  });
}

export function getBusd(startTimestampSeconds, endTimestampSeconds, codes, rolling) {
  const request = new RollingBUSDRequest();

  const startTimestamp = new Timestamp();
  startTimestamp.setSeconds(startTimestampSeconds);

  const endTimestamp = new Timestamp();
  endTimestamp.setSeconds(endTimestampSeconds);

  request.setStartTime(startTimestamp);
  request.setEndTime(endTimestamp);
  request.setCodeListList(codes);
  if (rolling) {
    request.setRollingPeriod(Number(rolling));
  }

  return new Promise((resolve, reject) => {
    client.rollingBUSD(request, metadata, (err, response) => {
      if (err) {
        console.error("gRPC Error:", err);
        return reject(err);
      }
      resolve(response.toObject());
    });
  });
}
