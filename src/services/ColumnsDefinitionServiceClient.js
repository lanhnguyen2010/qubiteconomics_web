import { ColumnsDefinitionServiceClient } from "grpc/columns_definition_grpc_web_pb";
import {
  CreateColumnsDefinitionRequest,
  UpdateColumnsDefinitionRequest,
  DeleteColumnsDefinitionRequest,
  Column,
} from "../grpc/columns_definition_pb";

import { Empty } from "google-protobuf/google/protobuf/empty_pb";

const client = new ColumnsDefinitionServiceClient(process.env.REACT_APP_ENVOY_URL,  {
});
const token = localStorage.getItem("token");
const metadata = {
  Authorization: `Bearer ${token}`,
};

export function listColumnsDefinition() {
  return new Promise((resolve, reject) => {
    client.listColumnsDefinitions(new Empty(), metadata, (err, response) => {
      if (err) {
        console.error("gRPC Error:", err);
        return reject(err);
      }
      resolve(response.toObject());
    });
  });
}

export function createColumnsDefinition(columnDefinitionData) {
  return new Promise((resolve, reject) => {
    const req = new CreateColumnsDefinitionRequest();
    req.setSource(columnDefinitionData.source);
    req.setTableName(columnDefinitionData.tableName);

    for (let columnData of columnDefinitionData.columnsList) {
      const column = new Column();
      column.setColumnName(columnData.columnName);
      column.setDatatype(columnData.datatype);
      column.setPosition(columnData.position);
      req.addColumns(column);
    }

    console.log('req: ', req);
    client.createColumnsDefinition(req, metadata, (err, response) => {
      if (err) {
        return reject(err);
      }
      resolve(response.toObject());
    });
  });
}

export function updateColumnsDefinition(columnDefinitionData) {
  return new Promise((resolve, reject) => {
    const req = new UpdateColumnsDefinitionRequest();
    req.setSource(columnDefinitionData.source);
    req.setTableName(columnDefinitionData.tableName);

    for (let columnData of columnDefinitionData.columnsList) {
      const column = new Column();
      column.setColumnName(columnData.columnName);
      column.setDatatype(columnData.datatype);
      column.setPosition(columnData.position);
      req.addColumns(column);
    }

    console.log('req: ', req);
    client.updateColumnsDefinition(req, metadata, (err, response) => {
      if (err) {
        return reject(err);
      }
      resolve(response.toObject());
    });
  });
}

export function deleteColumnsDefinition(source, tableName) {
  return new Promise((resolve, reject) => {
    const req = new DeleteColumnsDefinitionRequest();
    req.setSource(source);
    req.setTableName(tableName);

    client.deleteColumnsDefinition(req, metadata, (err, _response) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

