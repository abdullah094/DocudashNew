
export interface SignUpAPI {
    success: boolean;
    message: { email: [string], first_name: [string],last_name:[string],phone:[string] };
    next: string;
    data: SignUpData;
    next_access: string;
  }