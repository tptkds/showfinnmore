export class FirebaseAuthError extends Error {
  static ERROR_MESSAGES: { [key: string]: string } = {
    'auth/invalid-credential':
      '가입되지 않은 이메일 주소이거나 올바르지 않은 패스워드입니다.',
    'auth/network-request-failed': '네트워크 연결에 실패했습니다.',
    'auth/email-already-in-use': '이미 사용 중인 이메일 주소입니다.',
    'auth/too-many-requests': '1분 후에 다시 시도해 주시기 바랍니다.',
  };

  code: string;
  additionalInfo: any;

  constructor(code: string, additionalInfo?: any) {
    const message =
      FirebaseAuthError.ERROR_MESSAGES[code] ||
      '알 수 없는 에러가 발생했습니다.';
    super(message);
    this.name = 'FirebaseAuthError';
    this.code = code;
    if (additionalInfo) {
      this.additionalInfo = additionalInfo;
    }
  }
}
