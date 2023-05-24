import LIVR from 'livr';
import { CustomError } from '../helpers/errors.helper';

LIVR.Validator.defaultAutoTrim(true);

export default abstract class UseCaseBase<T, K> {
  static validationRules: object | null = null;

  /**
   *  This method start all chains of methods
   *  sanitize, validate, execute... etc.
   *  Should not be overridden.
   *
   */
  async run(params: T): Promise<K> {
    return this.sanitize(params)
      .then((sanitizedParams: T) => this.validate(sanitizedParams))
      .then((cleanParams: T) => this.execute(cleanParams));
  }

  /**
   *  This method runs validation.
   *  Should not be overridden,
   *  otherwise use-case class should contain static field 'validationRules'
   */
  async validate(data: T): Promise<T> {
    const { validationRules } = this.constructor as typeof UseCaseBase;
    if (!validationRules)
      throw new Error('ValidationRules should be specified');

    const livrValidator = new LIVR.Validator(validationRules);

    const validData = livrValidator.validate(data);

    if (validData) return validData;

    throw CustomError.validationError(livrValidator.getErrors());
  }

  /**
   *  Main method of use-case class
   *  Contains the main logic
   */
  async execute(data: T): Promise<K> {
    throw new Error('METHOD IS NOT IMPLEMENTED IN BASE CLASS');
  }

  /**
   *  Method for sanitazing user input.
   *  Will be called before 'validate()'
   *  If the service requires sanitization of parameters,
   *  this method should be overridden
   * */
  async sanitize(data: T): Promise<T> {
    return data;
  }
}
