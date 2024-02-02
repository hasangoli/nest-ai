import * as bcrypt from 'bcrypt';

export const hashString = async (str: string): Promise<string> => {
  const randomSalt = await bcrypt.genSalt(10);
  return await bcrypt.hash(str, randomSalt);
};
