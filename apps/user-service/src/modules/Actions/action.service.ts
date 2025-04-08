import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

import DefaultActions from './action.default.json'
import { Action } from './action.entity'

@Injectable()
export class ActionService {
	constructor(
		@InjectRepository(Action)
		private actionRepository: Repository<Action>
	) {}

	private convertObjActions = (
		objData: Record<string, any>,
		prefix: string = ''
	): Array<string> =>
		Object.keys(objData).reduce<string[]>((result, currentKey) => {
			// Key is action
			if (objData[currentKey] === 1)
				return [...result, `${prefix}${currentKey}`]

			// Key is object
			const resMappingObj = this.convertObjActions(
				objData[currentKey],
				`${currentKey}.`
			).map(item => `${prefix}${item}`)
			return [...result, `${prefix}${currentKey}.*`, ...resMappingObj]
		}, [])

	// Main services

	getActions = async (): Promise<Action[]> => {
		const result = await this.actionRepository.find()
		if (result.length) return result

		// Create default data
		const listActions = this.convertObjActions(DefaultActions)
		const newActionEntities = listActions.map(item =>
			this.actionRepository.create({ name: item })
		)
		return this.actionRepository.save(newActionEntities)
	}
}
