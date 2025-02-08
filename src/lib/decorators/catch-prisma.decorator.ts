import { HttpException, NotFoundException, Type } from '@nestjs/common'
import { Prisma } from '@prisma/client'

/**
 * Options for the CatchPrismaError decorator
 */
type PrismaErrorOptions = {
  notFoundMessage?: string
  exceptionType?: Type<HttpException>
}

/**
 * Catch Prisma errors and throw appropriate exceptions
 * @param options - Options for the decorator
 * @returns {MethodDecorator} - The method decorator
 */
export function CatchPrismaError(options: PrismaErrorOptions = {}) {
  const {
    notFoundMessage = 'Resource not found',
    exceptionType = NotFoundException
  } = options

  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value

    descriptor.value = async function (...args: unknown[]) {
      try {
        const result = await originalMethod.apply(this, args)
        // Check if result is null from Prisma
        if (result === null) {
          throw new exceptionType(notFoundMessage)
        }
        return result
      } catch (error) {
        if (error instanceof HttpException) {
          throw error
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // Handle specific Prisma errors
          switch (error.code) {
            case 'P2025': // Record not found
              throw new NotFoundException(notFoundMessage)
            case 'P2002': // Unique constraint violation
              throw new HttpException('Duplicate entry', 400)
            default:
              throw new HttpException(error.message, 400)
          }
        }
        throw error
      }
    }

    return descriptor
  }
}
