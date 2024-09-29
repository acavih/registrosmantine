import { NextRequest, NextResponse } from 'next/server';
import * as y from 'yup';
import { dbClient } from '@/utils/db';

const partnerSchema = y.object({
    code: y.string().default(''),
    name: y.string().default(''),
    surname: y.string().default(''),
    email: y.string().email().default(''),
    phone: y.string().default(''),
    sipcard: y.string().default(''),
    notes: y.string().default(''),
    pendent: y.string().default(''),
    birthdate: y.string().default(''),
    nationality: y.string().required(),
    partnerState: y.string().required(),
    residency: y.string().required(),
    howdidknowus: y.string().required(),
    yeardidknowus: y.string().required(),
    sex: y.string().required(),
});

export const POST = async (request: NextRequest) => {
    const {nationality, partnerState, residency, howdidknowus, yeardidknowus, sex, ...data}: any = Object.fromEntries(await request.formData());
    // const data = await partnerSchema.validate(body);

    console.log(data)
    
    await dbClient.partners.create({
        data: {...data,
            resources_nationalities: { connect: { id: nationality as string } },
            resources_partnerstates: { connect: { id: partnerState as string } },
            resources_residencies: { connect: { id: residency as string } },
            resources_howdidknowus: { connect: { id: howdidknowus as string } },
            resources_yeardidknowus: { connect: { id: yeardidknowus as string } },
            resources_sex: { connect: { id: sex as string } },
        },
    });
    return NextResponse.json({ message: 'ok' });
};
