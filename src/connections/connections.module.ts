import { Module } from '@nestjs/common';
import { ConnectionsGateway } from './connections.gateway';

@Module({
  providers: [ConnectionsGateway],
})
export class ConnectionsModule {}
