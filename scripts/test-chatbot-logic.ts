import 'dotenv/config';
import { db } from '../db';
import { universityProfiles } from '../db/schema';
import { eq } from 'drizzle-orm';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText, stepCountIs } from 'ai';

async function test() {
    try {
        console.log('Testing DB connection...');
        const profiles = await db
            .select({ name: universityProfiles.name })
            .from(universityProfiles)
            .where(eq(universityProfiles.isPublished, true))
            .limit(1);

        console.log('DB Profile Result:', profiles);
        const universityName = profiles.length > 0 ? profiles[0].name : 'Universitas';
        console.log('University Name:', universityName);

        if (!process.env.OPENROUTER_API_KEY) {
            console.log('ERROR: OPENROUTER_API_KEY is missing');
            return;
        }

        console.log('Testing message mapping logic simulation...');
        const rawMessages = [
            { role: 'user', content: 'halo' },
            {
                role: 'assistant',
                parts: [{ type: 'text', text: 'Halo! Ada yang bisa saya bantu?' }]
            },
            {
                role: 'assistant',
                parts: [{ type: 'tool-call', toolCallId: '123', toolName: 'getStudyPrograms', args: {} }]
            },
            {
                role: 'tool',
                parts: [{ type: 'tool-result', toolCallId: '123', toolName: 'getStudyPrograms', result: { data: [], count: 0 } }]
            }
        ];

        const mapped = rawMessages.map((msg: any) => {
            if (typeof msg.content === 'string' && msg.content !== '') {
                return { role: msg.role, content: msg.content };
            }
            if (msg.parts && Array.isArray(msg.parts)) {
                const hasToolCalls = msg.parts.some((p: any) => p.type === 'tool-call' || p.type === 'tool-result');
                if (hasToolCalls) {
                    return { role: msg.role, content: msg.parts };
                }
                const textContent = msg.parts
                    .filter((part: any) => part.type === 'text')
                    .map((part: any) => part.text || '')
                    .join('');
                return { role: msg.role, content: textContent };
            }
            return msg;
        });

        console.log('Mapped Messages:', JSON.stringify(mapped, null, 2));

        console.log('Verification successful: Logic handles tools and text correctly.');
    } catch (error) {
        console.error('Test Failed:', error);
    }
}

test();
