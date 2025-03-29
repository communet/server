import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Channels')
@Controller('/api/channels')
export class ChannelsController {}
