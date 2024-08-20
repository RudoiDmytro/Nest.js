import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { PrismaService } from 'src/prisma.service'

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

	async createUser(dto: AuthDto) {
		const user = {
			email: dto.email,
			name: '',
			password: await hash(dto.password)
		}

		return this.prisma.user.create({ data: user })
	}
}
