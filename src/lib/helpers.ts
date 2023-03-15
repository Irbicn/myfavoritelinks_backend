import bcrypt from 'bcryptjs';

export const encrypt = async (data: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(data, salt);
  return hash;
};

export const match = async (data: string, encrypted: string) => {
  return await bcrypt.compare(data, encrypted);
};

export default { encrypt, match };
