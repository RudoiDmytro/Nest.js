import { Injectable } from '@nestjs/common'
import { TimeBlockDto } from './dto/time-block.dto'
import { UpdateTimeBlockDto } from './dto/update-time-block.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class TimeBlockService {
	constructor(private prisma: PrismaService) {}

	create(dto: TimeBlockDto, userId: string) {
		return this.prisma.task.create({
			data: {
				...dto,
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
	}

	findAll(userId: string) {
		return this.prisma.timeBlock.findMany({
			where: { userId },
			orderBy: { order: 'asc' }
		})
	}

	update(dto: Partial<TimeBlockDto>, timeBlockId: string, userId: string) {
		return this.prisma.task.update({
			where: { id: timeBlockId, userId },
			data: dto
		})
	}

	delete(taskId: string, userId: string) {
		return this.prisma.task.delete({
			where: { id: taskId, userId }
		})
	}

	async updateOrder(ids: string[]) {
		await this.prisma.$transaction(
			ids.map((id, order) =>
				this.prisma.timeBlock.update({
					where: { id },
					data: { order }
				})
			)
		)
	}
}
