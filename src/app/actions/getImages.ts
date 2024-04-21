import prisma from '@/app/lib/prismadb';
import ConversationId from '../conversations/[conversationId]/page';

const getMessagesWithImages = async (conversationId:string) => {
    try {
        const messages = await prisma.message.findMany({
            where: {
                conversationId:conversationId,
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
        return messages;
    } catch (e: any) {

      console.error("Error retrieving messages:", e);
        return [];
    }
};

export default getMessagesWithImages;
