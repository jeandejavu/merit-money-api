import { Models } from './Models';

export class RoleModel extends Models {
  constructor(
    private readonly id: string,
    private readonly description: string,
  ) {
    super();
  }
}
