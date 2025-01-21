import { VerificationRequest, CIPICResponse } from '@/types/verification';

export class CIPICService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.CIPIC_API_KEY || '';
    this.baseUrl = process.env.CIPIC_API_URL || 'https://api.cipic.gc.ca/v1';
  }

  async initiateSearch(request: VerificationRequest): Promise<CIPICResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/background-checks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey,
        },
        body: JSON.stringify({
          firstName: request.firstName,
          lastName: request.lastName,
          dateOfBirth: request.birthDate,
          placeOfBirth: request.birthPlace,
          currentAddress: request.address,
          contactEmail: request.email,
          contactPhone: request.phone,
        }),
      });

      if (!response.ok) {
        throw new Error(`CIPIC API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('CIPIC search initiation error:', error);
      throw error;
    }
  }

  async getSearchResults(searchId: string): Promise<CIPICResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/background-checks/${searchId}`, {
        headers: {
          'X-API-Key': this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`CIPIC API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('CIPIC results retrieval error:', error);
      throw error;
    }
  }
} 