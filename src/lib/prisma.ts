import { PrismaClient } from '@/generated/prisma'

const prismaClientSingleton = () => {
	return new PrismaClient()
}

// const prismaClientSingleton = () => {
// 	return new PrismaClient({ log: ['query', 'info', 'warn', 'error'] }).$extends(withAccelerate())
// }

declare const globalThis: {
	prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
