import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {VmwareModule} from './vmware/vmware.module';
import {ScheduleModule} from './schedule/schedule.module';
import {BackupModule} from './backup/backup.module';

@Module({
	imports: [
        VmwareModule,
      ScheduleModule,
      BackupModule
    ],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
}
