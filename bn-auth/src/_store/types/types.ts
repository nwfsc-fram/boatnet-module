import { BoatnetUser } from '../../models/auth.model';

export interface AuthState {
  status: {
    isLoggingIn?: boolean;
    isLoggedIn?: boolean;
    error?: {
      message: string;
    };
  };
  user: BoatnetUser | null;
}
