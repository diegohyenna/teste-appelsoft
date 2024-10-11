import { Resume } from './resume.model';

export type ResumeReturn = {
  status: string;
  message: string;
  data?: Resume | null | undefined;
};
