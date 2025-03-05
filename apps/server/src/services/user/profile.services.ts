import { prisma } from "@palash/db-client";
import { UserData } from "../../@types/types.js";


class ProfileServices {
    async fetchProfile(userId: string): Promise<any> {
        return prisma.user.findUnique({
            where: {
                id: userId
            }
        })
    }

    async updateProfile(userId: string, userData: Partial<UserData>): Promise<any> {
        const user = await prisma.user.findFirst({ where: { OR: [{ username: userData.username }, { 'phone_or_email': userData.phone_or_email }] } });
        if (user) {
            throw new Error("Duplicate Username or email");
        }

        let fieldsToUpdated: Partial<UserData> = {};
        for (let key of Object.keys(userData) as Array<keyof UserData>) {
            if (userData[key]) {
                fieldsToUpdated[key] = userData[key];
            }
        }
        return await prisma.user.update({
            where: {
                id: userId
            },
            data: fieldsToUpdated
        })
    }

}

export default ProfileServices;