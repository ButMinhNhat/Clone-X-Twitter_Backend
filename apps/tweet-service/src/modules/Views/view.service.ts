import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

import { View } from './view.entity'

@Injectable()
export class ViewService {
	constructor(
		@InjectRepository(View)
		private viewRepository: Repository<View>
	) {}

	// Main services
}
