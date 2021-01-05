import { IController, IHttpResponse } from '@/presentation/protocols';
import { ILogErrorRepository } from '@/data/protocols/db';

export class LogControllerDecorator implements IController {
  constructor(
    private readonly controller: IController,
    private readonly logErrorRepository: ILogErrorRepository,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  async handle(request: any): Promise<IHttpResponse> {
    const httpResponse = await this.controller.handle(request);
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack);
    }
    return httpResponse;
  }
}
