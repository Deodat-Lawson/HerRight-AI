import { NextRequest, NextResponse } from 'next/server';

// ElevenLabs API configuration
const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1/text-to-speech';

interface VoiceConfig {
  voice_id: string;
  name: string;
}

const VOICES: Record<string, VoiceConfig> = {
  // Mandarin Chinese - warm female voice
  'zh-CN': {
    voice_id: 'EXAVITQu4vr4xnSDxMaL', // Bella - warm and professional
    name: 'Bella'
  },
  // Cantonese - using a similar Chinese voice
  'zh-HK': {
    voice_id: 'EXAVITQu4vr4xnSDxMaL',
    name: 'Bella'
  },
  // English - professional female voice
  'en-US': {
    voice_id: 'EXAVITQu4vr4xnSDxMaL',
    name: 'Bella'
  }
};

export async function POST(request: NextRequest) {
  try {
    const { text, language } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Determine voice based on language
    const voiceConfig = VOICES[language] || VOICES['en-US'];

    // Call ElevenLabs API
    const response = await fetch(`${ELEVENLABS_API_URL}/${voiceConfig.voice_id}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVENLABS_API_KEY || '',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.5,
          use_speaker_boost: true
        }
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('ElevenLabs API error:', error);
      return NextResponse.json(
        { error: 'Failed to generate speech' },
        { status: response.status }
      );
    }

    // Get audio data
    const audioBuffer = await response.arrayBuffer();

    // Return audio as streaming response
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'inline',
      },
    });

  } catch (error) {
    console.error('TTS error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
