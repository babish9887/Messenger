import NextAuth from 'next-auth'
import MyAuthOptions from '@/app/lib/MyAuthOptions';


const handler = NextAuth(MyAuthOptions)


export {handler as GET, handler as POST};