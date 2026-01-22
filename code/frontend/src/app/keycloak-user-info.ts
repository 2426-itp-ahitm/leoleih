export interface KeycloakUserProfile {
  sub: string;
  email_verified: boolean;
  name: string;
  distinguishedName: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}
