import { NextRequest, NextResponse } from 'next/server';
import { dbClient } from '@/utils/db';

export const GET = async (req: NextRequest) => {
    const typeResource = req.nextUrl.searchParams.get('typeResource');

    if (typeResource === 'sex') {
        return NextResponse.json({
            list: await dbClient.resources_sex.findMany({
                orderBy: { name: 'asc' },
            }),
        });
    }
    if (typeResource === 'partnerState') {
        return NextResponse.json({
            list: await dbClient.resources_partnerstates.findMany({
                orderBy: { name: 'asc' },
            }),
        });
    }
    if (typeResource === 'nationality') {
        return NextResponse.json({
            list: await dbClient.resources_nationalities.findMany({
                orderBy: { name: 'asc' },
            }),
        });
    }
    if (typeResource === 'residency') {
        return NextResponse.json({
            list: await dbClient.resources_residencies.findMany({
                orderBy: { name: 'asc' },
            }),
        });
    }
    if (typeResource === 'howdidknowus') {
        return NextResponse.json({
            list: await dbClient.resources_howdidknowus.findMany({
                orderBy: { name: 'asc' },
            }),
        });
    }
    if (typeResource === 'yeardidknowus') {
        return NextResponse.json({
            list: await dbClient.resources_yeardidknowus.findMany({
                orderBy: { name: 'asc' },
            }),
        });
    }

    return new Response(JSON.stringify({
        list: [],
    }), { status: 400 });
};
