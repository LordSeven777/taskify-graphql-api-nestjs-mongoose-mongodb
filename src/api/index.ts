import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LabelModule } from './label/label.module';
import { TaskModule } from './task/task.module';

// Array of all the modules of the GraphQL API's resources
// It's facilitates the import of all these modules from other parts of the application
export const apiModules = [AuthModule, UserModule, LabelModule, TaskModule];
