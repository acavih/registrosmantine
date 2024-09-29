import { dbClient } from "@/utils/db"
import PartnerPage from "./PartnerPage"

export default async function Page({params}) {
    console.log(params)
    const partner = await dbClient.partners.findUnique({
        where: {id: params.partnerId},
        include: {
            attentions: true,
            resources_howdidknowus: true,
            resources_nationalities: true,
            resources_partnerstates: true,
            resources_residencies: true,
            resources_sex: true,
            resources_yeardidknowus: true
        }
    })
    console.log(partner)
    return (
        <PartnerPage partner={partner} />
    )
}