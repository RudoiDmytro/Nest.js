import { IsArray, IsString } from 'class-validator'

export class UpdateTimeBlockDto {
	@IsArray()
	@IsString({ each: true })
	ids: string[]
}
