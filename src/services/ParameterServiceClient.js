import { ParameterServiceClient } from "../grpc/configuration_grpc_web_pb";
import { ListParametersRequest, GetParameterRequest, CreateParameterRequest, UpdateParameterRequest, DeleteParameterRequest } from "../grpc/configuration_pb";

const client = new ParameterServiceClient(process.env.REACT_APP_ENVOY_URL);
const token = localStorage.getItem("token");
const metadata = {
  Authorization: `Bearer ${token}`,
};

export function getListParameter() {
  const request = new ListParametersRequest();

  return new Promise((resolve, reject) => {
    client.listParameters(request, metadata, (err, response) => {
      if (err) {
        console.error("gRPC Error:", err);
        return reject(err);
      }
      resolve(response.toObject());
    });
  });
}

export function getParameter(key) {
  const request = new GetParameterRequest();
  request.setKey(key);

  return new Promise((resolve, reject) => {
    client.getParameter(request, metadata, (err, response) => {
      if (err) {
        console.error("gRPC Error:", err);
        return reject(err);
      }
      resolve(response.toObject());
    });
  });
}

export function addParameter(key, value) {
  const request = new CreateParameterRequest();
  request.setKey(key);
  request.setValue(value);
  console.log('key: ', key);
  console.log('value: ', value);
  console.log('request: ', request);
  return new Promise((resolve, reject) => {
    client.createParameter(request, metadata, (err, response) => {
      if (err) {
        console.error("gRPC Error:", err);
        return reject(err);
      }
      resolve(response.toObject());
    });
  });
}

export function updateParameter(key, value) {
  const request = new UpdateParameterRequest();
  request.setKey(key);
  request.setValue(value);

  return new Promise((resolve, reject) => {
    client.updateParameter(request, metadata, (err, response) => {
      if (err) {
        console.error("gRPC Error:", err);
        return reject(err);
      }
      resolve(response.toObject());
    });
  });
}

export function deleteParameter(key) {
  const request = new DeleteParameterRequest();
  request.setKey(key);

  return new Promise((resolve, reject) => {
    client.deleteParameter(request, metadata, (err, response) => {
      if (err) {
        console.error("gRPC Error:", err);
        return reject(err);
      }
      resolve(response.toObject());
    });
  });
}
