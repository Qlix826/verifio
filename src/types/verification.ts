export interface VerificationRequest {
  firstName: string;
  lastName: string;
  birthDate: string;
  birthPlace: string;
  address: string;
  email: string;
  phone: string;
}

export interface SOQIJResponse {
  requestId: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  result?: {
    hasRecord: boolean;
    verificationDate: string;
    referenceNumber: string;
    details?: string;
  };
}

export interface CIPICResponse {
  searchId: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'ERROR';
  results?: {
    recordFound: boolean;
    searchDate: string;
    caseNumber: string;
    additionalInfo?: string;
  };
} 