import { UserServiceClient } from "grpc/user_grpc_web_pb";
import {
  AddUserRequest,
  UpdateUserRequest,
  DeleteUserRequest,
} from "../grpc/user_pb";

import { Empty } from "google-protobuf/google/protobuf/empty_pb";

const client = new UserServiceClient(process.env.REACT_APP_ENVOY_URL);
const token = localStorage.getItem("token");
const metadata = {
  Authorization: `Bearer ${token}`,
};

export function getUserList() {
  return new Promise((resolve, reject) => {
    client.userList(new Empty(), metadata, (err, response) => {
      if (err) {
        console.error("gRPC Error:", err);
        return reject(err);
      }
      resolve(response.toObject());
    });
  });
}

export function addUser(userData) {
  return new Promise((resolve, reject) => {
    const req = new AddUserRequest();
    // Note: field order follows the proto definition (role is field 1)
    req.setRole(userData.role);
    req.setUsername(userData.username);
    req.setFirstname(userData.firstname);
    req.setLastname(userData.lastname);
    req.setEmail(userData.email);
    req.setPasswordHash(userData.password_hash);

    client.addUser(req, (err, response) => {
      if (err) {
        return reject(err);
      }
      resolve(response.toObject());
    });
  });
}

// Update an existing user
export function updateUser(userData) {
  return new Promise((resolve, reject) => {
    const req = new UpdateUserRequest();
    req.setId(userData.id);
    req.setUsername(userData.username);
    req.setFirstname(userData.firstname);
    req.setLastname(userData.lastname);
    req.setEmail(userData.email);
    req.setPasswordHash(userData.password_hash);
    req.setRole(userData.role);

    client.updateUser(req, (err, response) => {
      if (err) {
        return reject(err);
      }
      resolve(response.toObject());
    });
  });
}

// Delete a user by ID
export function deleteUser(id) {
  return new Promise((resolve, reject) => {
    const req = new DeleteUserRequest();
    req.setId(id);

    client.deleteUser(req, (err, _response) => {
      if (err) {
        return reject(err);
      }
      resolve().toObject();
    });
  });
}
