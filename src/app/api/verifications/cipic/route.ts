import { NextResponse } from 'next/server';
import { CIPICService } from '@/lib/services/cipic';
import { VerificationRequest } from '@/types/verification';

const cipicService = new CIPICService();

export async function POST(request: Request) {
  try {
    const body: VerificationRequest = await request.json();
    const result = await cipicService.initiateSearch(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error('CIPIC search initiation error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate CIPIC search' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchId = searchParams.get('searchId');

    if (!searchId) {
      return NextResponse.json(
        { error: 'Search ID is required' },
        { status: 400 }
      );
    }

    const result = await cipicService.getSearchResults(searchId);
    return NextResponse.json(result);
  } catch (error) {
    console.error('CIPIC results retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve CIPIC search results' },
      { status: 500 }
    );
  }
} 