const errorStatus = {
  // =============common=======================
  BAD_ID: { status: 400, code: 'bad_id', message: 'Id is not valid' },

  NOT_FOUND_ID: { status: 404, code: 'not_found_id', message: 'Not Found Id' },

  // =============http============================
  SERVER_ERR: {
    status: 500,
    code: 'server_error',
    message: 'Internal Server Error',
  },

  NOT_FOUND: { status: 404, code: 'not_found', message: 'Not Found' },

  NOT_FOUND_BOARD: {
    status: 404,
    code: 'not_found_board',
    message: 'Board Not Found',
  },

  NOT_FOUND_COLUMN: {
    status: 404,
    code: 'not_found_board',
    message: 'Column Not Found',
  },

  NOT_FOUND_CARD: {
    status: 404,
    code: 'not_found_card',
    message: 'The card with the specified ID was not found',
  },

  BAD_DATA: { status: 400, code: 'bad_data', message: 'Bad Request' },

  EMPTY_BODY: {
    status: 400,
    code: 'empty_body',
    message: 'The request body cannot be empty',
  },

  BAD_PARAMS: {
    status: 400,
    code: 'bad_params',
    message:
      'The parameters of the request are incorrect or have the wrong type',
  },

  BAD_PARAMS_BOARD: {
    status: 400,
    code: 'bad_params_board',
    message: 'Params of board are wrong or have wrong type',
  },

  BAD_PARAMS_COLUMN: {
    status: 400,
    code: 'bad_params_column',
    message: 'Params of column are wrong or have wrong type',
  },

  BAD_FILE_EXTENTION: {
    status: 400,
    code: 'bad_file_extention',
    message: 'not valid extention',
  },

  // ============Mongoose================================
  BAD_DATA_MONGOOSE: {
    status: 400,
    code: 'bad_data_moongoose',
    message: 'Bad Request',
  },
  BAD_ID_MONGOOSE: {
    status: 400,
    code: 'bad_id_moongoose',
    message: 'Bad Request',
  },

  // =============Multer================================
  UNSUPPORTED_TYPE: {
    status: 415,
    code: 'unsupported_media_type',
    message: 'Unsupported Media Type',
  },
};

export default errorStatus;
