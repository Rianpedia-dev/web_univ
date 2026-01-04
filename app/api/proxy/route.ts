import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
        return new NextResponse('Missing url parameter', { status: 400 });
    }

    // Transparent 1x1 pixel PNG fallback
    const fallbackImage = Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
        'base64'
    );

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
            },
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            console.warn(`Proxy: Remote server returned ${response.status} for ${url}. Returning fallback.`);
            return new NextResponse(fallbackImage, {
                status: 200,
                headers: { 'Content-Type': 'image/png' }
            });
        }

        const buffer = await response.arrayBuffer();
        const contentType = response.headers.get('Content-Type') || 'image/png';

        return new NextResponse(buffer, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error) {
        console.error('Proxy Error:', error);
        return new NextResponse(fallbackImage, {
            status: 200,
            headers: { 'Content-Type': 'image/png' }
        });
    }
}
