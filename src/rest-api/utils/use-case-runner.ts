/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from 'express';
import UseCaseBase from '../../lib/use-cases/base.service';
import { CustomError } from '../../lib/helpers/errors.helper';

async function runUseCase(
  useCaseClass: UseCaseBase<any, any>,
  { params = {} },
) {
  try {
    const result = await useCaseClass.run(params);

    return result;
  } catch (error) {
    console.error('error', error);

    throw error;
  }
}

async function renderPromiseAsJson(
  req: Request,
  res: Response,
  resultPromise: Promise<any>,
) {
  try {
    const data = await resultPromise;

    data.status = 200;

    return res.send(data);
  } catch (error: any) {
    if (error.isCustomError)
      return res.send(CustomError.getErrorResponseForHttp(error));

    res.send({
      status: 500,
      error: 'Something went wrong...',
    });
  }
}

function makeUseCaseRunner(
  useCaseClass: UseCaseBase<any, any>,
  paramsBuilder: Function,
) {
  return async function useCaseRunner(req: Request, res: Response) {
    const resultPromise = runUseCase(useCaseClass, {
      params: paramsBuilder(req, res),
    });

    return renderPromiseAsJson(req, res, resultPromise);
  };
}

export { makeUseCaseRunner };
