/* eslint-disable */

/** This is just cuztomized part of lib 'chista'
 *  In this project I don't need all functioanlity and redundant dependencies
 */
import { CustomError } from '../../lib/helpers/errors.helper';

function makeUseCaseRunner(useCaseClass, paramsBuilder) {
  return async function useCaseRunner(req, res) {
    const resultPromise = runUseCase(useCaseClass, {
      params: paramsBuilder(req, res),
    });

    return renderPromiseAsJson(req, res, resultPromise);
  };
}

async function runUseCase(useCaseClass, { params = {} }) {
  try {
    const result = await new useCaseClass().run(params);

    return result;
  } catch (error) {
    console.error('error', error);

    throw error;
  }
}

async function renderPromiseAsJson(req, res, resultPromise) {
  try {
    const data = await resultPromise;

    data.status = 200;

    return res.send(data);
  } catch (error: any) {
    if (error.isCustomError) {
      return res.send(CustomError.getErrorResponseForHttp(error));
    }
    res.send({
      status: 500,
      error: error.message,
    });
  }
}

export default {
  makeUseCaseRunner,
};
