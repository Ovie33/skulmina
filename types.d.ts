export type UserCredentials = {
  name: string;
  email: string;
  password: string;
};

export type LoginCredentials = Pick<UserCredentials, "email" | "password">;

export type LoginCredentialsError = {
  email: string[] | undefined;
  password: string[] | undefined;
};

export type ExamType = {
  id: number;
  code: string;
  user_id: number;
  title: string;
  description: string;
  time_limit: number;
  published_at: string | null;
  questions?: string[];
};

export type QuestionType = {
  id: number;
  description: string;
  options?: string[];
  answers?: string[];
};

export type AccountType = {
  name: string;
  email: string;
  password: string;
  email_verified_at: string;
  role: "admin" | "teacher" | "student";
};

export type formArgs = {
  data: Record<string, any>;
  onError?: (arg: Record<string, any>) => any;
  onSuccess?: (arg: Record<string, any>) => any;
};

export type ApiResponse<T> = {
  data: T;
  links?: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta?: {
    current_page: 1;
    from: 1;
    last_page: 1;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
};
