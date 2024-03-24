import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserOnFireBase } from '@/app/apis/firebase';
import schema from '../schemas/userValidationSchema';

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        if (!credentials) return;
        // 사용자 입력 데이터 유효성 검사
        const validatedFields = schema.safeParse({
          email: credentials.email,
          password: credentials.password,
        });

        if (!validatedFields.success) {
          throw new Error('유효하지 않은 입력값입니다.'); // 유효성 검사 실패
        }

        // Firebase를 사용한 사용자 인증
        const user = await getUserOnFireBase(
          validatedFields.data.email,
          validatedFields.data.password
        );

        if (!user) {
          throw new Error('로그인 실패'); // 인증 실패
        }

        // 인증 성공 시 사용자 객체 반환
        return { email: user.email };
      },
    }),
  ],
  // NextAuth 콜백을 사용한 리다이렉트 처리
  callbacks: {
    async signIn(user, account, profile) {
      if (user) {
        return true; // 인증 성공 시 리다이렉트할 경로를 true로 설정
      }
      return false; // 실패 시 false 반환
    },
    async redirect(url, baseUrl) {
      return baseUrl; // 로그인 성공 후 리다이렉션할 기본 경로
    },
  },
  // 필요한 경우 추가 설정 (세션, 콜백 등)
});
