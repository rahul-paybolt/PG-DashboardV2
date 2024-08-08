
// Required imports
import { setGAuthUser } from '@/store/auth-store';
import { GoogleSignInResponse, GoogleUserdata } from '@/interfaces/authentication.interface';
import { safeAny } from '@/interfaces/global.interface';
import { loginWithGoogle } from '@/services/auth-service';
import { loadScript } from './common-utils';
import { authenticateUser } from './auth-utils';



// Function to parse JWT token
export function parseJWT(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
}

// Declare google object
declare const google: safeAny;

interface CredentialsResponse {
  credential: safeAny;
  select_by: string;
}

// Initiate Google Sign-In

export const initiateGoogleSignIn = (buttonRef: HTMLDivElement, isSignIn: boolean) => {
  loadScript('https://accounts.google.com/gsi/client',() => onGoogleAuthLoad(buttonRef, navigator, isSignIn));
};

// Handle Google Auth Load
const onGoogleAuthLoad = (buttonRef: HTMLDivElement, navigator: Navigator, isSignIn: boolean) => {
  if (buttonRef) {
    const width = buttonRef.offsetWidth;
    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_API_BASE_URL,
      callback: (cred: CredentialsResponse) => onGoogleSignIn(cred, navigator),
    });
    google.accounts.id.renderButton(buttonRef, {
      type: 'standard',
      width,
      text: isSignIn ? 'signin_with' : 'signup_with',
    });
  }
};

// Handle Google Sign-In
const onGoogleSignIn = async (googleCred: CredentialsResponse, navigator: Navigator) => {
  const [response, error] = await loginWithGoogle({ id_token: googleCred.credential, recaptcha: token });
  if (error) return;

  const googleSignInResponse = response as GoogleSignInResponse;
  if (googleSignInResponse && googleSignInResponse.is_new_user) {
    const userProfile: GoogleUserdata = parseJWT(googleCred.credential);
    userProfile.credential = googleCred.credential;
    setGAuthUser(userProfile);
    console.log('Hello....');
    // navigator('/register');
  } else {
    response && authenticateUser(response, navigator);
  }
};
