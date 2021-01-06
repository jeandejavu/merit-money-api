import { Models } from './Models';

export class RoleModel extends Models {
  constructor(readonly id: string, readonly description: string) {
    super();
  }
}
