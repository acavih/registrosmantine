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
    const body = await request.formData();
    const data = await partnerSchema.validate(body);
    await dbClient.partners.create({
        data: {
            name: data.name,
            surname: data.surname,
            email: data.email,
            phone: data.phone,
            sipcard: data.sipcard,
            notes: data.notes,
            birthdate: data.birthdate,
            code: data.code,
            pendent: data.pendent,
            resources_nationalities: { connect: { id: data.nationality as string } },
            resources_partnerstates: { connect: { id: data.partnerState as string } },
            resources_residencies: { connect: { id: data.residency as string } },
            resources_howdidknowus: { connect: { id: data.howdidknowus as string } },
            resources_yeardidknowus: { connect: { id: data.yeardidknowus as string } },
            resources_sex: { connect: { id: data.sex as string } },
        },
    });
    return NextResponse.json({ message: 'ok' });
};
