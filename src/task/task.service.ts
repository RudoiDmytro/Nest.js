import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TaskDto } from './dto/task.dto'

@Injectable()
export class TaskService {
	constructor(private prisma: PrismaService) {}

	create(dto: TaskDto, userId: string) {
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

	update(dto: Partial<TaskDto>, taskId: string, userId: string) {
		return this.prisma.task.update({
			where: { id: taskId, userId },
			data: dto
		})
	}

	findAll(userId: string) {
		return this.prisma.task.findMany({
			where: { userId }
		})
	}

	delete(taskId: string) {
		return this.prisma.task.delete({
			where: { id: taskId }
		})
	}
}
