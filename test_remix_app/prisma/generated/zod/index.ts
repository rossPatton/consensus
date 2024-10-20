import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const CategoriesScalarFieldEnumSchema = z.enum(['id','display','slug','uuid','created','updated']);

export const DecisionsScalarFieldEnumSchema = z.enum(['id','created','updated']);

export const GroupsScalarFieldEnumSchema = z.enum(['id','category','description','memberName','modName','privacyType','created','updated','uuid','name']);

export const MeetingsScalarFieldEnumSchema = z.enum(['id','created','updated','category','description','title','group','type','location','locationLink','status','slug','datetime','host','duration','uuid']);

export const RsvpsScalarFieldEnumSchema = z.enum(['id','uuid','user','meeting','value','type','created','updated']);

export const UsersScalarFieldEnumSchema = z.enum(['id','type','uuid','created','updated']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const meeting_statusSchema = z.enum(['Draft','Public','Private','Deleted']);

export type meeting_statusType = `${z.infer<typeof meeting_statusSchema>}`

export const meeting_typesSchema = z.enum(['Meeting','March','Rally','Direct_Action','Protest','Strike','Picket','Vote','Election']);

export type meeting_typesType = `${z.infer<typeof meeting_typesSchema>}`

export const rsvp_statusSchema = z.enum(['Yes','No','Maybe']);

export type rsvp_statusType = `${z.infer<typeof rsvp_statusSchema>}`

export const rsvp_typeSchema = z.enum(['public','private']);

export type rsvp_typeType = `${z.infer<typeof rsvp_typeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// CATEGORIES SCHEMA
/////////////////////////////////////////

export const categoriesSchema = z.object({
  id: z.number().int(),
  display: z.string(),
  slug: z.string(),
  uuid: z.string(),
  created: z.coerce.date(),
  updated: z.coerce.date(),
})

export type categories = z.infer<typeof categoriesSchema>

/////////////////////////////////////////
// CATEGORIES PARTIAL SCHEMA
/////////////////////////////////////////

export const categoriesPartialSchema = categoriesSchema.partial()

export type categoriesPartial = z.infer<typeof categoriesPartialSchema>

/////////////////////////////////////////
// DECISIONS SCHEMA
/////////////////////////////////////////

export const decisionsSchema = z.object({
  id: z.number().int(),
  created: z.coerce.date(),
  updated: z.coerce.date(),
})

export type decisions = z.infer<typeof decisionsSchema>

/////////////////////////////////////////
// DECISIONS PARTIAL SCHEMA
/////////////////////////////////////////

export const decisionsPartialSchema = decisionsSchema.partial()

export type decisionsPartial = z.infer<typeof decisionsPartialSchema>

/////////////////////////////////////////
// GROUPS SCHEMA
/////////////////////////////////////////

export const groupsSchema = z.object({
  id: z.number().int(),
  category: z.string(),
  description: z.string(),
  memberName: z.string(),
  modName: z.string(),
  privacyType: z.string(),
  created: z.coerce.date(),
  updated: z.coerce.date(),
  uuid: z.string().nullable(),
  name: z.string(),
})

export type groups = z.infer<typeof groupsSchema>

/////////////////////////////////////////
// GROUPS PARTIAL SCHEMA
/////////////////////////////////////////

export const groupsPartialSchema = groupsSchema.partial()

export type groupsPartial = z.infer<typeof groupsPartialSchema>

/////////////////////////////////////////
// MEETINGS SCHEMA
/////////////////////////////////////////

export const meetingsSchema = z.object({
  type: meeting_typesSchema,
  status: meeting_statusSchema,
  id: z.number().int(),
  created: z.coerce.date(),
  updated: z.coerce.date(),
  category: z.string(),
  description: z.string(),
  title: z.string(),
  group: z.string(),
  location: z.string(),
  locationLink: z.string(),
  slug: z.string(),
  datetime: z.coerce.date(),
  host: z.string(),
  duration: z.number().int(),
  uuid: z.string(),
})

export type meetings = z.infer<typeof meetingsSchema>

/////////////////////////////////////////
// MEETINGS PARTIAL SCHEMA
/////////////////////////////////////////

export const meetingsPartialSchema = meetingsSchema.partial()

export type meetingsPartial = z.infer<typeof meetingsPartialSchema>

/////////////////////////////////////////
// RSVPS SCHEMA
/////////////////////////////////////////

export const rsvpsSchema = z.object({
  value: rsvp_statusSchema,
  type: rsvp_typeSchema,
  id: z.number().int(),
  uuid: z.string(),
  user: z.string(),
  meeting: z.string(),
  created: z.coerce.date(),
  updated: z.coerce.date(),
})

export type rsvps = z.infer<typeof rsvpsSchema>

/////////////////////////////////////////
// RSVPS PARTIAL SCHEMA
/////////////////////////////////////////

export const rsvpsPartialSchema = rsvpsSchema.partial()

export type rsvpsPartial = z.infer<typeof rsvpsPartialSchema>

/////////////////////////////////////////
// USERS SCHEMA
/////////////////////////////////////////

export const usersSchema = z.object({
  id: z.number().int(),
  type: z.string(),
  uuid: z.string(),
  created: z.coerce.date(),
  updated: z.coerce.date(),
})

export type users = z.infer<typeof usersSchema>

/////////////////////////////////////////
// USERS PARTIAL SCHEMA
/////////////////////////////////////////

export const usersPartialSchema = usersSchema.partial()

export type usersPartial = z.infer<typeof usersPartialSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// CATEGORIES
//------------------------------------------------------

export const categoriesIncludeSchema: z.ZodType<Prisma.categoriesInclude> = z.object({
  groups: z.union([z.boolean(),z.lazy(() => groupsFindManyArgsSchema)]).optional(),
  meetings: z.union([z.boolean(),z.lazy(() => meetingsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CategoriesCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const categoriesArgsSchema: z.ZodType<Prisma.categoriesDefaultArgs> = z.object({
  select: z.lazy(() => categoriesSelectSchema).optional(),
  include: z.lazy(() => categoriesIncludeSchema).optional(),
}).strict();

export const categoriesCountOutputTypeArgsSchema: z.ZodType<Prisma.categoriesCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => categoriesCountOutputTypeSelectSchema).nullish(),
}).strict();

export const categoriesCountOutputTypeSelectSchema: z.ZodType<Prisma.categoriesCountOutputTypeSelect> = z.object({
  groups: z.boolean().optional(),
  meetings: z.boolean().optional(),
}).strict();

export const categoriesSelectSchema: z.ZodType<Prisma.categoriesSelect> = z.object({
  id: z.boolean().optional(),
  display: z.boolean().optional(),
  slug: z.boolean().optional(),
  uuid: z.boolean().optional(),
  created: z.boolean().optional(),
  updated: z.boolean().optional(),
  groups: z.union([z.boolean(),z.lazy(() => groupsFindManyArgsSchema)]).optional(),
  meetings: z.union([z.boolean(),z.lazy(() => meetingsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CategoriesCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DECISIONS
//------------------------------------------------------

export const decisionsSelectSchema: z.ZodType<Prisma.decisionsSelect> = z.object({
  id: z.boolean().optional(),
  created: z.boolean().optional(),
  updated: z.boolean().optional(),
}).strict()

// GROUPS
//------------------------------------------------------

export const groupsIncludeSchema: z.ZodType<Prisma.groupsInclude> = z.object({
  categories: z.union([z.boolean(),z.lazy(() => categoriesArgsSchema)]).optional(),
  meetings: z.union([z.boolean(),z.lazy(() => meetingsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GroupsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const groupsArgsSchema: z.ZodType<Prisma.groupsDefaultArgs> = z.object({
  select: z.lazy(() => groupsSelectSchema).optional(),
  include: z.lazy(() => groupsIncludeSchema).optional(),
}).strict();

export const groupsCountOutputTypeArgsSchema: z.ZodType<Prisma.groupsCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => groupsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const groupsCountOutputTypeSelectSchema: z.ZodType<Prisma.groupsCountOutputTypeSelect> = z.object({
  meetings: z.boolean().optional(),
}).strict();

export const groupsSelectSchema: z.ZodType<Prisma.groupsSelect> = z.object({
  id: z.boolean().optional(),
  category: z.boolean().optional(),
  description: z.boolean().optional(),
  memberName: z.boolean().optional(),
  modName: z.boolean().optional(),
  privacyType: z.boolean().optional(),
  created: z.boolean().optional(),
  updated: z.boolean().optional(),
  uuid: z.boolean().optional(),
  name: z.boolean().optional(),
  categories: z.union([z.boolean(),z.lazy(() => categoriesArgsSchema)]).optional(),
  meetings: z.union([z.boolean(),z.lazy(() => meetingsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GroupsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// MEETINGS
//------------------------------------------------------

export const meetingsIncludeSchema: z.ZodType<Prisma.meetingsInclude> = z.object({
  categories: z.union([z.boolean(),z.lazy(() => categoriesArgsSchema)]).optional(),
  groups: z.union([z.boolean(),z.lazy(() => groupsArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  rsvps: z.union([z.boolean(),z.lazy(() => rsvpsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MeetingsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const meetingsArgsSchema: z.ZodType<Prisma.meetingsDefaultArgs> = z.object({
  select: z.lazy(() => meetingsSelectSchema).optional(),
  include: z.lazy(() => meetingsIncludeSchema).optional(),
}).strict();

export const meetingsCountOutputTypeArgsSchema: z.ZodType<Prisma.meetingsCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => meetingsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const meetingsCountOutputTypeSelectSchema: z.ZodType<Prisma.meetingsCountOutputTypeSelect> = z.object({
  rsvps: z.boolean().optional(),
}).strict();

export const meetingsSelectSchema: z.ZodType<Prisma.meetingsSelect> = z.object({
  id: z.boolean().optional(),
  created: z.boolean().optional(),
  updated: z.boolean().optional(),
  category: z.boolean().optional(),
  description: z.boolean().optional(),
  title: z.boolean().optional(),
  group: z.boolean().optional(),
  type: z.boolean().optional(),
  location: z.boolean().optional(),
  locationLink: z.boolean().optional(),
  status: z.boolean().optional(),
  slug: z.boolean().optional(),
  datetime: z.boolean().optional(),
  host: z.boolean().optional(),
  duration: z.boolean().optional(),
  uuid: z.boolean().optional(),
  categories: z.union([z.boolean(),z.lazy(() => categoriesArgsSchema)]).optional(),
  groups: z.union([z.boolean(),z.lazy(() => groupsArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  rsvps: z.union([z.boolean(),z.lazy(() => rsvpsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MeetingsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// RSVPS
//------------------------------------------------------

export const rsvpsIncludeSchema: z.ZodType<Prisma.rsvpsInclude> = z.object({
  meetings: z.union([z.boolean(),z.lazy(() => meetingsArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
}).strict()

export const rsvpsArgsSchema: z.ZodType<Prisma.rsvpsDefaultArgs> = z.object({
  select: z.lazy(() => rsvpsSelectSchema).optional(),
  include: z.lazy(() => rsvpsIncludeSchema).optional(),
}).strict();

export const rsvpsSelectSchema: z.ZodType<Prisma.rsvpsSelect> = z.object({
  id: z.boolean().optional(),
  uuid: z.boolean().optional(),
  user: z.boolean().optional(),
  meeting: z.boolean().optional(),
  value: z.boolean().optional(),
  type: z.boolean().optional(),
  created: z.boolean().optional(),
  updated: z.boolean().optional(),
  meetings: z.union([z.boolean(),z.lazy(() => meetingsArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
}).strict()

// USERS
//------------------------------------------------------

export const usersIncludeSchema: z.ZodType<Prisma.usersInclude> = z.object({
  meetings: z.union([z.boolean(),z.lazy(() => meetingsFindManyArgsSchema)]).optional(),
  rsvps: z.union([z.boolean(),z.lazy(() => rsvpsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UsersCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const usersArgsSchema: z.ZodType<Prisma.usersDefaultArgs> = z.object({
  select: z.lazy(() => usersSelectSchema).optional(),
  include: z.lazy(() => usersIncludeSchema).optional(),
}).strict();

export const usersCountOutputTypeArgsSchema: z.ZodType<Prisma.usersCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => usersCountOutputTypeSelectSchema).nullish(),
}).strict();

export const usersCountOutputTypeSelectSchema: z.ZodType<Prisma.usersCountOutputTypeSelect> = z.object({
  meetings: z.boolean().optional(),
  rsvps: z.boolean().optional(),
}).strict();

export const usersSelectSchema: z.ZodType<Prisma.usersSelect> = z.object({
  id: z.boolean().optional(),
  type: z.boolean().optional(),
  uuid: z.boolean().optional(),
  created: z.boolean().optional(),
  updated: z.boolean().optional(),
  meetings: z.union([z.boolean(),z.lazy(() => meetingsFindManyArgsSchema)]).optional(),
  rsvps: z.union([z.boolean(),z.lazy(() => rsvpsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UsersCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const categoriesWhereInputSchema: z.ZodType<Prisma.categoriesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => categoriesWhereInputSchema),z.lazy(() => categoriesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => categoriesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => categoriesWhereInputSchema),z.lazy(() => categoriesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  display: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  uuid: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  groups: z.lazy(() => GroupsListRelationFilterSchema).optional(),
  meetings: z.lazy(() => MeetingsListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.categoriesWhereInput>;

export const categoriesOrderByWithRelationInputSchema: z.ZodType<Prisma.categoriesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  groups: z.lazy(() => groupsOrderByRelationAggregateInputSchema).optional(),
  meetings: z.lazy(() => meetingsOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.categoriesOrderByWithRelationInput>;

export const categoriesWhereUniqueInputSchema: z.ZodType<Prisma.categoriesWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    slug: z.string(),
    uuid: z.string()
  }),
  z.object({
    id: z.number().int(),
    slug: z.string(),
  }),
  z.object({
    id: z.number().int(),
    uuid: z.string(),
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    slug: z.string(),
    uuid: z.string(),
  }),
  z.object({
    slug: z.string(),
  }),
  z.object({
    uuid: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  slug: z.string().optional(),
  uuid: z.string().optional(),
  AND: z.union([ z.lazy(() => categoriesWhereInputSchema),z.lazy(() => categoriesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => categoriesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => categoriesWhereInputSchema),z.lazy(() => categoriesWhereInputSchema).array() ]).optional(),
  display: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  groups: z.lazy(() => GroupsListRelationFilterSchema).optional(),
  meetings: z.lazy(() => MeetingsListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.categoriesWhereUniqueInput>;

export const categoriesOrderByWithAggregationInputSchema: z.ZodType<Prisma.categoriesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => categoriesCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => categoriesAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => categoriesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => categoriesMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => categoriesSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.categoriesOrderByWithAggregationInput>;

export const categoriesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.categoriesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => categoriesScalarWhereWithAggregatesInputSchema),z.lazy(() => categoriesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => categoriesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => categoriesScalarWhereWithAggregatesInputSchema),z.lazy(() => categoriesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  display: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  uuid: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.categoriesScalarWhereWithAggregatesInput>;

export const decisionsWhereInputSchema: z.ZodType<Prisma.decisionsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => decisionsWhereInputSchema),z.lazy(() => decisionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => decisionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => decisionsWhereInputSchema),z.lazy(() => decisionsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.decisionsWhereInput>;

export const decisionsOrderByWithRelationInputSchema: z.ZodType<Prisma.decisionsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.decisionsOrderByWithRelationInput>;

export const decisionsWhereUniqueInputSchema: z.ZodType<Prisma.decisionsWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => decisionsWhereInputSchema),z.lazy(() => decisionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => decisionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => decisionsWhereInputSchema),z.lazy(() => decisionsWhereInputSchema).array() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict()) as z.ZodType<Prisma.decisionsWhereUniqueInput>;

export const decisionsOrderByWithAggregationInputSchema: z.ZodType<Prisma.decisionsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => decisionsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => decisionsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => decisionsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => decisionsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => decisionsSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.decisionsOrderByWithAggregationInput>;

export const decisionsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.decisionsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => decisionsScalarWhereWithAggregatesInputSchema),z.lazy(() => decisionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => decisionsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => decisionsScalarWhereWithAggregatesInputSchema),z.lazy(() => decisionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.decisionsScalarWhereWithAggregatesInput>;

export const groupsWhereInputSchema: z.ZodType<Prisma.groupsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => groupsWhereInputSchema),z.lazy(() => groupsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => groupsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => groupsWhereInputSchema),z.lazy(() => groupsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  category: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  memberName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  modName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  privacyType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  uuid: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  categories: z.union([ z.lazy(() => CategoriesRelationFilterSchema),z.lazy(() => categoriesWhereInputSchema) ]).optional(),
  meetings: z.lazy(() => MeetingsListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.groupsWhereInput>;

export const groupsOrderByWithRelationInputSchema: z.ZodType<Prisma.groupsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  memberName: z.lazy(() => SortOrderSchema).optional(),
  modName: z.lazy(() => SortOrderSchema).optional(),
  privacyType: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  categories: z.lazy(() => categoriesOrderByWithRelationInputSchema).optional(),
  meetings: z.lazy(() => meetingsOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.groupsOrderByWithRelationInput>;

export const groupsWhereUniqueInputSchema: z.ZodType<Prisma.groupsWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    uuid: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    uuid: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  uuid: z.string().optional(),
  AND: z.union([ z.lazy(() => groupsWhereInputSchema),z.lazy(() => groupsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => groupsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => groupsWhereInputSchema),z.lazy(() => groupsWhereInputSchema).array() ]).optional(),
  category: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  memberName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  modName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  privacyType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  categories: z.union([ z.lazy(() => CategoriesRelationFilterSchema),z.lazy(() => categoriesWhereInputSchema) ]).optional(),
  meetings: z.lazy(() => MeetingsListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.groupsWhereUniqueInput>;

export const groupsOrderByWithAggregationInputSchema: z.ZodType<Prisma.groupsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  memberName: z.lazy(() => SortOrderSchema).optional(),
  modName: z.lazy(() => SortOrderSchema).optional(),
  privacyType: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => groupsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => groupsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => groupsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => groupsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => groupsSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.groupsOrderByWithAggregationInput>;

export const groupsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.groupsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => groupsScalarWhereWithAggregatesInputSchema),z.lazy(() => groupsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => groupsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => groupsScalarWhereWithAggregatesInputSchema),z.lazy(() => groupsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  category: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  memberName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  modName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  privacyType: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  uuid: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict() as z.ZodType<Prisma.groupsScalarWhereWithAggregatesInput>;

export const meetingsWhereInputSchema: z.ZodType<Prisma.meetingsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => meetingsWhereInputSchema),z.lazy(() => meetingsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => meetingsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => meetingsWhereInputSchema),z.lazy(() => meetingsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  category: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  group: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => Enummeeting_typesFilterSchema),z.lazy(() => meeting_typesSchema) ]).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  locationLink: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => Enummeeting_statusFilterSchema),z.lazy(() => meeting_statusSchema) ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  datetime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  host: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  duration: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  uuid: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  categories: z.union([ z.lazy(() => CategoriesRelationFilterSchema),z.lazy(() => categoriesWhereInputSchema) ]).optional(),
  groups: z.union([ z.lazy(() => GroupsRelationFilterSchema),z.lazy(() => groupsWhereInputSchema) ]).optional(),
  users: z.union([ z.lazy(() => UsersRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional(),
  rsvps: z.lazy(() => RsvpsListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.meetingsWhereInput>;

export const meetingsOrderByWithRelationInputSchema: z.ZodType<Prisma.meetingsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  group: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  locationLink: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  datetime: z.lazy(() => SortOrderSchema).optional(),
  host: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  categories: z.lazy(() => categoriesOrderByWithRelationInputSchema).optional(),
  groups: z.lazy(() => groupsOrderByWithRelationInputSchema).optional(),
  users: z.lazy(() => usersOrderByWithRelationInputSchema).optional(),
  rsvps: z.lazy(() => rsvpsOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.meetingsOrderByWithRelationInput>;

export const meetingsWhereUniqueInputSchema: z.ZodType<Prisma.meetingsWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    uuid: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    uuid: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  uuid: z.string().optional(),
  AND: z.union([ z.lazy(() => meetingsWhereInputSchema),z.lazy(() => meetingsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => meetingsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => meetingsWhereInputSchema),z.lazy(() => meetingsWhereInputSchema).array() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  category: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  group: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => Enummeeting_typesFilterSchema),z.lazy(() => meeting_typesSchema) ]).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  locationLink: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => Enummeeting_statusFilterSchema),z.lazy(() => meeting_statusSchema) ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  datetime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  host: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  duration: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  categories: z.union([ z.lazy(() => CategoriesRelationFilterSchema),z.lazy(() => categoriesWhereInputSchema) ]).optional(),
  groups: z.union([ z.lazy(() => GroupsRelationFilterSchema),z.lazy(() => groupsWhereInputSchema) ]).optional(),
  users: z.union([ z.lazy(() => UsersRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional(),
  rsvps: z.lazy(() => RsvpsListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.meetingsWhereUniqueInput>;

export const meetingsOrderByWithAggregationInputSchema: z.ZodType<Prisma.meetingsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  group: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  locationLink: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  datetime: z.lazy(() => SortOrderSchema).optional(),
  host: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => meetingsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => meetingsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => meetingsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => meetingsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => meetingsSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.meetingsOrderByWithAggregationInput>;

export const meetingsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.meetingsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => meetingsScalarWhereWithAggregatesInputSchema),z.lazy(() => meetingsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => meetingsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => meetingsScalarWhereWithAggregatesInputSchema),z.lazy(() => meetingsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  category: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  group: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => Enummeeting_typesWithAggregatesFilterSchema),z.lazy(() => meeting_typesSchema) ]).optional(),
  location: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  locationLink: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => Enummeeting_statusWithAggregatesFilterSchema),z.lazy(() => meeting_statusSchema) ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  datetime: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  host: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  duration: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  uuid: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict() as z.ZodType<Prisma.meetingsScalarWhereWithAggregatesInput>;

export const rsvpsWhereInputSchema: z.ZodType<Prisma.rsvpsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => rsvpsWhereInputSchema),z.lazy(() => rsvpsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => rsvpsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => rsvpsWhereInputSchema),z.lazy(() => rsvpsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  uuid: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  meeting: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => Enumrsvp_statusFilterSchema),z.lazy(() => rsvp_statusSchema) ]).optional(),
  type: z.union([ z.lazy(() => Enumrsvp_typeFilterSchema),z.lazy(() => rsvp_typeSchema) ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  meetings: z.union([ z.lazy(() => MeetingsRelationFilterSchema),z.lazy(() => meetingsWhereInputSchema) ]).optional(),
  users: z.union([ z.lazy(() => UsersRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.rsvpsWhereInput>;

export const rsvpsOrderByWithRelationInputSchema: z.ZodType<Prisma.rsvpsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => SortOrderSchema).optional(),
  meeting: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  meetings: z.lazy(() => meetingsOrderByWithRelationInputSchema).optional(),
  users: z.lazy(() => usersOrderByWithRelationInputSchema).optional()
}).strict() as z.ZodType<Prisma.rsvpsOrderByWithRelationInput>;

export const rsvpsWhereUniqueInputSchema: z.ZodType<Prisma.rsvpsWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    uuid: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    uuid: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  uuid: z.string().optional(),
  AND: z.union([ z.lazy(() => rsvpsWhereInputSchema),z.lazy(() => rsvpsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => rsvpsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => rsvpsWhereInputSchema),z.lazy(() => rsvpsWhereInputSchema).array() ]).optional(),
  user: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  meeting: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => Enumrsvp_statusFilterSchema),z.lazy(() => rsvp_statusSchema) ]).optional(),
  type: z.union([ z.lazy(() => Enumrsvp_typeFilterSchema),z.lazy(() => rsvp_typeSchema) ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  meetings: z.union([ z.lazy(() => MeetingsRelationFilterSchema),z.lazy(() => meetingsWhereInputSchema) ]).optional(),
  users: z.union([ z.lazy(() => UsersRelationFilterSchema),z.lazy(() => usersWhereInputSchema) ]).optional(),
}).strict()) as z.ZodType<Prisma.rsvpsWhereUniqueInput>;

export const rsvpsOrderByWithAggregationInputSchema: z.ZodType<Prisma.rsvpsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => SortOrderSchema).optional(),
  meeting: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => rsvpsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => rsvpsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => rsvpsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => rsvpsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => rsvpsSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.rsvpsOrderByWithAggregationInput>;

export const rsvpsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.rsvpsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => rsvpsScalarWhereWithAggregatesInputSchema),z.lazy(() => rsvpsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => rsvpsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => rsvpsScalarWhereWithAggregatesInputSchema),z.lazy(() => rsvpsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  uuid: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  meeting: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => Enumrsvp_statusWithAggregatesFilterSchema),z.lazy(() => rsvp_statusSchema) ]).optional(),
  type: z.union([ z.lazy(() => Enumrsvp_typeWithAggregatesFilterSchema),z.lazy(() => rsvp_typeSchema) ]).optional(),
  created: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.rsvpsScalarWhereWithAggregatesInput>;

export const usersWhereInputSchema: z.ZodType<Prisma.usersWhereInput> = z.object({
  AND: z.union([ z.lazy(() => usersWhereInputSchema),z.lazy(() => usersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => usersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => usersWhereInputSchema),z.lazy(() => usersWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  uuid: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  meetings: z.lazy(() => MeetingsListRelationFilterSchema).optional(),
  rsvps: z.lazy(() => RsvpsListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.usersWhereInput>;

export const usersOrderByWithRelationInputSchema: z.ZodType<Prisma.usersOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  meetings: z.lazy(() => meetingsOrderByRelationAggregateInputSchema).optional(),
  rsvps: z.lazy(() => rsvpsOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.usersOrderByWithRelationInput>;

export const usersWhereUniqueInputSchema: z.ZodType<Prisma.usersWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    uuid: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    uuid: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  uuid: z.string().optional(),
  AND: z.union([ z.lazy(() => usersWhereInputSchema),z.lazy(() => usersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => usersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => usersWhereInputSchema),z.lazy(() => usersWhereInputSchema).array() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  meetings: z.lazy(() => MeetingsListRelationFilterSchema).optional(),
  rsvps: z.lazy(() => RsvpsListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.usersWhereUniqueInput>;

export const usersOrderByWithAggregationInputSchema: z.ZodType<Prisma.usersOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => usersCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => usersAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => usersMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => usersMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => usersSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.usersOrderByWithAggregationInput>;

export const usersScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.usersScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => usersScalarWhereWithAggregatesInputSchema),z.lazy(() => usersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => usersScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => usersScalarWhereWithAggregatesInputSchema),z.lazy(() => usersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  uuid: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.usersScalarWhereWithAggregatesInput>;

export const categoriesCreateInputSchema: z.ZodType<Prisma.categoriesCreateInput> = z.object({
  display: z.string().optional(),
  slug: z.string().optional(),
  uuid: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  groups: z.lazy(() => groupsCreateNestedManyWithoutCategoriesInputSchema).optional(),
  meetings: z.lazy(() => meetingsCreateNestedManyWithoutCategoriesInputSchema).optional()
}).strict() as z.ZodType<Prisma.categoriesCreateInput>;

export const categoriesUncheckedCreateInputSchema: z.ZodType<Prisma.categoriesUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  display: z.string().optional(),
  slug: z.string().optional(),
  uuid: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  groups: z.lazy(() => groupsUncheckedCreateNestedManyWithoutCategoriesInputSchema).optional(),
  meetings: z.lazy(() => meetingsUncheckedCreateNestedManyWithoutCategoriesInputSchema).optional()
}).strict() as z.ZodType<Prisma.categoriesUncheckedCreateInput>;

export const categoriesUpdateInputSchema: z.ZodType<Prisma.categoriesUpdateInput> = z.object({
  display: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  groups: z.lazy(() => groupsUpdateManyWithoutCategoriesNestedInputSchema).optional(),
  meetings: z.lazy(() => meetingsUpdateManyWithoutCategoriesNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.categoriesUpdateInput>;

export const categoriesUncheckedUpdateInputSchema: z.ZodType<Prisma.categoriesUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  display: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  groups: z.lazy(() => groupsUncheckedUpdateManyWithoutCategoriesNestedInputSchema).optional(),
  meetings: z.lazy(() => meetingsUncheckedUpdateManyWithoutCategoriesNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.categoriesUncheckedUpdateInput>;

export const categoriesCreateManyInputSchema: z.ZodType<Prisma.categoriesCreateManyInput> = z.object({
  id: z.number().int().optional(),
  display: z.string().optional(),
  slug: z.string().optional(),
  uuid: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.categoriesCreateManyInput>;

export const categoriesUpdateManyMutationInputSchema: z.ZodType<Prisma.categoriesUpdateManyMutationInput> = z.object({
  display: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.categoriesUpdateManyMutationInput>;

export const categoriesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.categoriesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  display: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.categoriesUncheckedUpdateManyInput>;

export const decisionsCreateInputSchema: z.ZodType<Prisma.decisionsCreateInput> = z.object({
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.decisionsCreateInput>;

export const decisionsUncheckedCreateInputSchema: z.ZodType<Prisma.decisionsUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.decisionsUncheckedCreateInput>;

export const decisionsUpdateInputSchema: z.ZodType<Prisma.decisionsUpdateInput> = z.object({
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.decisionsUpdateInput>;

export const decisionsUncheckedUpdateInputSchema: z.ZodType<Prisma.decisionsUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.decisionsUncheckedUpdateInput>;

export const decisionsCreateManyInputSchema: z.ZodType<Prisma.decisionsCreateManyInput> = z.object({
  id: z.number().int().optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.decisionsCreateManyInput>;

export const decisionsUpdateManyMutationInputSchema: z.ZodType<Prisma.decisionsUpdateManyMutationInput> = z.object({
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.decisionsUpdateManyMutationInput>;

export const decisionsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.decisionsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.decisionsUncheckedUpdateManyInput>;

export const groupsCreateInputSchema: z.ZodType<Prisma.groupsCreateInput> = z.object({
  description: z.string().optional(),
  memberName: z.string().optional(),
  modName: z.string().optional(),
  privacyType: z.string().optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  uuid: z.string().optional().nullable(),
  name: z.string().optional(),
  categories: z.lazy(() => categoriesCreateNestedOneWithoutGroupsInputSchema).optional(),
  meetings: z.lazy(() => meetingsCreateNestedManyWithoutGroupsInputSchema).optional()
}).strict() as z.ZodType<Prisma.groupsCreateInput>;

export const groupsUncheckedCreateInputSchema: z.ZodType<Prisma.groupsUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  memberName: z.string().optional(),
  modName: z.string().optional(),
  privacyType: z.string().optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  uuid: z.string().optional().nullable(),
  name: z.string().optional(),
  meetings: z.lazy(() => meetingsUncheckedCreateNestedManyWithoutGroupsInputSchema).optional()
}).strict() as z.ZodType<Prisma.groupsUncheckedCreateInput>;

export const groupsUpdateInputSchema: z.ZodType<Prisma.groupsUpdateInput> = z.object({
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  memberName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  privacyType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categories: z.lazy(() => categoriesUpdateOneRequiredWithoutGroupsNestedInputSchema).optional(),
  meetings: z.lazy(() => meetingsUpdateManyWithoutGroupsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.groupsUpdateInput>;

export const groupsUncheckedUpdateInputSchema: z.ZodType<Prisma.groupsUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  memberName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  privacyType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meetings: z.lazy(() => meetingsUncheckedUpdateManyWithoutGroupsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.groupsUncheckedUpdateInput>;

export const groupsCreateManyInputSchema: z.ZodType<Prisma.groupsCreateManyInput> = z.object({
  id: z.number().int().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  memberName: z.string().optional(),
  modName: z.string().optional(),
  privacyType: z.string().optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  uuid: z.string().optional().nullable(),
  name: z.string().optional()
}).strict() as z.ZodType<Prisma.groupsCreateManyInput>;

export const groupsUpdateManyMutationInputSchema: z.ZodType<Prisma.groupsUpdateManyMutationInput> = z.object({
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  memberName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  privacyType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.groupsUpdateManyMutationInput>;

export const groupsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.groupsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  memberName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  privacyType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.groupsUncheckedUpdateManyInput>;

export const meetingsCreateInputSchema: z.ZodType<Prisma.meetingsCreateInput> = z.object({
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  description: z.string().optional(),
  title: z.string().optional(),
  type: z.lazy(() => meeting_typesSchema).optional(),
  location: z.string().optional(),
  locationLink: z.string().optional(),
  status: z.lazy(() => meeting_statusSchema).optional(),
  slug: z.string().optional(),
  datetime: z.coerce.date(),
  duration: z.number().int(),
  uuid: z.string(),
  categories: z.lazy(() => categoriesCreateNestedOneWithoutMeetingsInputSchema).optional(),
  groups: z.lazy(() => groupsCreateNestedOneWithoutMeetingsInputSchema),
  users: z.lazy(() => usersCreateNestedOneWithoutMeetingsInputSchema),
  rsvps: z.lazy(() => rsvpsCreateNestedManyWithoutMeetingsInputSchema).optional()
}).strict() as z.ZodType<Prisma.meetingsCreateInput>;

export const meetingsUncheckedCreateInputSchema: z.ZodType<Prisma.meetingsUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  title: z.string().optional(),
  group: z.string(),
  type: z.lazy(() => meeting_typesSchema).optional(),
  location: z.string().optional(),
  locationLink: z.string().optional(),
  status: z.lazy(() => meeting_statusSchema).optional(),
  slug: z.string().optional(),
  datetime: z.coerce.date(),
  host: z.string(),
  duration: z.number().int(),
  uuid: z.string(),
  rsvps: z.lazy(() => rsvpsUncheckedCreateNestedManyWithoutMeetingsInputSchema).optional()
}).strict() as z.ZodType<Prisma.meetingsUncheckedCreateInput>;

export const meetingsUpdateInputSchema: z.ZodType<Prisma.meetingsUpdateInput> = z.object({
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => meeting_typesSchema),z.lazy(() => Enummeeting_typesFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  locationLink: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => meeting_statusSchema),z.lazy(() => Enummeeting_statusFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datetime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categories: z.lazy(() => categoriesUpdateOneRequiredWithoutMeetingsNestedInputSchema).optional(),
  groups: z.lazy(() => groupsUpdateOneRequiredWithoutMeetingsNestedInputSchema).optional(),
  users: z.lazy(() => usersUpdateOneRequiredWithoutMeetingsNestedInputSchema).optional(),
  rsvps: z.lazy(() => rsvpsUpdateManyWithoutMeetingsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.meetingsUpdateInput>;

export const meetingsUncheckedUpdateInputSchema: z.ZodType<Prisma.meetingsUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  group: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => meeting_typesSchema),z.lazy(() => Enummeeting_typesFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  locationLink: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => meeting_statusSchema),z.lazy(() => Enummeeting_statusFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datetime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  host: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rsvps: z.lazy(() => rsvpsUncheckedUpdateManyWithoutMeetingsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.meetingsUncheckedUpdateInput>;

export const meetingsCreateManyInputSchema: z.ZodType<Prisma.meetingsCreateManyInput> = z.object({
  id: z.number().int().optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  title: z.string().optional(),
  group: z.string(),
  type: z.lazy(() => meeting_typesSchema).optional(),
  location: z.string().optional(),
  locationLink: z.string().optional(),
  status: z.lazy(() => meeting_statusSchema).optional(),
  slug: z.string().optional(),
  datetime: z.coerce.date(),
  host: z.string(),
  duration: z.number().int(),
  uuid: z.string()
}).strict() as z.ZodType<Prisma.meetingsCreateManyInput>;

export const meetingsUpdateManyMutationInputSchema: z.ZodType<Prisma.meetingsUpdateManyMutationInput> = z.object({
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => meeting_typesSchema),z.lazy(() => Enummeeting_typesFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  locationLink: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => meeting_statusSchema),z.lazy(() => Enummeeting_statusFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datetime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.meetingsUpdateManyMutationInput>;

export const meetingsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.meetingsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  group: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => meeting_typesSchema),z.lazy(() => Enummeeting_typesFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  locationLink: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => meeting_statusSchema),z.lazy(() => Enummeeting_statusFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datetime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  host: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.meetingsUncheckedUpdateManyInput>;

export const rsvpsCreateInputSchema: z.ZodType<Prisma.rsvpsCreateInput> = z.object({
  uuid: z.string(),
  value: z.lazy(() => rsvp_statusSchema).optional(),
  type: z.lazy(() => rsvp_typeSchema).optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  meetings: z.lazy(() => meetingsCreateNestedOneWithoutRsvpsInputSchema),
  users: z.lazy(() => usersCreateNestedOneWithoutRsvpsInputSchema)
}).strict() as z.ZodType<Prisma.rsvpsCreateInput>;

export const rsvpsUncheckedCreateInputSchema: z.ZodType<Prisma.rsvpsUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  uuid: z.string(),
  user: z.string(),
  meeting: z.string(),
  value: z.lazy(() => rsvp_statusSchema).optional(),
  type: z.lazy(() => rsvp_typeSchema).optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.rsvpsUncheckedCreateInput>;

export const rsvpsUpdateInputSchema: z.ZodType<Prisma.rsvpsUpdateInput> = z.object({
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.lazy(() => rsvp_statusSchema),z.lazy(() => Enumrsvp_statusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => rsvp_typeSchema),z.lazy(() => Enumrsvp_typeFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meetings: z.lazy(() => meetingsUpdateOneRequiredWithoutRsvpsNestedInputSchema).optional(),
  users: z.lazy(() => usersUpdateOneRequiredWithoutRsvpsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.rsvpsUpdateInput>;

export const rsvpsUncheckedUpdateInputSchema: z.ZodType<Prisma.rsvpsUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meeting: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.lazy(() => rsvp_statusSchema),z.lazy(() => Enumrsvp_statusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => rsvp_typeSchema),z.lazy(() => Enumrsvp_typeFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.rsvpsUncheckedUpdateInput>;

export const rsvpsCreateManyInputSchema: z.ZodType<Prisma.rsvpsCreateManyInput> = z.object({
  id: z.number().int().optional(),
  uuid: z.string(),
  user: z.string(),
  meeting: z.string(),
  value: z.lazy(() => rsvp_statusSchema).optional(),
  type: z.lazy(() => rsvp_typeSchema).optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.rsvpsCreateManyInput>;

export const rsvpsUpdateManyMutationInputSchema: z.ZodType<Prisma.rsvpsUpdateManyMutationInput> = z.object({
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.lazy(() => rsvp_statusSchema),z.lazy(() => Enumrsvp_statusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => rsvp_typeSchema),z.lazy(() => Enumrsvp_typeFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.rsvpsUpdateManyMutationInput>;

export const rsvpsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.rsvpsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meeting: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.lazy(() => rsvp_statusSchema),z.lazy(() => Enumrsvp_statusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => rsvp_typeSchema),z.lazy(() => Enumrsvp_typeFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.rsvpsUncheckedUpdateManyInput>;

export const usersCreateInputSchema: z.ZodType<Prisma.usersCreateInput> = z.object({
  type: z.string().optional(),
  uuid: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  meetings: z.lazy(() => meetingsCreateNestedManyWithoutUsersInputSchema).optional(),
  rsvps: z.lazy(() => rsvpsCreateNestedManyWithoutUsersInputSchema).optional()
}).strict() as z.ZodType<Prisma.usersCreateInput>;

export const usersUncheckedCreateInputSchema: z.ZodType<Prisma.usersUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  type: z.string().optional(),
  uuid: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  meetings: z.lazy(() => meetingsUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  rsvps: z.lazy(() => rsvpsUncheckedCreateNestedManyWithoutUsersInputSchema).optional()
}).strict() as z.ZodType<Prisma.usersUncheckedCreateInput>;

export const usersUpdateInputSchema: z.ZodType<Prisma.usersUpdateInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meetings: z.lazy(() => meetingsUpdateManyWithoutUsersNestedInputSchema).optional(),
  rsvps: z.lazy(() => rsvpsUpdateManyWithoutUsersNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.usersUpdateInput>;

export const usersUncheckedUpdateInputSchema: z.ZodType<Prisma.usersUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meetings: z.lazy(() => meetingsUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  rsvps: z.lazy(() => rsvpsUncheckedUpdateManyWithoutUsersNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.usersUncheckedUpdateInput>;

export const usersCreateManyInputSchema: z.ZodType<Prisma.usersCreateManyInput> = z.object({
  id: z.number().int().optional(),
  type: z.string().optional(),
  uuid: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.usersCreateManyInput>;

export const usersUpdateManyMutationInputSchema: z.ZodType<Prisma.usersUpdateManyMutationInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.usersUpdateManyMutationInput>;

export const usersUncheckedUpdateManyInputSchema: z.ZodType<Prisma.usersUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.usersUncheckedUpdateManyInput>;

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.IntFilter>;

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.StringFilter>;

export const UuidFilterSchema: z.ZodType<Prisma.UuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UuidFilter>;

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.DateTimeFilter>;

export const GroupsListRelationFilterSchema: z.ZodType<Prisma.GroupsListRelationFilter> = z.object({
  every: z.lazy(() => groupsWhereInputSchema).optional(),
  some: z.lazy(() => groupsWhereInputSchema).optional(),
  none: z.lazy(() => groupsWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.GroupsListRelationFilter>;

export const MeetingsListRelationFilterSchema: z.ZodType<Prisma.MeetingsListRelationFilter> = z.object({
  every: z.lazy(() => meetingsWhereInputSchema).optional(),
  some: z.lazy(() => meetingsWhereInputSchema).optional(),
  none: z.lazy(() => meetingsWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.MeetingsListRelationFilter>;

export const groupsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.groupsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.groupsOrderByRelationAggregateInput>;

export const meetingsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.meetingsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.meetingsOrderByRelationAggregateInput>;

export const categoriesCountOrderByAggregateInputSchema: z.ZodType<Prisma.categoriesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.categoriesCountOrderByAggregateInput>;

export const categoriesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.categoriesAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.categoriesAvgOrderByAggregateInput>;

export const categoriesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.categoriesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.categoriesMaxOrderByAggregateInput>;

export const categoriesMinOrderByAggregateInputSchema: z.ZodType<Prisma.categoriesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.categoriesMinOrderByAggregateInput>;

export const categoriesSumOrderByAggregateInputSchema: z.ZodType<Prisma.categoriesSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.categoriesSumOrderByAggregateInput>;

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict() as z.ZodType<Prisma.IntWithAggregatesFilter>;

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict() as z.ZodType<Prisma.StringWithAggregatesFilter>;

export const UuidWithAggregatesFilterSchema: z.ZodType<Prisma.UuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict() as z.ZodType<Prisma.UuidWithAggregatesFilter>;

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict() as z.ZodType<Prisma.DateTimeWithAggregatesFilter>;

export const decisionsCountOrderByAggregateInputSchema: z.ZodType<Prisma.decisionsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.decisionsCountOrderByAggregateInput>;

export const decisionsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.decisionsAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.decisionsAvgOrderByAggregateInput>;

export const decisionsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.decisionsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.decisionsMaxOrderByAggregateInput>;

export const decisionsMinOrderByAggregateInputSchema: z.ZodType<Prisma.decisionsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.decisionsMinOrderByAggregateInput>;

export const decisionsSumOrderByAggregateInputSchema: z.ZodType<Prisma.decisionsSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.decisionsSumOrderByAggregateInput>;

export const UuidNullableFilterSchema: z.ZodType<Prisma.UuidNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.UuidNullableFilter>;

export const CategoriesRelationFilterSchema: z.ZodType<Prisma.CategoriesRelationFilter> = z.object({
  is: z.lazy(() => categoriesWhereInputSchema).optional(),
  isNot: z.lazy(() => categoriesWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.CategoriesRelationFilter>;

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict() as z.ZodType<Prisma.SortOrderInput>;

export const groupsCountOrderByAggregateInputSchema: z.ZodType<Prisma.groupsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  memberName: z.lazy(() => SortOrderSchema).optional(),
  modName: z.lazy(() => SortOrderSchema).optional(),
  privacyType: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.groupsCountOrderByAggregateInput>;

export const groupsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.groupsAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.groupsAvgOrderByAggregateInput>;

export const groupsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.groupsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  memberName: z.lazy(() => SortOrderSchema).optional(),
  modName: z.lazy(() => SortOrderSchema).optional(),
  privacyType: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.groupsMaxOrderByAggregateInput>;

export const groupsMinOrderByAggregateInputSchema: z.ZodType<Prisma.groupsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  memberName: z.lazy(() => SortOrderSchema).optional(),
  modName: z.lazy(() => SortOrderSchema).optional(),
  privacyType: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.groupsMinOrderByAggregateInput>;

export const groupsSumOrderByAggregateInputSchema: z.ZodType<Prisma.groupsSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.groupsSumOrderByAggregateInput>;

export const UuidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.UuidNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.UuidNullableWithAggregatesFilter>;

export const Enummeeting_typesFilterSchema: z.ZodType<Prisma.Enummeeting_typesFilter> = z.object({
  equals: z.lazy(() => meeting_typesSchema).optional(),
  in: z.lazy(() => meeting_typesSchema).array().optional(),
  notIn: z.lazy(() => meeting_typesSchema).array().optional(),
  not: z.union([ z.lazy(() => meeting_typesSchema),z.lazy(() => NestedEnummeeting_typesFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.Enummeeting_typesFilter>;

export const Enummeeting_statusFilterSchema: z.ZodType<Prisma.Enummeeting_statusFilter> = z.object({
  equals: z.lazy(() => meeting_statusSchema).optional(),
  in: z.lazy(() => meeting_statusSchema).array().optional(),
  notIn: z.lazy(() => meeting_statusSchema).array().optional(),
  not: z.union([ z.lazy(() => meeting_statusSchema),z.lazy(() => NestedEnummeeting_statusFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.Enummeeting_statusFilter>;

export const GroupsRelationFilterSchema: z.ZodType<Prisma.GroupsRelationFilter> = z.object({
  is: z.lazy(() => groupsWhereInputSchema).optional(),
  isNot: z.lazy(() => groupsWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.GroupsRelationFilter>;

export const UsersRelationFilterSchema: z.ZodType<Prisma.UsersRelationFilter> = z.object({
  is: z.lazy(() => usersWhereInputSchema).optional(),
  isNot: z.lazy(() => usersWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.UsersRelationFilter>;

export const RsvpsListRelationFilterSchema: z.ZodType<Prisma.RsvpsListRelationFilter> = z.object({
  every: z.lazy(() => rsvpsWhereInputSchema).optional(),
  some: z.lazy(() => rsvpsWhereInputSchema).optional(),
  none: z.lazy(() => rsvpsWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.RsvpsListRelationFilter>;

export const rsvpsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.rsvpsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.rsvpsOrderByRelationAggregateInput>;

export const meetingsCountOrderByAggregateInputSchema: z.ZodType<Prisma.meetingsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  group: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  locationLink: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  datetime: z.lazy(() => SortOrderSchema).optional(),
  host: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.meetingsCountOrderByAggregateInput>;

export const meetingsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.meetingsAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.meetingsAvgOrderByAggregateInput>;

export const meetingsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.meetingsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  group: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  locationLink: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  datetime: z.lazy(() => SortOrderSchema).optional(),
  host: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.meetingsMaxOrderByAggregateInput>;

export const meetingsMinOrderByAggregateInputSchema: z.ZodType<Prisma.meetingsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  group: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  locationLink: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  datetime: z.lazy(() => SortOrderSchema).optional(),
  host: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.meetingsMinOrderByAggregateInput>;

export const meetingsSumOrderByAggregateInputSchema: z.ZodType<Prisma.meetingsSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.meetingsSumOrderByAggregateInput>;

export const Enummeeting_typesWithAggregatesFilterSchema: z.ZodType<Prisma.Enummeeting_typesWithAggregatesFilter> = z.object({
  equals: z.lazy(() => meeting_typesSchema).optional(),
  in: z.lazy(() => meeting_typesSchema).array().optional(),
  notIn: z.lazy(() => meeting_typesSchema).array().optional(),
  not: z.union([ z.lazy(() => meeting_typesSchema),z.lazy(() => NestedEnummeeting_typesWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnummeeting_typesFilterSchema).optional(),
  _max: z.lazy(() => NestedEnummeeting_typesFilterSchema).optional()
}).strict() as z.ZodType<Prisma.Enummeeting_typesWithAggregatesFilter>;

export const Enummeeting_statusWithAggregatesFilterSchema: z.ZodType<Prisma.Enummeeting_statusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => meeting_statusSchema).optional(),
  in: z.lazy(() => meeting_statusSchema).array().optional(),
  notIn: z.lazy(() => meeting_statusSchema).array().optional(),
  not: z.union([ z.lazy(() => meeting_statusSchema),z.lazy(() => NestedEnummeeting_statusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnummeeting_statusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnummeeting_statusFilterSchema).optional()
}).strict() as z.ZodType<Prisma.Enummeeting_statusWithAggregatesFilter>;

export const Enumrsvp_statusFilterSchema: z.ZodType<Prisma.Enumrsvp_statusFilter> = z.object({
  equals: z.lazy(() => rsvp_statusSchema).optional(),
  in: z.lazy(() => rsvp_statusSchema).array().optional(),
  notIn: z.lazy(() => rsvp_statusSchema).array().optional(),
  not: z.union([ z.lazy(() => rsvp_statusSchema),z.lazy(() => NestedEnumrsvp_statusFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.Enumrsvp_statusFilter>;

export const Enumrsvp_typeFilterSchema: z.ZodType<Prisma.Enumrsvp_typeFilter> = z.object({
  equals: z.lazy(() => rsvp_typeSchema).optional(),
  in: z.lazy(() => rsvp_typeSchema).array().optional(),
  notIn: z.lazy(() => rsvp_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => rsvp_typeSchema),z.lazy(() => NestedEnumrsvp_typeFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.Enumrsvp_typeFilter>;

export const MeetingsRelationFilterSchema: z.ZodType<Prisma.MeetingsRelationFilter> = z.object({
  is: z.lazy(() => meetingsWhereInputSchema).optional(),
  isNot: z.lazy(() => meetingsWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.MeetingsRelationFilter>;

export const rsvpsCountOrderByAggregateInputSchema: z.ZodType<Prisma.rsvpsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => SortOrderSchema).optional(),
  meeting: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.rsvpsCountOrderByAggregateInput>;

export const rsvpsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.rsvpsAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.rsvpsAvgOrderByAggregateInput>;

export const rsvpsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.rsvpsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => SortOrderSchema).optional(),
  meeting: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.rsvpsMaxOrderByAggregateInput>;

export const rsvpsMinOrderByAggregateInputSchema: z.ZodType<Prisma.rsvpsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => SortOrderSchema).optional(),
  meeting: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.rsvpsMinOrderByAggregateInput>;

export const rsvpsSumOrderByAggregateInputSchema: z.ZodType<Prisma.rsvpsSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.rsvpsSumOrderByAggregateInput>;

export const Enumrsvp_statusWithAggregatesFilterSchema: z.ZodType<Prisma.Enumrsvp_statusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => rsvp_statusSchema).optional(),
  in: z.lazy(() => rsvp_statusSchema).array().optional(),
  notIn: z.lazy(() => rsvp_statusSchema).array().optional(),
  not: z.union([ z.lazy(() => rsvp_statusSchema),z.lazy(() => NestedEnumrsvp_statusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumrsvp_statusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumrsvp_statusFilterSchema).optional()
}).strict() as z.ZodType<Prisma.Enumrsvp_statusWithAggregatesFilter>;

export const Enumrsvp_typeWithAggregatesFilterSchema: z.ZodType<Prisma.Enumrsvp_typeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => rsvp_typeSchema).optional(),
  in: z.lazy(() => rsvp_typeSchema).array().optional(),
  notIn: z.lazy(() => rsvp_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => rsvp_typeSchema),z.lazy(() => NestedEnumrsvp_typeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumrsvp_typeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumrsvp_typeFilterSchema).optional()
}).strict() as z.ZodType<Prisma.Enumrsvp_typeWithAggregatesFilter>;

export const usersCountOrderByAggregateInputSchema: z.ZodType<Prisma.usersCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.usersCountOrderByAggregateInput>;

export const usersAvgOrderByAggregateInputSchema: z.ZodType<Prisma.usersAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.usersAvgOrderByAggregateInput>;

export const usersMaxOrderByAggregateInputSchema: z.ZodType<Prisma.usersMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.usersMaxOrderByAggregateInput>;

export const usersMinOrderByAggregateInputSchema: z.ZodType<Prisma.usersMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.usersMinOrderByAggregateInput>;

export const usersSumOrderByAggregateInputSchema: z.ZodType<Prisma.usersSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.usersSumOrderByAggregateInput>;

export const groupsCreateNestedManyWithoutCategoriesInputSchema: z.ZodType<Prisma.groupsCreateNestedManyWithoutCategoriesInput> = z.object({
  create: z.union([ z.lazy(() => groupsCreateWithoutCategoriesInputSchema),z.lazy(() => groupsCreateWithoutCategoriesInputSchema).array(),z.lazy(() => groupsUncheckedCreateWithoutCategoriesInputSchema),z.lazy(() => groupsUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => groupsCreateOrConnectWithoutCategoriesInputSchema),z.lazy(() => groupsCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => groupsCreateManyCategoriesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => groupsWhereUniqueInputSchema),z.lazy(() => groupsWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.groupsCreateNestedManyWithoutCategoriesInput>;

export const meetingsCreateNestedManyWithoutCategoriesInputSchema: z.ZodType<Prisma.meetingsCreateNestedManyWithoutCategoriesInput> = z.object({
  create: z.union([ z.lazy(() => meetingsCreateWithoutCategoriesInputSchema),z.lazy(() => meetingsCreateWithoutCategoriesInputSchema).array(),z.lazy(() => meetingsUncheckedCreateWithoutCategoriesInputSchema),z.lazy(() => meetingsUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => meetingsCreateOrConnectWithoutCategoriesInputSchema),z.lazy(() => meetingsCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => meetingsCreateManyCategoriesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.meetingsCreateNestedManyWithoutCategoriesInput>;

export const groupsUncheckedCreateNestedManyWithoutCategoriesInputSchema: z.ZodType<Prisma.groupsUncheckedCreateNestedManyWithoutCategoriesInput> = z.object({
  create: z.union([ z.lazy(() => groupsCreateWithoutCategoriesInputSchema),z.lazy(() => groupsCreateWithoutCategoriesInputSchema).array(),z.lazy(() => groupsUncheckedCreateWithoutCategoriesInputSchema),z.lazy(() => groupsUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => groupsCreateOrConnectWithoutCategoriesInputSchema),z.lazy(() => groupsCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => groupsCreateManyCategoriesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => groupsWhereUniqueInputSchema),z.lazy(() => groupsWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.groupsUncheckedCreateNestedManyWithoutCategoriesInput>;

export const meetingsUncheckedCreateNestedManyWithoutCategoriesInputSchema: z.ZodType<Prisma.meetingsUncheckedCreateNestedManyWithoutCategoriesInput> = z.object({
  create: z.union([ z.lazy(() => meetingsCreateWithoutCategoriesInputSchema),z.lazy(() => meetingsCreateWithoutCategoriesInputSchema).array(),z.lazy(() => meetingsUncheckedCreateWithoutCategoriesInputSchema),z.lazy(() => meetingsUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => meetingsCreateOrConnectWithoutCategoriesInputSchema),z.lazy(() => meetingsCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => meetingsCreateManyCategoriesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.meetingsUncheckedCreateNestedManyWithoutCategoriesInput>;

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict() as z.ZodType<Prisma.StringFieldUpdateOperationsInput>;

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput>;

export const groupsUpdateManyWithoutCategoriesNestedInputSchema: z.ZodType<Prisma.groupsUpdateManyWithoutCategoriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => groupsCreateWithoutCategoriesInputSchema),z.lazy(() => groupsCreateWithoutCategoriesInputSchema).array(),z.lazy(() => groupsUncheckedCreateWithoutCategoriesInputSchema),z.lazy(() => groupsUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => groupsCreateOrConnectWithoutCategoriesInputSchema),z.lazy(() => groupsCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => groupsUpsertWithWhereUniqueWithoutCategoriesInputSchema),z.lazy(() => groupsUpsertWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => groupsCreateManyCategoriesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => groupsWhereUniqueInputSchema),z.lazy(() => groupsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => groupsWhereUniqueInputSchema),z.lazy(() => groupsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => groupsWhereUniqueInputSchema),z.lazy(() => groupsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => groupsWhereUniqueInputSchema),z.lazy(() => groupsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => groupsUpdateWithWhereUniqueWithoutCategoriesInputSchema),z.lazy(() => groupsUpdateWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => groupsUpdateManyWithWhereWithoutCategoriesInputSchema),z.lazy(() => groupsUpdateManyWithWhereWithoutCategoriesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => groupsScalarWhereInputSchema),z.lazy(() => groupsScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.groupsUpdateManyWithoutCategoriesNestedInput>;

export const meetingsUpdateManyWithoutCategoriesNestedInputSchema: z.ZodType<Prisma.meetingsUpdateManyWithoutCategoriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => meetingsCreateWithoutCategoriesInputSchema),z.lazy(() => meetingsCreateWithoutCategoriesInputSchema).array(),z.lazy(() => meetingsUncheckedCreateWithoutCategoriesInputSchema),z.lazy(() => meetingsUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => meetingsCreateOrConnectWithoutCategoriesInputSchema),z.lazy(() => meetingsCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => meetingsUpsertWithWhereUniqueWithoutCategoriesInputSchema),z.lazy(() => meetingsUpsertWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => meetingsCreateManyCategoriesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => meetingsUpdateWithWhereUniqueWithoutCategoriesInputSchema),z.lazy(() => meetingsUpdateWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => meetingsUpdateManyWithWhereWithoutCategoriesInputSchema),z.lazy(() => meetingsUpdateManyWithWhereWithoutCategoriesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => meetingsScalarWhereInputSchema),z.lazy(() => meetingsScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.meetingsUpdateManyWithoutCategoriesNestedInput>;

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict() as z.ZodType<Prisma.IntFieldUpdateOperationsInput>;

export const groupsUncheckedUpdateManyWithoutCategoriesNestedInputSchema: z.ZodType<Prisma.groupsUncheckedUpdateManyWithoutCategoriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => groupsCreateWithoutCategoriesInputSchema),z.lazy(() => groupsCreateWithoutCategoriesInputSchema).array(),z.lazy(() => groupsUncheckedCreateWithoutCategoriesInputSchema),z.lazy(() => groupsUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => groupsCreateOrConnectWithoutCategoriesInputSchema),z.lazy(() => groupsCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => groupsUpsertWithWhereUniqueWithoutCategoriesInputSchema),z.lazy(() => groupsUpsertWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => groupsCreateManyCategoriesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => groupsWhereUniqueInputSchema),z.lazy(() => groupsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => groupsWhereUniqueInputSchema),z.lazy(() => groupsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => groupsWhereUniqueInputSchema),z.lazy(() => groupsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => groupsWhereUniqueInputSchema),z.lazy(() => groupsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => groupsUpdateWithWhereUniqueWithoutCategoriesInputSchema),z.lazy(() => groupsUpdateWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => groupsUpdateManyWithWhereWithoutCategoriesInputSchema),z.lazy(() => groupsUpdateManyWithWhereWithoutCategoriesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => groupsScalarWhereInputSchema),z.lazy(() => groupsScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.groupsUncheckedUpdateManyWithoutCategoriesNestedInput>;

export const meetingsUncheckedUpdateManyWithoutCategoriesNestedInputSchema: z.ZodType<Prisma.meetingsUncheckedUpdateManyWithoutCategoriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => meetingsCreateWithoutCategoriesInputSchema),z.lazy(() => meetingsCreateWithoutCategoriesInputSchema).array(),z.lazy(() => meetingsUncheckedCreateWithoutCategoriesInputSchema),z.lazy(() => meetingsUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => meetingsCreateOrConnectWithoutCategoriesInputSchema),z.lazy(() => meetingsCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => meetingsUpsertWithWhereUniqueWithoutCategoriesInputSchema),z.lazy(() => meetingsUpsertWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => meetingsCreateManyCategoriesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => meetingsUpdateWithWhereUniqueWithoutCategoriesInputSchema),z.lazy(() => meetingsUpdateWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => meetingsUpdateManyWithWhereWithoutCategoriesInputSchema),z.lazy(() => meetingsUpdateManyWithWhereWithoutCategoriesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => meetingsScalarWhereInputSchema),z.lazy(() => meetingsScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.meetingsUncheckedUpdateManyWithoutCategoriesNestedInput>;

export const categoriesCreateNestedOneWithoutGroupsInputSchema: z.ZodType<Prisma.categoriesCreateNestedOneWithoutGroupsInput> = z.object({
  create: z.union([ z.lazy(() => categoriesCreateWithoutGroupsInputSchema),z.lazy(() => categoriesUncheckedCreateWithoutGroupsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => categoriesCreateOrConnectWithoutGroupsInputSchema).optional(),
  connect: z.lazy(() => categoriesWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.categoriesCreateNestedOneWithoutGroupsInput>;

export const meetingsCreateNestedManyWithoutGroupsInputSchema: z.ZodType<Prisma.meetingsCreateNestedManyWithoutGroupsInput> = z.object({
  create: z.union([ z.lazy(() => meetingsCreateWithoutGroupsInputSchema),z.lazy(() => meetingsCreateWithoutGroupsInputSchema).array(),z.lazy(() => meetingsUncheckedCreateWithoutGroupsInputSchema),z.lazy(() => meetingsUncheckedCreateWithoutGroupsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => meetingsCreateOrConnectWithoutGroupsInputSchema),z.lazy(() => meetingsCreateOrConnectWithoutGroupsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => meetingsCreateManyGroupsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.meetingsCreateNestedManyWithoutGroupsInput>;

export const meetingsUncheckedCreateNestedManyWithoutGroupsInputSchema: z.ZodType<Prisma.meetingsUncheckedCreateNestedManyWithoutGroupsInput> = z.object({
  create: z.union([ z.lazy(() => meetingsCreateWithoutGroupsInputSchema),z.lazy(() => meetingsCreateWithoutGroupsInputSchema).array(),z.lazy(() => meetingsUncheckedCreateWithoutGroupsInputSchema),z.lazy(() => meetingsUncheckedCreateWithoutGroupsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => meetingsCreateOrConnectWithoutGroupsInputSchema),z.lazy(() => meetingsCreateOrConnectWithoutGroupsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => meetingsCreateManyGroupsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.meetingsUncheckedCreateNestedManyWithoutGroupsInput>;

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict() as z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput>;

export const categoriesUpdateOneRequiredWithoutGroupsNestedInputSchema: z.ZodType<Prisma.categoriesUpdateOneRequiredWithoutGroupsNestedInput> = z.object({
  create: z.union([ z.lazy(() => categoriesCreateWithoutGroupsInputSchema),z.lazy(() => categoriesUncheckedCreateWithoutGroupsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => categoriesCreateOrConnectWithoutGroupsInputSchema).optional(),
  upsert: z.lazy(() => categoriesUpsertWithoutGroupsInputSchema).optional(),
  connect: z.lazy(() => categoriesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => categoriesUpdateToOneWithWhereWithoutGroupsInputSchema),z.lazy(() => categoriesUpdateWithoutGroupsInputSchema),z.lazy(() => categoriesUncheckedUpdateWithoutGroupsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.categoriesUpdateOneRequiredWithoutGroupsNestedInput>;

export const meetingsUpdateManyWithoutGroupsNestedInputSchema: z.ZodType<Prisma.meetingsUpdateManyWithoutGroupsNestedInput> = z.object({
  create: z.union([ z.lazy(() => meetingsCreateWithoutGroupsInputSchema),z.lazy(() => meetingsCreateWithoutGroupsInputSchema).array(),z.lazy(() => meetingsUncheckedCreateWithoutGroupsInputSchema),z.lazy(() => meetingsUncheckedCreateWithoutGroupsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => meetingsCreateOrConnectWithoutGroupsInputSchema),z.lazy(() => meetingsCreateOrConnectWithoutGroupsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => meetingsUpsertWithWhereUniqueWithoutGroupsInputSchema),z.lazy(() => meetingsUpsertWithWhereUniqueWithoutGroupsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => meetingsCreateManyGroupsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => meetingsUpdateWithWhereUniqueWithoutGroupsInputSchema),z.lazy(() => meetingsUpdateWithWhereUniqueWithoutGroupsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => meetingsUpdateManyWithWhereWithoutGroupsInputSchema),z.lazy(() => meetingsUpdateManyWithWhereWithoutGroupsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => meetingsScalarWhereInputSchema),z.lazy(() => meetingsScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.meetingsUpdateManyWithoutGroupsNestedInput>;

export const meetingsUncheckedUpdateManyWithoutGroupsNestedInputSchema: z.ZodType<Prisma.meetingsUncheckedUpdateManyWithoutGroupsNestedInput> = z.object({
  create: z.union([ z.lazy(() => meetingsCreateWithoutGroupsInputSchema),z.lazy(() => meetingsCreateWithoutGroupsInputSchema).array(),z.lazy(() => meetingsUncheckedCreateWithoutGroupsInputSchema),z.lazy(() => meetingsUncheckedCreateWithoutGroupsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => meetingsCreateOrConnectWithoutGroupsInputSchema),z.lazy(() => meetingsCreateOrConnectWithoutGroupsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => meetingsUpsertWithWhereUniqueWithoutGroupsInputSchema),z.lazy(() => meetingsUpsertWithWhereUniqueWithoutGroupsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => meetingsCreateManyGroupsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => meetingsUpdateWithWhereUniqueWithoutGroupsInputSchema),z.lazy(() => meetingsUpdateWithWhereUniqueWithoutGroupsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => meetingsUpdateManyWithWhereWithoutGroupsInputSchema),z.lazy(() => meetingsUpdateManyWithWhereWithoutGroupsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => meetingsScalarWhereInputSchema),z.lazy(() => meetingsScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.meetingsUncheckedUpdateManyWithoutGroupsNestedInput>;

export const categoriesCreateNestedOneWithoutMeetingsInputSchema: z.ZodType<Prisma.categoriesCreateNestedOneWithoutMeetingsInput> = z.object({
  create: z.union([ z.lazy(() => categoriesCreateWithoutMeetingsInputSchema),z.lazy(() => categoriesUncheckedCreateWithoutMeetingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => categoriesCreateOrConnectWithoutMeetingsInputSchema).optional(),
  connect: z.lazy(() => categoriesWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.categoriesCreateNestedOneWithoutMeetingsInput>;

export const groupsCreateNestedOneWithoutMeetingsInputSchema: z.ZodType<Prisma.groupsCreateNestedOneWithoutMeetingsInput> = z.object({
  create: z.union([ z.lazy(() => groupsCreateWithoutMeetingsInputSchema),z.lazy(() => groupsUncheckedCreateWithoutMeetingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => groupsCreateOrConnectWithoutMeetingsInputSchema).optional(),
  connect: z.lazy(() => groupsWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.groupsCreateNestedOneWithoutMeetingsInput>;

export const usersCreateNestedOneWithoutMeetingsInputSchema: z.ZodType<Prisma.usersCreateNestedOneWithoutMeetingsInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutMeetingsInputSchema),z.lazy(() => usersUncheckedCreateWithoutMeetingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutMeetingsInputSchema).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.usersCreateNestedOneWithoutMeetingsInput>;

export const rsvpsCreateNestedManyWithoutMeetingsInputSchema: z.ZodType<Prisma.rsvpsCreateNestedManyWithoutMeetingsInput> = z.object({
  create: z.union([ z.lazy(() => rsvpsCreateWithoutMeetingsInputSchema),z.lazy(() => rsvpsCreateWithoutMeetingsInputSchema).array(),z.lazy(() => rsvpsUncheckedCreateWithoutMeetingsInputSchema),z.lazy(() => rsvpsUncheckedCreateWithoutMeetingsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => rsvpsCreateOrConnectWithoutMeetingsInputSchema),z.lazy(() => rsvpsCreateOrConnectWithoutMeetingsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => rsvpsCreateManyMeetingsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => rsvpsWhereUniqueInputSchema),z.lazy(() => rsvpsWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.rsvpsCreateNestedManyWithoutMeetingsInput>;

export const rsvpsUncheckedCreateNestedManyWithoutMeetingsInputSchema: z.ZodType<Prisma.rsvpsUncheckedCreateNestedManyWithoutMeetingsInput> = z.object({
  create: z.union([ z.lazy(() => rsvpsCreateWithoutMeetingsInputSchema),z.lazy(() => rsvpsCreateWithoutMeetingsInputSchema).array(),z.lazy(() => rsvpsUncheckedCreateWithoutMeetingsInputSchema),z.lazy(() => rsvpsUncheckedCreateWithoutMeetingsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => rsvpsCreateOrConnectWithoutMeetingsInputSchema),z.lazy(() => rsvpsCreateOrConnectWithoutMeetingsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => rsvpsCreateManyMeetingsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => rsvpsWhereUniqueInputSchema),z.lazy(() => rsvpsWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.rsvpsUncheckedCreateNestedManyWithoutMeetingsInput>;

export const Enummeeting_typesFieldUpdateOperationsInputSchema: z.ZodType<Prisma.Enummeeting_typesFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => meeting_typesSchema).optional()
}).strict() as z.ZodType<Prisma.Enummeeting_typesFieldUpdateOperationsInput>;

export const Enummeeting_statusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.Enummeeting_statusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => meeting_statusSchema).optional()
}).strict() as z.ZodType<Prisma.Enummeeting_statusFieldUpdateOperationsInput>;

export const categoriesUpdateOneRequiredWithoutMeetingsNestedInputSchema: z.ZodType<Prisma.categoriesUpdateOneRequiredWithoutMeetingsNestedInput> = z.object({
  create: z.union([ z.lazy(() => categoriesCreateWithoutMeetingsInputSchema),z.lazy(() => categoriesUncheckedCreateWithoutMeetingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => categoriesCreateOrConnectWithoutMeetingsInputSchema).optional(),
  upsert: z.lazy(() => categoriesUpsertWithoutMeetingsInputSchema).optional(),
  connect: z.lazy(() => categoriesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => categoriesUpdateToOneWithWhereWithoutMeetingsInputSchema),z.lazy(() => categoriesUpdateWithoutMeetingsInputSchema),z.lazy(() => categoriesUncheckedUpdateWithoutMeetingsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.categoriesUpdateOneRequiredWithoutMeetingsNestedInput>;

export const groupsUpdateOneRequiredWithoutMeetingsNestedInputSchema: z.ZodType<Prisma.groupsUpdateOneRequiredWithoutMeetingsNestedInput> = z.object({
  create: z.union([ z.lazy(() => groupsCreateWithoutMeetingsInputSchema),z.lazy(() => groupsUncheckedCreateWithoutMeetingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => groupsCreateOrConnectWithoutMeetingsInputSchema).optional(),
  upsert: z.lazy(() => groupsUpsertWithoutMeetingsInputSchema).optional(),
  connect: z.lazy(() => groupsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => groupsUpdateToOneWithWhereWithoutMeetingsInputSchema),z.lazy(() => groupsUpdateWithoutMeetingsInputSchema),z.lazy(() => groupsUncheckedUpdateWithoutMeetingsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.groupsUpdateOneRequiredWithoutMeetingsNestedInput>;

export const usersUpdateOneRequiredWithoutMeetingsNestedInputSchema: z.ZodType<Prisma.usersUpdateOneRequiredWithoutMeetingsNestedInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutMeetingsInputSchema),z.lazy(() => usersUncheckedCreateWithoutMeetingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutMeetingsInputSchema).optional(),
  upsert: z.lazy(() => usersUpsertWithoutMeetingsInputSchema).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => usersUpdateToOneWithWhereWithoutMeetingsInputSchema),z.lazy(() => usersUpdateWithoutMeetingsInputSchema),z.lazy(() => usersUncheckedUpdateWithoutMeetingsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.usersUpdateOneRequiredWithoutMeetingsNestedInput>;

export const rsvpsUpdateManyWithoutMeetingsNestedInputSchema: z.ZodType<Prisma.rsvpsUpdateManyWithoutMeetingsNestedInput> = z.object({
  create: z.union([ z.lazy(() => rsvpsCreateWithoutMeetingsInputSchema),z.lazy(() => rsvpsCreateWithoutMeetingsInputSchema).array(),z.lazy(() => rsvpsUncheckedCreateWithoutMeetingsInputSchema),z.lazy(() => rsvpsUncheckedCreateWithoutMeetingsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => rsvpsCreateOrConnectWithoutMeetingsInputSchema),z.lazy(() => rsvpsCreateOrConnectWithoutMeetingsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => rsvpsUpsertWithWhereUniqueWithoutMeetingsInputSchema),z.lazy(() => rsvpsUpsertWithWhereUniqueWithoutMeetingsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => rsvpsCreateManyMeetingsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => rsvpsWhereUniqueInputSchema),z.lazy(() => rsvpsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => rsvpsWhereUniqueInputSchema),z.lazy(() => rsvpsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => rsvpsWhereUniqueInputSchema),z.lazy(() => rsvpsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => rsvpsWhereUniqueInputSchema),z.lazy(() => rsvpsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => rsvpsUpdateWithWhereUniqueWithoutMeetingsInputSchema),z.lazy(() => rsvpsUpdateWithWhereUniqueWithoutMeetingsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => rsvpsUpdateManyWithWhereWithoutMeetingsInputSchema),z.lazy(() => rsvpsUpdateManyWithWhereWithoutMeetingsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => rsvpsScalarWhereInputSchema),z.lazy(() => rsvpsScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.rsvpsUpdateManyWithoutMeetingsNestedInput>;

export const rsvpsUncheckedUpdateManyWithoutMeetingsNestedInputSchema: z.ZodType<Prisma.rsvpsUncheckedUpdateManyWithoutMeetingsNestedInput> = z.object({
  create: z.union([ z.lazy(() => rsvpsCreateWithoutMeetingsInputSchema),z.lazy(() => rsvpsCreateWithoutMeetingsInputSchema).array(),z.lazy(() => rsvpsUncheckedCreateWithoutMeetingsInputSchema),z.lazy(() => rsvpsUncheckedCreateWithoutMeetingsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => rsvpsCreateOrConnectWithoutMeetingsInputSchema),z.lazy(() => rsvpsCreateOrConnectWithoutMeetingsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => rsvpsUpsertWithWhereUniqueWithoutMeetingsInputSchema),z.lazy(() => rsvpsUpsertWithWhereUniqueWithoutMeetingsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => rsvpsCreateManyMeetingsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => rsvpsWhereUniqueInputSchema),z.lazy(() => rsvpsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => rsvpsWhereUniqueInputSchema),z.lazy(() => rsvpsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => rsvpsWhereUniqueInputSchema),z.lazy(() => rsvpsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => rsvpsWhereUniqueInputSchema),z.lazy(() => rsvpsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => rsvpsUpdateWithWhereUniqueWithoutMeetingsInputSchema),z.lazy(() => rsvpsUpdateWithWhereUniqueWithoutMeetingsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => rsvpsUpdateManyWithWhereWithoutMeetingsInputSchema),z.lazy(() => rsvpsUpdateManyWithWhereWithoutMeetingsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => rsvpsScalarWhereInputSchema),z.lazy(() => rsvpsScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.rsvpsUncheckedUpdateManyWithoutMeetingsNestedInput>;

export const meetingsCreateNestedOneWithoutRsvpsInputSchema: z.ZodType<Prisma.meetingsCreateNestedOneWithoutRsvpsInput> = z.object({
  create: z.union([ z.lazy(() => meetingsCreateWithoutRsvpsInputSchema),z.lazy(() => meetingsUncheckedCreateWithoutRsvpsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => meetingsCreateOrConnectWithoutRsvpsInputSchema).optional(),
  connect: z.lazy(() => meetingsWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.meetingsCreateNestedOneWithoutRsvpsInput>;

export const usersCreateNestedOneWithoutRsvpsInputSchema: z.ZodType<Prisma.usersCreateNestedOneWithoutRsvpsInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutRsvpsInputSchema),z.lazy(() => usersUncheckedCreateWithoutRsvpsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutRsvpsInputSchema).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.usersCreateNestedOneWithoutRsvpsInput>;

export const Enumrsvp_statusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.Enumrsvp_statusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => rsvp_statusSchema).optional()
}).strict() as z.ZodType<Prisma.Enumrsvp_statusFieldUpdateOperationsInput>;

export const Enumrsvp_typeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.Enumrsvp_typeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => rsvp_typeSchema).optional()
}).strict() as z.ZodType<Prisma.Enumrsvp_typeFieldUpdateOperationsInput>;

export const meetingsUpdateOneRequiredWithoutRsvpsNestedInputSchema: z.ZodType<Prisma.meetingsUpdateOneRequiredWithoutRsvpsNestedInput> = z.object({
  create: z.union([ z.lazy(() => meetingsCreateWithoutRsvpsInputSchema),z.lazy(() => meetingsUncheckedCreateWithoutRsvpsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => meetingsCreateOrConnectWithoutRsvpsInputSchema).optional(),
  upsert: z.lazy(() => meetingsUpsertWithoutRsvpsInputSchema).optional(),
  connect: z.lazy(() => meetingsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => meetingsUpdateToOneWithWhereWithoutRsvpsInputSchema),z.lazy(() => meetingsUpdateWithoutRsvpsInputSchema),z.lazy(() => meetingsUncheckedUpdateWithoutRsvpsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.meetingsUpdateOneRequiredWithoutRsvpsNestedInput>;

export const usersUpdateOneRequiredWithoutRsvpsNestedInputSchema: z.ZodType<Prisma.usersUpdateOneRequiredWithoutRsvpsNestedInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutRsvpsInputSchema),z.lazy(() => usersUncheckedCreateWithoutRsvpsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutRsvpsInputSchema).optional(),
  upsert: z.lazy(() => usersUpsertWithoutRsvpsInputSchema).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => usersUpdateToOneWithWhereWithoutRsvpsInputSchema),z.lazy(() => usersUpdateWithoutRsvpsInputSchema),z.lazy(() => usersUncheckedUpdateWithoutRsvpsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.usersUpdateOneRequiredWithoutRsvpsNestedInput>;

export const meetingsCreateNestedManyWithoutUsersInputSchema: z.ZodType<Prisma.meetingsCreateNestedManyWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => meetingsCreateWithoutUsersInputSchema),z.lazy(() => meetingsCreateWithoutUsersInputSchema).array(),z.lazy(() => meetingsUncheckedCreateWithoutUsersInputSchema),z.lazy(() => meetingsUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => meetingsCreateOrConnectWithoutUsersInputSchema),z.lazy(() => meetingsCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => meetingsCreateManyUsersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.meetingsCreateNestedManyWithoutUsersInput>;

export const rsvpsCreateNestedManyWithoutUsersInputSchema: z.ZodType<Prisma.rsvpsCreateNestedManyWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => rsvpsCreateWithoutUsersInputSchema),z.lazy(() => rsvpsCreateWithoutUsersInputSchema).array(),z.lazy(() => rsvpsUncheckedCreateWithoutUsersInputSchema),z.lazy(() => rsvpsUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => rsvpsCreateOrConnectWithoutUsersInputSchema),z.lazy(() => rsvpsCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => rsvpsCreateManyUsersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => rsvpsWhereUniqueInputSchema),z.lazy(() => rsvpsWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.rsvpsCreateNestedManyWithoutUsersInput>;

export const meetingsUncheckedCreateNestedManyWithoutUsersInputSchema: z.ZodType<Prisma.meetingsUncheckedCreateNestedManyWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => meetingsCreateWithoutUsersInputSchema),z.lazy(() => meetingsCreateWithoutUsersInputSchema).array(),z.lazy(() => meetingsUncheckedCreateWithoutUsersInputSchema),z.lazy(() => meetingsUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => meetingsCreateOrConnectWithoutUsersInputSchema),z.lazy(() => meetingsCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => meetingsCreateManyUsersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.meetingsUncheckedCreateNestedManyWithoutUsersInput>;

export const rsvpsUncheckedCreateNestedManyWithoutUsersInputSchema: z.ZodType<Prisma.rsvpsUncheckedCreateNestedManyWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => rsvpsCreateWithoutUsersInputSchema),z.lazy(() => rsvpsCreateWithoutUsersInputSchema).array(),z.lazy(() => rsvpsUncheckedCreateWithoutUsersInputSchema),z.lazy(() => rsvpsUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => rsvpsCreateOrConnectWithoutUsersInputSchema),z.lazy(() => rsvpsCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => rsvpsCreateManyUsersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => rsvpsWhereUniqueInputSchema),z.lazy(() => rsvpsWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.rsvpsUncheckedCreateNestedManyWithoutUsersInput>;

export const meetingsUpdateManyWithoutUsersNestedInputSchema: z.ZodType<Prisma.meetingsUpdateManyWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => meetingsCreateWithoutUsersInputSchema),z.lazy(() => meetingsCreateWithoutUsersInputSchema).array(),z.lazy(() => meetingsUncheckedCreateWithoutUsersInputSchema),z.lazy(() => meetingsUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => meetingsCreateOrConnectWithoutUsersInputSchema),z.lazy(() => meetingsCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => meetingsUpsertWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => meetingsUpsertWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => meetingsCreateManyUsersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => meetingsUpdateWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => meetingsUpdateWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => meetingsUpdateManyWithWhereWithoutUsersInputSchema),z.lazy(() => meetingsUpdateManyWithWhereWithoutUsersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => meetingsScalarWhereInputSchema),z.lazy(() => meetingsScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.meetingsUpdateManyWithoutUsersNestedInput>;

export const rsvpsUpdateManyWithoutUsersNestedInputSchema: z.ZodType<Prisma.rsvpsUpdateManyWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => rsvpsCreateWithoutUsersInputSchema),z.lazy(() => rsvpsCreateWithoutUsersInputSchema).array(),z.lazy(() => rsvpsUncheckedCreateWithoutUsersInputSchema),z.lazy(() => rsvpsUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => rsvpsCreateOrConnectWithoutUsersInputSchema),z.lazy(() => rsvpsCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => rsvpsUpsertWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => rsvpsUpsertWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => rsvpsCreateManyUsersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => rsvpsWhereUniqueInputSchema),z.lazy(() => rsvpsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => rsvpsWhereUniqueInputSchema),z.lazy(() => rsvpsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => rsvpsWhereUniqueInputSchema),z.lazy(() => rsvpsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => rsvpsWhereUniqueInputSchema),z.lazy(() => rsvpsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => rsvpsUpdateWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => rsvpsUpdateWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => rsvpsUpdateManyWithWhereWithoutUsersInputSchema),z.lazy(() => rsvpsUpdateManyWithWhereWithoutUsersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => rsvpsScalarWhereInputSchema),z.lazy(() => rsvpsScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.rsvpsUpdateManyWithoutUsersNestedInput>;

export const meetingsUncheckedUpdateManyWithoutUsersNestedInputSchema: z.ZodType<Prisma.meetingsUncheckedUpdateManyWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => meetingsCreateWithoutUsersInputSchema),z.lazy(() => meetingsCreateWithoutUsersInputSchema).array(),z.lazy(() => meetingsUncheckedCreateWithoutUsersInputSchema),z.lazy(() => meetingsUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => meetingsCreateOrConnectWithoutUsersInputSchema),z.lazy(() => meetingsCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => meetingsUpsertWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => meetingsUpsertWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => meetingsCreateManyUsersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => meetingsWhereUniqueInputSchema),z.lazy(() => meetingsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => meetingsUpdateWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => meetingsUpdateWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => meetingsUpdateManyWithWhereWithoutUsersInputSchema),z.lazy(() => meetingsUpdateManyWithWhereWithoutUsersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => meetingsScalarWhereInputSchema),z.lazy(() => meetingsScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.meetingsUncheckedUpdateManyWithoutUsersNestedInput>;

export const rsvpsUncheckedUpdateManyWithoutUsersNestedInputSchema: z.ZodType<Prisma.rsvpsUncheckedUpdateManyWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => rsvpsCreateWithoutUsersInputSchema),z.lazy(() => rsvpsCreateWithoutUsersInputSchema).array(),z.lazy(() => rsvpsUncheckedCreateWithoutUsersInputSchema),z.lazy(() => rsvpsUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => rsvpsCreateOrConnectWithoutUsersInputSchema),z.lazy(() => rsvpsCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => rsvpsUpsertWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => rsvpsUpsertWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => rsvpsCreateManyUsersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => rsvpsWhereUniqueInputSchema),z.lazy(() => rsvpsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => rsvpsWhereUniqueInputSchema),z.lazy(() => rsvpsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => rsvpsWhereUniqueInputSchema),z.lazy(() => rsvpsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => rsvpsWhereUniqueInputSchema),z.lazy(() => rsvpsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => rsvpsUpdateWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => rsvpsUpdateWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => rsvpsUpdateManyWithWhereWithoutUsersInputSchema),z.lazy(() => rsvpsUpdateManyWithWhereWithoutUsersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => rsvpsScalarWhereInputSchema),z.lazy(() => rsvpsScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.rsvpsUncheckedUpdateManyWithoutUsersNestedInput>;

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedIntFilter>;

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedStringFilter>;

export const NestedUuidFilterSchema: z.ZodType<Prisma.NestedUuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedUuidFilter>;

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedDateTimeFilter>;

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedIntWithAggregatesFilter>;

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedFloatFilter>;

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedStringWithAggregatesFilter>;

export const NestedUuidWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedUuidWithAggregatesFilter>;

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter>;

export const NestedUuidNullableFilterSchema: z.ZodType<Prisma.NestedUuidNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.NestedUuidNullableFilter>;

export const NestedUuidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedUuidNullableWithAggregatesFilter>;

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.NestedIntNullableFilter>;

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.NestedStringNullableFilter>;

export const NestedEnummeeting_typesFilterSchema: z.ZodType<Prisma.NestedEnummeeting_typesFilter> = z.object({
  equals: z.lazy(() => meeting_typesSchema).optional(),
  in: z.lazy(() => meeting_typesSchema).array().optional(),
  notIn: z.lazy(() => meeting_typesSchema).array().optional(),
  not: z.union([ z.lazy(() => meeting_typesSchema),z.lazy(() => NestedEnummeeting_typesFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedEnummeeting_typesFilter>;

export const NestedEnummeeting_statusFilterSchema: z.ZodType<Prisma.NestedEnummeeting_statusFilter> = z.object({
  equals: z.lazy(() => meeting_statusSchema).optional(),
  in: z.lazy(() => meeting_statusSchema).array().optional(),
  notIn: z.lazy(() => meeting_statusSchema).array().optional(),
  not: z.union([ z.lazy(() => meeting_statusSchema),z.lazy(() => NestedEnummeeting_statusFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedEnummeeting_statusFilter>;

export const NestedEnummeeting_typesWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnummeeting_typesWithAggregatesFilter> = z.object({
  equals: z.lazy(() => meeting_typesSchema).optional(),
  in: z.lazy(() => meeting_typesSchema).array().optional(),
  notIn: z.lazy(() => meeting_typesSchema).array().optional(),
  not: z.union([ z.lazy(() => meeting_typesSchema),z.lazy(() => NestedEnummeeting_typesWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnummeeting_typesFilterSchema).optional(),
  _max: z.lazy(() => NestedEnummeeting_typesFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedEnummeeting_typesWithAggregatesFilter>;

export const NestedEnummeeting_statusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnummeeting_statusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => meeting_statusSchema).optional(),
  in: z.lazy(() => meeting_statusSchema).array().optional(),
  notIn: z.lazy(() => meeting_statusSchema).array().optional(),
  not: z.union([ z.lazy(() => meeting_statusSchema),z.lazy(() => NestedEnummeeting_statusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnummeeting_statusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnummeeting_statusFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedEnummeeting_statusWithAggregatesFilter>;

export const NestedEnumrsvp_statusFilterSchema: z.ZodType<Prisma.NestedEnumrsvp_statusFilter> = z.object({
  equals: z.lazy(() => rsvp_statusSchema).optional(),
  in: z.lazy(() => rsvp_statusSchema).array().optional(),
  notIn: z.lazy(() => rsvp_statusSchema).array().optional(),
  not: z.union([ z.lazy(() => rsvp_statusSchema),z.lazy(() => NestedEnumrsvp_statusFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedEnumrsvp_statusFilter>;

export const NestedEnumrsvp_typeFilterSchema: z.ZodType<Prisma.NestedEnumrsvp_typeFilter> = z.object({
  equals: z.lazy(() => rsvp_typeSchema).optional(),
  in: z.lazy(() => rsvp_typeSchema).array().optional(),
  notIn: z.lazy(() => rsvp_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => rsvp_typeSchema),z.lazy(() => NestedEnumrsvp_typeFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedEnumrsvp_typeFilter>;

export const NestedEnumrsvp_statusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumrsvp_statusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => rsvp_statusSchema).optional(),
  in: z.lazy(() => rsvp_statusSchema).array().optional(),
  notIn: z.lazy(() => rsvp_statusSchema).array().optional(),
  not: z.union([ z.lazy(() => rsvp_statusSchema),z.lazy(() => NestedEnumrsvp_statusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumrsvp_statusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumrsvp_statusFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedEnumrsvp_statusWithAggregatesFilter>;

export const NestedEnumrsvp_typeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumrsvp_typeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => rsvp_typeSchema).optional(),
  in: z.lazy(() => rsvp_typeSchema).array().optional(),
  notIn: z.lazy(() => rsvp_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => rsvp_typeSchema),z.lazy(() => NestedEnumrsvp_typeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumrsvp_typeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumrsvp_typeFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedEnumrsvp_typeWithAggregatesFilter>;

export const groupsCreateWithoutCategoriesInputSchema: z.ZodType<Prisma.groupsCreateWithoutCategoriesInput> = z.object({
  description: z.string().optional(),
  memberName: z.string().optional(),
  modName: z.string().optional(),
  privacyType: z.string().optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  uuid: z.string().optional().nullable(),
  name: z.string().optional(),
  meetings: z.lazy(() => meetingsCreateNestedManyWithoutGroupsInputSchema).optional()
}).strict() as z.ZodType<Prisma.groupsCreateWithoutCategoriesInput>;

export const groupsUncheckedCreateWithoutCategoriesInputSchema: z.ZodType<Prisma.groupsUncheckedCreateWithoutCategoriesInput> = z.object({
  id: z.number().int().optional(),
  description: z.string().optional(),
  memberName: z.string().optional(),
  modName: z.string().optional(),
  privacyType: z.string().optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  uuid: z.string().optional().nullable(),
  name: z.string().optional(),
  meetings: z.lazy(() => meetingsUncheckedCreateNestedManyWithoutGroupsInputSchema).optional()
}).strict() as z.ZodType<Prisma.groupsUncheckedCreateWithoutCategoriesInput>;

export const groupsCreateOrConnectWithoutCategoriesInputSchema: z.ZodType<Prisma.groupsCreateOrConnectWithoutCategoriesInput> = z.object({
  where: z.lazy(() => groupsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => groupsCreateWithoutCategoriesInputSchema),z.lazy(() => groupsUncheckedCreateWithoutCategoriesInputSchema) ]),
}).strict() as z.ZodType<Prisma.groupsCreateOrConnectWithoutCategoriesInput>;

export const groupsCreateManyCategoriesInputEnvelopeSchema: z.ZodType<Prisma.groupsCreateManyCategoriesInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => groupsCreateManyCategoriesInputSchema),z.lazy(() => groupsCreateManyCategoriesInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.groupsCreateManyCategoriesInputEnvelope>;

export const meetingsCreateWithoutCategoriesInputSchema: z.ZodType<Prisma.meetingsCreateWithoutCategoriesInput> = z.object({
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  description: z.string().optional(),
  title: z.string().optional(),
  type: z.lazy(() => meeting_typesSchema).optional(),
  location: z.string().optional(),
  locationLink: z.string().optional(),
  status: z.lazy(() => meeting_statusSchema).optional(),
  slug: z.string().optional(),
  datetime: z.coerce.date(),
  duration: z.number().int(),
  uuid: z.string(),
  groups: z.lazy(() => groupsCreateNestedOneWithoutMeetingsInputSchema),
  users: z.lazy(() => usersCreateNestedOneWithoutMeetingsInputSchema),
  rsvps: z.lazy(() => rsvpsCreateNestedManyWithoutMeetingsInputSchema).optional()
}).strict() as z.ZodType<Prisma.meetingsCreateWithoutCategoriesInput>;

export const meetingsUncheckedCreateWithoutCategoriesInputSchema: z.ZodType<Prisma.meetingsUncheckedCreateWithoutCategoriesInput> = z.object({
  id: z.number().int().optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  description: z.string().optional(),
  title: z.string().optional(),
  group: z.string(),
  type: z.lazy(() => meeting_typesSchema).optional(),
  location: z.string().optional(),
  locationLink: z.string().optional(),
  status: z.lazy(() => meeting_statusSchema).optional(),
  slug: z.string().optional(),
  datetime: z.coerce.date(),
  host: z.string(),
  duration: z.number().int(),
  uuid: z.string(),
  rsvps: z.lazy(() => rsvpsUncheckedCreateNestedManyWithoutMeetingsInputSchema).optional()
}).strict() as z.ZodType<Prisma.meetingsUncheckedCreateWithoutCategoriesInput>;

export const meetingsCreateOrConnectWithoutCategoriesInputSchema: z.ZodType<Prisma.meetingsCreateOrConnectWithoutCategoriesInput> = z.object({
  where: z.lazy(() => meetingsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => meetingsCreateWithoutCategoriesInputSchema),z.lazy(() => meetingsUncheckedCreateWithoutCategoriesInputSchema) ]),
}).strict() as z.ZodType<Prisma.meetingsCreateOrConnectWithoutCategoriesInput>;

export const meetingsCreateManyCategoriesInputEnvelopeSchema: z.ZodType<Prisma.meetingsCreateManyCategoriesInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => meetingsCreateManyCategoriesInputSchema),z.lazy(() => meetingsCreateManyCategoriesInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.meetingsCreateManyCategoriesInputEnvelope>;

export const groupsUpsertWithWhereUniqueWithoutCategoriesInputSchema: z.ZodType<Prisma.groupsUpsertWithWhereUniqueWithoutCategoriesInput> = z.object({
  where: z.lazy(() => groupsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => groupsUpdateWithoutCategoriesInputSchema),z.lazy(() => groupsUncheckedUpdateWithoutCategoriesInputSchema) ]),
  create: z.union([ z.lazy(() => groupsCreateWithoutCategoriesInputSchema),z.lazy(() => groupsUncheckedCreateWithoutCategoriesInputSchema) ]),
}).strict() as z.ZodType<Prisma.groupsUpsertWithWhereUniqueWithoutCategoriesInput>;

export const groupsUpdateWithWhereUniqueWithoutCategoriesInputSchema: z.ZodType<Prisma.groupsUpdateWithWhereUniqueWithoutCategoriesInput> = z.object({
  where: z.lazy(() => groupsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => groupsUpdateWithoutCategoriesInputSchema),z.lazy(() => groupsUncheckedUpdateWithoutCategoriesInputSchema) ]),
}).strict() as z.ZodType<Prisma.groupsUpdateWithWhereUniqueWithoutCategoriesInput>;

export const groupsUpdateManyWithWhereWithoutCategoriesInputSchema: z.ZodType<Prisma.groupsUpdateManyWithWhereWithoutCategoriesInput> = z.object({
  where: z.lazy(() => groupsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => groupsUpdateManyMutationInputSchema),z.lazy(() => groupsUncheckedUpdateManyWithoutCategoriesInputSchema) ]),
}).strict() as z.ZodType<Prisma.groupsUpdateManyWithWhereWithoutCategoriesInput>;

export const groupsScalarWhereInputSchema: z.ZodType<Prisma.groupsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => groupsScalarWhereInputSchema),z.lazy(() => groupsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => groupsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => groupsScalarWhereInputSchema),z.lazy(() => groupsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  category: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  memberName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  modName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  privacyType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  uuid: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict() as z.ZodType<Prisma.groupsScalarWhereInput>;

export const meetingsUpsertWithWhereUniqueWithoutCategoriesInputSchema: z.ZodType<Prisma.meetingsUpsertWithWhereUniqueWithoutCategoriesInput> = z.object({
  where: z.lazy(() => meetingsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => meetingsUpdateWithoutCategoriesInputSchema),z.lazy(() => meetingsUncheckedUpdateWithoutCategoriesInputSchema) ]),
  create: z.union([ z.lazy(() => meetingsCreateWithoutCategoriesInputSchema),z.lazy(() => meetingsUncheckedCreateWithoutCategoriesInputSchema) ]),
}).strict() as z.ZodType<Prisma.meetingsUpsertWithWhereUniqueWithoutCategoriesInput>;

export const meetingsUpdateWithWhereUniqueWithoutCategoriesInputSchema: z.ZodType<Prisma.meetingsUpdateWithWhereUniqueWithoutCategoriesInput> = z.object({
  where: z.lazy(() => meetingsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => meetingsUpdateWithoutCategoriesInputSchema),z.lazy(() => meetingsUncheckedUpdateWithoutCategoriesInputSchema) ]),
}).strict() as z.ZodType<Prisma.meetingsUpdateWithWhereUniqueWithoutCategoriesInput>;

export const meetingsUpdateManyWithWhereWithoutCategoriesInputSchema: z.ZodType<Prisma.meetingsUpdateManyWithWhereWithoutCategoriesInput> = z.object({
  where: z.lazy(() => meetingsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => meetingsUpdateManyMutationInputSchema),z.lazy(() => meetingsUncheckedUpdateManyWithoutCategoriesInputSchema) ]),
}).strict() as z.ZodType<Prisma.meetingsUpdateManyWithWhereWithoutCategoriesInput>;

export const meetingsScalarWhereInputSchema: z.ZodType<Prisma.meetingsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => meetingsScalarWhereInputSchema),z.lazy(() => meetingsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => meetingsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => meetingsScalarWhereInputSchema),z.lazy(() => meetingsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  category: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  group: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => Enummeeting_typesFilterSchema),z.lazy(() => meeting_typesSchema) ]).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  locationLink: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => Enummeeting_statusFilterSchema),z.lazy(() => meeting_statusSchema) ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  datetime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  host: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  duration: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  uuid: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
}).strict() as z.ZodType<Prisma.meetingsScalarWhereInput>;

export const categoriesCreateWithoutGroupsInputSchema: z.ZodType<Prisma.categoriesCreateWithoutGroupsInput> = z.object({
  display: z.string().optional(),
  slug: z.string().optional(),
  uuid: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  meetings: z.lazy(() => meetingsCreateNestedManyWithoutCategoriesInputSchema).optional()
}).strict() as z.ZodType<Prisma.categoriesCreateWithoutGroupsInput>;

export const categoriesUncheckedCreateWithoutGroupsInputSchema: z.ZodType<Prisma.categoriesUncheckedCreateWithoutGroupsInput> = z.object({
  id: z.number().int().optional(),
  display: z.string().optional(),
  slug: z.string().optional(),
  uuid: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  meetings: z.lazy(() => meetingsUncheckedCreateNestedManyWithoutCategoriesInputSchema).optional()
}).strict() as z.ZodType<Prisma.categoriesUncheckedCreateWithoutGroupsInput>;

export const categoriesCreateOrConnectWithoutGroupsInputSchema: z.ZodType<Prisma.categoriesCreateOrConnectWithoutGroupsInput> = z.object({
  where: z.lazy(() => categoriesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => categoriesCreateWithoutGroupsInputSchema),z.lazy(() => categoriesUncheckedCreateWithoutGroupsInputSchema) ]),
}).strict() as z.ZodType<Prisma.categoriesCreateOrConnectWithoutGroupsInput>;

export const meetingsCreateWithoutGroupsInputSchema: z.ZodType<Prisma.meetingsCreateWithoutGroupsInput> = z.object({
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  description: z.string().optional(),
  title: z.string().optional(),
  type: z.lazy(() => meeting_typesSchema).optional(),
  location: z.string().optional(),
  locationLink: z.string().optional(),
  status: z.lazy(() => meeting_statusSchema).optional(),
  slug: z.string().optional(),
  datetime: z.coerce.date(),
  duration: z.number().int(),
  uuid: z.string(),
  categories: z.lazy(() => categoriesCreateNestedOneWithoutMeetingsInputSchema).optional(),
  users: z.lazy(() => usersCreateNestedOneWithoutMeetingsInputSchema),
  rsvps: z.lazy(() => rsvpsCreateNestedManyWithoutMeetingsInputSchema).optional()
}).strict() as z.ZodType<Prisma.meetingsCreateWithoutGroupsInput>;

export const meetingsUncheckedCreateWithoutGroupsInputSchema: z.ZodType<Prisma.meetingsUncheckedCreateWithoutGroupsInput> = z.object({
  id: z.number().int().optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  title: z.string().optional(),
  type: z.lazy(() => meeting_typesSchema).optional(),
  location: z.string().optional(),
  locationLink: z.string().optional(),
  status: z.lazy(() => meeting_statusSchema).optional(),
  slug: z.string().optional(),
  datetime: z.coerce.date(),
  host: z.string(),
  duration: z.number().int(),
  uuid: z.string(),
  rsvps: z.lazy(() => rsvpsUncheckedCreateNestedManyWithoutMeetingsInputSchema).optional()
}).strict() as z.ZodType<Prisma.meetingsUncheckedCreateWithoutGroupsInput>;

export const meetingsCreateOrConnectWithoutGroupsInputSchema: z.ZodType<Prisma.meetingsCreateOrConnectWithoutGroupsInput> = z.object({
  where: z.lazy(() => meetingsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => meetingsCreateWithoutGroupsInputSchema),z.lazy(() => meetingsUncheckedCreateWithoutGroupsInputSchema) ]),
}).strict() as z.ZodType<Prisma.meetingsCreateOrConnectWithoutGroupsInput>;

export const meetingsCreateManyGroupsInputEnvelopeSchema: z.ZodType<Prisma.meetingsCreateManyGroupsInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => meetingsCreateManyGroupsInputSchema),z.lazy(() => meetingsCreateManyGroupsInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.meetingsCreateManyGroupsInputEnvelope>;

export const categoriesUpsertWithoutGroupsInputSchema: z.ZodType<Prisma.categoriesUpsertWithoutGroupsInput> = z.object({
  update: z.union([ z.lazy(() => categoriesUpdateWithoutGroupsInputSchema),z.lazy(() => categoriesUncheckedUpdateWithoutGroupsInputSchema) ]),
  create: z.union([ z.lazy(() => categoriesCreateWithoutGroupsInputSchema),z.lazy(() => categoriesUncheckedCreateWithoutGroupsInputSchema) ]),
  where: z.lazy(() => categoriesWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.categoriesUpsertWithoutGroupsInput>;

export const categoriesUpdateToOneWithWhereWithoutGroupsInputSchema: z.ZodType<Prisma.categoriesUpdateToOneWithWhereWithoutGroupsInput> = z.object({
  where: z.lazy(() => categoriesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => categoriesUpdateWithoutGroupsInputSchema),z.lazy(() => categoriesUncheckedUpdateWithoutGroupsInputSchema) ]),
}).strict() as z.ZodType<Prisma.categoriesUpdateToOneWithWhereWithoutGroupsInput>;

export const categoriesUpdateWithoutGroupsInputSchema: z.ZodType<Prisma.categoriesUpdateWithoutGroupsInput> = z.object({
  display: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meetings: z.lazy(() => meetingsUpdateManyWithoutCategoriesNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.categoriesUpdateWithoutGroupsInput>;

export const categoriesUncheckedUpdateWithoutGroupsInputSchema: z.ZodType<Prisma.categoriesUncheckedUpdateWithoutGroupsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  display: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meetings: z.lazy(() => meetingsUncheckedUpdateManyWithoutCategoriesNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.categoriesUncheckedUpdateWithoutGroupsInput>;

export const meetingsUpsertWithWhereUniqueWithoutGroupsInputSchema: z.ZodType<Prisma.meetingsUpsertWithWhereUniqueWithoutGroupsInput> = z.object({
  where: z.lazy(() => meetingsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => meetingsUpdateWithoutGroupsInputSchema),z.lazy(() => meetingsUncheckedUpdateWithoutGroupsInputSchema) ]),
  create: z.union([ z.lazy(() => meetingsCreateWithoutGroupsInputSchema),z.lazy(() => meetingsUncheckedCreateWithoutGroupsInputSchema) ]),
}).strict() as z.ZodType<Prisma.meetingsUpsertWithWhereUniqueWithoutGroupsInput>;

export const meetingsUpdateWithWhereUniqueWithoutGroupsInputSchema: z.ZodType<Prisma.meetingsUpdateWithWhereUniqueWithoutGroupsInput> = z.object({
  where: z.lazy(() => meetingsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => meetingsUpdateWithoutGroupsInputSchema),z.lazy(() => meetingsUncheckedUpdateWithoutGroupsInputSchema) ]),
}).strict() as z.ZodType<Prisma.meetingsUpdateWithWhereUniqueWithoutGroupsInput>;

export const meetingsUpdateManyWithWhereWithoutGroupsInputSchema: z.ZodType<Prisma.meetingsUpdateManyWithWhereWithoutGroupsInput> = z.object({
  where: z.lazy(() => meetingsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => meetingsUpdateManyMutationInputSchema),z.lazy(() => meetingsUncheckedUpdateManyWithoutGroupsInputSchema) ]),
}).strict() as z.ZodType<Prisma.meetingsUpdateManyWithWhereWithoutGroupsInput>;

export const categoriesCreateWithoutMeetingsInputSchema: z.ZodType<Prisma.categoriesCreateWithoutMeetingsInput> = z.object({
  display: z.string().optional(),
  slug: z.string().optional(),
  uuid: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  groups: z.lazy(() => groupsCreateNestedManyWithoutCategoriesInputSchema).optional()
}).strict() as z.ZodType<Prisma.categoriesCreateWithoutMeetingsInput>;

export const categoriesUncheckedCreateWithoutMeetingsInputSchema: z.ZodType<Prisma.categoriesUncheckedCreateWithoutMeetingsInput> = z.object({
  id: z.number().int().optional(),
  display: z.string().optional(),
  slug: z.string().optional(),
  uuid: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  groups: z.lazy(() => groupsUncheckedCreateNestedManyWithoutCategoriesInputSchema).optional()
}).strict() as z.ZodType<Prisma.categoriesUncheckedCreateWithoutMeetingsInput>;

export const categoriesCreateOrConnectWithoutMeetingsInputSchema: z.ZodType<Prisma.categoriesCreateOrConnectWithoutMeetingsInput> = z.object({
  where: z.lazy(() => categoriesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => categoriesCreateWithoutMeetingsInputSchema),z.lazy(() => categoriesUncheckedCreateWithoutMeetingsInputSchema) ]),
}).strict() as z.ZodType<Prisma.categoriesCreateOrConnectWithoutMeetingsInput>;

export const groupsCreateWithoutMeetingsInputSchema: z.ZodType<Prisma.groupsCreateWithoutMeetingsInput> = z.object({
  description: z.string().optional(),
  memberName: z.string().optional(),
  modName: z.string().optional(),
  privacyType: z.string().optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  uuid: z.string().optional().nullable(),
  name: z.string().optional(),
  categories: z.lazy(() => categoriesCreateNestedOneWithoutGroupsInputSchema).optional()
}).strict() as z.ZodType<Prisma.groupsCreateWithoutMeetingsInput>;

export const groupsUncheckedCreateWithoutMeetingsInputSchema: z.ZodType<Prisma.groupsUncheckedCreateWithoutMeetingsInput> = z.object({
  id: z.number().int().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  memberName: z.string().optional(),
  modName: z.string().optional(),
  privacyType: z.string().optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  uuid: z.string().optional().nullable(),
  name: z.string().optional()
}).strict() as z.ZodType<Prisma.groupsUncheckedCreateWithoutMeetingsInput>;

export const groupsCreateOrConnectWithoutMeetingsInputSchema: z.ZodType<Prisma.groupsCreateOrConnectWithoutMeetingsInput> = z.object({
  where: z.lazy(() => groupsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => groupsCreateWithoutMeetingsInputSchema),z.lazy(() => groupsUncheckedCreateWithoutMeetingsInputSchema) ]),
}).strict() as z.ZodType<Prisma.groupsCreateOrConnectWithoutMeetingsInput>;

export const usersCreateWithoutMeetingsInputSchema: z.ZodType<Prisma.usersCreateWithoutMeetingsInput> = z.object({
  type: z.string().optional(),
  uuid: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  rsvps: z.lazy(() => rsvpsCreateNestedManyWithoutUsersInputSchema).optional()
}).strict() as z.ZodType<Prisma.usersCreateWithoutMeetingsInput>;

export const usersUncheckedCreateWithoutMeetingsInputSchema: z.ZodType<Prisma.usersUncheckedCreateWithoutMeetingsInput> = z.object({
  id: z.number().int().optional(),
  type: z.string().optional(),
  uuid: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  rsvps: z.lazy(() => rsvpsUncheckedCreateNestedManyWithoutUsersInputSchema).optional()
}).strict() as z.ZodType<Prisma.usersUncheckedCreateWithoutMeetingsInput>;

export const usersCreateOrConnectWithoutMeetingsInputSchema: z.ZodType<Prisma.usersCreateOrConnectWithoutMeetingsInput> = z.object({
  where: z.lazy(() => usersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => usersCreateWithoutMeetingsInputSchema),z.lazy(() => usersUncheckedCreateWithoutMeetingsInputSchema) ]),
}).strict() as z.ZodType<Prisma.usersCreateOrConnectWithoutMeetingsInput>;

export const rsvpsCreateWithoutMeetingsInputSchema: z.ZodType<Prisma.rsvpsCreateWithoutMeetingsInput> = z.object({
  uuid: z.string(),
  value: z.lazy(() => rsvp_statusSchema).optional(),
  type: z.lazy(() => rsvp_typeSchema).optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  users: z.lazy(() => usersCreateNestedOneWithoutRsvpsInputSchema)
}).strict() as z.ZodType<Prisma.rsvpsCreateWithoutMeetingsInput>;

export const rsvpsUncheckedCreateWithoutMeetingsInputSchema: z.ZodType<Prisma.rsvpsUncheckedCreateWithoutMeetingsInput> = z.object({
  id: z.number().int().optional(),
  uuid: z.string(),
  user: z.string(),
  value: z.lazy(() => rsvp_statusSchema).optional(),
  type: z.lazy(() => rsvp_typeSchema).optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.rsvpsUncheckedCreateWithoutMeetingsInput>;

export const rsvpsCreateOrConnectWithoutMeetingsInputSchema: z.ZodType<Prisma.rsvpsCreateOrConnectWithoutMeetingsInput> = z.object({
  where: z.lazy(() => rsvpsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => rsvpsCreateWithoutMeetingsInputSchema),z.lazy(() => rsvpsUncheckedCreateWithoutMeetingsInputSchema) ]),
}).strict() as z.ZodType<Prisma.rsvpsCreateOrConnectWithoutMeetingsInput>;

export const rsvpsCreateManyMeetingsInputEnvelopeSchema: z.ZodType<Prisma.rsvpsCreateManyMeetingsInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => rsvpsCreateManyMeetingsInputSchema),z.lazy(() => rsvpsCreateManyMeetingsInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.rsvpsCreateManyMeetingsInputEnvelope>;

export const categoriesUpsertWithoutMeetingsInputSchema: z.ZodType<Prisma.categoriesUpsertWithoutMeetingsInput> = z.object({
  update: z.union([ z.lazy(() => categoriesUpdateWithoutMeetingsInputSchema),z.lazy(() => categoriesUncheckedUpdateWithoutMeetingsInputSchema) ]),
  create: z.union([ z.lazy(() => categoriesCreateWithoutMeetingsInputSchema),z.lazy(() => categoriesUncheckedCreateWithoutMeetingsInputSchema) ]),
  where: z.lazy(() => categoriesWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.categoriesUpsertWithoutMeetingsInput>;

export const categoriesUpdateToOneWithWhereWithoutMeetingsInputSchema: z.ZodType<Prisma.categoriesUpdateToOneWithWhereWithoutMeetingsInput> = z.object({
  where: z.lazy(() => categoriesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => categoriesUpdateWithoutMeetingsInputSchema),z.lazy(() => categoriesUncheckedUpdateWithoutMeetingsInputSchema) ]),
}).strict() as z.ZodType<Prisma.categoriesUpdateToOneWithWhereWithoutMeetingsInput>;

export const categoriesUpdateWithoutMeetingsInputSchema: z.ZodType<Prisma.categoriesUpdateWithoutMeetingsInput> = z.object({
  display: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  groups: z.lazy(() => groupsUpdateManyWithoutCategoriesNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.categoriesUpdateWithoutMeetingsInput>;

export const categoriesUncheckedUpdateWithoutMeetingsInputSchema: z.ZodType<Prisma.categoriesUncheckedUpdateWithoutMeetingsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  display: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  groups: z.lazy(() => groupsUncheckedUpdateManyWithoutCategoriesNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.categoriesUncheckedUpdateWithoutMeetingsInput>;

export const groupsUpsertWithoutMeetingsInputSchema: z.ZodType<Prisma.groupsUpsertWithoutMeetingsInput> = z.object({
  update: z.union([ z.lazy(() => groupsUpdateWithoutMeetingsInputSchema),z.lazy(() => groupsUncheckedUpdateWithoutMeetingsInputSchema) ]),
  create: z.union([ z.lazy(() => groupsCreateWithoutMeetingsInputSchema),z.lazy(() => groupsUncheckedCreateWithoutMeetingsInputSchema) ]),
  where: z.lazy(() => groupsWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.groupsUpsertWithoutMeetingsInput>;

export const groupsUpdateToOneWithWhereWithoutMeetingsInputSchema: z.ZodType<Prisma.groupsUpdateToOneWithWhereWithoutMeetingsInput> = z.object({
  where: z.lazy(() => groupsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => groupsUpdateWithoutMeetingsInputSchema),z.lazy(() => groupsUncheckedUpdateWithoutMeetingsInputSchema) ]),
}).strict() as z.ZodType<Prisma.groupsUpdateToOneWithWhereWithoutMeetingsInput>;

export const groupsUpdateWithoutMeetingsInputSchema: z.ZodType<Prisma.groupsUpdateWithoutMeetingsInput> = z.object({
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  memberName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  privacyType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categories: z.lazy(() => categoriesUpdateOneRequiredWithoutGroupsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.groupsUpdateWithoutMeetingsInput>;

export const groupsUncheckedUpdateWithoutMeetingsInputSchema: z.ZodType<Prisma.groupsUncheckedUpdateWithoutMeetingsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  memberName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  privacyType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.groupsUncheckedUpdateWithoutMeetingsInput>;

export const usersUpsertWithoutMeetingsInputSchema: z.ZodType<Prisma.usersUpsertWithoutMeetingsInput> = z.object({
  update: z.union([ z.lazy(() => usersUpdateWithoutMeetingsInputSchema),z.lazy(() => usersUncheckedUpdateWithoutMeetingsInputSchema) ]),
  create: z.union([ z.lazy(() => usersCreateWithoutMeetingsInputSchema),z.lazy(() => usersUncheckedCreateWithoutMeetingsInputSchema) ]),
  where: z.lazy(() => usersWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.usersUpsertWithoutMeetingsInput>;

export const usersUpdateToOneWithWhereWithoutMeetingsInputSchema: z.ZodType<Prisma.usersUpdateToOneWithWhereWithoutMeetingsInput> = z.object({
  where: z.lazy(() => usersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => usersUpdateWithoutMeetingsInputSchema),z.lazy(() => usersUncheckedUpdateWithoutMeetingsInputSchema) ]),
}).strict() as z.ZodType<Prisma.usersUpdateToOneWithWhereWithoutMeetingsInput>;

export const usersUpdateWithoutMeetingsInputSchema: z.ZodType<Prisma.usersUpdateWithoutMeetingsInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rsvps: z.lazy(() => rsvpsUpdateManyWithoutUsersNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.usersUpdateWithoutMeetingsInput>;

export const usersUncheckedUpdateWithoutMeetingsInputSchema: z.ZodType<Prisma.usersUncheckedUpdateWithoutMeetingsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rsvps: z.lazy(() => rsvpsUncheckedUpdateManyWithoutUsersNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.usersUncheckedUpdateWithoutMeetingsInput>;

export const rsvpsUpsertWithWhereUniqueWithoutMeetingsInputSchema: z.ZodType<Prisma.rsvpsUpsertWithWhereUniqueWithoutMeetingsInput> = z.object({
  where: z.lazy(() => rsvpsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => rsvpsUpdateWithoutMeetingsInputSchema),z.lazy(() => rsvpsUncheckedUpdateWithoutMeetingsInputSchema) ]),
  create: z.union([ z.lazy(() => rsvpsCreateWithoutMeetingsInputSchema),z.lazy(() => rsvpsUncheckedCreateWithoutMeetingsInputSchema) ]),
}).strict() as z.ZodType<Prisma.rsvpsUpsertWithWhereUniqueWithoutMeetingsInput>;

export const rsvpsUpdateWithWhereUniqueWithoutMeetingsInputSchema: z.ZodType<Prisma.rsvpsUpdateWithWhereUniqueWithoutMeetingsInput> = z.object({
  where: z.lazy(() => rsvpsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => rsvpsUpdateWithoutMeetingsInputSchema),z.lazy(() => rsvpsUncheckedUpdateWithoutMeetingsInputSchema) ]),
}).strict() as z.ZodType<Prisma.rsvpsUpdateWithWhereUniqueWithoutMeetingsInput>;

export const rsvpsUpdateManyWithWhereWithoutMeetingsInputSchema: z.ZodType<Prisma.rsvpsUpdateManyWithWhereWithoutMeetingsInput> = z.object({
  where: z.lazy(() => rsvpsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => rsvpsUpdateManyMutationInputSchema),z.lazy(() => rsvpsUncheckedUpdateManyWithoutMeetingsInputSchema) ]),
}).strict() as z.ZodType<Prisma.rsvpsUpdateManyWithWhereWithoutMeetingsInput>;

export const rsvpsScalarWhereInputSchema: z.ZodType<Prisma.rsvpsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => rsvpsScalarWhereInputSchema),z.lazy(() => rsvpsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => rsvpsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => rsvpsScalarWhereInputSchema),z.lazy(() => rsvpsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  uuid: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  meeting: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => Enumrsvp_statusFilterSchema),z.lazy(() => rsvp_statusSchema) ]).optional(),
  type: z.union([ z.lazy(() => Enumrsvp_typeFilterSchema),z.lazy(() => rsvp_typeSchema) ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.rsvpsScalarWhereInput>;

export const meetingsCreateWithoutRsvpsInputSchema: z.ZodType<Prisma.meetingsCreateWithoutRsvpsInput> = z.object({
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  description: z.string().optional(),
  title: z.string().optional(),
  type: z.lazy(() => meeting_typesSchema).optional(),
  location: z.string().optional(),
  locationLink: z.string().optional(),
  status: z.lazy(() => meeting_statusSchema).optional(),
  slug: z.string().optional(),
  datetime: z.coerce.date(),
  duration: z.number().int(),
  uuid: z.string(),
  categories: z.lazy(() => categoriesCreateNestedOneWithoutMeetingsInputSchema).optional(),
  groups: z.lazy(() => groupsCreateNestedOneWithoutMeetingsInputSchema),
  users: z.lazy(() => usersCreateNestedOneWithoutMeetingsInputSchema)
}).strict() as z.ZodType<Prisma.meetingsCreateWithoutRsvpsInput>;

export const meetingsUncheckedCreateWithoutRsvpsInputSchema: z.ZodType<Prisma.meetingsUncheckedCreateWithoutRsvpsInput> = z.object({
  id: z.number().int().optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  title: z.string().optional(),
  group: z.string(),
  type: z.lazy(() => meeting_typesSchema).optional(),
  location: z.string().optional(),
  locationLink: z.string().optional(),
  status: z.lazy(() => meeting_statusSchema).optional(),
  slug: z.string().optional(),
  datetime: z.coerce.date(),
  host: z.string(),
  duration: z.number().int(),
  uuid: z.string()
}).strict() as z.ZodType<Prisma.meetingsUncheckedCreateWithoutRsvpsInput>;

export const meetingsCreateOrConnectWithoutRsvpsInputSchema: z.ZodType<Prisma.meetingsCreateOrConnectWithoutRsvpsInput> = z.object({
  where: z.lazy(() => meetingsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => meetingsCreateWithoutRsvpsInputSchema),z.lazy(() => meetingsUncheckedCreateWithoutRsvpsInputSchema) ]),
}).strict() as z.ZodType<Prisma.meetingsCreateOrConnectWithoutRsvpsInput>;

export const usersCreateWithoutRsvpsInputSchema: z.ZodType<Prisma.usersCreateWithoutRsvpsInput> = z.object({
  type: z.string().optional(),
  uuid: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  meetings: z.lazy(() => meetingsCreateNestedManyWithoutUsersInputSchema).optional()
}).strict() as z.ZodType<Prisma.usersCreateWithoutRsvpsInput>;

export const usersUncheckedCreateWithoutRsvpsInputSchema: z.ZodType<Prisma.usersUncheckedCreateWithoutRsvpsInput> = z.object({
  id: z.number().int().optional(),
  type: z.string().optional(),
  uuid: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  meetings: z.lazy(() => meetingsUncheckedCreateNestedManyWithoutUsersInputSchema).optional()
}).strict() as z.ZodType<Prisma.usersUncheckedCreateWithoutRsvpsInput>;

export const usersCreateOrConnectWithoutRsvpsInputSchema: z.ZodType<Prisma.usersCreateOrConnectWithoutRsvpsInput> = z.object({
  where: z.lazy(() => usersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => usersCreateWithoutRsvpsInputSchema),z.lazy(() => usersUncheckedCreateWithoutRsvpsInputSchema) ]),
}).strict() as z.ZodType<Prisma.usersCreateOrConnectWithoutRsvpsInput>;

export const meetingsUpsertWithoutRsvpsInputSchema: z.ZodType<Prisma.meetingsUpsertWithoutRsvpsInput> = z.object({
  update: z.union([ z.lazy(() => meetingsUpdateWithoutRsvpsInputSchema),z.lazy(() => meetingsUncheckedUpdateWithoutRsvpsInputSchema) ]),
  create: z.union([ z.lazy(() => meetingsCreateWithoutRsvpsInputSchema),z.lazy(() => meetingsUncheckedCreateWithoutRsvpsInputSchema) ]),
  where: z.lazy(() => meetingsWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.meetingsUpsertWithoutRsvpsInput>;

export const meetingsUpdateToOneWithWhereWithoutRsvpsInputSchema: z.ZodType<Prisma.meetingsUpdateToOneWithWhereWithoutRsvpsInput> = z.object({
  where: z.lazy(() => meetingsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => meetingsUpdateWithoutRsvpsInputSchema),z.lazy(() => meetingsUncheckedUpdateWithoutRsvpsInputSchema) ]),
}).strict() as z.ZodType<Prisma.meetingsUpdateToOneWithWhereWithoutRsvpsInput>;

export const meetingsUpdateWithoutRsvpsInputSchema: z.ZodType<Prisma.meetingsUpdateWithoutRsvpsInput> = z.object({
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => meeting_typesSchema),z.lazy(() => Enummeeting_typesFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  locationLink: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => meeting_statusSchema),z.lazy(() => Enummeeting_statusFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datetime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categories: z.lazy(() => categoriesUpdateOneRequiredWithoutMeetingsNestedInputSchema).optional(),
  groups: z.lazy(() => groupsUpdateOneRequiredWithoutMeetingsNestedInputSchema).optional(),
  users: z.lazy(() => usersUpdateOneRequiredWithoutMeetingsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.meetingsUpdateWithoutRsvpsInput>;

export const meetingsUncheckedUpdateWithoutRsvpsInputSchema: z.ZodType<Prisma.meetingsUncheckedUpdateWithoutRsvpsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  group: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => meeting_typesSchema),z.lazy(() => Enummeeting_typesFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  locationLink: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => meeting_statusSchema),z.lazy(() => Enummeeting_statusFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datetime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  host: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.meetingsUncheckedUpdateWithoutRsvpsInput>;

export const usersUpsertWithoutRsvpsInputSchema: z.ZodType<Prisma.usersUpsertWithoutRsvpsInput> = z.object({
  update: z.union([ z.lazy(() => usersUpdateWithoutRsvpsInputSchema),z.lazy(() => usersUncheckedUpdateWithoutRsvpsInputSchema) ]),
  create: z.union([ z.lazy(() => usersCreateWithoutRsvpsInputSchema),z.lazy(() => usersUncheckedCreateWithoutRsvpsInputSchema) ]),
  where: z.lazy(() => usersWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.usersUpsertWithoutRsvpsInput>;

export const usersUpdateToOneWithWhereWithoutRsvpsInputSchema: z.ZodType<Prisma.usersUpdateToOneWithWhereWithoutRsvpsInput> = z.object({
  where: z.lazy(() => usersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => usersUpdateWithoutRsvpsInputSchema),z.lazy(() => usersUncheckedUpdateWithoutRsvpsInputSchema) ]),
}).strict() as z.ZodType<Prisma.usersUpdateToOneWithWhereWithoutRsvpsInput>;

export const usersUpdateWithoutRsvpsInputSchema: z.ZodType<Prisma.usersUpdateWithoutRsvpsInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meetings: z.lazy(() => meetingsUpdateManyWithoutUsersNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.usersUpdateWithoutRsvpsInput>;

export const usersUncheckedUpdateWithoutRsvpsInputSchema: z.ZodType<Prisma.usersUncheckedUpdateWithoutRsvpsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meetings: z.lazy(() => meetingsUncheckedUpdateManyWithoutUsersNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.usersUncheckedUpdateWithoutRsvpsInput>;

export const meetingsCreateWithoutUsersInputSchema: z.ZodType<Prisma.meetingsCreateWithoutUsersInput> = z.object({
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  description: z.string().optional(),
  title: z.string().optional(),
  type: z.lazy(() => meeting_typesSchema).optional(),
  location: z.string().optional(),
  locationLink: z.string().optional(),
  status: z.lazy(() => meeting_statusSchema).optional(),
  slug: z.string().optional(),
  datetime: z.coerce.date(),
  duration: z.number().int(),
  uuid: z.string(),
  categories: z.lazy(() => categoriesCreateNestedOneWithoutMeetingsInputSchema).optional(),
  groups: z.lazy(() => groupsCreateNestedOneWithoutMeetingsInputSchema),
  rsvps: z.lazy(() => rsvpsCreateNestedManyWithoutMeetingsInputSchema).optional()
}).strict() as z.ZodType<Prisma.meetingsCreateWithoutUsersInput>;

export const meetingsUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.meetingsUncheckedCreateWithoutUsersInput> = z.object({
  id: z.number().int().optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  title: z.string().optional(),
  group: z.string(),
  type: z.lazy(() => meeting_typesSchema).optional(),
  location: z.string().optional(),
  locationLink: z.string().optional(),
  status: z.lazy(() => meeting_statusSchema).optional(),
  slug: z.string().optional(),
  datetime: z.coerce.date(),
  duration: z.number().int(),
  uuid: z.string(),
  rsvps: z.lazy(() => rsvpsUncheckedCreateNestedManyWithoutMeetingsInputSchema).optional()
}).strict() as z.ZodType<Prisma.meetingsUncheckedCreateWithoutUsersInput>;

export const meetingsCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.meetingsCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => meetingsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => meetingsCreateWithoutUsersInputSchema),z.lazy(() => meetingsUncheckedCreateWithoutUsersInputSchema) ]),
}).strict() as z.ZodType<Prisma.meetingsCreateOrConnectWithoutUsersInput>;

export const meetingsCreateManyUsersInputEnvelopeSchema: z.ZodType<Prisma.meetingsCreateManyUsersInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => meetingsCreateManyUsersInputSchema),z.lazy(() => meetingsCreateManyUsersInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.meetingsCreateManyUsersInputEnvelope>;

export const rsvpsCreateWithoutUsersInputSchema: z.ZodType<Prisma.rsvpsCreateWithoutUsersInput> = z.object({
  uuid: z.string(),
  value: z.lazy(() => rsvp_statusSchema).optional(),
  type: z.lazy(() => rsvp_typeSchema).optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  meetings: z.lazy(() => meetingsCreateNestedOneWithoutRsvpsInputSchema)
}).strict() as z.ZodType<Prisma.rsvpsCreateWithoutUsersInput>;

export const rsvpsUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.rsvpsUncheckedCreateWithoutUsersInput> = z.object({
  id: z.number().int().optional(),
  uuid: z.string(),
  meeting: z.string(),
  value: z.lazy(() => rsvp_statusSchema).optional(),
  type: z.lazy(() => rsvp_typeSchema).optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.rsvpsUncheckedCreateWithoutUsersInput>;

export const rsvpsCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.rsvpsCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => rsvpsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => rsvpsCreateWithoutUsersInputSchema),z.lazy(() => rsvpsUncheckedCreateWithoutUsersInputSchema) ]),
}).strict() as z.ZodType<Prisma.rsvpsCreateOrConnectWithoutUsersInput>;

export const rsvpsCreateManyUsersInputEnvelopeSchema: z.ZodType<Prisma.rsvpsCreateManyUsersInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => rsvpsCreateManyUsersInputSchema),z.lazy(() => rsvpsCreateManyUsersInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.rsvpsCreateManyUsersInputEnvelope>;

export const meetingsUpsertWithWhereUniqueWithoutUsersInputSchema: z.ZodType<Prisma.meetingsUpsertWithWhereUniqueWithoutUsersInput> = z.object({
  where: z.lazy(() => meetingsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => meetingsUpdateWithoutUsersInputSchema),z.lazy(() => meetingsUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => meetingsCreateWithoutUsersInputSchema),z.lazy(() => meetingsUncheckedCreateWithoutUsersInputSchema) ]),
}).strict() as z.ZodType<Prisma.meetingsUpsertWithWhereUniqueWithoutUsersInput>;

export const meetingsUpdateWithWhereUniqueWithoutUsersInputSchema: z.ZodType<Prisma.meetingsUpdateWithWhereUniqueWithoutUsersInput> = z.object({
  where: z.lazy(() => meetingsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => meetingsUpdateWithoutUsersInputSchema),z.lazy(() => meetingsUncheckedUpdateWithoutUsersInputSchema) ]),
}).strict() as z.ZodType<Prisma.meetingsUpdateWithWhereUniqueWithoutUsersInput>;

export const meetingsUpdateManyWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.meetingsUpdateManyWithWhereWithoutUsersInput> = z.object({
  where: z.lazy(() => meetingsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => meetingsUpdateManyMutationInputSchema),z.lazy(() => meetingsUncheckedUpdateManyWithoutUsersInputSchema) ]),
}).strict() as z.ZodType<Prisma.meetingsUpdateManyWithWhereWithoutUsersInput>;

export const rsvpsUpsertWithWhereUniqueWithoutUsersInputSchema: z.ZodType<Prisma.rsvpsUpsertWithWhereUniqueWithoutUsersInput> = z.object({
  where: z.lazy(() => rsvpsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => rsvpsUpdateWithoutUsersInputSchema),z.lazy(() => rsvpsUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => rsvpsCreateWithoutUsersInputSchema),z.lazy(() => rsvpsUncheckedCreateWithoutUsersInputSchema) ]),
}).strict() as z.ZodType<Prisma.rsvpsUpsertWithWhereUniqueWithoutUsersInput>;

export const rsvpsUpdateWithWhereUniqueWithoutUsersInputSchema: z.ZodType<Prisma.rsvpsUpdateWithWhereUniqueWithoutUsersInput> = z.object({
  where: z.lazy(() => rsvpsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => rsvpsUpdateWithoutUsersInputSchema),z.lazy(() => rsvpsUncheckedUpdateWithoutUsersInputSchema) ]),
}).strict() as z.ZodType<Prisma.rsvpsUpdateWithWhereUniqueWithoutUsersInput>;

export const rsvpsUpdateManyWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.rsvpsUpdateManyWithWhereWithoutUsersInput> = z.object({
  where: z.lazy(() => rsvpsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => rsvpsUpdateManyMutationInputSchema),z.lazy(() => rsvpsUncheckedUpdateManyWithoutUsersInputSchema) ]),
}).strict() as z.ZodType<Prisma.rsvpsUpdateManyWithWhereWithoutUsersInput>;

export const groupsCreateManyCategoriesInputSchema: z.ZodType<Prisma.groupsCreateManyCategoriesInput> = z.object({
  id: z.number().int().optional(),
  description: z.string().optional(),
  memberName: z.string().optional(),
  modName: z.string().optional(),
  privacyType: z.string().optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  uuid: z.string().optional().nullable(),
  name: z.string().optional()
}).strict() as z.ZodType<Prisma.groupsCreateManyCategoriesInput>;

export const meetingsCreateManyCategoriesInputSchema: z.ZodType<Prisma.meetingsCreateManyCategoriesInput> = z.object({
  id: z.number().int().optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  description: z.string().optional(),
  title: z.string().optional(),
  group: z.string(),
  type: z.lazy(() => meeting_typesSchema).optional(),
  location: z.string().optional(),
  locationLink: z.string().optional(),
  status: z.lazy(() => meeting_statusSchema).optional(),
  slug: z.string().optional(),
  datetime: z.coerce.date(),
  host: z.string(),
  duration: z.number().int(),
  uuid: z.string()
}).strict() as z.ZodType<Prisma.meetingsCreateManyCategoriesInput>;

export const groupsUpdateWithoutCategoriesInputSchema: z.ZodType<Prisma.groupsUpdateWithoutCategoriesInput> = z.object({
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  memberName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  privacyType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meetings: z.lazy(() => meetingsUpdateManyWithoutGroupsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.groupsUpdateWithoutCategoriesInput>;

export const groupsUncheckedUpdateWithoutCategoriesInputSchema: z.ZodType<Prisma.groupsUncheckedUpdateWithoutCategoriesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  memberName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  privacyType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meetings: z.lazy(() => meetingsUncheckedUpdateManyWithoutGroupsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.groupsUncheckedUpdateWithoutCategoriesInput>;

export const groupsUncheckedUpdateManyWithoutCategoriesInputSchema: z.ZodType<Prisma.groupsUncheckedUpdateManyWithoutCategoriesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  memberName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  privacyType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.groupsUncheckedUpdateManyWithoutCategoriesInput>;

export const meetingsUpdateWithoutCategoriesInputSchema: z.ZodType<Prisma.meetingsUpdateWithoutCategoriesInput> = z.object({
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => meeting_typesSchema),z.lazy(() => Enummeeting_typesFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  locationLink: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => meeting_statusSchema),z.lazy(() => Enummeeting_statusFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datetime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  groups: z.lazy(() => groupsUpdateOneRequiredWithoutMeetingsNestedInputSchema).optional(),
  users: z.lazy(() => usersUpdateOneRequiredWithoutMeetingsNestedInputSchema).optional(),
  rsvps: z.lazy(() => rsvpsUpdateManyWithoutMeetingsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.meetingsUpdateWithoutCategoriesInput>;

export const meetingsUncheckedUpdateWithoutCategoriesInputSchema: z.ZodType<Prisma.meetingsUncheckedUpdateWithoutCategoriesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  group: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => meeting_typesSchema),z.lazy(() => Enummeeting_typesFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  locationLink: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => meeting_statusSchema),z.lazy(() => Enummeeting_statusFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datetime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  host: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rsvps: z.lazy(() => rsvpsUncheckedUpdateManyWithoutMeetingsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.meetingsUncheckedUpdateWithoutCategoriesInput>;

export const meetingsUncheckedUpdateManyWithoutCategoriesInputSchema: z.ZodType<Prisma.meetingsUncheckedUpdateManyWithoutCategoriesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  group: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => meeting_typesSchema),z.lazy(() => Enummeeting_typesFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  locationLink: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => meeting_statusSchema),z.lazy(() => Enummeeting_statusFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datetime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  host: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.meetingsUncheckedUpdateManyWithoutCategoriesInput>;

export const meetingsCreateManyGroupsInputSchema: z.ZodType<Prisma.meetingsCreateManyGroupsInput> = z.object({
  id: z.number().int().optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  title: z.string().optional(),
  type: z.lazy(() => meeting_typesSchema).optional(),
  location: z.string().optional(),
  locationLink: z.string().optional(),
  status: z.lazy(() => meeting_statusSchema).optional(),
  slug: z.string().optional(),
  datetime: z.coerce.date(),
  host: z.string(),
  duration: z.number().int(),
  uuid: z.string()
}).strict() as z.ZodType<Prisma.meetingsCreateManyGroupsInput>;

export const meetingsUpdateWithoutGroupsInputSchema: z.ZodType<Prisma.meetingsUpdateWithoutGroupsInput> = z.object({
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => meeting_typesSchema),z.lazy(() => Enummeeting_typesFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  locationLink: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => meeting_statusSchema),z.lazy(() => Enummeeting_statusFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datetime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categories: z.lazy(() => categoriesUpdateOneRequiredWithoutMeetingsNestedInputSchema).optional(),
  users: z.lazy(() => usersUpdateOneRequiredWithoutMeetingsNestedInputSchema).optional(),
  rsvps: z.lazy(() => rsvpsUpdateManyWithoutMeetingsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.meetingsUpdateWithoutGroupsInput>;

export const meetingsUncheckedUpdateWithoutGroupsInputSchema: z.ZodType<Prisma.meetingsUncheckedUpdateWithoutGroupsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => meeting_typesSchema),z.lazy(() => Enummeeting_typesFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  locationLink: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => meeting_statusSchema),z.lazy(() => Enummeeting_statusFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datetime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  host: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rsvps: z.lazy(() => rsvpsUncheckedUpdateManyWithoutMeetingsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.meetingsUncheckedUpdateWithoutGroupsInput>;

export const meetingsUncheckedUpdateManyWithoutGroupsInputSchema: z.ZodType<Prisma.meetingsUncheckedUpdateManyWithoutGroupsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => meeting_typesSchema),z.lazy(() => Enummeeting_typesFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  locationLink: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => meeting_statusSchema),z.lazy(() => Enummeeting_statusFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datetime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  host: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.meetingsUncheckedUpdateManyWithoutGroupsInput>;

export const rsvpsCreateManyMeetingsInputSchema: z.ZodType<Prisma.rsvpsCreateManyMeetingsInput> = z.object({
  id: z.number().int().optional(),
  uuid: z.string(),
  user: z.string(),
  value: z.lazy(() => rsvp_statusSchema).optional(),
  type: z.lazy(() => rsvp_typeSchema).optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.rsvpsCreateManyMeetingsInput>;

export const rsvpsUpdateWithoutMeetingsInputSchema: z.ZodType<Prisma.rsvpsUpdateWithoutMeetingsInput> = z.object({
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.lazy(() => rsvp_statusSchema),z.lazy(() => Enumrsvp_statusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => rsvp_typeSchema),z.lazy(() => Enumrsvp_typeFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => usersUpdateOneRequiredWithoutRsvpsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.rsvpsUpdateWithoutMeetingsInput>;

export const rsvpsUncheckedUpdateWithoutMeetingsInputSchema: z.ZodType<Prisma.rsvpsUncheckedUpdateWithoutMeetingsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.lazy(() => rsvp_statusSchema),z.lazy(() => Enumrsvp_statusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => rsvp_typeSchema),z.lazy(() => Enumrsvp_typeFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.rsvpsUncheckedUpdateWithoutMeetingsInput>;

export const rsvpsUncheckedUpdateManyWithoutMeetingsInputSchema: z.ZodType<Prisma.rsvpsUncheckedUpdateManyWithoutMeetingsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.lazy(() => rsvp_statusSchema),z.lazy(() => Enumrsvp_statusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => rsvp_typeSchema),z.lazy(() => Enumrsvp_typeFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.rsvpsUncheckedUpdateManyWithoutMeetingsInput>;

export const meetingsCreateManyUsersInputSchema: z.ZodType<Prisma.meetingsCreateManyUsersInput> = z.object({
  id: z.number().int().optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  title: z.string().optional(),
  group: z.string(),
  type: z.lazy(() => meeting_typesSchema).optional(),
  location: z.string().optional(),
  locationLink: z.string().optional(),
  status: z.lazy(() => meeting_statusSchema).optional(),
  slug: z.string().optional(),
  datetime: z.coerce.date(),
  duration: z.number().int(),
  uuid: z.string()
}).strict() as z.ZodType<Prisma.meetingsCreateManyUsersInput>;

export const rsvpsCreateManyUsersInputSchema: z.ZodType<Prisma.rsvpsCreateManyUsersInput> = z.object({
  id: z.number().int().optional(),
  uuid: z.string(),
  meeting: z.string(),
  value: z.lazy(() => rsvp_statusSchema).optional(),
  type: z.lazy(() => rsvp_typeSchema).optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.rsvpsCreateManyUsersInput>;

export const meetingsUpdateWithoutUsersInputSchema: z.ZodType<Prisma.meetingsUpdateWithoutUsersInput> = z.object({
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => meeting_typesSchema),z.lazy(() => Enummeeting_typesFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  locationLink: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => meeting_statusSchema),z.lazy(() => Enummeeting_statusFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datetime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categories: z.lazy(() => categoriesUpdateOneRequiredWithoutMeetingsNestedInputSchema).optional(),
  groups: z.lazy(() => groupsUpdateOneRequiredWithoutMeetingsNestedInputSchema).optional(),
  rsvps: z.lazy(() => rsvpsUpdateManyWithoutMeetingsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.meetingsUpdateWithoutUsersInput>;

export const meetingsUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.meetingsUncheckedUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  group: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => meeting_typesSchema),z.lazy(() => Enummeeting_typesFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  locationLink: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => meeting_statusSchema),z.lazy(() => Enummeeting_statusFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datetime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rsvps: z.lazy(() => rsvpsUncheckedUpdateManyWithoutMeetingsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.meetingsUncheckedUpdateWithoutUsersInput>;

export const meetingsUncheckedUpdateManyWithoutUsersInputSchema: z.ZodType<Prisma.meetingsUncheckedUpdateManyWithoutUsersInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  group: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => meeting_typesSchema),z.lazy(() => Enummeeting_typesFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  locationLink: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => meeting_statusSchema),z.lazy(() => Enummeeting_statusFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datetime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.meetingsUncheckedUpdateManyWithoutUsersInput>;

export const rsvpsUpdateWithoutUsersInputSchema: z.ZodType<Prisma.rsvpsUpdateWithoutUsersInput> = z.object({
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.lazy(() => rsvp_statusSchema),z.lazy(() => Enumrsvp_statusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => rsvp_typeSchema),z.lazy(() => Enumrsvp_typeFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meetings: z.lazy(() => meetingsUpdateOneRequiredWithoutRsvpsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.rsvpsUpdateWithoutUsersInput>;

export const rsvpsUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.rsvpsUncheckedUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meeting: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.lazy(() => rsvp_statusSchema),z.lazy(() => Enumrsvp_statusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => rsvp_typeSchema),z.lazy(() => Enumrsvp_typeFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.rsvpsUncheckedUpdateWithoutUsersInput>;

export const rsvpsUncheckedUpdateManyWithoutUsersInputSchema: z.ZodType<Prisma.rsvpsUncheckedUpdateManyWithoutUsersInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meeting: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.lazy(() => rsvp_statusSchema),z.lazy(() => Enumrsvp_statusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => rsvp_typeSchema),z.lazy(() => Enumrsvp_typeFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.rsvpsUncheckedUpdateManyWithoutUsersInput>;

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const categoriesFindFirstArgsSchema: z.ZodType<Prisma.categoriesFindFirstArgs> = z.object({
  select: categoriesSelectSchema.optional(),
  include: categoriesIncludeSchema.optional(),
  where: categoriesWhereInputSchema.optional(),
  orderBy: z.union([ categoriesOrderByWithRelationInputSchema.array(),categoriesOrderByWithRelationInputSchema ]).optional(),
  cursor: categoriesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoriesScalarFieldEnumSchema,CategoriesScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.categoriesFindFirstArgs>;

export const categoriesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.categoriesFindFirstOrThrowArgs> = z.object({
  select: categoriesSelectSchema.optional(),
  include: categoriesIncludeSchema.optional(),
  where: categoriesWhereInputSchema.optional(),
  orderBy: z.union([ categoriesOrderByWithRelationInputSchema.array(),categoriesOrderByWithRelationInputSchema ]).optional(),
  cursor: categoriesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoriesScalarFieldEnumSchema,CategoriesScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.categoriesFindFirstOrThrowArgs>;

export const categoriesFindManyArgsSchema: z.ZodType<Prisma.categoriesFindManyArgs> = z.object({
  select: categoriesSelectSchema.optional(),
  include: categoriesIncludeSchema.optional(),
  where: categoriesWhereInputSchema.optional(),
  orderBy: z.union([ categoriesOrderByWithRelationInputSchema.array(),categoriesOrderByWithRelationInputSchema ]).optional(),
  cursor: categoriesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoriesScalarFieldEnumSchema,CategoriesScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.categoriesFindManyArgs>;

export const categoriesAggregateArgsSchema: z.ZodType<Prisma.categoriesAggregateArgs> = z.object({
  where: categoriesWhereInputSchema.optional(),
  orderBy: z.union([ categoriesOrderByWithRelationInputSchema.array(),categoriesOrderByWithRelationInputSchema ]).optional(),
  cursor: categoriesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.categoriesAggregateArgs>;

export const categoriesGroupByArgsSchema: z.ZodType<Prisma.categoriesGroupByArgs> = z.object({
  where: categoriesWhereInputSchema.optional(),
  orderBy: z.union([ categoriesOrderByWithAggregationInputSchema.array(),categoriesOrderByWithAggregationInputSchema ]).optional(),
  by: CategoriesScalarFieldEnumSchema.array(),
  having: categoriesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.categoriesGroupByArgs>;

export const categoriesFindUniqueArgsSchema: z.ZodType<Prisma.categoriesFindUniqueArgs> = z.object({
  select: categoriesSelectSchema.optional(),
  include: categoriesIncludeSchema.optional(),
  where: categoriesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.categoriesFindUniqueArgs>;

export const categoriesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.categoriesFindUniqueOrThrowArgs> = z.object({
  select: categoriesSelectSchema.optional(),
  include: categoriesIncludeSchema.optional(),
  where: categoriesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.categoriesFindUniqueOrThrowArgs>;

export const decisionsFindFirstArgsSchema: z.ZodType<Prisma.decisionsFindFirstArgs> = z.object({
  select: decisionsSelectSchema.optional(),
  where: decisionsWhereInputSchema.optional(),
  orderBy: z.union([ decisionsOrderByWithRelationInputSchema.array(),decisionsOrderByWithRelationInputSchema ]).optional(),
  cursor: decisionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DecisionsScalarFieldEnumSchema,DecisionsScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.decisionsFindFirstArgs>;

export const decisionsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.decisionsFindFirstOrThrowArgs> = z.object({
  select: decisionsSelectSchema.optional(),
  where: decisionsWhereInputSchema.optional(),
  orderBy: z.union([ decisionsOrderByWithRelationInputSchema.array(),decisionsOrderByWithRelationInputSchema ]).optional(),
  cursor: decisionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DecisionsScalarFieldEnumSchema,DecisionsScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.decisionsFindFirstOrThrowArgs>;

export const decisionsFindManyArgsSchema: z.ZodType<Prisma.decisionsFindManyArgs> = z.object({
  select: decisionsSelectSchema.optional(),
  where: decisionsWhereInputSchema.optional(),
  orderBy: z.union([ decisionsOrderByWithRelationInputSchema.array(),decisionsOrderByWithRelationInputSchema ]).optional(),
  cursor: decisionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DecisionsScalarFieldEnumSchema,DecisionsScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.decisionsFindManyArgs>;

export const decisionsAggregateArgsSchema: z.ZodType<Prisma.decisionsAggregateArgs> = z.object({
  where: decisionsWhereInputSchema.optional(),
  orderBy: z.union([ decisionsOrderByWithRelationInputSchema.array(),decisionsOrderByWithRelationInputSchema ]).optional(),
  cursor: decisionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.decisionsAggregateArgs>;

export const decisionsGroupByArgsSchema: z.ZodType<Prisma.decisionsGroupByArgs> = z.object({
  where: decisionsWhereInputSchema.optional(),
  orderBy: z.union([ decisionsOrderByWithAggregationInputSchema.array(),decisionsOrderByWithAggregationInputSchema ]).optional(),
  by: DecisionsScalarFieldEnumSchema.array(),
  having: decisionsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.decisionsGroupByArgs>;

export const decisionsFindUniqueArgsSchema: z.ZodType<Prisma.decisionsFindUniqueArgs> = z.object({
  select: decisionsSelectSchema.optional(),
  where: decisionsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.decisionsFindUniqueArgs>;

export const decisionsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.decisionsFindUniqueOrThrowArgs> = z.object({
  select: decisionsSelectSchema.optional(),
  where: decisionsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.decisionsFindUniqueOrThrowArgs>;

export const groupsFindFirstArgsSchema: z.ZodType<Prisma.groupsFindFirstArgs> = z.object({
  select: groupsSelectSchema.optional(),
  include: groupsIncludeSchema.optional(),
  where: groupsWhereInputSchema.optional(),
  orderBy: z.union([ groupsOrderByWithRelationInputSchema.array(),groupsOrderByWithRelationInputSchema ]).optional(),
  cursor: groupsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GroupsScalarFieldEnumSchema,GroupsScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.groupsFindFirstArgs>;

export const groupsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.groupsFindFirstOrThrowArgs> = z.object({
  select: groupsSelectSchema.optional(),
  include: groupsIncludeSchema.optional(),
  where: groupsWhereInputSchema.optional(),
  orderBy: z.union([ groupsOrderByWithRelationInputSchema.array(),groupsOrderByWithRelationInputSchema ]).optional(),
  cursor: groupsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GroupsScalarFieldEnumSchema,GroupsScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.groupsFindFirstOrThrowArgs>;

export const groupsFindManyArgsSchema: z.ZodType<Prisma.groupsFindManyArgs> = z.object({
  select: groupsSelectSchema.optional(),
  include: groupsIncludeSchema.optional(),
  where: groupsWhereInputSchema.optional(),
  orderBy: z.union([ groupsOrderByWithRelationInputSchema.array(),groupsOrderByWithRelationInputSchema ]).optional(),
  cursor: groupsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GroupsScalarFieldEnumSchema,GroupsScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.groupsFindManyArgs>;

export const groupsAggregateArgsSchema: z.ZodType<Prisma.groupsAggregateArgs> = z.object({
  where: groupsWhereInputSchema.optional(),
  orderBy: z.union([ groupsOrderByWithRelationInputSchema.array(),groupsOrderByWithRelationInputSchema ]).optional(),
  cursor: groupsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.groupsAggregateArgs>;

export const groupsGroupByArgsSchema: z.ZodType<Prisma.groupsGroupByArgs> = z.object({
  where: groupsWhereInputSchema.optional(),
  orderBy: z.union([ groupsOrderByWithAggregationInputSchema.array(),groupsOrderByWithAggregationInputSchema ]).optional(),
  by: GroupsScalarFieldEnumSchema.array(),
  having: groupsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.groupsGroupByArgs>;

export const groupsFindUniqueArgsSchema: z.ZodType<Prisma.groupsFindUniqueArgs> = z.object({
  select: groupsSelectSchema.optional(),
  include: groupsIncludeSchema.optional(),
  where: groupsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.groupsFindUniqueArgs>;

export const groupsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.groupsFindUniqueOrThrowArgs> = z.object({
  select: groupsSelectSchema.optional(),
  include: groupsIncludeSchema.optional(),
  where: groupsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.groupsFindUniqueOrThrowArgs>;

export const meetingsFindFirstArgsSchema: z.ZodType<Prisma.meetingsFindFirstArgs> = z.object({
  select: meetingsSelectSchema.optional(),
  include: meetingsIncludeSchema.optional(),
  where: meetingsWhereInputSchema.optional(),
  orderBy: z.union([ meetingsOrderByWithRelationInputSchema.array(),meetingsOrderByWithRelationInputSchema ]).optional(),
  cursor: meetingsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MeetingsScalarFieldEnumSchema,MeetingsScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.meetingsFindFirstArgs>;

export const meetingsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.meetingsFindFirstOrThrowArgs> = z.object({
  select: meetingsSelectSchema.optional(),
  include: meetingsIncludeSchema.optional(),
  where: meetingsWhereInputSchema.optional(),
  orderBy: z.union([ meetingsOrderByWithRelationInputSchema.array(),meetingsOrderByWithRelationInputSchema ]).optional(),
  cursor: meetingsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MeetingsScalarFieldEnumSchema,MeetingsScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.meetingsFindFirstOrThrowArgs>;

export const meetingsFindManyArgsSchema: z.ZodType<Prisma.meetingsFindManyArgs> = z.object({
  select: meetingsSelectSchema.optional(),
  include: meetingsIncludeSchema.optional(),
  where: meetingsWhereInputSchema.optional(),
  orderBy: z.union([ meetingsOrderByWithRelationInputSchema.array(),meetingsOrderByWithRelationInputSchema ]).optional(),
  cursor: meetingsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MeetingsScalarFieldEnumSchema,MeetingsScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.meetingsFindManyArgs>;

export const meetingsAggregateArgsSchema: z.ZodType<Prisma.meetingsAggregateArgs> = z.object({
  where: meetingsWhereInputSchema.optional(),
  orderBy: z.union([ meetingsOrderByWithRelationInputSchema.array(),meetingsOrderByWithRelationInputSchema ]).optional(),
  cursor: meetingsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.meetingsAggregateArgs>;

export const meetingsGroupByArgsSchema: z.ZodType<Prisma.meetingsGroupByArgs> = z.object({
  where: meetingsWhereInputSchema.optional(),
  orderBy: z.union([ meetingsOrderByWithAggregationInputSchema.array(),meetingsOrderByWithAggregationInputSchema ]).optional(),
  by: MeetingsScalarFieldEnumSchema.array(),
  having: meetingsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.meetingsGroupByArgs>;

export const meetingsFindUniqueArgsSchema: z.ZodType<Prisma.meetingsFindUniqueArgs> = z.object({
  select: meetingsSelectSchema.optional(),
  include: meetingsIncludeSchema.optional(),
  where: meetingsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.meetingsFindUniqueArgs>;

export const meetingsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.meetingsFindUniqueOrThrowArgs> = z.object({
  select: meetingsSelectSchema.optional(),
  include: meetingsIncludeSchema.optional(),
  where: meetingsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.meetingsFindUniqueOrThrowArgs>;

export const rsvpsFindFirstArgsSchema: z.ZodType<Prisma.rsvpsFindFirstArgs> = z.object({
  select: rsvpsSelectSchema.optional(),
  include: rsvpsIncludeSchema.optional(),
  where: rsvpsWhereInputSchema.optional(),
  orderBy: z.union([ rsvpsOrderByWithRelationInputSchema.array(),rsvpsOrderByWithRelationInputSchema ]).optional(),
  cursor: rsvpsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RsvpsScalarFieldEnumSchema,RsvpsScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.rsvpsFindFirstArgs>;

export const rsvpsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.rsvpsFindFirstOrThrowArgs> = z.object({
  select: rsvpsSelectSchema.optional(),
  include: rsvpsIncludeSchema.optional(),
  where: rsvpsWhereInputSchema.optional(),
  orderBy: z.union([ rsvpsOrderByWithRelationInputSchema.array(),rsvpsOrderByWithRelationInputSchema ]).optional(),
  cursor: rsvpsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RsvpsScalarFieldEnumSchema,RsvpsScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.rsvpsFindFirstOrThrowArgs>;

export const rsvpsFindManyArgsSchema: z.ZodType<Prisma.rsvpsFindManyArgs> = z.object({
  select: rsvpsSelectSchema.optional(),
  include: rsvpsIncludeSchema.optional(),
  where: rsvpsWhereInputSchema.optional(),
  orderBy: z.union([ rsvpsOrderByWithRelationInputSchema.array(),rsvpsOrderByWithRelationInputSchema ]).optional(),
  cursor: rsvpsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RsvpsScalarFieldEnumSchema,RsvpsScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.rsvpsFindManyArgs>;

export const rsvpsAggregateArgsSchema: z.ZodType<Prisma.rsvpsAggregateArgs> = z.object({
  where: rsvpsWhereInputSchema.optional(),
  orderBy: z.union([ rsvpsOrderByWithRelationInputSchema.array(),rsvpsOrderByWithRelationInputSchema ]).optional(),
  cursor: rsvpsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.rsvpsAggregateArgs>;

export const rsvpsGroupByArgsSchema: z.ZodType<Prisma.rsvpsGroupByArgs> = z.object({
  where: rsvpsWhereInputSchema.optional(),
  orderBy: z.union([ rsvpsOrderByWithAggregationInputSchema.array(),rsvpsOrderByWithAggregationInputSchema ]).optional(),
  by: RsvpsScalarFieldEnumSchema.array(),
  having: rsvpsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.rsvpsGroupByArgs>;

export const rsvpsFindUniqueArgsSchema: z.ZodType<Prisma.rsvpsFindUniqueArgs> = z.object({
  select: rsvpsSelectSchema.optional(),
  include: rsvpsIncludeSchema.optional(),
  where: rsvpsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.rsvpsFindUniqueArgs>;

export const rsvpsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.rsvpsFindUniqueOrThrowArgs> = z.object({
  select: rsvpsSelectSchema.optional(),
  include: rsvpsIncludeSchema.optional(),
  where: rsvpsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.rsvpsFindUniqueOrThrowArgs>;

export const usersFindFirstArgsSchema: z.ZodType<Prisma.usersFindFirstArgs> = z.object({
  select: usersSelectSchema.optional(),
  include: usersIncludeSchema.optional(),
  where: usersWhereInputSchema.optional(),
  orderBy: z.union([ usersOrderByWithRelationInputSchema.array(),usersOrderByWithRelationInputSchema ]).optional(),
  cursor: usersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersScalarFieldEnumSchema,UsersScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.usersFindFirstArgs>;

export const usersFindFirstOrThrowArgsSchema: z.ZodType<Prisma.usersFindFirstOrThrowArgs> = z.object({
  select: usersSelectSchema.optional(),
  include: usersIncludeSchema.optional(),
  where: usersWhereInputSchema.optional(),
  orderBy: z.union([ usersOrderByWithRelationInputSchema.array(),usersOrderByWithRelationInputSchema ]).optional(),
  cursor: usersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersScalarFieldEnumSchema,UsersScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.usersFindFirstOrThrowArgs>;

export const usersFindManyArgsSchema: z.ZodType<Prisma.usersFindManyArgs> = z.object({
  select: usersSelectSchema.optional(),
  include: usersIncludeSchema.optional(),
  where: usersWhereInputSchema.optional(),
  orderBy: z.union([ usersOrderByWithRelationInputSchema.array(),usersOrderByWithRelationInputSchema ]).optional(),
  cursor: usersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersScalarFieldEnumSchema,UsersScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.usersFindManyArgs>;

export const usersAggregateArgsSchema: z.ZodType<Prisma.usersAggregateArgs> = z.object({
  where: usersWhereInputSchema.optional(),
  orderBy: z.union([ usersOrderByWithRelationInputSchema.array(),usersOrderByWithRelationInputSchema ]).optional(),
  cursor: usersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.usersAggregateArgs>;

export const usersGroupByArgsSchema: z.ZodType<Prisma.usersGroupByArgs> = z.object({
  where: usersWhereInputSchema.optional(),
  orderBy: z.union([ usersOrderByWithAggregationInputSchema.array(),usersOrderByWithAggregationInputSchema ]).optional(),
  by: UsersScalarFieldEnumSchema.array(),
  having: usersScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.usersGroupByArgs>;

export const usersFindUniqueArgsSchema: z.ZodType<Prisma.usersFindUniqueArgs> = z.object({
  select: usersSelectSchema.optional(),
  include: usersIncludeSchema.optional(),
  where: usersWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.usersFindUniqueArgs>;

export const usersFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.usersFindUniqueOrThrowArgs> = z.object({
  select: usersSelectSchema.optional(),
  include: usersIncludeSchema.optional(),
  where: usersWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.usersFindUniqueOrThrowArgs>;

export const categoriesCreateArgsSchema: z.ZodType<Prisma.categoriesCreateArgs> = z.object({
  select: categoriesSelectSchema.optional(),
  include: categoriesIncludeSchema.optional(),
  data: z.union([ categoriesCreateInputSchema,categoriesUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.categoriesCreateArgs>;

export const categoriesUpsertArgsSchema: z.ZodType<Prisma.categoriesUpsertArgs> = z.object({
  select: categoriesSelectSchema.optional(),
  include: categoriesIncludeSchema.optional(),
  where: categoriesWhereUniqueInputSchema,
  create: z.union([ categoriesCreateInputSchema,categoriesUncheckedCreateInputSchema ]),
  update: z.union([ categoriesUpdateInputSchema,categoriesUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.categoriesUpsertArgs>;

export const categoriesCreateManyArgsSchema: z.ZodType<Prisma.categoriesCreateManyArgs> = z.object({
  data: z.union([ categoriesCreateManyInputSchema,categoriesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.categoriesCreateManyArgs>;

export const categoriesCreateManyAndReturnArgsSchema: z.ZodType<Prisma.categoriesCreateManyAndReturnArgs> = z.object({
  data: z.union([ categoriesCreateManyInputSchema,categoriesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.categoriesCreateManyAndReturnArgs>;

export const categoriesDeleteArgsSchema: z.ZodType<Prisma.categoriesDeleteArgs> = z.object({
  select: categoriesSelectSchema.optional(),
  include: categoriesIncludeSchema.optional(),
  where: categoriesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.categoriesDeleteArgs>;

export const categoriesUpdateArgsSchema: z.ZodType<Prisma.categoriesUpdateArgs> = z.object({
  select: categoriesSelectSchema.optional(),
  include: categoriesIncludeSchema.optional(),
  data: z.union([ categoriesUpdateInputSchema,categoriesUncheckedUpdateInputSchema ]),
  where: categoriesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.categoriesUpdateArgs>;

export const categoriesUpdateManyArgsSchema: z.ZodType<Prisma.categoriesUpdateManyArgs> = z.object({
  data: z.union([ categoriesUpdateManyMutationInputSchema,categoriesUncheckedUpdateManyInputSchema ]),
  where: categoriesWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.categoriesUpdateManyArgs>;

export const categoriesDeleteManyArgsSchema: z.ZodType<Prisma.categoriesDeleteManyArgs> = z.object({
  where: categoriesWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.categoriesDeleteManyArgs>;

export const decisionsCreateArgsSchema: z.ZodType<Prisma.decisionsCreateArgs> = z.object({
  select: decisionsSelectSchema.optional(),
  data: z.union([ decisionsCreateInputSchema,decisionsUncheckedCreateInputSchema ]).optional(),
}).strict() as z.ZodType<Prisma.decisionsCreateArgs>;

export const decisionsUpsertArgsSchema: z.ZodType<Prisma.decisionsUpsertArgs> = z.object({
  select: decisionsSelectSchema.optional(),
  where: decisionsWhereUniqueInputSchema,
  create: z.union([ decisionsCreateInputSchema,decisionsUncheckedCreateInputSchema ]),
  update: z.union([ decisionsUpdateInputSchema,decisionsUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.decisionsUpsertArgs>;

export const decisionsCreateManyArgsSchema: z.ZodType<Prisma.decisionsCreateManyArgs> = z.object({
  data: z.union([ decisionsCreateManyInputSchema,decisionsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.decisionsCreateManyArgs>;

export const decisionsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.decisionsCreateManyAndReturnArgs> = z.object({
  data: z.union([ decisionsCreateManyInputSchema,decisionsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.decisionsCreateManyAndReturnArgs>;

export const decisionsDeleteArgsSchema: z.ZodType<Prisma.decisionsDeleteArgs> = z.object({
  select: decisionsSelectSchema.optional(),
  where: decisionsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.decisionsDeleteArgs>;

export const decisionsUpdateArgsSchema: z.ZodType<Prisma.decisionsUpdateArgs> = z.object({
  select: decisionsSelectSchema.optional(),
  data: z.union([ decisionsUpdateInputSchema,decisionsUncheckedUpdateInputSchema ]),
  where: decisionsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.decisionsUpdateArgs>;

export const decisionsUpdateManyArgsSchema: z.ZodType<Prisma.decisionsUpdateManyArgs> = z.object({
  data: z.union([ decisionsUpdateManyMutationInputSchema,decisionsUncheckedUpdateManyInputSchema ]),
  where: decisionsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.decisionsUpdateManyArgs>;

export const decisionsDeleteManyArgsSchema: z.ZodType<Prisma.decisionsDeleteManyArgs> = z.object({
  where: decisionsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.decisionsDeleteManyArgs>;

export const groupsCreateArgsSchema: z.ZodType<Prisma.groupsCreateArgs> = z.object({
  select: groupsSelectSchema.optional(),
  include: groupsIncludeSchema.optional(),
  data: z.union([ groupsCreateInputSchema,groupsUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.groupsCreateArgs>;

export const groupsUpsertArgsSchema: z.ZodType<Prisma.groupsUpsertArgs> = z.object({
  select: groupsSelectSchema.optional(),
  include: groupsIncludeSchema.optional(),
  where: groupsWhereUniqueInputSchema,
  create: z.union([ groupsCreateInputSchema,groupsUncheckedCreateInputSchema ]),
  update: z.union([ groupsUpdateInputSchema,groupsUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.groupsUpsertArgs>;

export const groupsCreateManyArgsSchema: z.ZodType<Prisma.groupsCreateManyArgs> = z.object({
  data: z.union([ groupsCreateManyInputSchema,groupsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.groupsCreateManyArgs>;

export const groupsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.groupsCreateManyAndReturnArgs> = z.object({
  data: z.union([ groupsCreateManyInputSchema,groupsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.groupsCreateManyAndReturnArgs>;

export const groupsDeleteArgsSchema: z.ZodType<Prisma.groupsDeleteArgs> = z.object({
  select: groupsSelectSchema.optional(),
  include: groupsIncludeSchema.optional(),
  where: groupsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.groupsDeleteArgs>;

export const groupsUpdateArgsSchema: z.ZodType<Prisma.groupsUpdateArgs> = z.object({
  select: groupsSelectSchema.optional(),
  include: groupsIncludeSchema.optional(),
  data: z.union([ groupsUpdateInputSchema,groupsUncheckedUpdateInputSchema ]),
  where: groupsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.groupsUpdateArgs>;

export const groupsUpdateManyArgsSchema: z.ZodType<Prisma.groupsUpdateManyArgs> = z.object({
  data: z.union([ groupsUpdateManyMutationInputSchema,groupsUncheckedUpdateManyInputSchema ]),
  where: groupsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.groupsUpdateManyArgs>;

export const groupsDeleteManyArgsSchema: z.ZodType<Prisma.groupsDeleteManyArgs> = z.object({
  where: groupsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.groupsDeleteManyArgs>;

export const meetingsCreateArgsSchema: z.ZodType<Prisma.meetingsCreateArgs> = z.object({
  select: meetingsSelectSchema.optional(),
  include: meetingsIncludeSchema.optional(),
  data: z.union([ meetingsCreateInputSchema,meetingsUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.meetingsCreateArgs>;

export const meetingsUpsertArgsSchema: z.ZodType<Prisma.meetingsUpsertArgs> = z.object({
  select: meetingsSelectSchema.optional(),
  include: meetingsIncludeSchema.optional(),
  where: meetingsWhereUniqueInputSchema,
  create: z.union([ meetingsCreateInputSchema,meetingsUncheckedCreateInputSchema ]),
  update: z.union([ meetingsUpdateInputSchema,meetingsUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.meetingsUpsertArgs>;

export const meetingsCreateManyArgsSchema: z.ZodType<Prisma.meetingsCreateManyArgs> = z.object({
  data: z.union([ meetingsCreateManyInputSchema,meetingsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.meetingsCreateManyArgs>;

export const meetingsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.meetingsCreateManyAndReturnArgs> = z.object({
  data: z.union([ meetingsCreateManyInputSchema,meetingsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.meetingsCreateManyAndReturnArgs>;

export const meetingsDeleteArgsSchema: z.ZodType<Prisma.meetingsDeleteArgs> = z.object({
  select: meetingsSelectSchema.optional(),
  include: meetingsIncludeSchema.optional(),
  where: meetingsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.meetingsDeleteArgs>;

export const meetingsUpdateArgsSchema: z.ZodType<Prisma.meetingsUpdateArgs> = z.object({
  select: meetingsSelectSchema.optional(),
  include: meetingsIncludeSchema.optional(),
  data: z.union([ meetingsUpdateInputSchema,meetingsUncheckedUpdateInputSchema ]),
  where: meetingsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.meetingsUpdateArgs>;

export const meetingsUpdateManyArgsSchema: z.ZodType<Prisma.meetingsUpdateManyArgs> = z.object({
  data: z.union([ meetingsUpdateManyMutationInputSchema,meetingsUncheckedUpdateManyInputSchema ]),
  where: meetingsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.meetingsUpdateManyArgs>;

export const meetingsDeleteManyArgsSchema: z.ZodType<Prisma.meetingsDeleteManyArgs> = z.object({
  where: meetingsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.meetingsDeleteManyArgs>;

export const rsvpsCreateArgsSchema: z.ZodType<Prisma.rsvpsCreateArgs> = z.object({
  select: rsvpsSelectSchema.optional(),
  include: rsvpsIncludeSchema.optional(),
  data: z.union([ rsvpsCreateInputSchema,rsvpsUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.rsvpsCreateArgs>;

export const rsvpsUpsertArgsSchema: z.ZodType<Prisma.rsvpsUpsertArgs> = z.object({
  select: rsvpsSelectSchema.optional(),
  include: rsvpsIncludeSchema.optional(),
  where: rsvpsWhereUniqueInputSchema,
  create: z.union([ rsvpsCreateInputSchema,rsvpsUncheckedCreateInputSchema ]),
  update: z.union([ rsvpsUpdateInputSchema,rsvpsUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.rsvpsUpsertArgs>;

export const rsvpsCreateManyArgsSchema: z.ZodType<Prisma.rsvpsCreateManyArgs> = z.object({
  data: z.union([ rsvpsCreateManyInputSchema,rsvpsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.rsvpsCreateManyArgs>;

export const rsvpsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.rsvpsCreateManyAndReturnArgs> = z.object({
  data: z.union([ rsvpsCreateManyInputSchema,rsvpsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.rsvpsCreateManyAndReturnArgs>;

export const rsvpsDeleteArgsSchema: z.ZodType<Prisma.rsvpsDeleteArgs> = z.object({
  select: rsvpsSelectSchema.optional(),
  include: rsvpsIncludeSchema.optional(),
  where: rsvpsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.rsvpsDeleteArgs>;

export const rsvpsUpdateArgsSchema: z.ZodType<Prisma.rsvpsUpdateArgs> = z.object({
  select: rsvpsSelectSchema.optional(),
  include: rsvpsIncludeSchema.optional(),
  data: z.union([ rsvpsUpdateInputSchema,rsvpsUncheckedUpdateInputSchema ]),
  where: rsvpsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.rsvpsUpdateArgs>;

export const rsvpsUpdateManyArgsSchema: z.ZodType<Prisma.rsvpsUpdateManyArgs> = z.object({
  data: z.union([ rsvpsUpdateManyMutationInputSchema,rsvpsUncheckedUpdateManyInputSchema ]),
  where: rsvpsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.rsvpsUpdateManyArgs>;

export const rsvpsDeleteManyArgsSchema: z.ZodType<Prisma.rsvpsDeleteManyArgs> = z.object({
  where: rsvpsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.rsvpsDeleteManyArgs>;

export const usersCreateArgsSchema: z.ZodType<Prisma.usersCreateArgs> = z.object({
  select: usersSelectSchema.optional(),
  include: usersIncludeSchema.optional(),
  data: z.union([ usersCreateInputSchema,usersUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.usersCreateArgs>;

export const usersUpsertArgsSchema: z.ZodType<Prisma.usersUpsertArgs> = z.object({
  select: usersSelectSchema.optional(),
  include: usersIncludeSchema.optional(),
  where: usersWhereUniqueInputSchema,
  create: z.union([ usersCreateInputSchema,usersUncheckedCreateInputSchema ]),
  update: z.union([ usersUpdateInputSchema,usersUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.usersUpsertArgs>;

export const usersCreateManyArgsSchema: z.ZodType<Prisma.usersCreateManyArgs> = z.object({
  data: z.union([ usersCreateManyInputSchema,usersCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.usersCreateManyArgs>;

export const usersCreateManyAndReturnArgsSchema: z.ZodType<Prisma.usersCreateManyAndReturnArgs> = z.object({
  data: z.union([ usersCreateManyInputSchema,usersCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.usersCreateManyAndReturnArgs>;

export const usersDeleteArgsSchema: z.ZodType<Prisma.usersDeleteArgs> = z.object({
  select: usersSelectSchema.optional(),
  include: usersIncludeSchema.optional(),
  where: usersWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.usersDeleteArgs>;

export const usersUpdateArgsSchema: z.ZodType<Prisma.usersUpdateArgs> = z.object({
  select: usersSelectSchema.optional(),
  include: usersIncludeSchema.optional(),
  data: z.union([ usersUpdateInputSchema,usersUncheckedUpdateInputSchema ]),
  where: usersWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.usersUpdateArgs>;

export const usersUpdateManyArgsSchema: z.ZodType<Prisma.usersUpdateManyArgs> = z.object({
  data: z.union([ usersUpdateManyMutationInputSchema,usersUncheckedUpdateManyInputSchema ]),
  where: usersWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.usersUpdateManyArgs>;

export const usersDeleteManyArgsSchema: z.ZodType<Prisma.usersDeleteManyArgs> = z.object({
  where: usersWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.usersDeleteManyArgs>;