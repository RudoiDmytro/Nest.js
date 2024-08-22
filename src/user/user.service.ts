import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { PrismaService } from 'src/prisma.service'
import { UserDto } from './dto/user.dto'
import { startOfDay, subDays } from 'date-fns'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	findOneById(id: string) {
		return this.prisma.user.findUnique({
			where: { id },
			include: {
				tasks: true
			}
		})
	}

	findOneByEmail(email: string) {
		return this.prisma.user.findUnique({ where: { email } })
	}

	async findProfile(id: string) {
		const profile = await this.findOneById(id)

		const totalTasks = profile.tasks.length
		const completedTasks = await this.prisma.task.count({
			where: { userId: id, isCompleted: true }
		})

		const todayStart = startOfDay(new Date())
		const weekStart = startOfDay(subDays(new Date(), 7))

		const todayTasks = await this.prisma.task.count({
			where: { userId: id, createdAt: { gte: todayStart.toISOString() } }
		})
		const weekTasks = await this.prisma.task.count({
			where: { userId: id, createdAt: { gte: weekStart.toISOString() } }
		})

		const { password, ...profileData } = profile

		return totalTasks !== 0
			? {
					user: profileData,
					statisticks: [
						{ label: 'Total', value: totalTasks },
						{ label: 'Completed tasks', value: completedTasks },
						{ label: 'Today tasks', value: todayTasks },
						{ label: 'Week tasks', value: weekTasks }
					]
				}
			: {
					user: profileData
				}
	}

	async createUser(dto: AuthDto) {
		const user = {
			email: dto.email,
			name: '',
			password: await hash(dto.password)
		}

		return this.prisma.user.create({ data: user })
	}

	async updateUser(id: string, dto: UserDto) {
		let data = dto

		if (dto.password) data = { ...dto, password: await hash(dto.password) }

		return this.prisma.user.update({
			where: { id },
			data,
			select: {
				email: true,
				name: true
			}
		})
	}
}
