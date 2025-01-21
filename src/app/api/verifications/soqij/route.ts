import { NextResponse } from 'next/server';
import { SOQIJService } from '@/lib/services/soqij';
import { VerificationRequest } from '@/types/verification';

const soqijService = new SOQIJService();

export async function POST(request: Request) {
  try {
    const body: VerificationRequest = await request.json();
    const result = await soqijService.submitVerification(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error('SOQIJ verification error:', error);
    return NextResponse.json(
      { error: 'Failed to submit SOQIJ verification' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get('requestId');

    if (!requestId) {
      return NextResponse.json(
        { error: 'Request ID is required' },
        { status: 400 }
      );
    }

    const result = await soqijService.checkStatus(requestId);
    return NextResponse.json(result);
  } catch (error) {
    console.error('SOQIJ status check error:', error);
    return NextResponse.json(
      { error: 'Failed to check SOQIJ verification status' },
      { status: 500 }
    );
  }
} 