import { User, updateProfile } from 'firebase/auth';

const updateDisplayNameFirebase = async (
  user: User,
  displayName: string
): Promise<Error | string> => {
  try {
    await updateProfile(user, {
      displayName: displayName,
    });
    return 'success';
  } catch (error) {
    console.error('updateDisplayNameFirebase Error: ' + error);
    throw new Error('error');
  }
};
export default updateDisplayNameFirebase;
