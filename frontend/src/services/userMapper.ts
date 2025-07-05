import type { UserDetails, UserDetailsResponse } from './types';

export function mapUserResponseToDomain(data: UserDetailsResponse): UserDetails {
  return {
    isAuthenticated: true,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.publicEmail,
    profilePicture: data.profilePicture ? (data.profilePicture as File) : undefined
  };
}
