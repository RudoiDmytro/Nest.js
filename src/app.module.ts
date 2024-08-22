import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { TaskService } from './task/task.service'
import { TaskModule } from './task/task.module'
import { TimeBlockModule } from './time-block/time-block.module'
import { TimerModule } from './timer/timer.module'

@Module({
	imports: [
		AuthModule,
		ConfigModule.forRoot(),
		UserModule,
		TaskModule,
		TimeBlockModule,
		TimerModule
	],
	providers: [TaskService]
})
export class AppModule {}
