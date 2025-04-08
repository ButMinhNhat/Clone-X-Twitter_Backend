import { UserModule, RoleModule, ActionModule } from './modules'
import { generateBoostrap } from '@libs'

generateBoostrap('USER_SERVICE', [UserModule, RoleModule, ActionModule])
