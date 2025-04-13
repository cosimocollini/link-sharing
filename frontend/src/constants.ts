export const LINKS = {
  github: {
    label: 'GitHub',
    color: '#1A1A1A',
    icon: 'github'
  },
  frontendmentor: {
    label: 'Frontend Mentor',
    color: '#FFFFFF',
    icon: 'frontendmentor'
  },
  twitter: {
    label: 'Twitter',
    color: '#43B7E9',
    icon: 'twitter'
  },
  linkedin: {
    label: 'LinkedIn',
    color: '#2D68FF',
    icon: 'linkedin'
  },
  youtube: {
    label: 'YouTube',
    color: '#EE3939',
    icon: 'youtube'
  },
  facebook: {
    label: 'Facebook',
    color: '#2442AC',
    icon: 'facebook'
  },
  twitch: {
    label: 'Twitch',
    color: '#EE3FC8',
    icon: 'twitch'
  },
  devto: {
    label: 'Dev.to',
    color: '#333333',
    icon: 'dev'
  },
  codewars: {
    label: 'Codewars',
    color: '#8A1A50',
    icon: 'codewars'
  },
  freecodecamp: {
    label: 'freeCodeCamp',
    color: '#302267',
    icon: 'freecode'
  },
  gitlab: {
    label: 'GitLab',
    color: '#EB4925',
    icon: 'gitlab'
  },
  hashnode: {
    label: 'Hashnode',
    color: '#0330D1',
    icon: 'hashnode'
  },
  stackoverflow: {
    label: 'Stack Overflow',
    color: '#EC7100',
    icon: 'stackoverflow'
  }
} as const;

type LinkKey = keyof typeof LINKS;
type SingleLink = (typeof LINKS)[LinkKey];
