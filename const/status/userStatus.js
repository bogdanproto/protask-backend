const userStatus = {
  USER_LOGIN: {
    status: 200,
    code: 'user_login_success',
    message: 'User is logged in',
  },
  USER_CURRENT: {
    status: 200,
    code: 'user_authorized',
    message: 'User is authorized',
  },
  USER_LOGOUT: {
    status: 200,
    code: 'user_logout',
    message: 'User is logged out',
  },
  USER_UPDATE: {
    status: 200,
    code: 'user_update_success',
    message: 'Updated success',
  },
  USER_BAD_DATA_PASSWORD: {
    status: 400,
    code: 'bad_data',
    message: 'Password is required',
  },
  USER_UNAUTHORIZED: {
    status: 401,
    code: 'user_unauthorized_by',
    message: 'Email or password is wrong',
  },
  USER_AUTHORIZATION_TOKEN_MISSING: {
    status: 401,
    code: 'user_authorizatiion_token_missing',
    message: 'Authorizatiion token missing',
  },
  USER_UNAUTHORIZED_TOKEN: {
    status: 401,
    code: 'user_unauthorized_token',
    message: 'User is not authorized',
  },
  USER_UNAUTHORIZED_OPERATION: {
    status: 401,
    code: 'user_unauthorized_for_operation',
    message: 'User is unauthorized for this operation',
  },
  USER_NOT_FOUND: {
    status: 404,
    code: 'user_not_found',
    message: 'Email not found',
  },
  USER_NOT_UPDATED: {
    status: 404,
    code: 'user_not_updated',
    message: 'Could not update user',
  },
  USER_CONFLICT: {
    status: 409,
    code: 'user_already_exist',
    message: 'Email already exists',
  },
};

export default userStatus;
