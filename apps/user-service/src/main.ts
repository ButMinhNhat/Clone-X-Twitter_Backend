import { UserModule, RoleModule } from './modules'
import { generateBoostrap } from '@libs'

generateBoostrap('USER_SERVICE', [UserModule, RoleModule])
