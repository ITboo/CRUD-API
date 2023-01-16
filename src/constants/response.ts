export enum Response{
    SUCCESS = 'Operation successfully completed',
    USER_NOT_FOUND = 'User not found',
    ERR_UUID = 'Incorrect ID (not uuid)',
    SERVER_ERR = 'Internal Server Error',
    METHOD_ERR = 'HTTP method is not supported',
    FIELDS_ERR = 'Data Error. All fields must be filled'
}