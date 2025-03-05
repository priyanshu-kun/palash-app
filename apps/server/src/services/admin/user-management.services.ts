import { prisma } from "@palash/db-client";

class UserManagementServices {
    async deleteUser(userId: string) {
        await Promise.all([
            await prisma.booking.deleteMany({where: {userId}}),
            // await prisma.review.deleteMany({where: {userId}})
        ])
        await prisma.user.delete({
            where: {
                id: userId
            }
        })
    }
}

export default UserManagementServices;