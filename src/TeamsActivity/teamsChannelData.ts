import z from 'zod'
const channelInfoZodSchema = z.object({
    id: z.string().min(1).optional(),
    name: z.string().min(1).optional(),
    type: z.string().min(1).optional()
})

const teamInfoZodSchema = z.object({
    id: z.string().min(1).optional(),
    name: z.string().min(1).optional(),
    aadGroupId: z.string().min(1).optional()
})

const teamsMeetingInfoZodSchema = z.object({
    id: z.string().min(1).optional()
})

const notificationInfoZodSchema = z.object({
    alert: z.boolean().optional(),
    alertInMeeting: z.boolean().optional(),
    externalResourceUrl: z.string().min(1).optional()
})

const tenantInfoZodSchema = z.object({
    id: z.string().min(1).optional()
})

const teamsChannelDataSettingsZodSchema = z.object({
    selectedChannel: channelInfoZodSchema.optional()
})

const onBehalfOfZodSchema = z.object({
    itemid: z.union([z.literal(0), z.number()]),
    mentionType: z.union([z.string().min(1), z.literal('person')]),
    mri: z.string().min(1),
    displayName: z.string().min(1).optional()
})

export const teamsChannelDataZodSchema = z.object({
    channel: channelInfoZodSchema,
    eventType: z.string().min(1).optional(),
    team: teamInfoZodSchema.optional(),
    notification: notificationInfoZodSchema.optional(),
    tenant: tenantInfoZodSchema.optional(),
    meeting: teamsMeetingInfoZodSchema.optional(),
    settings: teamsChannelDataSettingsZodSchema.optional(),
    onBehalfOf: z.array(onBehalfOfZodSchema).optional()
})

export type TeamsChannelData = z.infer<typeof teamsChannelDataZodSchema>