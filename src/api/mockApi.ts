const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  sendOtp: (_phone: string): Promise<void> => delay(900),
  verifyOtp: (_otp: string): Promise<void> => delay(700),
  register: (_data: unknown): Promise<void> => delay(1400),
};
