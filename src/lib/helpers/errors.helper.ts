import { TValidationErrosFields, ICustomErrorFields } from '../interfaces';

export class CustomError {
  private static _isCustomError: boolean = true;
  // eslint-disable-next-line @typescript-eslint/typedef
  static ErrorHTTPStatusMapping = {
    FORMAT_ERROR: 400,
  };

  get isCustomError() {
    return CustomError._isCustomError;
  }

  // eslint-disable-next-line @typescript-eslint/typedef
  static validationError = (
    fields: TValidationErrosFields,
  ): ICustomErrorFields => {
    return Object.setPrototypeOf(
      {
        error: 'FORMAT_ERROR',
        fields,
      },
      CustomError.prototype,
    );
  };

  // eslint-disable-next-line @typescript-eslint/typedef
  static getErrorResponseForHttp(customError: ICustomErrorFields) {
    return {
      status: CustomError.ErrorHTTPStatusMapping[customError.error] || 500,
      ...customError,
    };
  }
}
