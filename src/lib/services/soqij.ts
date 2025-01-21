import { VerificationRequest, SOQIJResponse } from '@/types/verification';

export class SOQIJService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.SOQIJ_API_KEY || '';
    this.baseUrl = process.env.SOQIJ_API_URL || 'https://api.soqij.com/v1';
  }

  async submitVerification(request: VerificationRequest): Promise<SOQIJResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/verifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          first_name: request.firstName,
          last_name: request.lastName,
          birth_date: request.birthDate,
          birth_place: request.birthPlace,
          address: request.address,
        }),
      });

      if (!response.ok) {
        throw new Error(`SOQIJ API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('SOQIJ verification error:', error);
      throw error;
    }
  }

  async checkStatus(requestId: string): Promise<SOQIJResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/verifications/${requestId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`SOQIJ API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('SOQIJ status check error:', error);
      throw error;
    }
  }
} 