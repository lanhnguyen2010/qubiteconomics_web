/**
 * @fileoverview gRPC-Web generated client stub for configuration
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.5.0
// 	protoc              v5.29.3
// source: configuration.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')
const proto = {};
proto.configuration = require('./configuration_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.configuration.ParameterServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.configuration.ParameterServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.configuration.CreateParameterRequest,
 *   !proto.configuration.CreateParameterResponse>}
 */
const methodDescriptor_ParameterService_CreateParameter = new grpc.web.MethodDescriptor(
  '/configuration.ParameterService/CreateParameter',
  grpc.web.MethodType.UNARY,
  proto.configuration.CreateParameterRequest,
  proto.configuration.CreateParameterResponse,
  /**
   * @param {!proto.configuration.CreateParameterRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.configuration.CreateParameterResponse.deserializeBinary
);


/**
 * @param {!proto.configuration.CreateParameterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.configuration.CreateParameterResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.configuration.CreateParameterResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.configuration.ParameterServiceClient.prototype.createParameter =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/configuration.ParameterService/CreateParameter',
      request,
      metadata || {},
      methodDescriptor_ParameterService_CreateParameter,
      callback);
};


/**
 * @param {!proto.configuration.CreateParameterRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.configuration.CreateParameterResponse>}
 *     Promise that resolves to the response
 */
proto.configuration.ParameterServicePromiseClient.prototype.createParameter =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/configuration.ParameterService/CreateParameter',
      request,
      metadata || {},
      methodDescriptor_ParameterService_CreateParameter);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.configuration.GetParameterRequest,
 *   !proto.configuration.GetParameterResponse>}
 */
const methodDescriptor_ParameterService_GetParameter = new grpc.web.MethodDescriptor(
  '/configuration.ParameterService/GetParameter',
  grpc.web.MethodType.UNARY,
  proto.configuration.GetParameterRequest,
  proto.configuration.GetParameterResponse,
  /**
   * @param {!proto.configuration.GetParameterRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.configuration.GetParameterResponse.deserializeBinary
);


/**
 * @param {!proto.configuration.GetParameterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.configuration.GetParameterResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.configuration.GetParameterResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.configuration.ParameterServiceClient.prototype.getParameter =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/configuration.ParameterService/GetParameter',
      request,
      metadata || {},
      methodDescriptor_ParameterService_GetParameter,
      callback);
};


/**
 * @param {!proto.configuration.GetParameterRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.configuration.GetParameterResponse>}
 *     Promise that resolves to the response
 */
proto.configuration.ParameterServicePromiseClient.prototype.getParameter =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/configuration.ParameterService/GetParameter',
      request,
      metadata || {},
      methodDescriptor_ParameterService_GetParameter);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.configuration.UpdateParameterRequest,
 *   !proto.configuration.UpdateParameterResponse>}
 */
const methodDescriptor_ParameterService_UpdateParameter = new grpc.web.MethodDescriptor(
  '/configuration.ParameterService/UpdateParameter',
  grpc.web.MethodType.UNARY,
  proto.configuration.UpdateParameterRequest,
  proto.configuration.UpdateParameterResponse,
  /**
   * @param {!proto.configuration.UpdateParameterRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.configuration.UpdateParameterResponse.deserializeBinary
);


/**
 * @param {!proto.configuration.UpdateParameterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.configuration.UpdateParameterResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.configuration.UpdateParameterResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.configuration.ParameterServiceClient.prototype.updateParameter =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/configuration.ParameterService/UpdateParameter',
      request,
      metadata || {},
      methodDescriptor_ParameterService_UpdateParameter,
      callback);
};


/**
 * @param {!proto.configuration.UpdateParameterRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.configuration.UpdateParameterResponse>}
 *     Promise that resolves to the response
 */
proto.configuration.ParameterServicePromiseClient.prototype.updateParameter =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/configuration.ParameterService/UpdateParameter',
      request,
      metadata || {},
      methodDescriptor_ParameterService_UpdateParameter);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.configuration.DeleteParameterRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_ParameterService_DeleteParameter = new grpc.web.MethodDescriptor(
  '/configuration.ParameterService/DeleteParameter',
  grpc.web.MethodType.UNARY,
  proto.configuration.DeleteParameterRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.configuration.DeleteParameterRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.configuration.DeleteParameterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.configuration.ParameterServiceClient.prototype.deleteParameter =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/configuration.ParameterService/DeleteParameter',
      request,
      metadata || {},
      methodDescriptor_ParameterService_DeleteParameter,
      callback);
};


/**
 * @param {!proto.configuration.DeleteParameterRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.configuration.ParameterServicePromiseClient.prototype.deleteParameter =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/configuration.ParameterService/DeleteParameter',
      request,
      metadata || {},
      methodDescriptor_ParameterService_DeleteParameter);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.configuration.ListParametersRequest,
 *   !proto.configuration.ListParametersResponse>}
 */
const methodDescriptor_ParameterService_ListParameters = new grpc.web.MethodDescriptor(
  '/configuration.ParameterService/ListParameters',
  grpc.web.MethodType.UNARY,
  proto.configuration.ListParametersRequest,
  proto.configuration.ListParametersResponse,
  /**
   * @param {!proto.configuration.ListParametersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.configuration.ListParametersResponse.deserializeBinary
);


/**
 * @param {!proto.configuration.ListParametersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.configuration.ListParametersResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.configuration.ListParametersResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.configuration.ParameterServiceClient.prototype.listParameters =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/configuration.ParameterService/ListParameters',
      request,
      metadata || {},
      methodDescriptor_ParameterService_ListParameters,
      callback);
};


/**
 * @param {!proto.configuration.ListParametersRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.configuration.ListParametersResponse>}
 *     Promise that resolves to the response
 */
proto.configuration.ParameterServicePromiseClient.prototype.listParameters =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/configuration.ParameterService/ListParameters',
      request,
      metadata || {},
      methodDescriptor_ParameterService_ListParameters);
};


module.exports = proto.configuration;

