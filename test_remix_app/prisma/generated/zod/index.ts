import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const CategoriesScalarFieldEnumSchema = z.enum(['id','display','slug','uuid','created','updated','description']);

export const DecisionsScalarFieldEnumSchema = z.enum(['id','created','updated']);

export const GroupsScalarFieldEnumSchema = z.enum(['id','category','description','memberName','modName','privacyType','created','updated','uuid','name']);

export const MeetingsScalarFieldEnumSchema = z.enum(['id','created','updated','category','description','title','group','type','location','locationLink','status','slug','datetime','host','duration','uuid']);

export const RSVPSScalarFieldEnumSchema = z.enum(['id','uuid','user','meeting','value','type','created','updated']);

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

export const CategoriesSchema = z.object({
  id: z.number().int(),
  display: z.string(),
  slug: z.string(),
  uuid: z.string(),
  created: z.coerce.date(),
  updated: z.coerce.date(),
  description: z.string(),
})

export type Categories = z.infer<typeof CategoriesSchema>

/////////////////////////////////////////
// CATEGORIES PARTIAL SCHEMA
/////////////////////////////////////////

export const CategoriesPartialSchema = CategoriesSchema.partial()

export type CategoriesPartial = z.infer<typeof CategoriesPartialSchema>

/////////////////////////////////////////
// DECISIONS SCHEMA
/////////////////////////////////////////

export const DecisionsSchema = z.object({
  id: z.number().int(),
  created: z.coerce.date(),
  updated: z.coerce.date(),
})

export type Decisions = z.infer<typeof DecisionsSchema>

/////////////////////////////////////////
// DECISIONS PARTIAL SCHEMA
/////////////////////////////////////////

export const DecisionsPartialSchema = DecisionsSchema.partial()

export type DecisionsPartial = z.infer<typeof DecisionsPartialSchema>

/////////////////////////////////////////
// GROUPS SCHEMA
/////////////////////////////////////////

export const GroupsSchema = z.object({
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

export type Groups = z.infer<typeof GroupsSchema>

/////////////////////////////////////////
// GROUPS PARTIAL SCHEMA
/////////////////////////////////////////

export const GroupsPartialSchema = GroupsSchema.partial()

export type GroupsPartial = z.infer<typeof GroupsPartialSchema>

/////////////////////////////////////////
// MEETINGS SCHEMA
/////////////////////////////////////////

export const MeetingsSchema = z.object({
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

export type Meetings = z.infer<typeof MeetingsSchema>

/////////////////////////////////////////
// MEETINGS PARTIAL SCHEMA
/////////////////////////////////////////

export const MeetingsPartialSchema = MeetingsSchema.partial()

export type MeetingsPartial = z.infer<typeof MeetingsPartialSchema>

/////////////////////////////////////////
// RSVPS SCHEMA
/////////////////////////////////////////

export const RSVPSSchema = z.object({
  value: rsvp_statusSchema,
  type: rsvp_typeSchema,
  id: z.number().int(),
  uuid: z.string(),
  user: z.string(),
  meeting: z.string(),
  created: z.coerce.date(),
  updated: z.coerce.date(),
})

export type RSVPS = z.infer<typeof RSVPSSchema>

/////////////////////////////////////////
// RSVPS PARTIAL SCHEMA
/////////////////////////////////////////

export const RSVPSPartialSchema = RSVPSSchema.partial()

export type RSVPSPartial = z.infer<typeof RSVPSPartialSchema>

/////////////////////////////////////////
// USERS SCHEMA
/////////////////////////////////////////

export const UsersSchema = z.object({
  id: z.number().int(),
  type: z.string(),
  uuid: z.string(),
  created: z.coerce.date(),
  updated: z.coerce.date(),
})

export type Users = z.infer<typeof UsersSchema>

/////////////////////////////////////////
// USERS PARTIAL SCHEMA
/////////////////////////////////////////

export const UsersPartialSchema = UsersSchema.partial()

export type UsersPartial = z.infer<typeof UsersPartialSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// CATEGORIES
//------------------------------------------------------

export const CategoriesIncludeSchema: z.ZodType<Prisma.CategoriesInclude> = z.object({
  groups: z.union([z.boolean(),z.lazy(() => GroupsFindManyArgsSchema)]).optional(),
  meetings: z.union([z.boolean(),z.lazy(() => MeetingsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CategoriesCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CategoriesArgsSchema: z.ZodType<Prisma.CategoriesDefaultArgs> = z.object({
  select: z.lazy(() => CategoriesSelectSchema).optional(),
  include: z.lazy(() => CategoriesIncludeSchema).optional(),
}).strict();

export const CategoriesCountOutputTypeArgsSchema: z.ZodType<Prisma.CategoriesCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CategoriesCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CategoriesCountOutputTypeSelectSchema: z.ZodType<Prisma.CategoriesCountOutputTypeSelect> = z.object({
  groups: z.boolean().optional(),
  meetings: z.boolean().optional(),
}).strict();

export const CategoriesSelectSchema: z.ZodType<Prisma.CategoriesSelect> = z.object({
  id: z.boolean().optional(),
  display: z.boolean().optional(),
  slug: z.boolean().optional(),
  uuid: z.boolean().optional(),
  created: z.boolean().optional(),
  updated: z.boolean().optional(),
  description: z.boolean().optional(),
  groups: z.union([z.boolean(),z.lazy(() => GroupsFindManyArgsSchema)]).optional(),
  meetings: z.union([z.boolean(),z.lazy(() => MeetingsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CategoriesCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DECISIONS
//------------------------------------------------------

export const DecisionsSelectSchema: z.ZodType<Prisma.DecisionsSelect> = z.object({
  id: z.boolean().optional(),
  created: z.boolean().optional(),
  updated: z.boolean().optional(),
}).strict()

// GROUPS
//------------------------------------------------------

export const GroupsIncludeSchema: z.ZodType<Prisma.GroupsInclude> = z.object({
  categories: z.union([z.boolean(),z.lazy(() => CategoriesArgsSchema)]).optional(),
  meetings: z.union([z.boolean(),z.lazy(() => MeetingsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GroupsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const GroupsArgsSchema: z.ZodType<Prisma.GroupsDefaultArgs> = z.object({
  select: z.lazy(() => GroupsSelectSchema).optional(),
  include: z.lazy(() => GroupsIncludeSchema).optional(),
}).strict();

export const GroupsCountOutputTypeArgsSchema: z.ZodType<Prisma.GroupsCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => GroupsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const GroupsCountOutputTypeSelectSchema: z.ZodType<Prisma.GroupsCountOutputTypeSelect> = z.object({
  meetings: z.boolean().optional(),
}).strict();

export const GroupsSelectSchema: z.ZodType<Prisma.GroupsSelect> = z.object({
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
  categories: z.union([z.boolean(),z.lazy(() => CategoriesArgsSchema)]).optional(),
  meetings: z.union([z.boolean(),z.lazy(() => MeetingsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GroupsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// MEETINGS
//------------------------------------------------------

export const MeetingsIncludeSchema: z.ZodType<Prisma.MeetingsInclude> = z.object({
  categories: z.union([z.boolean(),z.lazy(() => CategoriesArgsSchema)]).optional(),
  groups: z.union([z.boolean(),z.lazy(() => GroupsArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
  rsvps: z.union([z.boolean(),z.lazy(() => RSVPSFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MeetingsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const MeetingsArgsSchema: z.ZodType<Prisma.MeetingsDefaultArgs> = z.object({
  select: z.lazy(() => MeetingsSelectSchema).optional(),
  include: z.lazy(() => MeetingsIncludeSchema).optional(),
}).strict();

export const MeetingsCountOutputTypeArgsSchema: z.ZodType<Prisma.MeetingsCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => MeetingsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const MeetingsCountOutputTypeSelectSchema: z.ZodType<Prisma.MeetingsCountOutputTypeSelect> = z.object({
  rsvps: z.boolean().optional(),
}).strict();

export const MeetingsSelectSchema: z.ZodType<Prisma.MeetingsSelect> = z.object({
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
  categories: z.union([z.boolean(),z.lazy(() => CategoriesArgsSchema)]).optional(),
  groups: z.union([z.boolean(),z.lazy(() => GroupsArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
  rsvps: z.union([z.boolean(),z.lazy(() => RSVPSFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MeetingsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// RSVPS
//------------------------------------------------------

export const RSVPSIncludeSchema: z.ZodType<Prisma.RSVPSInclude> = z.object({
  meetings: z.union([z.boolean(),z.lazy(() => MeetingsArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
}).strict()

export const RSVPSArgsSchema: z.ZodType<Prisma.RSVPSDefaultArgs> = z.object({
  select: z.lazy(() => RSVPSSelectSchema).optional(),
  include: z.lazy(() => RSVPSIncludeSchema).optional(),
}).strict();

export const RSVPSSelectSchema: z.ZodType<Prisma.RSVPSSelect> = z.object({
  id: z.boolean().optional(),
  uuid: z.boolean().optional(),
  user: z.boolean().optional(),
  meeting: z.boolean().optional(),
  value: z.boolean().optional(),
  type: z.boolean().optional(),
  created: z.boolean().optional(),
  updated: z.boolean().optional(),
  meetings: z.union([z.boolean(),z.lazy(() => MeetingsArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
}).strict()

// USERS
//------------------------------------------------------

export const UsersIncludeSchema: z.ZodType<Prisma.UsersInclude> = z.object({
  meetings: z.union([z.boolean(),z.lazy(() => MeetingsFindManyArgsSchema)]).optional(),
  rsvps: z.union([z.boolean(),z.lazy(() => RSVPSFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UsersCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UsersArgsSchema: z.ZodType<Prisma.UsersDefaultArgs> = z.object({
  select: z.lazy(() => UsersSelectSchema).optional(),
  include: z.lazy(() => UsersIncludeSchema).optional(),
}).strict();

export const UsersCountOutputTypeArgsSchema: z.ZodType<Prisma.UsersCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UsersCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UsersCountOutputTypeSelectSchema: z.ZodType<Prisma.UsersCountOutputTypeSelect> = z.object({
  meetings: z.boolean().optional(),
  rsvps: z.boolean().optional(),
}).strict();

export const UsersSelectSchema: z.ZodType<Prisma.UsersSelect> = z.object({
  id: z.boolean().optional(),
  type: z.boolean().optional(),
  uuid: z.boolean().optional(),
  created: z.boolean().optional(),
  updated: z.boolean().optional(),
  meetings: z.union([z.boolean(),z.lazy(() => MeetingsFindManyArgsSchema)]).optional(),
  rsvps: z.union([z.boolean(),z.lazy(() => RSVPSFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UsersCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const CategoriesWhereInputSchema: z.ZodType<Prisma.CategoriesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CategoriesWhereInputSchema),z.lazy(() => CategoriesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoriesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoriesWhereInputSchema),z.lazy(() => CategoriesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  display: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  uuid: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  groups: z.lazy(() => GroupsListRelationFilterSchema).optional(),
  meetings: z.lazy(() => MeetingsListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.CategoriesWhereInput>;

export const CategoriesOrderByWithRelationInputSchema: z.ZodType<Prisma.CategoriesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  groups: z.lazy(() => GroupsOrderByRelationAggregateInputSchema).optional(),
  meetings: z.lazy(() => MeetingsOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.CategoriesOrderByWithRelationInput>;

export const CategoriesWhereUniqueInputSchema: z.ZodType<Prisma.CategoriesWhereUniqueInput> = z.union([
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
  AND: z.union([ z.lazy(() => CategoriesWhereInputSchema),z.lazy(() => CategoriesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoriesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoriesWhereInputSchema),z.lazy(() => CategoriesWhereInputSchema).array() ]).optional(),
  display: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  groups: z.lazy(() => GroupsListRelationFilterSchema).optional(),
  meetings: z.lazy(() => MeetingsListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.CategoriesWhereUniqueInput>;

export const CategoriesOrderByWithAggregationInputSchema: z.ZodType<Prisma.CategoriesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CategoriesCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CategoriesAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CategoriesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CategoriesMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CategoriesSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.CategoriesOrderByWithAggregationInput>;

export const CategoriesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CategoriesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CategoriesScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoriesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoriesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoriesScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoriesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  display: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  uuid: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict() as z.ZodType<Prisma.CategoriesScalarWhereWithAggregatesInput>;

export const DecisionsWhereInputSchema: z.ZodType<Prisma.DecisionsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DecisionsWhereInputSchema),z.lazy(() => DecisionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DecisionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DecisionsWhereInputSchema),z.lazy(() => DecisionsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.DecisionsWhereInput>;

export const DecisionsOrderByWithRelationInputSchema: z.ZodType<Prisma.DecisionsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.DecisionsOrderByWithRelationInput>;

export const DecisionsWhereUniqueInputSchema: z.ZodType<Prisma.DecisionsWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => DecisionsWhereInputSchema),z.lazy(() => DecisionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DecisionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DecisionsWhereInputSchema),z.lazy(() => DecisionsWhereInputSchema).array() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict()) as z.ZodType<Prisma.DecisionsWhereUniqueInput>;

export const DecisionsOrderByWithAggregationInputSchema: z.ZodType<Prisma.DecisionsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DecisionsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => DecisionsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DecisionsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DecisionsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => DecisionsSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.DecisionsOrderByWithAggregationInput>;

export const DecisionsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DecisionsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DecisionsScalarWhereWithAggregatesInputSchema),z.lazy(() => DecisionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DecisionsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DecisionsScalarWhereWithAggregatesInputSchema),z.lazy(() => DecisionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.DecisionsScalarWhereWithAggregatesInput>;

export const GroupsWhereInputSchema: z.ZodType<Prisma.GroupsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GroupsWhereInputSchema),z.lazy(() => GroupsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GroupsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GroupsWhereInputSchema),z.lazy(() => GroupsWhereInputSchema).array() ]).optional(),
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
  categories: z.union([ z.lazy(() => CategoriesRelationFilterSchema),z.lazy(() => CategoriesWhereInputSchema) ]).optional(),
  meetings: z.lazy(() => MeetingsListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.GroupsWhereInput>;

export const GroupsOrderByWithRelationInputSchema: z.ZodType<Prisma.GroupsOrderByWithRelationInput> = z.object({
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
  categories: z.lazy(() => CategoriesOrderByWithRelationInputSchema).optional(),
  meetings: z.lazy(() => MeetingsOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.GroupsOrderByWithRelationInput>;

export const GroupsWhereUniqueInputSchema: z.ZodType<Prisma.GroupsWhereUniqueInput> = z.union([
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
  AND: z.union([ z.lazy(() => GroupsWhereInputSchema),z.lazy(() => GroupsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GroupsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GroupsWhereInputSchema),z.lazy(() => GroupsWhereInputSchema).array() ]).optional(),
  category: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  memberName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  modName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  privacyType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  categories: z.union([ z.lazy(() => CategoriesRelationFilterSchema),z.lazy(() => CategoriesWhereInputSchema) ]).optional(),
  meetings: z.lazy(() => MeetingsListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.GroupsWhereUniqueInput>;

export const GroupsOrderByWithAggregationInputSchema: z.ZodType<Prisma.GroupsOrderByWithAggregationInput> = z.object({
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
  _count: z.lazy(() => GroupsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => GroupsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => GroupsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => GroupsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => GroupsSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.GroupsOrderByWithAggregationInput>;

export const GroupsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.GroupsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => GroupsScalarWhereWithAggregatesInputSchema),z.lazy(() => GroupsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => GroupsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GroupsScalarWhereWithAggregatesInputSchema),z.lazy(() => GroupsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
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
}).strict() as z.ZodType<Prisma.GroupsScalarWhereWithAggregatesInput>;

export const MeetingsWhereInputSchema: z.ZodType<Prisma.MeetingsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MeetingsWhereInputSchema),z.lazy(() => MeetingsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MeetingsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MeetingsWhereInputSchema),z.lazy(() => MeetingsWhereInputSchema).array() ]).optional(),
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
  categories: z.union([ z.lazy(() => CategoriesRelationFilterSchema),z.lazy(() => CategoriesWhereInputSchema) ]).optional(),
  groups: z.union([ z.lazy(() => GroupsRelationFilterSchema),z.lazy(() => GroupsWhereInputSchema) ]).optional(),
  users: z.union([ z.lazy(() => UsersRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional(),
  rsvps: z.lazy(() => RSVPSListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.MeetingsWhereInput>;

export const MeetingsOrderByWithRelationInputSchema: z.ZodType<Prisma.MeetingsOrderByWithRelationInput> = z.object({
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
  categories: z.lazy(() => CategoriesOrderByWithRelationInputSchema).optional(),
  groups: z.lazy(() => GroupsOrderByWithRelationInputSchema).optional(),
  users: z.lazy(() => UsersOrderByWithRelationInputSchema).optional(),
  rsvps: z.lazy(() => RSVPSOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.MeetingsOrderByWithRelationInput>;

export const MeetingsWhereUniqueInputSchema: z.ZodType<Prisma.MeetingsWhereUniqueInput> = z.union([
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
  AND: z.union([ z.lazy(() => MeetingsWhereInputSchema),z.lazy(() => MeetingsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MeetingsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MeetingsWhereInputSchema),z.lazy(() => MeetingsWhereInputSchema).array() ]).optional(),
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
  categories: z.union([ z.lazy(() => CategoriesRelationFilterSchema),z.lazy(() => CategoriesWhereInputSchema) ]).optional(),
  groups: z.union([ z.lazy(() => GroupsRelationFilterSchema),z.lazy(() => GroupsWhereInputSchema) ]).optional(),
  users: z.union([ z.lazy(() => UsersRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional(),
  rsvps: z.lazy(() => RSVPSListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.MeetingsWhereUniqueInput>;

export const MeetingsOrderByWithAggregationInputSchema: z.ZodType<Prisma.MeetingsOrderByWithAggregationInput> = z.object({
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
  _count: z.lazy(() => MeetingsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MeetingsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MeetingsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MeetingsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MeetingsSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.MeetingsOrderByWithAggregationInput>;

export const MeetingsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MeetingsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MeetingsScalarWhereWithAggregatesInputSchema),z.lazy(() => MeetingsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MeetingsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MeetingsScalarWhereWithAggregatesInputSchema),z.lazy(() => MeetingsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
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
}).strict() as z.ZodType<Prisma.MeetingsScalarWhereWithAggregatesInput>;

export const RSVPSWhereInputSchema: z.ZodType<Prisma.RSVPSWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RSVPSWhereInputSchema),z.lazy(() => RSVPSWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RSVPSWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RSVPSWhereInputSchema),z.lazy(() => RSVPSWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  uuid: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  meeting: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => Enumrsvp_statusFilterSchema),z.lazy(() => rsvp_statusSchema) ]).optional(),
  type: z.union([ z.lazy(() => Enumrsvp_typeFilterSchema),z.lazy(() => rsvp_typeSchema) ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  meetings: z.union([ z.lazy(() => MeetingsRelationFilterSchema),z.lazy(() => MeetingsWhereInputSchema) ]).optional(),
  users: z.union([ z.lazy(() => UsersRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.RSVPSWhereInput>;

export const RSVPSOrderByWithRelationInputSchema: z.ZodType<Prisma.RSVPSOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => SortOrderSchema).optional(),
  meeting: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  meetings: z.lazy(() => MeetingsOrderByWithRelationInputSchema).optional(),
  users: z.lazy(() => UsersOrderByWithRelationInputSchema).optional()
}).strict() as z.ZodType<Prisma.RSVPSOrderByWithRelationInput>;

export const RSVPSWhereUniqueInputSchema: z.ZodType<Prisma.RSVPSWhereUniqueInput> = z.union([
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
  AND: z.union([ z.lazy(() => RSVPSWhereInputSchema),z.lazy(() => RSVPSWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RSVPSWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RSVPSWhereInputSchema),z.lazy(() => RSVPSWhereInputSchema).array() ]).optional(),
  user: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  meeting: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => Enumrsvp_statusFilterSchema),z.lazy(() => rsvp_statusSchema) ]).optional(),
  type: z.union([ z.lazy(() => Enumrsvp_typeFilterSchema),z.lazy(() => rsvp_typeSchema) ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  meetings: z.union([ z.lazy(() => MeetingsRelationFilterSchema),z.lazy(() => MeetingsWhereInputSchema) ]).optional(),
  users: z.union([ z.lazy(() => UsersRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional(),
}).strict()) as z.ZodType<Prisma.RSVPSWhereUniqueInput>;

export const RSVPSOrderByWithAggregationInputSchema: z.ZodType<Prisma.RSVPSOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => SortOrderSchema).optional(),
  meeting: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RSVPSCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RSVPSAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RSVPSMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RSVPSMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RSVPSSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.RSVPSOrderByWithAggregationInput>;

export const RSVPSScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RSVPSScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RSVPSScalarWhereWithAggregatesInputSchema),z.lazy(() => RSVPSScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RSVPSScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RSVPSScalarWhereWithAggregatesInputSchema),z.lazy(() => RSVPSScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  uuid: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  meeting: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => Enumrsvp_statusWithAggregatesFilterSchema),z.lazy(() => rsvp_statusSchema) ]).optional(),
  type: z.union([ z.lazy(() => Enumrsvp_typeWithAggregatesFilterSchema),z.lazy(() => rsvp_typeSchema) ]).optional(),
  created: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.RSVPSScalarWhereWithAggregatesInput>;

export const UsersWhereInputSchema: z.ZodType<Prisma.UsersWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UsersWhereInputSchema),z.lazy(() => UsersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsersWhereInputSchema),z.lazy(() => UsersWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  uuid: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  meetings: z.lazy(() => MeetingsListRelationFilterSchema).optional(),
  rsvps: z.lazy(() => RSVPSListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.UsersWhereInput>;

export const UsersOrderByWithRelationInputSchema: z.ZodType<Prisma.UsersOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  meetings: z.lazy(() => MeetingsOrderByRelationAggregateInputSchema).optional(),
  rsvps: z.lazy(() => RSVPSOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.UsersOrderByWithRelationInput>;

export const UsersWhereUniqueInputSchema: z.ZodType<Prisma.UsersWhereUniqueInput> = z.union([
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
  AND: z.union([ z.lazy(() => UsersWhereInputSchema),z.lazy(() => UsersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsersWhereInputSchema),z.lazy(() => UsersWhereInputSchema).array() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  meetings: z.lazy(() => MeetingsListRelationFilterSchema).optional(),
  rsvps: z.lazy(() => RSVPSListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.UsersWhereUniqueInput>;

export const UsersOrderByWithAggregationInputSchema: z.ZodType<Prisma.UsersOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UsersCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UsersAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UsersMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UsersMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UsersSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.UsersOrderByWithAggregationInput>;

export const UsersScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UsersScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UsersScalarWhereWithAggregatesInputSchema),z.lazy(() => UsersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsersScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsersScalarWhereWithAggregatesInputSchema),z.lazy(() => UsersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  uuid: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.UsersScalarWhereWithAggregatesInput>;

export const CategoriesCreateInputSchema: z.ZodType<Prisma.CategoriesCreateInput> = z.object({
  display: z.string().optional(),
  slug: z.string().optional(),
  uuid: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  description: z.string().optional(),
  groups: z.lazy(() => GroupsCreateNestedManyWithoutCategoriesInputSchema).optional(),
  meetings: z.lazy(() => MeetingsCreateNestedManyWithoutCategoriesInputSchema).optional()
}).strict() as z.ZodType<Prisma.CategoriesCreateInput>;

export const CategoriesUncheckedCreateInputSchema: z.ZodType<Prisma.CategoriesUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  display: z.string().optional(),
  slug: z.string().optional(),
  uuid: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  description: z.string().optional(),
  groups: z.lazy(() => GroupsUncheckedCreateNestedManyWithoutCategoriesInputSchema).optional(),
  meetings: z.lazy(() => MeetingsUncheckedCreateNestedManyWithoutCategoriesInputSchema).optional()
}).strict() as z.ZodType<Prisma.CategoriesUncheckedCreateInput>;

export const CategoriesUpdateInputSchema: z.ZodType<Prisma.CategoriesUpdateInput> = z.object({
  display: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  groups: z.lazy(() => GroupsUpdateManyWithoutCategoriesNestedInputSchema).optional(),
  meetings: z.lazy(() => MeetingsUpdateManyWithoutCategoriesNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CategoriesUpdateInput>;

export const CategoriesUncheckedUpdateInputSchema: z.ZodType<Prisma.CategoriesUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  display: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  groups: z.lazy(() => GroupsUncheckedUpdateManyWithoutCategoriesNestedInputSchema).optional(),
  meetings: z.lazy(() => MeetingsUncheckedUpdateManyWithoutCategoriesNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CategoriesUncheckedUpdateInput>;

export const CategoriesCreateManyInputSchema: z.ZodType<Prisma.CategoriesCreateManyInput> = z.object({
  id: z.number().int().optional(),
  display: z.string().optional(),
  slug: z.string().optional(),
  uuid: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  description: z.string().optional()
}).strict() as z.ZodType<Prisma.CategoriesCreateManyInput>;

export const CategoriesUpdateManyMutationInputSchema: z.ZodType<Prisma.CategoriesUpdateManyMutationInput> = z.object({
  display: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CategoriesUpdateManyMutationInput>;

export const CategoriesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CategoriesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  display: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CategoriesUncheckedUpdateManyInput>;

export const DecisionsCreateInputSchema: z.ZodType<Prisma.DecisionsCreateInput> = z.object({
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.DecisionsCreateInput>;

export const DecisionsUncheckedCreateInputSchema: z.ZodType<Prisma.DecisionsUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.DecisionsUncheckedCreateInput>;

export const DecisionsUpdateInputSchema: z.ZodType<Prisma.DecisionsUpdateInput> = z.object({
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.DecisionsUpdateInput>;

export const DecisionsUncheckedUpdateInputSchema: z.ZodType<Prisma.DecisionsUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.DecisionsUncheckedUpdateInput>;

export const DecisionsCreateManyInputSchema: z.ZodType<Prisma.DecisionsCreateManyInput> = z.object({
  id: z.number().int().optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.DecisionsCreateManyInput>;

export const DecisionsUpdateManyMutationInputSchema: z.ZodType<Prisma.DecisionsUpdateManyMutationInput> = z.object({
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.DecisionsUpdateManyMutationInput>;

export const DecisionsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DecisionsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.DecisionsUncheckedUpdateManyInput>;

export const GroupsCreateInputSchema: z.ZodType<Prisma.GroupsCreateInput> = z.object({
  description: z.string().optional(),
  memberName: z.string().optional(),
  modName: z.string().optional(),
  privacyType: z.string().optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  uuid: z.string().optional().nullable(),
  name: z.string().optional(),
  categories: z.lazy(() => CategoriesCreateNestedOneWithoutGroupsInputSchema).optional(),
  meetings: z.lazy(() => MeetingsCreateNestedManyWithoutGroupsInputSchema).optional()
}).strict() as z.ZodType<Prisma.GroupsCreateInput>;

export const GroupsUncheckedCreateInputSchema: z.ZodType<Prisma.GroupsUncheckedCreateInput> = z.object({
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
  meetings: z.lazy(() => MeetingsUncheckedCreateNestedManyWithoutGroupsInputSchema).optional()
}).strict() as z.ZodType<Prisma.GroupsUncheckedCreateInput>;

export const GroupsUpdateInputSchema: z.ZodType<Prisma.GroupsUpdateInput> = z.object({
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  memberName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  privacyType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categories: z.lazy(() => CategoriesUpdateOneRequiredWithoutGroupsNestedInputSchema).optional(),
  meetings: z.lazy(() => MeetingsUpdateManyWithoutGroupsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.GroupsUpdateInput>;

export const GroupsUncheckedUpdateInputSchema: z.ZodType<Prisma.GroupsUncheckedUpdateInput> = z.object({
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
  meetings: z.lazy(() => MeetingsUncheckedUpdateManyWithoutGroupsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.GroupsUncheckedUpdateInput>;

export const GroupsCreateManyInputSchema: z.ZodType<Prisma.GroupsCreateManyInput> = z.object({
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
}).strict() as z.ZodType<Prisma.GroupsCreateManyInput>;

export const GroupsUpdateManyMutationInputSchema: z.ZodType<Prisma.GroupsUpdateManyMutationInput> = z.object({
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  memberName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  privacyType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.GroupsUpdateManyMutationInput>;

export const GroupsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.GroupsUncheckedUpdateManyInput> = z.object({
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
}).strict() as z.ZodType<Prisma.GroupsUncheckedUpdateManyInput>;

export const MeetingsCreateInputSchema: z.ZodType<Prisma.MeetingsCreateInput> = z.object({
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
  categories: z.lazy(() => CategoriesCreateNestedOneWithoutMeetingsInputSchema).optional(),
  groups: z.lazy(() => GroupsCreateNestedOneWithoutMeetingsInputSchema),
  users: z.lazy(() => UsersCreateNestedOneWithoutMeetingsInputSchema),
  rsvps: z.lazy(() => RSVPSCreateNestedManyWithoutMeetingsInputSchema).optional()
}).strict() as z.ZodType<Prisma.MeetingsCreateInput>;

export const MeetingsUncheckedCreateInputSchema: z.ZodType<Prisma.MeetingsUncheckedCreateInput> = z.object({
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
  rsvps: z.lazy(() => RSVPSUncheckedCreateNestedManyWithoutMeetingsInputSchema).optional()
}).strict() as z.ZodType<Prisma.MeetingsUncheckedCreateInput>;

export const MeetingsUpdateInputSchema: z.ZodType<Prisma.MeetingsUpdateInput> = z.object({
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
  categories: z.lazy(() => CategoriesUpdateOneRequiredWithoutMeetingsNestedInputSchema).optional(),
  groups: z.lazy(() => GroupsUpdateOneRequiredWithoutMeetingsNestedInputSchema).optional(),
  users: z.lazy(() => UsersUpdateOneRequiredWithoutMeetingsNestedInputSchema).optional(),
  rsvps: z.lazy(() => RSVPSUpdateManyWithoutMeetingsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.MeetingsUpdateInput>;

export const MeetingsUncheckedUpdateInputSchema: z.ZodType<Prisma.MeetingsUncheckedUpdateInput> = z.object({
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
  rsvps: z.lazy(() => RSVPSUncheckedUpdateManyWithoutMeetingsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.MeetingsUncheckedUpdateInput>;

export const MeetingsCreateManyInputSchema: z.ZodType<Prisma.MeetingsCreateManyInput> = z.object({
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
}).strict() as z.ZodType<Prisma.MeetingsCreateManyInput>;

export const MeetingsUpdateManyMutationInputSchema: z.ZodType<Prisma.MeetingsUpdateManyMutationInput> = z.object({
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
}).strict() as z.ZodType<Prisma.MeetingsUpdateManyMutationInput>;

export const MeetingsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MeetingsUncheckedUpdateManyInput> = z.object({
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
}).strict() as z.ZodType<Prisma.MeetingsUncheckedUpdateManyInput>;

export const RSVPSCreateInputSchema: z.ZodType<Prisma.RSVPSCreateInput> = z.object({
  uuid: z.string(),
  value: z.lazy(() => rsvp_statusSchema).optional(),
  type: z.lazy(() => rsvp_typeSchema).optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  meetings: z.lazy(() => MeetingsCreateNestedOneWithoutRsvpsInputSchema),
  users: z.lazy(() => UsersCreateNestedOneWithoutRsvpsInputSchema)
}).strict() as z.ZodType<Prisma.RSVPSCreateInput>;

export const RSVPSUncheckedCreateInputSchema: z.ZodType<Prisma.RSVPSUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  uuid: z.string(),
  user: z.string(),
  meeting: z.string(),
  value: z.lazy(() => rsvp_statusSchema).optional(),
  type: z.lazy(() => rsvp_typeSchema).optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.RSVPSUncheckedCreateInput>;

export const RSVPSUpdateInputSchema: z.ZodType<Prisma.RSVPSUpdateInput> = z.object({
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.lazy(() => rsvp_statusSchema),z.lazy(() => Enumrsvp_statusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => rsvp_typeSchema),z.lazy(() => Enumrsvp_typeFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meetings: z.lazy(() => MeetingsUpdateOneRequiredWithoutRsvpsNestedInputSchema).optional(),
  users: z.lazy(() => UsersUpdateOneRequiredWithoutRsvpsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.RSVPSUpdateInput>;

export const RSVPSUncheckedUpdateInputSchema: z.ZodType<Prisma.RSVPSUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meeting: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.lazy(() => rsvp_statusSchema),z.lazy(() => Enumrsvp_statusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => rsvp_typeSchema),z.lazy(() => Enumrsvp_typeFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.RSVPSUncheckedUpdateInput>;

export const RSVPSCreateManyInputSchema: z.ZodType<Prisma.RSVPSCreateManyInput> = z.object({
  id: z.number().int().optional(),
  uuid: z.string(),
  user: z.string(),
  meeting: z.string(),
  value: z.lazy(() => rsvp_statusSchema).optional(),
  type: z.lazy(() => rsvp_typeSchema).optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.RSVPSCreateManyInput>;

export const RSVPSUpdateManyMutationInputSchema: z.ZodType<Prisma.RSVPSUpdateManyMutationInput> = z.object({
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.lazy(() => rsvp_statusSchema),z.lazy(() => Enumrsvp_statusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => rsvp_typeSchema),z.lazy(() => Enumrsvp_typeFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.RSVPSUpdateManyMutationInput>;

export const RSVPSUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RSVPSUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meeting: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.lazy(() => rsvp_statusSchema),z.lazy(() => Enumrsvp_statusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => rsvp_typeSchema),z.lazy(() => Enumrsvp_typeFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.RSVPSUncheckedUpdateManyInput>;

export const UsersCreateInputSchema: z.ZodType<Prisma.UsersCreateInput> = z.object({
  type: z.string().optional(),
  uuid: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  meetings: z.lazy(() => MeetingsCreateNestedManyWithoutUsersInputSchema).optional(),
  rsvps: z.lazy(() => RSVPSCreateNestedManyWithoutUsersInputSchema).optional()
}).strict() as z.ZodType<Prisma.UsersCreateInput>;

export const UsersUncheckedCreateInputSchema: z.ZodType<Prisma.UsersUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  type: z.string().optional(),
  uuid: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  meetings: z.lazy(() => MeetingsUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  rsvps: z.lazy(() => RSVPSUncheckedCreateNestedManyWithoutUsersInputSchema).optional()
}).strict() as z.ZodType<Prisma.UsersUncheckedCreateInput>;

export const UsersUpdateInputSchema: z.ZodType<Prisma.UsersUpdateInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meetings: z.lazy(() => MeetingsUpdateManyWithoutUsersNestedInputSchema).optional(),
  rsvps: z.lazy(() => RSVPSUpdateManyWithoutUsersNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UsersUpdateInput>;

export const UsersUncheckedUpdateInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meetings: z.lazy(() => MeetingsUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  rsvps: z.lazy(() => RSVPSUncheckedUpdateManyWithoutUsersNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UsersUncheckedUpdateInput>;

export const UsersCreateManyInputSchema: z.ZodType<Prisma.UsersCreateManyInput> = z.object({
  id: z.number().int().optional(),
  type: z.string().optional(),
  uuid: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.UsersCreateManyInput>;

export const UsersUpdateManyMutationInputSchema: z.ZodType<Prisma.UsersUpdateManyMutationInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UsersUpdateManyMutationInput>;

export const UsersUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UsersUncheckedUpdateManyInput>;

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
  every: z.lazy(() => GroupsWhereInputSchema).optional(),
  some: z.lazy(() => GroupsWhereInputSchema).optional(),
  none: z.lazy(() => GroupsWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.GroupsListRelationFilter>;

export const MeetingsListRelationFilterSchema: z.ZodType<Prisma.MeetingsListRelationFilter> = z.object({
  every: z.lazy(() => MeetingsWhereInputSchema).optional(),
  some: z.lazy(() => MeetingsWhereInputSchema).optional(),
  none: z.lazy(() => MeetingsWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.MeetingsListRelationFilter>;

export const GroupsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.GroupsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.GroupsOrderByRelationAggregateInput>;

export const MeetingsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MeetingsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.MeetingsOrderByRelationAggregateInput>;

export const CategoriesCountOrderByAggregateInputSchema: z.ZodType<Prisma.CategoriesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CategoriesCountOrderByAggregateInput>;

export const CategoriesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CategoriesAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CategoriesAvgOrderByAggregateInput>;

export const CategoriesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CategoriesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CategoriesMaxOrderByAggregateInput>;

export const CategoriesMinOrderByAggregateInputSchema: z.ZodType<Prisma.CategoriesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  display: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CategoriesMinOrderByAggregateInput>;

export const CategoriesSumOrderByAggregateInputSchema: z.ZodType<Prisma.CategoriesSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CategoriesSumOrderByAggregateInput>;

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

export const DecisionsCountOrderByAggregateInputSchema: z.ZodType<Prisma.DecisionsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.DecisionsCountOrderByAggregateInput>;

export const DecisionsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.DecisionsAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.DecisionsAvgOrderByAggregateInput>;

export const DecisionsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DecisionsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.DecisionsMaxOrderByAggregateInput>;

export const DecisionsMinOrderByAggregateInputSchema: z.ZodType<Prisma.DecisionsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.DecisionsMinOrderByAggregateInput>;

export const DecisionsSumOrderByAggregateInputSchema: z.ZodType<Prisma.DecisionsSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.DecisionsSumOrderByAggregateInput>;

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
  is: z.lazy(() => CategoriesWhereInputSchema).optional(),
  isNot: z.lazy(() => CategoriesWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.CategoriesRelationFilter>;

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict() as z.ZodType<Prisma.SortOrderInput>;

export const GroupsCountOrderByAggregateInputSchema: z.ZodType<Prisma.GroupsCountOrderByAggregateInput> = z.object({
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
}).strict() as z.ZodType<Prisma.GroupsCountOrderByAggregateInput>;

export const GroupsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.GroupsAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.GroupsAvgOrderByAggregateInput>;

export const GroupsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.GroupsMaxOrderByAggregateInput> = z.object({
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
}).strict() as z.ZodType<Prisma.GroupsMaxOrderByAggregateInput>;

export const GroupsMinOrderByAggregateInputSchema: z.ZodType<Prisma.GroupsMinOrderByAggregateInput> = z.object({
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
}).strict() as z.ZodType<Prisma.GroupsMinOrderByAggregateInput>;

export const GroupsSumOrderByAggregateInputSchema: z.ZodType<Prisma.GroupsSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.GroupsSumOrderByAggregateInput>;

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
  is: z.lazy(() => GroupsWhereInputSchema).optional(),
  isNot: z.lazy(() => GroupsWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.GroupsRelationFilter>;

export const UsersRelationFilterSchema: z.ZodType<Prisma.UsersRelationFilter> = z.object({
  is: z.lazy(() => UsersWhereInputSchema).optional(),
  isNot: z.lazy(() => UsersWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.UsersRelationFilter>;

export const RSVPSListRelationFilterSchema: z.ZodType<Prisma.RSVPSListRelationFilter> = z.object({
  every: z.lazy(() => RSVPSWhereInputSchema).optional(),
  some: z.lazy(() => RSVPSWhereInputSchema).optional(),
  none: z.lazy(() => RSVPSWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.RSVPSListRelationFilter>;

export const RSVPSOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RSVPSOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.RSVPSOrderByRelationAggregateInput>;

export const MeetingsCountOrderByAggregateInputSchema: z.ZodType<Prisma.MeetingsCountOrderByAggregateInput> = z.object({
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
}).strict() as z.ZodType<Prisma.MeetingsCountOrderByAggregateInput>;

export const MeetingsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MeetingsAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.MeetingsAvgOrderByAggregateInput>;

export const MeetingsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MeetingsMaxOrderByAggregateInput> = z.object({
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
}).strict() as z.ZodType<Prisma.MeetingsMaxOrderByAggregateInput>;

export const MeetingsMinOrderByAggregateInputSchema: z.ZodType<Prisma.MeetingsMinOrderByAggregateInput> = z.object({
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
}).strict() as z.ZodType<Prisma.MeetingsMinOrderByAggregateInput>;

export const MeetingsSumOrderByAggregateInputSchema: z.ZodType<Prisma.MeetingsSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.MeetingsSumOrderByAggregateInput>;

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
  is: z.lazy(() => MeetingsWhereInputSchema).optional(),
  isNot: z.lazy(() => MeetingsWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.MeetingsRelationFilter>;

export const RSVPSCountOrderByAggregateInputSchema: z.ZodType<Prisma.RSVPSCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => SortOrderSchema).optional(),
  meeting: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.RSVPSCountOrderByAggregateInput>;

export const RSVPSAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RSVPSAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.RSVPSAvgOrderByAggregateInput>;

export const RSVPSMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RSVPSMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => SortOrderSchema).optional(),
  meeting: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.RSVPSMaxOrderByAggregateInput>;

export const RSVPSMinOrderByAggregateInputSchema: z.ZodType<Prisma.RSVPSMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => SortOrderSchema).optional(),
  meeting: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.RSVPSMinOrderByAggregateInput>;

export const RSVPSSumOrderByAggregateInputSchema: z.ZodType<Prisma.RSVPSSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.RSVPSSumOrderByAggregateInput>;

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

export const UsersCountOrderByAggregateInputSchema: z.ZodType<Prisma.UsersCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.UsersCountOrderByAggregateInput>;

export const UsersAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UsersAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.UsersAvgOrderByAggregateInput>;

export const UsersMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UsersMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.UsersMaxOrderByAggregateInput>;

export const UsersMinOrderByAggregateInputSchema: z.ZodType<Prisma.UsersMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.UsersMinOrderByAggregateInput>;

export const UsersSumOrderByAggregateInputSchema: z.ZodType<Prisma.UsersSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.UsersSumOrderByAggregateInput>;

export const GroupsCreateNestedManyWithoutCategoriesInputSchema: z.ZodType<Prisma.GroupsCreateNestedManyWithoutCategoriesInput> = z.object({
  create: z.union([ z.lazy(() => GroupsCreateWithoutCategoriesInputSchema),z.lazy(() => GroupsCreateWithoutCategoriesInputSchema).array(),z.lazy(() => GroupsUncheckedCreateWithoutCategoriesInputSchema),z.lazy(() => GroupsUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GroupsCreateOrConnectWithoutCategoriesInputSchema),z.lazy(() => GroupsCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GroupsCreateManyCategoriesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => GroupsWhereUniqueInputSchema),z.lazy(() => GroupsWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.GroupsCreateNestedManyWithoutCategoriesInput>;

export const MeetingsCreateNestedManyWithoutCategoriesInputSchema: z.ZodType<Prisma.MeetingsCreateNestedManyWithoutCategoriesInput> = z.object({
  create: z.union([ z.lazy(() => MeetingsCreateWithoutCategoriesInputSchema),z.lazy(() => MeetingsCreateWithoutCategoriesInputSchema).array(),z.lazy(() => MeetingsUncheckedCreateWithoutCategoriesInputSchema),z.lazy(() => MeetingsUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MeetingsCreateOrConnectWithoutCategoriesInputSchema),z.lazy(() => MeetingsCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MeetingsCreateManyCategoriesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.MeetingsCreateNestedManyWithoutCategoriesInput>;

export const GroupsUncheckedCreateNestedManyWithoutCategoriesInputSchema: z.ZodType<Prisma.GroupsUncheckedCreateNestedManyWithoutCategoriesInput> = z.object({
  create: z.union([ z.lazy(() => GroupsCreateWithoutCategoriesInputSchema),z.lazy(() => GroupsCreateWithoutCategoriesInputSchema).array(),z.lazy(() => GroupsUncheckedCreateWithoutCategoriesInputSchema),z.lazy(() => GroupsUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GroupsCreateOrConnectWithoutCategoriesInputSchema),z.lazy(() => GroupsCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GroupsCreateManyCategoriesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => GroupsWhereUniqueInputSchema),z.lazy(() => GroupsWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.GroupsUncheckedCreateNestedManyWithoutCategoriesInput>;

export const MeetingsUncheckedCreateNestedManyWithoutCategoriesInputSchema: z.ZodType<Prisma.MeetingsUncheckedCreateNestedManyWithoutCategoriesInput> = z.object({
  create: z.union([ z.lazy(() => MeetingsCreateWithoutCategoriesInputSchema),z.lazy(() => MeetingsCreateWithoutCategoriesInputSchema).array(),z.lazy(() => MeetingsUncheckedCreateWithoutCategoriesInputSchema),z.lazy(() => MeetingsUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MeetingsCreateOrConnectWithoutCategoriesInputSchema),z.lazy(() => MeetingsCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MeetingsCreateManyCategoriesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.MeetingsUncheckedCreateNestedManyWithoutCategoriesInput>;

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict() as z.ZodType<Prisma.StringFieldUpdateOperationsInput>;

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput>;

export const GroupsUpdateManyWithoutCategoriesNestedInputSchema: z.ZodType<Prisma.GroupsUpdateManyWithoutCategoriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => GroupsCreateWithoutCategoriesInputSchema),z.lazy(() => GroupsCreateWithoutCategoriesInputSchema).array(),z.lazy(() => GroupsUncheckedCreateWithoutCategoriesInputSchema),z.lazy(() => GroupsUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GroupsCreateOrConnectWithoutCategoriesInputSchema),z.lazy(() => GroupsCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GroupsUpsertWithWhereUniqueWithoutCategoriesInputSchema),z.lazy(() => GroupsUpsertWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GroupsCreateManyCategoriesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => GroupsWhereUniqueInputSchema),z.lazy(() => GroupsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GroupsWhereUniqueInputSchema),z.lazy(() => GroupsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GroupsWhereUniqueInputSchema),z.lazy(() => GroupsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GroupsWhereUniqueInputSchema),z.lazy(() => GroupsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GroupsUpdateWithWhereUniqueWithoutCategoriesInputSchema),z.lazy(() => GroupsUpdateWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GroupsUpdateManyWithWhereWithoutCategoriesInputSchema),z.lazy(() => GroupsUpdateManyWithWhereWithoutCategoriesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GroupsScalarWhereInputSchema),z.lazy(() => GroupsScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.GroupsUpdateManyWithoutCategoriesNestedInput>;

export const MeetingsUpdateManyWithoutCategoriesNestedInputSchema: z.ZodType<Prisma.MeetingsUpdateManyWithoutCategoriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => MeetingsCreateWithoutCategoriesInputSchema),z.lazy(() => MeetingsCreateWithoutCategoriesInputSchema).array(),z.lazy(() => MeetingsUncheckedCreateWithoutCategoriesInputSchema),z.lazy(() => MeetingsUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MeetingsCreateOrConnectWithoutCategoriesInputSchema),z.lazy(() => MeetingsCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MeetingsUpsertWithWhereUniqueWithoutCategoriesInputSchema),z.lazy(() => MeetingsUpsertWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MeetingsCreateManyCategoriesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MeetingsUpdateWithWhereUniqueWithoutCategoriesInputSchema),z.lazy(() => MeetingsUpdateWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MeetingsUpdateManyWithWhereWithoutCategoriesInputSchema),z.lazy(() => MeetingsUpdateManyWithWhereWithoutCategoriesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MeetingsScalarWhereInputSchema),z.lazy(() => MeetingsScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.MeetingsUpdateManyWithoutCategoriesNestedInput>;

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict() as z.ZodType<Prisma.IntFieldUpdateOperationsInput>;

export const GroupsUncheckedUpdateManyWithoutCategoriesNestedInputSchema: z.ZodType<Prisma.GroupsUncheckedUpdateManyWithoutCategoriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => GroupsCreateWithoutCategoriesInputSchema),z.lazy(() => GroupsCreateWithoutCategoriesInputSchema).array(),z.lazy(() => GroupsUncheckedCreateWithoutCategoriesInputSchema),z.lazy(() => GroupsUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GroupsCreateOrConnectWithoutCategoriesInputSchema),z.lazy(() => GroupsCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GroupsUpsertWithWhereUniqueWithoutCategoriesInputSchema),z.lazy(() => GroupsUpsertWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GroupsCreateManyCategoriesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => GroupsWhereUniqueInputSchema),z.lazy(() => GroupsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GroupsWhereUniqueInputSchema),z.lazy(() => GroupsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GroupsWhereUniqueInputSchema),z.lazy(() => GroupsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GroupsWhereUniqueInputSchema),z.lazy(() => GroupsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GroupsUpdateWithWhereUniqueWithoutCategoriesInputSchema),z.lazy(() => GroupsUpdateWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GroupsUpdateManyWithWhereWithoutCategoriesInputSchema),z.lazy(() => GroupsUpdateManyWithWhereWithoutCategoriesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GroupsScalarWhereInputSchema),z.lazy(() => GroupsScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.GroupsUncheckedUpdateManyWithoutCategoriesNestedInput>;

export const MeetingsUncheckedUpdateManyWithoutCategoriesNestedInputSchema: z.ZodType<Prisma.MeetingsUncheckedUpdateManyWithoutCategoriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => MeetingsCreateWithoutCategoriesInputSchema),z.lazy(() => MeetingsCreateWithoutCategoriesInputSchema).array(),z.lazy(() => MeetingsUncheckedCreateWithoutCategoriesInputSchema),z.lazy(() => MeetingsUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MeetingsCreateOrConnectWithoutCategoriesInputSchema),z.lazy(() => MeetingsCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MeetingsUpsertWithWhereUniqueWithoutCategoriesInputSchema),z.lazy(() => MeetingsUpsertWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MeetingsCreateManyCategoriesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MeetingsUpdateWithWhereUniqueWithoutCategoriesInputSchema),z.lazy(() => MeetingsUpdateWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MeetingsUpdateManyWithWhereWithoutCategoriesInputSchema),z.lazy(() => MeetingsUpdateManyWithWhereWithoutCategoriesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MeetingsScalarWhereInputSchema),z.lazy(() => MeetingsScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.MeetingsUncheckedUpdateManyWithoutCategoriesNestedInput>;

export const CategoriesCreateNestedOneWithoutGroupsInputSchema: z.ZodType<Prisma.CategoriesCreateNestedOneWithoutGroupsInput> = z.object({
  create: z.union([ z.lazy(() => CategoriesCreateWithoutGroupsInputSchema),z.lazy(() => CategoriesUncheckedCreateWithoutGroupsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoriesCreateOrConnectWithoutGroupsInputSchema).optional(),
  connect: z.lazy(() => CategoriesWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.CategoriesCreateNestedOneWithoutGroupsInput>;

export const MeetingsCreateNestedManyWithoutGroupsInputSchema: z.ZodType<Prisma.MeetingsCreateNestedManyWithoutGroupsInput> = z.object({
  create: z.union([ z.lazy(() => MeetingsCreateWithoutGroupsInputSchema),z.lazy(() => MeetingsCreateWithoutGroupsInputSchema).array(),z.lazy(() => MeetingsUncheckedCreateWithoutGroupsInputSchema),z.lazy(() => MeetingsUncheckedCreateWithoutGroupsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MeetingsCreateOrConnectWithoutGroupsInputSchema),z.lazy(() => MeetingsCreateOrConnectWithoutGroupsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MeetingsCreateManyGroupsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.MeetingsCreateNestedManyWithoutGroupsInput>;

export const MeetingsUncheckedCreateNestedManyWithoutGroupsInputSchema: z.ZodType<Prisma.MeetingsUncheckedCreateNestedManyWithoutGroupsInput> = z.object({
  create: z.union([ z.lazy(() => MeetingsCreateWithoutGroupsInputSchema),z.lazy(() => MeetingsCreateWithoutGroupsInputSchema).array(),z.lazy(() => MeetingsUncheckedCreateWithoutGroupsInputSchema),z.lazy(() => MeetingsUncheckedCreateWithoutGroupsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MeetingsCreateOrConnectWithoutGroupsInputSchema),z.lazy(() => MeetingsCreateOrConnectWithoutGroupsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MeetingsCreateManyGroupsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.MeetingsUncheckedCreateNestedManyWithoutGroupsInput>;

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict() as z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput>;

export const CategoriesUpdateOneRequiredWithoutGroupsNestedInputSchema: z.ZodType<Prisma.CategoriesUpdateOneRequiredWithoutGroupsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoriesCreateWithoutGroupsInputSchema),z.lazy(() => CategoriesUncheckedCreateWithoutGroupsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoriesCreateOrConnectWithoutGroupsInputSchema).optional(),
  upsert: z.lazy(() => CategoriesUpsertWithoutGroupsInputSchema).optional(),
  connect: z.lazy(() => CategoriesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CategoriesUpdateToOneWithWhereWithoutGroupsInputSchema),z.lazy(() => CategoriesUpdateWithoutGroupsInputSchema),z.lazy(() => CategoriesUncheckedUpdateWithoutGroupsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CategoriesUpdateOneRequiredWithoutGroupsNestedInput>;

export const MeetingsUpdateManyWithoutGroupsNestedInputSchema: z.ZodType<Prisma.MeetingsUpdateManyWithoutGroupsNestedInput> = z.object({
  create: z.union([ z.lazy(() => MeetingsCreateWithoutGroupsInputSchema),z.lazy(() => MeetingsCreateWithoutGroupsInputSchema).array(),z.lazy(() => MeetingsUncheckedCreateWithoutGroupsInputSchema),z.lazy(() => MeetingsUncheckedCreateWithoutGroupsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MeetingsCreateOrConnectWithoutGroupsInputSchema),z.lazy(() => MeetingsCreateOrConnectWithoutGroupsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MeetingsUpsertWithWhereUniqueWithoutGroupsInputSchema),z.lazy(() => MeetingsUpsertWithWhereUniqueWithoutGroupsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MeetingsCreateManyGroupsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MeetingsUpdateWithWhereUniqueWithoutGroupsInputSchema),z.lazy(() => MeetingsUpdateWithWhereUniqueWithoutGroupsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MeetingsUpdateManyWithWhereWithoutGroupsInputSchema),z.lazy(() => MeetingsUpdateManyWithWhereWithoutGroupsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MeetingsScalarWhereInputSchema),z.lazy(() => MeetingsScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.MeetingsUpdateManyWithoutGroupsNestedInput>;

export const MeetingsUncheckedUpdateManyWithoutGroupsNestedInputSchema: z.ZodType<Prisma.MeetingsUncheckedUpdateManyWithoutGroupsNestedInput> = z.object({
  create: z.union([ z.lazy(() => MeetingsCreateWithoutGroupsInputSchema),z.lazy(() => MeetingsCreateWithoutGroupsInputSchema).array(),z.lazy(() => MeetingsUncheckedCreateWithoutGroupsInputSchema),z.lazy(() => MeetingsUncheckedCreateWithoutGroupsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MeetingsCreateOrConnectWithoutGroupsInputSchema),z.lazy(() => MeetingsCreateOrConnectWithoutGroupsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MeetingsUpsertWithWhereUniqueWithoutGroupsInputSchema),z.lazy(() => MeetingsUpsertWithWhereUniqueWithoutGroupsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MeetingsCreateManyGroupsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MeetingsUpdateWithWhereUniqueWithoutGroupsInputSchema),z.lazy(() => MeetingsUpdateWithWhereUniqueWithoutGroupsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MeetingsUpdateManyWithWhereWithoutGroupsInputSchema),z.lazy(() => MeetingsUpdateManyWithWhereWithoutGroupsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MeetingsScalarWhereInputSchema),z.lazy(() => MeetingsScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.MeetingsUncheckedUpdateManyWithoutGroupsNestedInput>;

export const CategoriesCreateNestedOneWithoutMeetingsInputSchema: z.ZodType<Prisma.CategoriesCreateNestedOneWithoutMeetingsInput> = z.object({
  create: z.union([ z.lazy(() => CategoriesCreateWithoutMeetingsInputSchema),z.lazy(() => CategoriesUncheckedCreateWithoutMeetingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoriesCreateOrConnectWithoutMeetingsInputSchema).optional(),
  connect: z.lazy(() => CategoriesWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.CategoriesCreateNestedOneWithoutMeetingsInput>;

export const GroupsCreateNestedOneWithoutMeetingsInputSchema: z.ZodType<Prisma.GroupsCreateNestedOneWithoutMeetingsInput> = z.object({
  create: z.union([ z.lazy(() => GroupsCreateWithoutMeetingsInputSchema),z.lazy(() => GroupsUncheckedCreateWithoutMeetingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GroupsCreateOrConnectWithoutMeetingsInputSchema).optional(),
  connect: z.lazy(() => GroupsWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.GroupsCreateNestedOneWithoutMeetingsInput>;

export const UsersCreateNestedOneWithoutMeetingsInputSchema: z.ZodType<Prisma.UsersCreateNestedOneWithoutMeetingsInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutMeetingsInputSchema),z.lazy(() => UsersUncheckedCreateWithoutMeetingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutMeetingsInputSchema).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.UsersCreateNestedOneWithoutMeetingsInput>;

export const RSVPSCreateNestedManyWithoutMeetingsInputSchema: z.ZodType<Prisma.RSVPSCreateNestedManyWithoutMeetingsInput> = z.object({
  create: z.union([ z.lazy(() => RSVPSCreateWithoutMeetingsInputSchema),z.lazy(() => RSVPSCreateWithoutMeetingsInputSchema).array(),z.lazy(() => RSVPSUncheckedCreateWithoutMeetingsInputSchema),z.lazy(() => RSVPSUncheckedCreateWithoutMeetingsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RSVPSCreateOrConnectWithoutMeetingsInputSchema),z.lazy(() => RSVPSCreateOrConnectWithoutMeetingsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RSVPSCreateManyMeetingsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RSVPSWhereUniqueInputSchema),z.lazy(() => RSVPSWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.RSVPSCreateNestedManyWithoutMeetingsInput>;

export const RSVPSUncheckedCreateNestedManyWithoutMeetingsInputSchema: z.ZodType<Prisma.RSVPSUncheckedCreateNestedManyWithoutMeetingsInput> = z.object({
  create: z.union([ z.lazy(() => RSVPSCreateWithoutMeetingsInputSchema),z.lazy(() => RSVPSCreateWithoutMeetingsInputSchema).array(),z.lazy(() => RSVPSUncheckedCreateWithoutMeetingsInputSchema),z.lazy(() => RSVPSUncheckedCreateWithoutMeetingsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RSVPSCreateOrConnectWithoutMeetingsInputSchema),z.lazy(() => RSVPSCreateOrConnectWithoutMeetingsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RSVPSCreateManyMeetingsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RSVPSWhereUniqueInputSchema),z.lazy(() => RSVPSWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.RSVPSUncheckedCreateNestedManyWithoutMeetingsInput>;

export const Enummeeting_typesFieldUpdateOperationsInputSchema: z.ZodType<Prisma.Enummeeting_typesFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => meeting_typesSchema).optional()
}).strict() as z.ZodType<Prisma.Enummeeting_typesFieldUpdateOperationsInput>;

export const Enummeeting_statusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.Enummeeting_statusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => meeting_statusSchema).optional()
}).strict() as z.ZodType<Prisma.Enummeeting_statusFieldUpdateOperationsInput>;

export const CategoriesUpdateOneRequiredWithoutMeetingsNestedInputSchema: z.ZodType<Prisma.CategoriesUpdateOneRequiredWithoutMeetingsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoriesCreateWithoutMeetingsInputSchema),z.lazy(() => CategoriesUncheckedCreateWithoutMeetingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoriesCreateOrConnectWithoutMeetingsInputSchema).optional(),
  upsert: z.lazy(() => CategoriesUpsertWithoutMeetingsInputSchema).optional(),
  connect: z.lazy(() => CategoriesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CategoriesUpdateToOneWithWhereWithoutMeetingsInputSchema),z.lazy(() => CategoriesUpdateWithoutMeetingsInputSchema),z.lazy(() => CategoriesUncheckedUpdateWithoutMeetingsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CategoriesUpdateOneRequiredWithoutMeetingsNestedInput>;

export const GroupsUpdateOneRequiredWithoutMeetingsNestedInputSchema: z.ZodType<Prisma.GroupsUpdateOneRequiredWithoutMeetingsNestedInput> = z.object({
  create: z.union([ z.lazy(() => GroupsCreateWithoutMeetingsInputSchema),z.lazy(() => GroupsUncheckedCreateWithoutMeetingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GroupsCreateOrConnectWithoutMeetingsInputSchema).optional(),
  upsert: z.lazy(() => GroupsUpsertWithoutMeetingsInputSchema).optional(),
  connect: z.lazy(() => GroupsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => GroupsUpdateToOneWithWhereWithoutMeetingsInputSchema),z.lazy(() => GroupsUpdateWithoutMeetingsInputSchema),z.lazy(() => GroupsUncheckedUpdateWithoutMeetingsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.GroupsUpdateOneRequiredWithoutMeetingsNestedInput>;

export const UsersUpdateOneRequiredWithoutMeetingsNestedInputSchema: z.ZodType<Prisma.UsersUpdateOneRequiredWithoutMeetingsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutMeetingsInputSchema),z.lazy(() => UsersUncheckedCreateWithoutMeetingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutMeetingsInputSchema).optional(),
  upsert: z.lazy(() => UsersUpsertWithoutMeetingsInputSchema).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UsersUpdateToOneWithWhereWithoutMeetingsInputSchema),z.lazy(() => UsersUpdateWithoutMeetingsInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutMeetingsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UsersUpdateOneRequiredWithoutMeetingsNestedInput>;

export const RSVPSUpdateManyWithoutMeetingsNestedInputSchema: z.ZodType<Prisma.RSVPSUpdateManyWithoutMeetingsNestedInput> = z.object({
  create: z.union([ z.lazy(() => RSVPSCreateWithoutMeetingsInputSchema),z.lazy(() => RSVPSCreateWithoutMeetingsInputSchema).array(),z.lazy(() => RSVPSUncheckedCreateWithoutMeetingsInputSchema),z.lazy(() => RSVPSUncheckedCreateWithoutMeetingsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RSVPSCreateOrConnectWithoutMeetingsInputSchema),z.lazy(() => RSVPSCreateOrConnectWithoutMeetingsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RSVPSUpsertWithWhereUniqueWithoutMeetingsInputSchema),z.lazy(() => RSVPSUpsertWithWhereUniqueWithoutMeetingsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RSVPSCreateManyMeetingsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RSVPSWhereUniqueInputSchema),z.lazy(() => RSVPSWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RSVPSWhereUniqueInputSchema),z.lazy(() => RSVPSWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RSVPSWhereUniqueInputSchema),z.lazy(() => RSVPSWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RSVPSWhereUniqueInputSchema),z.lazy(() => RSVPSWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RSVPSUpdateWithWhereUniqueWithoutMeetingsInputSchema),z.lazy(() => RSVPSUpdateWithWhereUniqueWithoutMeetingsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RSVPSUpdateManyWithWhereWithoutMeetingsInputSchema),z.lazy(() => RSVPSUpdateManyWithWhereWithoutMeetingsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RSVPSScalarWhereInputSchema),z.lazy(() => RSVPSScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.RSVPSUpdateManyWithoutMeetingsNestedInput>;

export const RSVPSUncheckedUpdateManyWithoutMeetingsNestedInputSchema: z.ZodType<Prisma.RSVPSUncheckedUpdateManyWithoutMeetingsNestedInput> = z.object({
  create: z.union([ z.lazy(() => RSVPSCreateWithoutMeetingsInputSchema),z.lazy(() => RSVPSCreateWithoutMeetingsInputSchema).array(),z.lazy(() => RSVPSUncheckedCreateWithoutMeetingsInputSchema),z.lazy(() => RSVPSUncheckedCreateWithoutMeetingsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RSVPSCreateOrConnectWithoutMeetingsInputSchema),z.lazy(() => RSVPSCreateOrConnectWithoutMeetingsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RSVPSUpsertWithWhereUniqueWithoutMeetingsInputSchema),z.lazy(() => RSVPSUpsertWithWhereUniqueWithoutMeetingsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RSVPSCreateManyMeetingsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RSVPSWhereUniqueInputSchema),z.lazy(() => RSVPSWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RSVPSWhereUniqueInputSchema),z.lazy(() => RSVPSWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RSVPSWhereUniqueInputSchema),z.lazy(() => RSVPSWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RSVPSWhereUniqueInputSchema),z.lazy(() => RSVPSWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RSVPSUpdateWithWhereUniqueWithoutMeetingsInputSchema),z.lazy(() => RSVPSUpdateWithWhereUniqueWithoutMeetingsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RSVPSUpdateManyWithWhereWithoutMeetingsInputSchema),z.lazy(() => RSVPSUpdateManyWithWhereWithoutMeetingsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RSVPSScalarWhereInputSchema),z.lazy(() => RSVPSScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.RSVPSUncheckedUpdateManyWithoutMeetingsNestedInput>;

export const MeetingsCreateNestedOneWithoutRsvpsInputSchema: z.ZodType<Prisma.MeetingsCreateNestedOneWithoutRsvpsInput> = z.object({
  create: z.union([ z.lazy(() => MeetingsCreateWithoutRsvpsInputSchema),z.lazy(() => MeetingsUncheckedCreateWithoutRsvpsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MeetingsCreateOrConnectWithoutRsvpsInputSchema).optional(),
  connect: z.lazy(() => MeetingsWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.MeetingsCreateNestedOneWithoutRsvpsInput>;

export const UsersCreateNestedOneWithoutRsvpsInputSchema: z.ZodType<Prisma.UsersCreateNestedOneWithoutRsvpsInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutRsvpsInputSchema),z.lazy(() => UsersUncheckedCreateWithoutRsvpsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutRsvpsInputSchema).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.UsersCreateNestedOneWithoutRsvpsInput>;

export const Enumrsvp_statusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.Enumrsvp_statusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => rsvp_statusSchema).optional()
}).strict() as z.ZodType<Prisma.Enumrsvp_statusFieldUpdateOperationsInput>;

export const Enumrsvp_typeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.Enumrsvp_typeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => rsvp_typeSchema).optional()
}).strict() as z.ZodType<Prisma.Enumrsvp_typeFieldUpdateOperationsInput>;

export const MeetingsUpdateOneRequiredWithoutRsvpsNestedInputSchema: z.ZodType<Prisma.MeetingsUpdateOneRequiredWithoutRsvpsNestedInput> = z.object({
  create: z.union([ z.lazy(() => MeetingsCreateWithoutRsvpsInputSchema),z.lazy(() => MeetingsUncheckedCreateWithoutRsvpsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MeetingsCreateOrConnectWithoutRsvpsInputSchema).optional(),
  upsert: z.lazy(() => MeetingsUpsertWithoutRsvpsInputSchema).optional(),
  connect: z.lazy(() => MeetingsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MeetingsUpdateToOneWithWhereWithoutRsvpsInputSchema),z.lazy(() => MeetingsUpdateWithoutRsvpsInputSchema),z.lazy(() => MeetingsUncheckedUpdateWithoutRsvpsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.MeetingsUpdateOneRequiredWithoutRsvpsNestedInput>;

export const UsersUpdateOneRequiredWithoutRsvpsNestedInputSchema: z.ZodType<Prisma.UsersUpdateOneRequiredWithoutRsvpsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutRsvpsInputSchema),z.lazy(() => UsersUncheckedCreateWithoutRsvpsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutRsvpsInputSchema).optional(),
  upsert: z.lazy(() => UsersUpsertWithoutRsvpsInputSchema).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UsersUpdateToOneWithWhereWithoutRsvpsInputSchema),z.lazy(() => UsersUpdateWithoutRsvpsInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutRsvpsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UsersUpdateOneRequiredWithoutRsvpsNestedInput>;

export const MeetingsCreateNestedManyWithoutUsersInputSchema: z.ZodType<Prisma.MeetingsCreateNestedManyWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => MeetingsCreateWithoutUsersInputSchema),z.lazy(() => MeetingsCreateWithoutUsersInputSchema).array(),z.lazy(() => MeetingsUncheckedCreateWithoutUsersInputSchema),z.lazy(() => MeetingsUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MeetingsCreateOrConnectWithoutUsersInputSchema),z.lazy(() => MeetingsCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MeetingsCreateManyUsersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.MeetingsCreateNestedManyWithoutUsersInput>;

export const RSVPSCreateNestedManyWithoutUsersInputSchema: z.ZodType<Prisma.RSVPSCreateNestedManyWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => RSVPSCreateWithoutUsersInputSchema),z.lazy(() => RSVPSCreateWithoutUsersInputSchema).array(),z.lazy(() => RSVPSUncheckedCreateWithoutUsersInputSchema),z.lazy(() => RSVPSUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RSVPSCreateOrConnectWithoutUsersInputSchema),z.lazy(() => RSVPSCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RSVPSCreateManyUsersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RSVPSWhereUniqueInputSchema),z.lazy(() => RSVPSWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.RSVPSCreateNestedManyWithoutUsersInput>;

export const MeetingsUncheckedCreateNestedManyWithoutUsersInputSchema: z.ZodType<Prisma.MeetingsUncheckedCreateNestedManyWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => MeetingsCreateWithoutUsersInputSchema),z.lazy(() => MeetingsCreateWithoutUsersInputSchema).array(),z.lazy(() => MeetingsUncheckedCreateWithoutUsersInputSchema),z.lazy(() => MeetingsUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MeetingsCreateOrConnectWithoutUsersInputSchema),z.lazy(() => MeetingsCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MeetingsCreateManyUsersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.MeetingsUncheckedCreateNestedManyWithoutUsersInput>;

export const RSVPSUncheckedCreateNestedManyWithoutUsersInputSchema: z.ZodType<Prisma.RSVPSUncheckedCreateNestedManyWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => RSVPSCreateWithoutUsersInputSchema),z.lazy(() => RSVPSCreateWithoutUsersInputSchema).array(),z.lazy(() => RSVPSUncheckedCreateWithoutUsersInputSchema),z.lazy(() => RSVPSUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RSVPSCreateOrConnectWithoutUsersInputSchema),z.lazy(() => RSVPSCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RSVPSCreateManyUsersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RSVPSWhereUniqueInputSchema),z.lazy(() => RSVPSWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.RSVPSUncheckedCreateNestedManyWithoutUsersInput>;

export const MeetingsUpdateManyWithoutUsersNestedInputSchema: z.ZodType<Prisma.MeetingsUpdateManyWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => MeetingsCreateWithoutUsersInputSchema),z.lazy(() => MeetingsCreateWithoutUsersInputSchema).array(),z.lazy(() => MeetingsUncheckedCreateWithoutUsersInputSchema),z.lazy(() => MeetingsUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MeetingsCreateOrConnectWithoutUsersInputSchema),z.lazy(() => MeetingsCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MeetingsUpsertWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => MeetingsUpsertWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MeetingsCreateManyUsersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MeetingsUpdateWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => MeetingsUpdateWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MeetingsUpdateManyWithWhereWithoutUsersInputSchema),z.lazy(() => MeetingsUpdateManyWithWhereWithoutUsersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MeetingsScalarWhereInputSchema),z.lazy(() => MeetingsScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.MeetingsUpdateManyWithoutUsersNestedInput>;

export const RSVPSUpdateManyWithoutUsersNestedInputSchema: z.ZodType<Prisma.RSVPSUpdateManyWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => RSVPSCreateWithoutUsersInputSchema),z.lazy(() => RSVPSCreateWithoutUsersInputSchema).array(),z.lazy(() => RSVPSUncheckedCreateWithoutUsersInputSchema),z.lazy(() => RSVPSUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RSVPSCreateOrConnectWithoutUsersInputSchema),z.lazy(() => RSVPSCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RSVPSUpsertWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => RSVPSUpsertWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RSVPSCreateManyUsersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RSVPSWhereUniqueInputSchema),z.lazy(() => RSVPSWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RSVPSWhereUniqueInputSchema),z.lazy(() => RSVPSWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RSVPSWhereUniqueInputSchema),z.lazy(() => RSVPSWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RSVPSWhereUniqueInputSchema),z.lazy(() => RSVPSWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RSVPSUpdateWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => RSVPSUpdateWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RSVPSUpdateManyWithWhereWithoutUsersInputSchema),z.lazy(() => RSVPSUpdateManyWithWhereWithoutUsersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RSVPSScalarWhereInputSchema),z.lazy(() => RSVPSScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.RSVPSUpdateManyWithoutUsersNestedInput>;

export const MeetingsUncheckedUpdateManyWithoutUsersNestedInputSchema: z.ZodType<Prisma.MeetingsUncheckedUpdateManyWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => MeetingsCreateWithoutUsersInputSchema),z.lazy(() => MeetingsCreateWithoutUsersInputSchema).array(),z.lazy(() => MeetingsUncheckedCreateWithoutUsersInputSchema),z.lazy(() => MeetingsUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MeetingsCreateOrConnectWithoutUsersInputSchema),z.lazy(() => MeetingsCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MeetingsUpsertWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => MeetingsUpsertWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MeetingsCreateManyUsersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MeetingsWhereUniqueInputSchema),z.lazy(() => MeetingsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MeetingsUpdateWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => MeetingsUpdateWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MeetingsUpdateManyWithWhereWithoutUsersInputSchema),z.lazy(() => MeetingsUpdateManyWithWhereWithoutUsersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MeetingsScalarWhereInputSchema),z.lazy(() => MeetingsScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.MeetingsUncheckedUpdateManyWithoutUsersNestedInput>;

export const RSVPSUncheckedUpdateManyWithoutUsersNestedInputSchema: z.ZodType<Prisma.RSVPSUncheckedUpdateManyWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => RSVPSCreateWithoutUsersInputSchema),z.lazy(() => RSVPSCreateWithoutUsersInputSchema).array(),z.lazy(() => RSVPSUncheckedCreateWithoutUsersInputSchema),z.lazy(() => RSVPSUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RSVPSCreateOrConnectWithoutUsersInputSchema),z.lazy(() => RSVPSCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RSVPSUpsertWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => RSVPSUpsertWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RSVPSCreateManyUsersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RSVPSWhereUniqueInputSchema),z.lazy(() => RSVPSWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RSVPSWhereUniqueInputSchema),z.lazy(() => RSVPSWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RSVPSWhereUniqueInputSchema),z.lazy(() => RSVPSWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RSVPSWhereUniqueInputSchema),z.lazy(() => RSVPSWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RSVPSUpdateWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => RSVPSUpdateWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RSVPSUpdateManyWithWhereWithoutUsersInputSchema),z.lazy(() => RSVPSUpdateManyWithWhereWithoutUsersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RSVPSScalarWhereInputSchema),z.lazy(() => RSVPSScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.RSVPSUncheckedUpdateManyWithoutUsersNestedInput>;

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

export const GroupsCreateWithoutCategoriesInputSchema: z.ZodType<Prisma.GroupsCreateWithoutCategoriesInput> = z.object({
  description: z.string().optional(),
  memberName: z.string().optional(),
  modName: z.string().optional(),
  privacyType: z.string().optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  uuid: z.string().optional().nullable(),
  name: z.string().optional(),
  meetings: z.lazy(() => MeetingsCreateNestedManyWithoutGroupsInputSchema).optional()
}).strict() as z.ZodType<Prisma.GroupsCreateWithoutCategoriesInput>;

export const GroupsUncheckedCreateWithoutCategoriesInputSchema: z.ZodType<Prisma.GroupsUncheckedCreateWithoutCategoriesInput> = z.object({
  id: z.number().int().optional(),
  description: z.string().optional(),
  memberName: z.string().optional(),
  modName: z.string().optional(),
  privacyType: z.string().optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  uuid: z.string().optional().nullable(),
  name: z.string().optional(),
  meetings: z.lazy(() => MeetingsUncheckedCreateNestedManyWithoutGroupsInputSchema).optional()
}).strict() as z.ZodType<Prisma.GroupsUncheckedCreateWithoutCategoriesInput>;

export const GroupsCreateOrConnectWithoutCategoriesInputSchema: z.ZodType<Prisma.GroupsCreateOrConnectWithoutCategoriesInput> = z.object({
  where: z.lazy(() => GroupsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GroupsCreateWithoutCategoriesInputSchema),z.lazy(() => GroupsUncheckedCreateWithoutCategoriesInputSchema) ]),
}).strict() as z.ZodType<Prisma.GroupsCreateOrConnectWithoutCategoriesInput>;

export const GroupsCreateManyCategoriesInputEnvelopeSchema: z.ZodType<Prisma.GroupsCreateManyCategoriesInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => GroupsCreateManyCategoriesInputSchema),z.lazy(() => GroupsCreateManyCategoriesInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.GroupsCreateManyCategoriesInputEnvelope>;

export const MeetingsCreateWithoutCategoriesInputSchema: z.ZodType<Prisma.MeetingsCreateWithoutCategoriesInput> = z.object({
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
  groups: z.lazy(() => GroupsCreateNestedOneWithoutMeetingsInputSchema),
  users: z.lazy(() => UsersCreateNestedOneWithoutMeetingsInputSchema),
  rsvps: z.lazy(() => RSVPSCreateNestedManyWithoutMeetingsInputSchema).optional()
}).strict() as z.ZodType<Prisma.MeetingsCreateWithoutCategoriesInput>;

export const MeetingsUncheckedCreateWithoutCategoriesInputSchema: z.ZodType<Prisma.MeetingsUncheckedCreateWithoutCategoriesInput> = z.object({
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
  rsvps: z.lazy(() => RSVPSUncheckedCreateNestedManyWithoutMeetingsInputSchema).optional()
}).strict() as z.ZodType<Prisma.MeetingsUncheckedCreateWithoutCategoriesInput>;

export const MeetingsCreateOrConnectWithoutCategoriesInputSchema: z.ZodType<Prisma.MeetingsCreateOrConnectWithoutCategoriesInput> = z.object({
  where: z.lazy(() => MeetingsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MeetingsCreateWithoutCategoriesInputSchema),z.lazy(() => MeetingsUncheckedCreateWithoutCategoriesInputSchema) ]),
}).strict() as z.ZodType<Prisma.MeetingsCreateOrConnectWithoutCategoriesInput>;

export const MeetingsCreateManyCategoriesInputEnvelopeSchema: z.ZodType<Prisma.MeetingsCreateManyCategoriesInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MeetingsCreateManyCategoriesInputSchema),z.lazy(() => MeetingsCreateManyCategoriesInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.MeetingsCreateManyCategoriesInputEnvelope>;

export const GroupsUpsertWithWhereUniqueWithoutCategoriesInputSchema: z.ZodType<Prisma.GroupsUpsertWithWhereUniqueWithoutCategoriesInput> = z.object({
  where: z.lazy(() => GroupsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => GroupsUpdateWithoutCategoriesInputSchema),z.lazy(() => GroupsUncheckedUpdateWithoutCategoriesInputSchema) ]),
  create: z.union([ z.lazy(() => GroupsCreateWithoutCategoriesInputSchema),z.lazy(() => GroupsUncheckedCreateWithoutCategoriesInputSchema) ]),
}).strict() as z.ZodType<Prisma.GroupsUpsertWithWhereUniqueWithoutCategoriesInput>;

export const GroupsUpdateWithWhereUniqueWithoutCategoriesInputSchema: z.ZodType<Prisma.GroupsUpdateWithWhereUniqueWithoutCategoriesInput> = z.object({
  where: z.lazy(() => GroupsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => GroupsUpdateWithoutCategoriesInputSchema),z.lazy(() => GroupsUncheckedUpdateWithoutCategoriesInputSchema) ]),
}).strict() as z.ZodType<Prisma.GroupsUpdateWithWhereUniqueWithoutCategoriesInput>;

export const GroupsUpdateManyWithWhereWithoutCategoriesInputSchema: z.ZodType<Prisma.GroupsUpdateManyWithWhereWithoutCategoriesInput> = z.object({
  where: z.lazy(() => GroupsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => GroupsUpdateManyMutationInputSchema),z.lazy(() => GroupsUncheckedUpdateManyWithoutCategoriesInputSchema) ]),
}).strict() as z.ZodType<Prisma.GroupsUpdateManyWithWhereWithoutCategoriesInput>;

export const GroupsScalarWhereInputSchema: z.ZodType<Prisma.GroupsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GroupsScalarWhereInputSchema),z.lazy(() => GroupsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GroupsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GroupsScalarWhereInputSchema),z.lazy(() => GroupsScalarWhereInputSchema).array() ]).optional(),
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
}).strict() as z.ZodType<Prisma.GroupsScalarWhereInput>;

export const MeetingsUpsertWithWhereUniqueWithoutCategoriesInputSchema: z.ZodType<Prisma.MeetingsUpsertWithWhereUniqueWithoutCategoriesInput> = z.object({
  where: z.lazy(() => MeetingsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MeetingsUpdateWithoutCategoriesInputSchema),z.lazy(() => MeetingsUncheckedUpdateWithoutCategoriesInputSchema) ]),
  create: z.union([ z.lazy(() => MeetingsCreateWithoutCategoriesInputSchema),z.lazy(() => MeetingsUncheckedCreateWithoutCategoriesInputSchema) ]),
}).strict() as z.ZodType<Prisma.MeetingsUpsertWithWhereUniqueWithoutCategoriesInput>;

export const MeetingsUpdateWithWhereUniqueWithoutCategoriesInputSchema: z.ZodType<Prisma.MeetingsUpdateWithWhereUniqueWithoutCategoriesInput> = z.object({
  where: z.lazy(() => MeetingsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MeetingsUpdateWithoutCategoriesInputSchema),z.lazy(() => MeetingsUncheckedUpdateWithoutCategoriesInputSchema) ]),
}).strict() as z.ZodType<Prisma.MeetingsUpdateWithWhereUniqueWithoutCategoriesInput>;

export const MeetingsUpdateManyWithWhereWithoutCategoriesInputSchema: z.ZodType<Prisma.MeetingsUpdateManyWithWhereWithoutCategoriesInput> = z.object({
  where: z.lazy(() => MeetingsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MeetingsUpdateManyMutationInputSchema),z.lazy(() => MeetingsUncheckedUpdateManyWithoutCategoriesInputSchema) ]),
}).strict() as z.ZodType<Prisma.MeetingsUpdateManyWithWhereWithoutCategoriesInput>;

export const MeetingsScalarWhereInputSchema: z.ZodType<Prisma.MeetingsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MeetingsScalarWhereInputSchema),z.lazy(() => MeetingsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MeetingsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MeetingsScalarWhereInputSchema),z.lazy(() => MeetingsScalarWhereInputSchema).array() ]).optional(),
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
}).strict() as z.ZodType<Prisma.MeetingsScalarWhereInput>;

export const CategoriesCreateWithoutGroupsInputSchema: z.ZodType<Prisma.CategoriesCreateWithoutGroupsInput> = z.object({
  display: z.string().optional(),
  slug: z.string().optional(),
  uuid: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  description: z.string().optional(),
  meetings: z.lazy(() => MeetingsCreateNestedManyWithoutCategoriesInputSchema).optional()
}).strict() as z.ZodType<Prisma.CategoriesCreateWithoutGroupsInput>;

export const CategoriesUncheckedCreateWithoutGroupsInputSchema: z.ZodType<Prisma.CategoriesUncheckedCreateWithoutGroupsInput> = z.object({
  id: z.number().int().optional(),
  display: z.string().optional(),
  slug: z.string().optional(),
  uuid: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  description: z.string().optional(),
  meetings: z.lazy(() => MeetingsUncheckedCreateNestedManyWithoutCategoriesInputSchema).optional()
}).strict() as z.ZodType<Prisma.CategoriesUncheckedCreateWithoutGroupsInput>;

export const CategoriesCreateOrConnectWithoutGroupsInputSchema: z.ZodType<Prisma.CategoriesCreateOrConnectWithoutGroupsInput> = z.object({
  where: z.lazy(() => CategoriesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CategoriesCreateWithoutGroupsInputSchema),z.lazy(() => CategoriesUncheckedCreateWithoutGroupsInputSchema) ]),
}).strict() as z.ZodType<Prisma.CategoriesCreateOrConnectWithoutGroupsInput>;

export const MeetingsCreateWithoutGroupsInputSchema: z.ZodType<Prisma.MeetingsCreateWithoutGroupsInput> = z.object({
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
  categories: z.lazy(() => CategoriesCreateNestedOneWithoutMeetingsInputSchema).optional(),
  users: z.lazy(() => UsersCreateNestedOneWithoutMeetingsInputSchema),
  rsvps: z.lazy(() => RSVPSCreateNestedManyWithoutMeetingsInputSchema).optional()
}).strict() as z.ZodType<Prisma.MeetingsCreateWithoutGroupsInput>;

export const MeetingsUncheckedCreateWithoutGroupsInputSchema: z.ZodType<Prisma.MeetingsUncheckedCreateWithoutGroupsInput> = z.object({
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
  rsvps: z.lazy(() => RSVPSUncheckedCreateNestedManyWithoutMeetingsInputSchema).optional()
}).strict() as z.ZodType<Prisma.MeetingsUncheckedCreateWithoutGroupsInput>;

export const MeetingsCreateOrConnectWithoutGroupsInputSchema: z.ZodType<Prisma.MeetingsCreateOrConnectWithoutGroupsInput> = z.object({
  where: z.lazy(() => MeetingsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MeetingsCreateWithoutGroupsInputSchema),z.lazy(() => MeetingsUncheckedCreateWithoutGroupsInputSchema) ]),
}).strict() as z.ZodType<Prisma.MeetingsCreateOrConnectWithoutGroupsInput>;

export const MeetingsCreateManyGroupsInputEnvelopeSchema: z.ZodType<Prisma.MeetingsCreateManyGroupsInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MeetingsCreateManyGroupsInputSchema),z.lazy(() => MeetingsCreateManyGroupsInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.MeetingsCreateManyGroupsInputEnvelope>;

export const CategoriesUpsertWithoutGroupsInputSchema: z.ZodType<Prisma.CategoriesUpsertWithoutGroupsInput> = z.object({
  update: z.union([ z.lazy(() => CategoriesUpdateWithoutGroupsInputSchema),z.lazy(() => CategoriesUncheckedUpdateWithoutGroupsInputSchema) ]),
  create: z.union([ z.lazy(() => CategoriesCreateWithoutGroupsInputSchema),z.lazy(() => CategoriesUncheckedCreateWithoutGroupsInputSchema) ]),
  where: z.lazy(() => CategoriesWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.CategoriesUpsertWithoutGroupsInput>;

export const CategoriesUpdateToOneWithWhereWithoutGroupsInputSchema: z.ZodType<Prisma.CategoriesUpdateToOneWithWhereWithoutGroupsInput> = z.object({
  where: z.lazy(() => CategoriesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CategoriesUpdateWithoutGroupsInputSchema),z.lazy(() => CategoriesUncheckedUpdateWithoutGroupsInputSchema) ]),
}).strict() as z.ZodType<Prisma.CategoriesUpdateToOneWithWhereWithoutGroupsInput>;

export const CategoriesUpdateWithoutGroupsInputSchema: z.ZodType<Prisma.CategoriesUpdateWithoutGroupsInput> = z.object({
  display: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meetings: z.lazy(() => MeetingsUpdateManyWithoutCategoriesNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CategoriesUpdateWithoutGroupsInput>;

export const CategoriesUncheckedUpdateWithoutGroupsInputSchema: z.ZodType<Prisma.CategoriesUncheckedUpdateWithoutGroupsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  display: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meetings: z.lazy(() => MeetingsUncheckedUpdateManyWithoutCategoriesNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CategoriesUncheckedUpdateWithoutGroupsInput>;

export const MeetingsUpsertWithWhereUniqueWithoutGroupsInputSchema: z.ZodType<Prisma.MeetingsUpsertWithWhereUniqueWithoutGroupsInput> = z.object({
  where: z.lazy(() => MeetingsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MeetingsUpdateWithoutGroupsInputSchema),z.lazy(() => MeetingsUncheckedUpdateWithoutGroupsInputSchema) ]),
  create: z.union([ z.lazy(() => MeetingsCreateWithoutGroupsInputSchema),z.lazy(() => MeetingsUncheckedCreateWithoutGroupsInputSchema) ]),
}).strict() as z.ZodType<Prisma.MeetingsUpsertWithWhereUniqueWithoutGroupsInput>;

export const MeetingsUpdateWithWhereUniqueWithoutGroupsInputSchema: z.ZodType<Prisma.MeetingsUpdateWithWhereUniqueWithoutGroupsInput> = z.object({
  where: z.lazy(() => MeetingsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MeetingsUpdateWithoutGroupsInputSchema),z.lazy(() => MeetingsUncheckedUpdateWithoutGroupsInputSchema) ]),
}).strict() as z.ZodType<Prisma.MeetingsUpdateWithWhereUniqueWithoutGroupsInput>;

export const MeetingsUpdateManyWithWhereWithoutGroupsInputSchema: z.ZodType<Prisma.MeetingsUpdateManyWithWhereWithoutGroupsInput> = z.object({
  where: z.lazy(() => MeetingsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MeetingsUpdateManyMutationInputSchema),z.lazy(() => MeetingsUncheckedUpdateManyWithoutGroupsInputSchema) ]),
}).strict() as z.ZodType<Prisma.MeetingsUpdateManyWithWhereWithoutGroupsInput>;

export const CategoriesCreateWithoutMeetingsInputSchema: z.ZodType<Prisma.CategoriesCreateWithoutMeetingsInput> = z.object({
  display: z.string().optional(),
  slug: z.string().optional(),
  uuid: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  description: z.string().optional(),
  groups: z.lazy(() => GroupsCreateNestedManyWithoutCategoriesInputSchema).optional()
}).strict() as z.ZodType<Prisma.CategoriesCreateWithoutMeetingsInput>;

export const CategoriesUncheckedCreateWithoutMeetingsInputSchema: z.ZodType<Prisma.CategoriesUncheckedCreateWithoutMeetingsInput> = z.object({
  id: z.number().int().optional(),
  display: z.string().optional(),
  slug: z.string().optional(),
  uuid: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  description: z.string().optional(),
  groups: z.lazy(() => GroupsUncheckedCreateNestedManyWithoutCategoriesInputSchema).optional()
}).strict() as z.ZodType<Prisma.CategoriesUncheckedCreateWithoutMeetingsInput>;

export const CategoriesCreateOrConnectWithoutMeetingsInputSchema: z.ZodType<Prisma.CategoriesCreateOrConnectWithoutMeetingsInput> = z.object({
  where: z.lazy(() => CategoriesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CategoriesCreateWithoutMeetingsInputSchema),z.lazy(() => CategoriesUncheckedCreateWithoutMeetingsInputSchema) ]),
}).strict() as z.ZodType<Prisma.CategoriesCreateOrConnectWithoutMeetingsInput>;

export const GroupsCreateWithoutMeetingsInputSchema: z.ZodType<Prisma.GroupsCreateWithoutMeetingsInput> = z.object({
  description: z.string().optional(),
  memberName: z.string().optional(),
  modName: z.string().optional(),
  privacyType: z.string().optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  uuid: z.string().optional().nullable(),
  name: z.string().optional(),
  categories: z.lazy(() => CategoriesCreateNestedOneWithoutGroupsInputSchema).optional()
}).strict() as z.ZodType<Prisma.GroupsCreateWithoutMeetingsInput>;

export const GroupsUncheckedCreateWithoutMeetingsInputSchema: z.ZodType<Prisma.GroupsUncheckedCreateWithoutMeetingsInput> = z.object({
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
}).strict() as z.ZodType<Prisma.GroupsUncheckedCreateWithoutMeetingsInput>;

export const GroupsCreateOrConnectWithoutMeetingsInputSchema: z.ZodType<Prisma.GroupsCreateOrConnectWithoutMeetingsInput> = z.object({
  where: z.lazy(() => GroupsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GroupsCreateWithoutMeetingsInputSchema),z.lazy(() => GroupsUncheckedCreateWithoutMeetingsInputSchema) ]),
}).strict() as z.ZodType<Prisma.GroupsCreateOrConnectWithoutMeetingsInput>;

export const UsersCreateWithoutMeetingsInputSchema: z.ZodType<Prisma.UsersCreateWithoutMeetingsInput> = z.object({
  type: z.string().optional(),
  uuid: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  rsvps: z.lazy(() => RSVPSCreateNestedManyWithoutUsersInputSchema).optional()
}).strict() as z.ZodType<Prisma.UsersCreateWithoutMeetingsInput>;

export const UsersUncheckedCreateWithoutMeetingsInputSchema: z.ZodType<Prisma.UsersUncheckedCreateWithoutMeetingsInput> = z.object({
  id: z.number().int().optional(),
  type: z.string().optional(),
  uuid: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  rsvps: z.lazy(() => RSVPSUncheckedCreateNestedManyWithoutUsersInputSchema).optional()
}).strict() as z.ZodType<Prisma.UsersUncheckedCreateWithoutMeetingsInput>;

export const UsersCreateOrConnectWithoutMeetingsInputSchema: z.ZodType<Prisma.UsersCreateOrConnectWithoutMeetingsInput> = z.object({
  where: z.lazy(() => UsersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsersCreateWithoutMeetingsInputSchema),z.lazy(() => UsersUncheckedCreateWithoutMeetingsInputSchema) ]),
}).strict() as z.ZodType<Prisma.UsersCreateOrConnectWithoutMeetingsInput>;

export const RSVPSCreateWithoutMeetingsInputSchema: z.ZodType<Prisma.RSVPSCreateWithoutMeetingsInput> = z.object({
  uuid: z.string(),
  value: z.lazy(() => rsvp_statusSchema).optional(),
  type: z.lazy(() => rsvp_typeSchema).optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  users: z.lazy(() => UsersCreateNestedOneWithoutRsvpsInputSchema)
}).strict() as z.ZodType<Prisma.RSVPSCreateWithoutMeetingsInput>;

export const RSVPSUncheckedCreateWithoutMeetingsInputSchema: z.ZodType<Prisma.RSVPSUncheckedCreateWithoutMeetingsInput> = z.object({
  id: z.number().int().optional(),
  uuid: z.string(),
  user: z.string(),
  value: z.lazy(() => rsvp_statusSchema).optional(),
  type: z.lazy(() => rsvp_typeSchema).optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.RSVPSUncheckedCreateWithoutMeetingsInput>;

export const RSVPSCreateOrConnectWithoutMeetingsInputSchema: z.ZodType<Prisma.RSVPSCreateOrConnectWithoutMeetingsInput> = z.object({
  where: z.lazy(() => RSVPSWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RSVPSCreateWithoutMeetingsInputSchema),z.lazy(() => RSVPSUncheckedCreateWithoutMeetingsInputSchema) ]),
}).strict() as z.ZodType<Prisma.RSVPSCreateOrConnectWithoutMeetingsInput>;

export const RSVPSCreateManyMeetingsInputEnvelopeSchema: z.ZodType<Prisma.RSVPSCreateManyMeetingsInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RSVPSCreateManyMeetingsInputSchema),z.lazy(() => RSVPSCreateManyMeetingsInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.RSVPSCreateManyMeetingsInputEnvelope>;

export const CategoriesUpsertWithoutMeetingsInputSchema: z.ZodType<Prisma.CategoriesUpsertWithoutMeetingsInput> = z.object({
  update: z.union([ z.lazy(() => CategoriesUpdateWithoutMeetingsInputSchema),z.lazy(() => CategoriesUncheckedUpdateWithoutMeetingsInputSchema) ]),
  create: z.union([ z.lazy(() => CategoriesCreateWithoutMeetingsInputSchema),z.lazy(() => CategoriesUncheckedCreateWithoutMeetingsInputSchema) ]),
  where: z.lazy(() => CategoriesWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.CategoriesUpsertWithoutMeetingsInput>;

export const CategoriesUpdateToOneWithWhereWithoutMeetingsInputSchema: z.ZodType<Prisma.CategoriesUpdateToOneWithWhereWithoutMeetingsInput> = z.object({
  where: z.lazy(() => CategoriesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CategoriesUpdateWithoutMeetingsInputSchema),z.lazy(() => CategoriesUncheckedUpdateWithoutMeetingsInputSchema) ]),
}).strict() as z.ZodType<Prisma.CategoriesUpdateToOneWithWhereWithoutMeetingsInput>;

export const CategoriesUpdateWithoutMeetingsInputSchema: z.ZodType<Prisma.CategoriesUpdateWithoutMeetingsInput> = z.object({
  display: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  groups: z.lazy(() => GroupsUpdateManyWithoutCategoriesNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CategoriesUpdateWithoutMeetingsInput>;

export const CategoriesUncheckedUpdateWithoutMeetingsInputSchema: z.ZodType<Prisma.CategoriesUncheckedUpdateWithoutMeetingsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  display: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  groups: z.lazy(() => GroupsUncheckedUpdateManyWithoutCategoriesNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CategoriesUncheckedUpdateWithoutMeetingsInput>;

export const GroupsUpsertWithoutMeetingsInputSchema: z.ZodType<Prisma.GroupsUpsertWithoutMeetingsInput> = z.object({
  update: z.union([ z.lazy(() => GroupsUpdateWithoutMeetingsInputSchema),z.lazy(() => GroupsUncheckedUpdateWithoutMeetingsInputSchema) ]),
  create: z.union([ z.lazy(() => GroupsCreateWithoutMeetingsInputSchema),z.lazy(() => GroupsUncheckedCreateWithoutMeetingsInputSchema) ]),
  where: z.lazy(() => GroupsWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.GroupsUpsertWithoutMeetingsInput>;

export const GroupsUpdateToOneWithWhereWithoutMeetingsInputSchema: z.ZodType<Prisma.GroupsUpdateToOneWithWhereWithoutMeetingsInput> = z.object({
  where: z.lazy(() => GroupsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => GroupsUpdateWithoutMeetingsInputSchema),z.lazy(() => GroupsUncheckedUpdateWithoutMeetingsInputSchema) ]),
}).strict() as z.ZodType<Prisma.GroupsUpdateToOneWithWhereWithoutMeetingsInput>;

export const GroupsUpdateWithoutMeetingsInputSchema: z.ZodType<Prisma.GroupsUpdateWithoutMeetingsInput> = z.object({
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  memberName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  privacyType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categories: z.lazy(() => CategoriesUpdateOneRequiredWithoutGroupsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.GroupsUpdateWithoutMeetingsInput>;

export const GroupsUncheckedUpdateWithoutMeetingsInputSchema: z.ZodType<Prisma.GroupsUncheckedUpdateWithoutMeetingsInput> = z.object({
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
}).strict() as z.ZodType<Prisma.GroupsUncheckedUpdateWithoutMeetingsInput>;

export const UsersUpsertWithoutMeetingsInputSchema: z.ZodType<Prisma.UsersUpsertWithoutMeetingsInput> = z.object({
  update: z.union([ z.lazy(() => UsersUpdateWithoutMeetingsInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutMeetingsInputSchema) ]),
  create: z.union([ z.lazy(() => UsersCreateWithoutMeetingsInputSchema),z.lazy(() => UsersUncheckedCreateWithoutMeetingsInputSchema) ]),
  where: z.lazy(() => UsersWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.UsersUpsertWithoutMeetingsInput>;

export const UsersUpdateToOneWithWhereWithoutMeetingsInputSchema: z.ZodType<Prisma.UsersUpdateToOneWithWhereWithoutMeetingsInput> = z.object({
  where: z.lazy(() => UsersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UsersUpdateWithoutMeetingsInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutMeetingsInputSchema) ]),
}).strict() as z.ZodType<Prisma.UsersUpdateToOneWithWhereWithoutMeetingsInput>;

export const UsersUpdateWithoutMeetingsInputSchema: z.ZodType<Prisma.UsersUpdateWithoutMeetingsInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rsvps: z.lazy(() => RSVPSUpdateManyWithoutUsersNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UsersUpdateWithoutMeetingsInput>;

export const UsersUncheckedUpdateWithoutMeetingsInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateWithoutMeetingsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rsvps: z.lazy(() => RSVPSUncheckedUpdateManyWithoutUsersNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UsersUncheckedUpdateWithoutMeetingsInput>;

export const RSVPSUpsertWithWhereUniqueWithoutMeetingsInputSchema: z.ZodType<Prisma.RSVPSUpsertWithWhereUniqueWithoutMeetingsInput> = z.object({
  where: z.lazy(() => RSVPSWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RSVPSUpdateWithoutMeetingsInputSchema),z.lazy(() => RSVPSUncheckedUpdateWithoutMeetingsInputSchema) ]),
  create: z.union([ z.lazy(() => RSVPSCreateWithoutMeetingsInputSchema),z.lazy(() => RSVPSUncheckedCreateWithoutMeetingsInputSchema) ]),
}).strict() as z.ZodType<Prisma.RSVPSUpsertWithWhereUniqueWithoutMeetingsInput>;

export const RSVPSUpdateWithWhereUniqueWithoutMeetingsInputSchema: z.ZodType<Prisma.RSVPSUpdateWithWhereUniqueWithoutMeetingsInput> = z.object({
  where: z.lazy(() => RSVPSWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RSVPSUpdateWithoutMeetingsInputSchema),z.lazy(() => RSVPSUncheckedUpdateWithoutMeetingsInputSchema) ]),
}).strict() as z.ZodType<Prisma.RSVPSUpdateWithWhereUniqueWithoutMeetingsInput>;

export const RSVPSUpdateManyWithWhereWithoutMeetingsInputSchema: z.ZodType<Prisma.RSVPSUpdateManyWithWhereWithoutMeetingsInput> = z.object({
  where: z.lazy(() => RSVPSScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RSVPSUpdateManyMutationInputSchema),z.lazy(() => RSVPSUncheckedUpdateManyWithoutMeetingsInputSchema) ]),
}).strict() as z.ZodType<Prisma.RSVPSUpdateManyWithWhereWithoutMeetingsInput>;

export const RSVPSScalarWhereInputSchema: z.ZodType<Prisma.RSVPSScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RSVPSScalarWhereInputSchema),z.lazy(() => RSVPSScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RSVPSScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RSVPSScalarWhereInputSchema),z.lazy(() => RSVPSScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  uuid: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  meeting: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => Enumrsvp_statusFilterSchema),z.lazy(() => rsvp_statusSchema) ]).optional(),
  type: z.union([ z.lazy(() => Enumrsvp_typeFilterSchema),z.lazy(() => rsvp_typeSchema) ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.RSVPSScalarWhereInput>;

export const MeetingsCreateWithoutRsvpsInputSchema: z.ZodType<Prisma.MeetingsCreateWithoutRsvpsInput> = z.object({
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
  categories: z.lazy(() => CategoriesCreateNestedOneWithoutMeetingsInputSchema).optional(),
  groups: z.lazy(() => GroupsCreateNestedOneWithoutMeetingsInputSchema),
  users: z.lazy(() => UsersCreateNestedOneWithoutMeetingsInputSchema)
}).strict() as z.ZodType<Prisma.MeetingsCreateWithoutRsvpsInput>;

export const MeetingsUncheckedCreateWithoutRsvpsInputSchema: z.ZodType<Prisma.MeetingsUncheckedCreateWithoutRsvpsInput> = z.object({
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
}).strict() as z.ZodType<Prisma.MeetingsUncheckedCreateWithoutRsvpsInput>;

export const MeetingsCreateOrConnectWithoutRsvpsInputSchema: z.ZodType<Prisma.MeetingsCreateOrConnectWithoutRsvpsInput> = z.object({
  where: z.lazy(() => MeetingsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MeetingsCreateWithoutRsvpsInputSchema),z.lazy(() => MeetingsUncheckedCreateWithoutRsvpsInputSchema) ]),
}).strict() as z.ZodType<Prisma.MeetingsCreateOrConnectWithoutRsvpsInput>;

export const UsersCreateWithoutRsvpsInputSchema: z.ZodType<Prisma.UsersCreateWithoutRsvpsInput> = z.object({
  type: z.string().optional(),
  uuid: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  meetings: z.lazy(() => MeetingsCreateNestedManyWithoutUsersInputSchema).optional()
}).strict() as z.ZodType<Prisma.UsersCreateWithoutRsvpsInput>;

export const UsersUncheckedCreateWithoutRsvpsInputSchema: z.ZodType<Prisma.UsersUncheckedCreateWithoutRsvpsInput> = z.object({
  id: z.number().int().optional(),
  type: z.string().optional(),
  uuid: z.string(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  meetings: z.lazy(() => MeetingsUncheckedCreateNestedManyWithoutUsersInputSchema).optional()
}).strict() as z.ZodType<Prisma.UsersUncheckedCreateWithoutRsvpsInput>;

export const UsersCreateOrConnectWithoutRsvpsInputSchema: z.ZodType<Prisma.UsersCreateOrConnectWithoutRsvpsInput> = z.object({
  where: z.lazy(() => UsersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsersCreateWithoutRsvpsInputSchema),z.lazy(() => UsersUncheckedCreateWithoutRsvpsInputSchema) ]),
}).strict() as z.ZodType<Prisma.UsersCreateOrConnectWithoutRsvpsInput>;

export const MeetingsUpsertWithoutRsvpsInputSchema: z.ZodType<Prisma.MeetingsUpsertWithoutRsvpsInput> = z.object({
  update: z.union([ z.lazy(() => MeetingsUpdateWithoutRsvpsInputSchema),z.lazy(() => MeetingsUncheckedUpdateWithoutRsvpsInputSchema) ]),
  create: z.union([ z.lazy(() => MeetingsCreateWithoutRsvpsInputSchema),z.lazy(() => MeetingsUncheckedCreateWithoutRsvpsInputSchema) ]),
  where: z.lazy(() => MeetingsWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.MeetingsUpsertWithoutRsvpsInput>;

export const MeetingsUpdateToOneWithWhereWithoutRsvpsInputSchema: z.ZodType<Prisma.MeetingsUpdateToOneWithWhereWithoutRsvpsInput> = z.object({
  where: z.lazy(() => MeetingsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MeetingsUpdateWithoutRsvpsInputSchema),z.lazy(() => MeetingsUncheckedUpdateWithoutRsvpsInputSchema) ]),
}).strict() as z.ZodType<Prisma.MeetingsUpdateToOneWithWhereWithoutRsvpsInput>;

export const MeetingsUpdateWithoutRsvpsInputSchema: z.ZodType<Prisma.MeetingsUpdateWithoutRsvpsInput> = z.object({
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
  categories: z.lazy(() => CategoriesUpdateOneRequiredWithoutMeetingsNestedInputSchema).optional(),
  groups: z.lazy(() => GroupsUpdateOneRequiredWithoutMeetingsNestedInputSchema).optional(),
  users: z.lazy(() => UsersUpdateOneRequiredWithoutMeetingsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.MeetingsUpdateWithoutRsvpsInput>;

export const MeetingsUncheckedUpdateWithoutRsvpsInputSchema: z.ZodType<Prisma.MeetingsUncheckedUpdateWithoutRsvpsInput> = z.object({
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
}).strict() as z.ZodType<Prisma.MeetingsUncheckedUpdateWithoutRsvpsInput>;

export const UsersUpsertWithoutRsvpsInputSchema: z.ZodType<Prisma.UsersUpsertWithoutRsvpsInput> = z.object({
  update: z.union([ z.lazy(() => UsersUpdateWithoutRsvpsInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutRsvpsInputSchema) ]),
  create: z.union([ z.lazy(() => UsersCreateWithoutRsvpsInputSchema),z.lazy(() => UsersUncheckedCreateWithoutRsvpsInputSchema) ]),
  where: z.lazy(() => UsersWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.UsersUpsertWithoutRsvpsInput>;

export const UsersUpdateToOneWithWhereWithoutRsvpsInputSchema: z.ZodType<Prisma.UsersUpdateToOneWithWhereWithoutRsvpsInput> = z.object({
  where: z.lazy(() => UsersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UsersUpdateWithoutRsvpsInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutRsvpsInputSchema) ]),
}).strict() as z.ZodType<Prisma.UsersUpdateToOneWithWhereWithoutRsvpsInput>;

export const UsersUpdateWithoutRsvpsInputSchema: z.ZodType<Prisma.UsersUpdateWithoutRsvpsInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meetings: z.lazy(() => MeetingsUpdateManyWithoutUsersNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UsersUpdateWithoutRsvpsInput>;

export const UsersUncheckedUpdateWithoutRsvpsInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateWithoutRsvpsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meetings: z.lazy(() => MeetingsUncheckedUpdateManyWithoutUsersNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UsersUncheckedUpdateWithoutRsvpsInput>;

export const MeetingsCreateWithoutUsersInputSchema: z.ZodType<Prisma.MeetingsCreateWithoutUsersInput> = z.object({
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
  categories: z.lazy(() => CategoriesCreateNestedOneWithoutMeetingsInputSchema).optional(),
  groups: z.lazy(() => GroupsCreateNestedOneWithoutMeetingsInputSchema),
  rsvps: z.lazy(() => RSVPSCreateNestedManyWithoutMeetingsInputSchema).optional()
}).strict() as z.ZodType<Prisma.MeetingsCreateWithoutUsersInput>;

export const MeetingsUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.MeetingsUncheckedCreateWithoutUsersInput> = z.object({
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
  rsvps: z.lazy(() => RSVPSUncheckedCreateNestedManyWithoutMeetingsInputSchema).optional()
}).strict() as z.ZodType<Prisma.MeetingsUncheckedCreateWithoutUsersInput>;

export const MeetingsCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.MeetingsCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => MeetingsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MeetingsCreateWithoutUsersInputSchema),z.lazy(() => MeetingsUncheckedCreateWithoutUsersInputSchema) ]),
}).strict() as z.ZodType<Prisma.MeetingsCreateOrConnectWithoutUsersInput>;

export const MeetingsCreateManyUsersInputEnvelopeSchema: z.ZodType<Prisma.MeetingsCreateManyUsersInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MeetingsCreateManyUsersInputSchema),z.lazy(() => MeetingsCreateManyUsersInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.MeetingsCreateManyUsersInputEnvelope>;

export const RSVPSCreateWithoutUsersInputSchema: z.ZodType<Prisma.RSVPSCreateWithoutUsersInput> = z.object({
  uuid: z.string(),
  value: z.lazy(() => rsvp_statusSchema).optional(),
  type: z.lazy(() => rsvp_typeSchema).optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  meetings: z.lazy(() => MeetingsCreateNestedOneWithoutRsvpsInputSchema)
}).strict() as z.ZodType<Prisma.RSVPSCreateWithoutUsersInput>;

export const RSVPSUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.RSVPSUncheckedCreateWithoutUsersInput> = z.object({
  id: z.number().int().optional(),
  uuid: z.string(),
  meeting: z.string(),
  value: z.lazy(() => rsvp_statusSchema).optional(),
  type: z.lazy(() => rsvp_typeSchema).optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.RSVPSUncheckedCreateWithoutUsersInput>;

export const RSVPSCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.RSVPSCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => RSVPSWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RSVPSCreateWithoutUsersInputSchema),z.lazy(() => RSVPSUncheckedCreateWithoutUsersInputSchema) ]),
}).strict() as z.ZodType<Prisma.RSVPSCreateOrConnectWithoutUsersInput>;

export const RSVPSCreateManyUsersInputEnvelopeSchema: z.ZodType<Prisma.RSVPSCreateManyUsersInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RSVPSCreateManyUsersInputSchema),z.lazy(() => RSVPSCreateManyUsersInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.RSVPSCreateManyUsersInputEnvelope>;

export const MeetingsUpsertWithWhereUniqueWithoutUsersInputSchema: z.ZodType<Prisma.MeetingsUpsertWithWhereUniqueWithoutUsersInput> = z.object({
  where: z.lazy(() => MeetingsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MeetingsUpdateWithoutUsersInputSchema),z.lazy(() => MeetingsUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => MeetingsCreateWithoutUsersInputSchema),z.lazy(() => MeetingsUncheckedCreateWithoutUsersInputSchema) ]),
}).strict() as z.ZodType<Prisma.MeetingsUpsertWithWhereUniqueWithoutUsersInput>;

export const MeetingsUpdateWithWhereUniqueWithoutUsersInputSchema: z.ZodType<Prisma.MeetingsUpdateWithWhereUniqueWithoutUsersInput> = z.object({
  where: z.lazy(() => MeetingsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MeetingsUpdateWithoutUsersInputSchema),z.lazy(() => MeetingsUncheckedUpdateWithoutUsersInputSchema) ]),
}).strict() as z.ZodType<Prisma.MeetingsUpdateWithWhereUniqueWithoutUsersInput>;

export const MeetingsUpdateManyWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.MeetingsUpdateManyWithWhereWithoutUsersInput> = z.object({
  where: z.lazy(() => MeetingsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MeetingsUpdateManyMutationInputSchema),z.lazy(() => MeetingsUncheckedUpdateManyWithoutUsersInputSchema) ]),
}).strict() as z.ZodType<Prisma.MeetingsUpdateManyWithWhereWithoutUsersInput>;

export const RSVPSUpsertWithWhereUniqueWithoutUsersInputSchema: z.ZodType<Prisma.RSVPSUpsertWithWhereUniqueWithoutUsersInput> = z.object({
  where: z.lazy(() => RSVPSWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RSVPSUpdateWithoutUsersInputSchema),z.lazy(() => RSVPSUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => RSVPSCreateWithoutUsersInputSchema),z.lazy(() => RSVPSUncheckedCreateWithoutUsersInputSchema) ]),
}).strict() as z.ZodType<Prisma.RSVPSUpsertWithWhereUniqueWithoutUsersInput>;

export const RSVPSUpdateWithWhereUniqueWithoutUsersInputSchema: z.ZodType<Prisma.RSVPSUpdateWithWhereUniqueWithoutUsersInput> = z.object({
  where: z.lazy(() => RSVPSWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RSVPSUpdateWithoutUsersInputSchema),z.lazy(() => RSVPSUncheckedUpdateWithoutUsersInputSchema) ]),
}).strict() as z.ZodType<Prisma.RSVPSUpdateWithWhereUniqueWithoutUsersInput>;

export const RSVPSUpdateManyWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.RSVPSUpdateManyWithWhereWithoutUsersInput> = z.object({
  where: z.lazy(() => RSVPSScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RSVPSUpdateManyMutationInputSchema),z.lazy(() => RSVPSUncheckedUpdateManyWithoutUsersInputSchema) ]),
}).strict() as z.ZodType<Prisma.RSVPSUpdateManyWithWhereWithoutUsersInput>;

export const GroupsCreateManyCategoriesInputSchema: z.ZodType<Prisma.GroupsCreateManyCategoriesInput> = z.object({
  id: z.number().int().optional(),
  description: z.string().optional(),
  memberName: z.string().optional(),
  modName: z.string().optional(),
  privacyType: z.string().optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  uuid: z.string().optional().nullable(),
  name: z.string().optional()
}).strict() as z.ZodType<Prisma.GroupsCreateManyCategoriesInput>;

export const MeetingsCreateManyCategoriesInputSchema: z.ZodType<Prisma.MeetingsCreateManyCategoriesInput> = z.object({
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
}).strict() as z.ZodType<Prisma.MeetingsCreateManyCategoriesInput>;

export const GroupsUpdateWithoutCategoriesInputSchema: z.ZodType<Prisma.GroupsUpdateWithoutCategoriesInput> = z.object({
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  memberName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  privacyType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meetings: z.lazy(() => MeetingsUpdateManyWithoutGroupsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.GroupsUpdateWithoutCategoriesInput>;

export const GroupsUncheckedUpdateWithoutCategoriesInputSchema: z.ZodType<Prisma.GroupsUncheckedUpdateWithoutCategoriesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  memberName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  privacyType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meetings: z.lazy(() => MeetingsUncheckedUpdateManyWithoutGroupsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.GroupsUncheckedUpdateWithoutCategoriesInput>;

export const GroupsUncheckedUpdateManyWithoutCategoriesInputSchema: z.ZodType<Prisma.GroupsUncheckedUpdateManyWithoutCategoriesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  memberName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  privacyType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.GroupsUncheckedUpdateManyWithoutCategoriesInput>;

export const MeetingsUpdateWithoutCategoriesInputSchema: z.ZodType<Prisma.MeetingsUpdateWithoutCategoriesInput> = z.object({
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
  groups: z.lazy(() => GroupsUpdateOneRequiredWithoutMeetingsNestedInputSchema).optional(),
  users: z.lazy(() => UsersUpdateOneRequiredWithoutMeetingsNestedInputSchema).optional(),
  rsvps: z.lazy(() => RSVPSUpdateManyWithoutMeetingsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.MeetingsUpdateWithoutCategoriesInput>;

export const MeetingsUncheckedUpdateWithoutCategoriesInputSchema: z.ZodType<Prisma.MeetingsUncheckedUpdateWithoutCategoriesInput> = z.object({
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
  rsvps: z.lazy(() => RSVPSUncheckedUpdateManyWithoutMeetingsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.MeetingsUncheckedUpdateWithoutCategoriesInput>;

export const MeetingsUncheckedUpdateManyWithoutCategoriesInputSchema: z.ZodType<Prisma.MeetingsUncheckedUpdateManyWithoutCategoriesInput> = z.object({
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
}).strict() as z.ZodType<Prisma.MeetingsUncheckedUpdateManyWithoutCategoriesInput>;

export const MeetingsCreateManyGroupsInputSchema: z.ZodType<Prisma.MeetingsCreateManyGroupsInput> = z.object({
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
}).strict() as z.ZodType<Prisma.MeetingsCreateManyGroupsInput>;

export const MeetingsUpdateWithoutGroupsInputSchema: z.ZodType<Prisma.MeetingsUpdateWithoutGroupsInput> = z.object({
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
  categories: z.lazy(() => CategoriesUpdateOneRequiredWithoutMeetingsNestedInputSchema).optional(),
  users: z.lazy(() => UsersUpdateOneRequiredWithoutMeetingsNestedInputSchema).optional(),
  rsvps: z.lazy(() => RSVPSUpdateManyWithoutMeetingsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.MeetingsUpdateWithoutGroupsInput>;

export const MeetingsUncheckedUpdateWithoutGroupsInputSchema: z.ZodType<Prisma.MeetingsUncheckedUpdateWithoutGroupsInput> = z.object({
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
  rsvps: z.lazy(() => RSVPSUncheckedUpdateManyWithoutMeetingsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.MeetingsUncheckedUpdateWithoutGroupsInput>;

export const MeetingsUncheckedUpdateManyWithoutGroupsInputSchema: z.ZodType<Prisma.MeetingsUncheckedUpdateManyWithoutGroupsInput> = z.object({
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
}).strict() as z.ZodType<Prisma.MeetingsUncheckedUpdateManyWithoutGroupsInput>;

export const RSVPSCreateManyMeetingsInputSchema: z.ZodType<Prisma.RSVPSCreateManyMeetingsInput> = z.object({
  id: z.number().int().optional(),
  uuid: z.string(),
  user: z.string(),
  value: z.lazy(() => rsvp_statusSchema).optional(),
  type: z.lazy(() => rsvp_typeSchema).optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.RSVPSCreateManyMeetingsInput>;

export const RSVPSUpdateWithoutMeetingsInputSchema: z.ZodType<Prisma.RSVPSUpdateWithoutMeetingsInput> = z.object({
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.lazy(() => rsvp_statusSchema),z.lazy(() => Enumrsvp_statusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => rsvp_typeSchema),z.lazy(() => Enumrsvp_typeFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UsersUpdateOneRequiredWithoutRsvpsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.RSVPSUpdateWithoutMeetingsInput>;

export const RSVPSUncheckedUpdateWithoutMeetingsInputSchema: z.ZodType<Prisma.RSVPSUncheckedUpdateWithoutMeetingsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.lazy(() => rsvp_statusSchema),z.lazy(() => Enumrsvp_statusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => rsvp_typeSchema),z.lazy(() => Enumrsvp_typeFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.RSVPSUncheckedUpdateWithoutMeetingsInput>;

export const RSVPSUncheckedUpdateManyWithoutMeetingsInputSchema: z.ZodType<Prisma.RSVPSUncheckedUpdateManyWithoutMeetingsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.lazy(() => rsvp_statusSchema),z.lazy(() => Enumrsvp_statusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => rsvp_typeSchema),z.lazy(() => Enumrsvp_typeFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.RSVPSUncheckedUpdateManyWithoutMeetingsInput>;

export const MeetingsCreateManyUsersInputSchema: z.ZodType<Prisma.MeetingsCreateManyUsersInput> = z.object({
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
}).strict() as z.ZodType<Prisma.MeetingsCreateManyUsersInput>;

export const RSVPSCreateManyUsersInputSchema: z.ZodType<Prisma.RSVPSCreateManyUsersInput> = z.object({
  id: z.number().int().optional(),
  uuid: z.string(),
  meeting: z.string(),
  value: z.lazy(() => rsvp_statusSchema).optional(),
  type: z.lazy(() => rsvp_typeSchema).optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.RSVPSCreateManyUsersInput>;

export const MeetingsUpdateWithoutUsersInputSchema: z.ZodType<Prisma.MeetingsUpdateWithoutUsersInput> = z.object({
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
  categories: z.lazy(() => CategoriesUpdateOneRequiredWithoutMeetingsNestedInputSchema).optional(),
  groups: z.lazy(() => GroupsUpdateOneRequiredWithoutMeetingsNestedInputSchema).optional(),
  rsvps: z.lazy(() => RSVPSUpdateManyWithoutMeetingsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.MeetingsUpdateWithoutUsersInput>;

export const MeetingsUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.MeetingsUncheckedUpdateWithoutUsersInput> = z.object({
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
  rsvps: z.lazy(() => RSVPSUncheckedUpdateManyWithoutMeetingsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.MeetingsUncheckedUpdateWithoutUsersInput>;

export const MeetingsUncheckedUpdateManyWithoutUsersInputSchema: z.ZodType<Prisma.MeetingsUncheckedUpdateManyWithoutUsersInput> = z.object({
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
}).strict() as z.ZodType<Prisma.MeetingsUncheckedUpdateManyWithoutUsersInput>;

export const RSVPSUpdateWithoutUsersInputSchema: z.ZodType<Prisma.RSVPSUpdateWithoutUsersInput> = z.object({
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.lazy(() => rsvp_statusSchema),z.lazy(() => Enumrsvp_statusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => rsvp_typeSchema),z.lazy(() => Enumrsvp_typeFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meetings: z.lazy(() => MeetingsUpdateOneRequiredWithoutRsvpsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.RSVPSUpdateWithoutUsersInput>;

export const RSVPSUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.RSVPSUncheckedUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meeting: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.lazy(() => rsvp_statusSchema),z.lazy(() => Enumrsvp_statusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => rsvp_typeSchema),z.lazy(() => Enumrsvp_typeFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.RSVPSUncheckedUpdateWithoutUsersInput>;

export const RSVPSUncheckedUpdateManyWithoutUsersInputSchema: z.ZodType<Prisma.RSVPSUncheckedUpdateManyWithoutUsersInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meeting: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.lazy(() => rsvp_statusSchema),z.lazy(() => Enumrsvp_statusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => rsvp_typeSchema),z.lazy(() => Enumrsvp_typeFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.RSVPSUncheckedUpdateManyWithoutUsersInput>;

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const CategoriesFindFirstArgsSchema: z.ZodType<Prisma.CategoriesFindFirstArgs> = z.object({
  select: CategoriesSelectSchema.optional(),
  include: CategoriesIncludeSchema.optional(),
  where: CategoriesWhereInputSchema.optional(),
  orderBy: z.union([ CategoriesOrderByWithRelationInputSchema.array(),CategoriesOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoriesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoriesScalarFieldEnumSchema,CategoriesScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CategoriesFindFirstArgs>;

export const CategoriesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CategoriesFindFirstOrThrowArgs> = z.object({
  select: CategoriesSelectSchema.optional(),
  include: CategoriesIncludeSchema.optional(),
  where: CategoriesWhereInputSchema.optional(),
  orderBy: z.union([ CategoriesOrderByWithRelationInputSchema.array(),CategoriesOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoriesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoriesScalarFieldEnumSchema,CategoriesScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CategoriesFindFirstOrThrowArgs>;

export const CategoriesFindManyArgsSchema: z.ZodType<Prisma.CategoriesFindManyArgs> = z.object({
  select: CategoriesSelectSchema.optional(),
  include: CategoriesIncludeSchema.optional(),
  where: CategoriesWhereInputSchema.optional(),
  orderBy: z.union([ CategoriesOrderByWithRelationInputSchema.array(),CategoriesOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoriesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoriesScalarFieldEnumSchema,CategoriesScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CategoriesFindManyArgs>;

export const CategoriesAggregateArgsSchema: z.ZodType<Prisma.CategoriesAggregateArgs> = z.object({
  where: CategoriesWhereInputSchema.optional(),
  orderBy: z.union([ CategoriesOrderByWithRelationInputSchema.array(),CategoriesOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoriesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.CategoriesAggregateArgs>;

export const CategoriesGroupByArgsSchema: z.ZodType<Prisma.CategoriesGroupByArgs> = z.object({
  where: CategoriesWhereInputSchema.optional(),
  orderBy: z.union([ CategoriesOrderByWithAggregationInputSchema.array(),CategoriesOrderByWithAggregationInputSchema ]).optional(),
  by: CategoriesScalarFieldEnumSchema.array(),
  having: CategoriesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.CategoriesGroupByArgs>;

export const CategoriesFindUniqueArgsSchema: z.ZodType<Prisma.CategoriesFindUniqueArgs> = z.object({
  select: CategoriesSelectSchema.optional(),
  include: CategoriesIncludeSchema.optional(),
  where: CategoriesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CategoriesFindUniqueArgs>;

export const CategoriesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CategoriesFindUniqueOrThrowArgs> = z.object({
  select: CategoriesSelectSchema.optional(),
  include: CategoriesIncludeSchema.optional(),
  where: CategoriesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CategoriesFindUniqueOrThrowArgs>;

export const DecisionsFindFirstArgsSchema: z.ZodType<Prisma.DecisionsFindFirstArgs> = z.object({
  select: DecisionsSelectSchema.optional(),
  where: DecisionsWhereInputSchema.optional(),
  orderBy: z.union([ DecisionsOrderByWithRelationInputSchema.array(),DecisionsOrderByWithRelationInputSchema ]).optional(),
  cursor: DecisionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DecisionsScalarFieldEnumSchema,DecisionsScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.DecisionsFindFirstArgs>;

export const DecisionsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DecisionsFindFirstOrThrowArgs> = z.object({
  select: DecisionsSelectSchema.optional(),
  where: DecisionsWhereInputSchema.optional(),
  orderBy: z.union([ DecisionsOrderByWithRelationInputSchema.array(),DecisionsOrderByWithRelationInputSchema ]).optional(),
  cursor: DecisionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DecisionsScalarFieldEnumSchema,DecisionsScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.DecisionsFindFirstOrThrowArgs>;

export const DecisionsFindManyArgsSchema: z.ZodType<Prisma.DecisionsFindManyArgs> = z.object({
  select: DecisionsSelectSchema.optional(),
  where: DecisionsWhereInputSchema.optional(),
  orderBy: z.union([ DecisionsOrderByWithRelationInputSchema.array(),DecisionsOrderByWithRelationInputSchema ]).optional(),
  cursor: DecisionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DecisionsScalarFieldEnumSchema,DecisionsScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.DecisionsFindManyArgs>;

export const DecisionsAggregateArgsSchema: z.ZodType<Prisma.DecisionsAggregateArgs> = z.object({
  where: DecisionsWhereInputSchema.optional(),
  orderBy: z.union([ DecisionsOrderByWithRelationInputSchema.array(),DecisionsOrderByWithRelationInputSchema ]).optional(),
  cursor: DecisionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.DecisionsAggregateArgs>;

export const DecisionsGroupByArgsSchema: z.ZodType<Prisma.DecisionsGroupByArgs> = z.object({
  where: DecisionsWhereInputSchema.optional(),
  orderBy: z.union([ DecisionsOrderByWithAggregationInputSchema.array(),DecisionsOrderByWithAggregationInputSchema ]).optional(),
  by: DecisionsScalarFieldEnumSchema.array(),
  having: DecisionsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.DecisionsGroupByArgs>;

export const DecisionsFindUniqueArgsSchema: z.ZodType<Prisma.DecisionsFindUniqueArgs> = z.object({
  select: DecisionsSelectSchema.optional(),
  where: DecisionsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.DecisionsFindUniqueArgs>;

export const DecisionsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DecisionsFindUniqueOrThrowArgs> = z.object({
  select: DecisionsSelectSchema.optional(),
  where: DecisionsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.DecisionsFindUniqueOrThrowArgs>;

export const GroupsFindFirstArgsSchema: z.ZodType<Prisma.GroupsFindFirstArgs> = z.object({
  select: GroupsSelectSchema.optional(),
  include: GroupsIncludeSchema.optional(),
  where: GroupsWhereInputSchema.optional(),
  orderBy: z.union([ GroupsOrderByWithRelationInputSchema.array(),GroupsOrderByWithRelationInputSchema ]).optional(),
  cursor: GroupsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GroupsScalarFieldEnumSchema,GroupsScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.GroupsFindFirstArgs>;

export const GroupsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.GroupsFindFirstOrThrowArgs> = z.object({
  select: GroupsSelectSchema.optional(),
  include: GroupsIncludeSchema.optional(),
  where: GroupsWhereInputSchema.optional(),
  orderBy: z.union([ GroupsOrderByWithRelationInputSchema.array(),GroupsOrderByWithRelationInputSchema ]).optional(),
  cursor: GroupsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GroupsScalarFieldEnumSchema,GroupsScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.GroupsFindFirstOrThrowArgs>;

export const GroupsFindManyArgsSchema: z.ZodType<Prisma.GroupsFindManyArgs> = z.object({
  select: GroupsSelectSchema.optional(),
  include: GroupsIncludeSchema.optional(),
  where: GroupsWhereInputSchema.optional(),
  orderBy: z.union([ GroupsOrderByWithRelationInputSchema.array(),GroupsOrderByWithRelationInputSchema ]).optional(),
  cursor: GroupsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GroupsScalarFieldEnumSchema,GroupsScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.GroupsFindManyArgs>;

export const GroupsAggregateArgsSchema: z.ZodType<Prisma.GroupsAggregateArgs> = z.object({
  where: GroupsWhereInputSchema.optional(),
  orderBy: z.union([ GroupsOrderByWithRelationInputSchema.array(),GroupsOrderByWithRelationInputSchema ]).optional(),
  cursor: GroupsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.GroupsAggregateArgs>;

export const GroupsGroupByArgsSchema: z.ZodType<Prisma.GroupsGroupByArgs> = z.object({
  where: GroupsWhereInputSchema.optional(),
  orderBy: z.union([ GroupsOrderByWithAggregationInputSchema.array(),GroupsOrderByWithAggregationInputSchema ]).optional(),
  by: GroupsScalarFieldEnumSchema.array(),
  having: GroupsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.GroupsGroupByArgs>;

export const GroupsFindUniqueArgsSchema: z.ZodType<Prisma.GroupsFindUniqueArgs> = z.object({
  select: GroupsSelectSchema.optional(),
  include: GroupsIncludeSchema.optional(),
  where: GroupsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.GroupsFindUniqueArgs>;

export const GroupsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.GroupsFindUniqueOrThrowArgs> = z.object({
  select: GroupsSelectSchema.optional(),
  include: GroupsIncludeSchema.optional(),
  where: GroupsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.GroupsFindUniqueOrThrowArgs>;

export const MeetingsFindFirstArgsSchema: z.ZodType<Prisma.MeetingsFindFirstArgs> = z.object({
  select: MeetingsSelectSchema.optional(),
  include: MeetingsIncludeSchema.optional(),
  where: MeetingsWhereInputSchema.optional(),
  orderBy: z.union([ MeetingsOrderByWithRelationInputSchema.array(),MeetingsOrderByWithRelationInputSchema ]).optional(),
  cursor: MeetingsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MeetingsScalarFieldEnumSchema,MeetingsScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.MeetingsFindFirstArgs>;

export const MeetingsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MeetingsFindFirstOrThrowArgs> = z.object({
  select: MeetingsSelectSchema.optional(),
  include: MeetingsIncludeSchema.optional(),
  where: MeetingsWhereInputSchema.optional(),
  orderBy: z.union([ MeetingsOrderByWithRelationInputSchema.array(),MeetingsOrderByWithRelationInputSchema ]).optional(),
  cursor: MeetingsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MeetingsScalarFieldEnumSchema,MeetingsScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.MeetingsFindFirstOrThrowArgs>;

export const MeetingsFindManyArgsSchema: z.ZodType<Prisma.MeetingsFindManyArgs> = z.object({
  select: MeetingsSelectSchema.optional(),
  include: MeetingsIncludeSchema.optional(),
  where: MeetingsWhereInputSchema.optional(),
  orderBy: z.union([ MeetingsOrderByWithRelationInputSchema.array(),MeetingsOrderByWithRelationInputSchema ]).optional(),
  cursor: MeetingsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MeetingsScalarFieldEnumSchema,MeetingsScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.MeetingsFindManyArgs>;

export const MeetingsAggregateArgsSchema: z.ZodType<Prisma.MeetingsAggregateArgs> = z.object({
  where: MeetingsWhereInputSchema.optional(),
  orderBy: z.union([ MeetingsOrderByWithRelationInputSchema.array(),MeetingsOrderByWithRelationInputSchema ]).optional(),
  cursor: MeetingsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.MeetingsAggregateArgs>;

export const MeetingsGroupByArgsSchema: z.ZodType<Prisma.MeetingsGroupByArgs> = z.object({
  where: MeetingsWhereInputSchema.optional(),
  orderBy: z.union([ MeetingsOrderByWithAggregationInputSchema.array(),MeetingsOrderByWithAggregationInputSchema ]).optional(),
  by: MeetingsScalarFieldEnumSchema.array(),
  having: MeetingsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.MeetingsGroupByArgs>;

export const MeetingsFindUniqueArgsSchema: z.ZodType<Prisma.MeetingsFindUniqueArgs> = z.object({
  select: MeetingsSelectSchema.optional(),
  include: MeetingsIncludeSchema.optional(),
  where: MeetingsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.MeetingsFindUniqueArgs>;

export const MeetingsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MeetingsFindUniqueOrThrowArgs> = z.object({
  select: MeetingsSelectSchema.optional(),
  include: MeetingsIncludeSchema.optional(),
  where: MeetingsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.MeetingsFindUniqueOrThrowArgs>;

export const RSVPSFindFirstArgsSchema: z.ZodType<Prisma.RSVPSFindFirstArgs> = z.object({
  select: RSVPSSelectSchema.optional(),
  include: RSVPSIncludeSchema.optional(),
  where: RSVPSWhereInputSchema.optional(),
  orderBy: z.union([ RSVPSOrderByWithRelationInputSchema.array(),RSVPSOrderByWithRelationInputSchema ]).optional(),
  cursor: RSVPSWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RSVPSScalarFieldEnumSchema,RSVPSScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.RSVPSFindFirstArgs>;

export const RSVPSFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RSVPSFindFirstOrThrowArgs> = z.object({
  select: RSVPSSelectSchema.optional(),
  include: RSVPSIncludeSchema.optional(),
  where: RSVPSWhereInputSchema.optional(),
  orderBy: z.union([ RSVPSOrderByWithRelationInputSchema.array(),RSVPSOrderByWithRelationInputSchema ]).optional(),
  cursor: RSVPSWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RSVPSScalarFieldEnumSchema,RSVPSScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.RSVPSFindFirstOrThrowArgs>;

export const RSVPSFindManyArgsSchema: z.ZodType<Prisma.RSVPSFindManyArgs> = z.object({
  select: RSVPSSelectSchema.optional(),
  include: RSVPSIncludeSchema.optional(),
  where: RSVPSWhereInputSchema.optional(),
  orderBy: z.union([ RSVPSOrderByWithRelationInputSchema.array(),RSVPSOrderByWithRelationInputSchema ]).optional(),
  cursor: RSVPSWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RSVPSScalarFieldEnumSchema,RSVPSScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.RSVPSFindManyArgs>;

export const RSVPSAggregateArgsSchema: z.ZodType<Prisma.RSVPSAggregateArgs> = z.object({
  where: RSVPSWhereInputSchema.optional(),
  orderBy: z.union([ RSVPSOrderByWithRelationInputSchema.array(),RSVPSOrderByWithRelationInputSchema ]).optional(),
  cursor: RSVPSWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.RSVPSAggregateArgs>;

export const RSVPSGroupByArgsSchema: z.ZodType<Prisma.RSVPSGroupByArgs> = z.object({
  where: RSVPSWhereInputSchema.optional(),
  orderBy: z.union([ RSVPSOrderByWithAggregationInputSchema.array(),RSVPSOrderByWithAggregationInputSchema ]).optional(),
  by: RSVPSScalarFieldEnumSchema.array(),
  having: RSVPSScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.RSVPSGroupByArgs>;

export const RSVPSFindUniqueArgsSchema: z.ZodType<Prisma.RSVPSFindUniqueArgs> = z.object({
  select: RSVPSSelectSchema.optional(),
  include: RSVPSIncludeSchema.optional(),
  where: RSVPSWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.RSVPSFindUniqueArgs>;

export const RSVPSFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RSVPSFindUniqueOrThrowArgs> = z.object({
  select: RSVPSSelectSchema.optional(),
  include: RSVPSIncludeSchema.optional(),
  where: RSVPSWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.RSVPSFindUniqueOrThrowArgs>;

export const UsersFindFirstArgsSchema: z.ZodType<Prisma.UsersFindFirstArgs> = z.object({
  select: UsersSelectSchema.optional(),
  include: UsersIncludeSchema.optional(),
  where: UsersWhereInputSchema.optional(),
  orderBy: z.union([ UsersOrderByWithRelationInputSchema.array(),UsersOrderByWithRelationInputSchema ]).optional(),
  cursor: UsersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersScalarFieldEnumSchema,UsersScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.UsersFindFirstArgs>;

export const UsersFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UsersFindFirstOrThrowArgs> = z.object({
  select: UsersSelectSchema.optional(),
  include: UsersIncludeSchema.optional(),
  where: UsersWhereInputSchema.optional(),
  orderBy: z.union([ UsersOrderByWithRelationInputSchema.array(),UsersOrderByWithRelationInputSchema ]).optional(),
  cursor: UsersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersScalarFieldEnumSchema,UsersScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.UsersFindFirstOrThrowArgs>;

export const UsersFindManyArgsSchema: z.ZodType<Prisma.UsersFindManyArgs> = z.object({
  select: UsersSelectSchema.optional(),
  include: UsersIncludeSchema.optional(),
  where: UsersWhereInputSchema.optional(),
  orderBy: z.union([ UsersOrderByWithRelationInputSchema.array(),UsersOrderByWithRelationInputSchema ]).optional(),
  cursor: UsersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersScalarFieldEnumSchema,UsersScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.UsersFindManyArgs>;

export const UsersAggregateArgsSchema: z.ZodType<Prisma.UsersAggregateArgs> = z.object({
  where: UsersWhereInputSchema.optional(),
  orderBy: z.union([ UsersOrderByWithRelationInputSchema.array(),UsersOrderByWithRelationInputSchema ]).optional(),
  cursor: UsersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.UsersAggregateArgs>;

export const UsersGroupByArgsSchema: z.ZodType<Prisma.UsersGroupByArgs> = z.object({
  where: UsersWhereInputSchema.optional(),
  orderBy: z.union([ UsersOrderByWithAggregationInputSchema.array(),UsersOrderByWithAggregationInputSchema ]).optional(),
  by: UsersScalarFieldEnumSchema.array(),
  having: UsersScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.UsersGroupByArgs>;

export const UsersFindUniqueArgsSchema: z.ZodType<Prisma.UsersFindUniqueArgs> = z.object({
  select: UsersSelectSchema.optional(),
  include: UsersIncludeSchema.optional(),
  where: UsersWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UsersFindUniqueArgs>;

export const UsersFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UsersFindUniqueOrThrowArgs> = z.object({
  select: UsersSelectSchema.optional(),
  include: UsersIncludeSchema.optional(),
  where: UsersWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UsersFindUniqueOrThrowArgs>;

export const CategoriesCreateArgsSchema: z.ZodType<Prisma.CategoriesCreateArgs> = z.object({
  select: CategoriesSelectSchema.optional(),
  include: CategoriesIncludeSchema.optional(),
  data: z.union([ CategoriesCreateInputSchema,CategoriesUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.CategoriesCreateArgs>;

export const CategoriesUpsertArgsSchema: z.ZodType<Prisma.CategoriesUpsertArgs> = z.object({
  select: CategoriesSelectSchema.optional(),
  include: CategoriesIncludeSchema.optional(),
  where: CategoriesWhereUniqueInputSchema,
  create: z.union([ CategoriesCreateInputSchema,CategoriesUncheckedCreateInputSchema ]),
  update: z.union([ CategoriesUpdateInputSchema,CategoriesUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.CategoriesUpsertArgs>;

export const CategoriesCreateManyArgsSchema: z.ZodType<Prisma.CategoriesCreateManyArgs> = z.object({
  data: z.union([ CategoriesCreateManyInputSchema,CategoriesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.CategoriesCreateManyArgs>;

export const CategoriesCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CategoriesCreateManyAndReturnArgs> = z.object({
  data: z.union([ CategoriesCreateManyInputSchema,CategoriesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.CategoriesCreateManyAndReturnArgs>;

export const CategoriesDeleteArgsSchema: z.ZodType<Prisma.CategoriesDeleteArgs> = z.object({
  select: CategoriesSelectSchema.optional(),
  include: CategoriesIncludeSchema.optional(),
  where: CategoriesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CategoriesDeleteArgs>;

export const CategoriesUpdateArgsSchema: z.ZodType<Prisma.CategoriesUpdateArgs> = z.object({
  select: CategoriesSelectSchema.optional(),
  include: CategoriesIncludeSchema.optional(),
  data: z.union([ CategoriesUpdateInputSchema,CategoriesUncheckedUpdateInputSchema ]),
  where: CategoriesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CategoriesUpdateArgs>;

export const CategoriesUpdateManyArgsSchema: z.ZodType<Prisma.CategoriesUpdateManyArgs> = z.object({
  data: z.union([ CategoriesUpdateManyMutationInputSchema,CategoriesUncheckedUpdateManyInputSchema ]),
  where: CategoriesWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.CategoriesUpdateManyArgs>;

export const CategoriesDeleteManyArgsSchema: z.ZodType<Prisma.CategoriesDeleteManyArgs> = z.object({
  where: CategoriesWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.CategoriesDeleteManyArgs>;

export const DecisionsCreateArgsSchema: z.ZodType<Prisma.DecisionsCreateArgs> = z.object({
  select: DecisionsSelectSchema.optional(),
  data: z.union([ DecisionsCreateInputSchema,DecisionsUncheckedCreateInputSchema ]).optional(),
}).strict() as z.ZodType<Prisma.DecisionsCreateArgs>;

export const DecisionsUpsertArgsSchema: z.ZodType<Prisma.DecisionsUpsertArgs> = z.object({
  select: DecisionsSelectSchema.optional(),
  where: DecisionsWhereUniqueInputSchema,
  create: z.union([ DecisionsCreateInputSchema,DecisionsUncheckedCreateInputSchema ]),
  update: z.union([ DecisionsUpdateInputSchema,DecisionsUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.DecisionsUpsertArgs>;

export const DecisionsCreateManyArgsSchema: z.ZodType<Prisma.DecisionsCreateManyArgs> = z.object({
  data: z.union([ DecisionsCreateManyInputSchema,DecisionsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.DecisionsCreateManyArgs>;

export const DecisionsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.DecisionsCreateManyAndReturnArgs> = z.object({
  data: z.union([ DecisionsCreateManyInputSchema,DecisionsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.DecisionsCreateManyAndReturnArgs>;

export const DecisionsDeleteArgsSchema: z.ZodType<Prisma.DecisionsDeleteArgs> = z.object({
  select: DecisionsSelectSchema.optional(),
  where: DecisionsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.DecisionsDeleteArgs>;

export const DecisionsUpdateArgsSchema: z.ZodType<Prisma.DecisionsUpdateArgs> = z.object({
  select: DecisionsSelectSchema.optional(),
  data: z.union([ DecisionsUpdateInputSchema,DecisionsUncheckedUpdateInputSchema ]),
  where: DecisionsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.DecisionsUpdateArgs>;

export const DecisionsUpdateManyArgsSchema: z.ZodType<Prisma.DecisionsUpdateManyArgs> = z.object({
  data: z.union([ DecisionsUpdateManyMutationInputSchema,DecisionsUncheckedUpdateManyInputSchema ]),
  where: DecisionsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.DecisionsUpdateManyArgs>;

export const DecisionsDeleteManyArgsSchema: z.ZodType<Prisma.DecisionsDeleteManyArgs> = z.object({
  where: DecisionsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.DecisionsDeleteManyArgs>;

export const GroupsCreateArgsSchema: z.ZodType<Prisma.GroupsCreateArgs> = z.object({
  select: GroupsSelectSchema.optional(),
  include: GroupsIncludeSchema.optional(),
  data: z.union([ GroupsCreateInputSchema,GroupsUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.GroupsCreateArgs>;

export const GroupsUpsertArgsSchema: z.ZodType<Prisma.GroupsUpsertArgs> = z.object({
  select: GroupsSelectSchema.optional(),
  include: GroupsIncludeSchema.optional(),
  where: GroupsWhereUniqueInputSchema,
  create: z.union([ GroupsCreateInputSchema,GroupsUncheckedCreateInputSchema ]),
  update: z.union([ GroupsUpdateInputSchema,GroupsUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.GroupsUpsertArgs>;

export const GroupsCreateManyArgsSchema: z.ZodType<Prisma.GroupsCreateManyArgs> = z.object({
  data: z.union([ GroupsCreateManyInputSchema,GroupsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.GroupsCreateManyArgs>;

export const GroupsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.GroupsCreateManyAndReturnArgs> = z.object({
  data: z.union([ GroupsCreateManyInputSchema,GroupsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.GroupsCreateManyAndReturnArgs>;

export const GroupsDeleteArgsSchema: z.ZodType<Prisma.GroupsDeleteArgs> = z.object({
  select: GroupsSelectSchema.optional(),
  include: GroupsIncludeSchema.optional(),
  where: GroupsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.GroupsDeleteArgs>;

export const GroupsUpdateArgsSchema: z.ZodType<Prisma.GroupsUpdateArgs> = z.object({
  select: GroupsSelectSchema.optional(),
  include: GroupsIncludeSchema.optional(),
  data: z.union([ GroupsUpdateInputSchema,GroupsUncheckedUpdateInputSchema ]),
  where: GroupsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.GroupsUpdateArgs>;

export const GroupsUpdateManyArgsSchema: z.ZodType<Prisma.GroupsUpdateManyArgs> = z.object({
  data: z.union([ GroupsUpdateManyMutationInputSchema,GroupsUncheckedUpdateManyInputSchema ]),
  where: GroupsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.GroupsUpdateManyArgs>;

export const GroupsDeleteManyArgsSchema: z.ZodType<Prisma.GroupsDeleteManyArgs> = z.object({
  where: GroupsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.GroupsDeleteManyArgs>;

export const MeetingsCreateArgsSchema: z.ZodType<Prisma.MeetingsCreateArgs> = z.object({
  select: MeetingsSelectSchema.optional(),
  include: MeetingsIncludeSchema.optional(),
  data: z.union([ MeetingsCreateInputSchema,MeetingsUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.MeetingsCreateArgs>;

export const MeetingsUpsertArgsSchema: z.ZodType<Prisma.MeetingsUpsertArgs> = z.object({
  select: MeetingsSelectSchema.optional(),
  include: MeetingsIncludeSchema.optional(),
  where: MeetingsWhereUniqueInputSchema,
  create: z.union([ MeetingsCreateInputSchema,MeetingsUncheckedCreateInputSchema ]),
  update: z.union([ MeetingsUpdateInputSchema,MeetingsUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.MeetingsUpsertArgs>;

export const MeetingsCreateManyArgsSchema: z.ZodType<Prisma.MeetingsCreateManyArgs> = z.object({
  data: z.union([ MeetingsCreateManyInputSchema,MeetingsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.MeetingsCreateManyArgs>;

export const MeetingsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.MeetingsCreateManyAndReturnArgs> = z.object({
  data: z.union([ MeetingsCreateManyInputSchema,MeetingsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.MeetingsCreateManyAndReturnArgs>;

export const MeetingsDeleteArgsSchema: z.ZodType<Prisma.MeetingsDeleteArgs> = z.object({
  select: MeetingsSelectSchema.optional(),
  include: MeetingsIncludeSchema.optional(),
  where: MeetingsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.MeetingsDeleteArgs>;

export const MeetingsUpdateArgsSchema: z.ZodType<Prisma.MeetingsUpdateArgs> = z.object({
  select: MeetingsSelectSchema.optional(),
  include: MeetingsIncludeSchema.optional(),
  data: z.union([ MeetingsUpdateInputSchema,MeetingsUncheckedUpdateInputSchema ]),
  where: MeetingsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.MeetingsUpdateArgs>;

export const MeetingsUpdateManyArgsSchema: z.ZodType<Prisma.MeetingsUpdateManyArgs> = z.object({
  data: z.union([ MeetingsUpdateManyMutationInputSchema,MeetingsUncheckedUpdateManyInputSchema ]),
  where: MeetingsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.MeetingsUpdateManyArgs>;

export const MeetingsDeleteManyArgsSchema: z.ZodType<Prisma.MeetingsDeleteManyArgs> = z.object({
  where: MeetingsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.MeetingsDeleteManyArgs>;

export const RSVPSCreateArgsSchema: z.ZodType<Prisma.RSVPSCreateArgs> = z.object({
  select: RSVPSSelectSchema.optional(),
  include: RSVPSIncludeSchema.optional(),
  data: z.union([ RSVPSCreateInputSchema,RSVPSUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.RSVPSCreateArgs>;

export const RSVPSUpsertArgsSchema: z.ZodType<Prisma.RSVPSUpsertArgs> = z.object({
  select: RSVPSSelectSchema.optional(),
  include: RSVPSIncludeSchema.optional(),
  where: RSVPSWhereUniqueInputSchema,
  create: z.union([ RSVPSCreateInputSchema,RSVPSUncheckedCreateInputSchema ]),
  update: z.union([ RSVPSUpdateInputSchema,RSVPSUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.RSVPSUpsertArgs>;

export const RSVPSCreateManyArgsSchema: z.ZodType<Prisma.RSVPSCreateManyArgs> = z.object({
  data: z.union([ RSVPSCreateManyInputSchema,RSVPSCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.RSVPSCreateManyArgs>;

export const RSVPSCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RSVPSCreateManyAndReturnArgs> = z.object({
  data: z.union([ RSVPSCreateManyInputSchema,RSVPSCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.RSVPSCreateManyAndReturnArgs>;

export const RSVPSDeleteArgsSchema: z.ZodType<Prisma.RSVPSDeleteArgs> = z.object({
  select: RSVPSSelectSchema.optional(),
  include: RSVPSIncludeSchema.optional(),
  where: RSVPSWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.RSVPSDeleteArgs>;

export const RSVPSUpdateArgsSchema: z.ZodType<Prisma.RSVPSUpdateArgs> = z.object({
  select: RSVPSSelectSchema.optional(),
  include: RSVPSIncludeSchema.optional(),
  data: z.union([ RSVPSUpdateInputSchema,RSVPSUncheckedUpdateInputSchema ]),
  where: RSVPSWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.RSVPSUpdateArgs>;

export const RSVPSUpdateManyArgsSchema: z.ZodType<Prisma.RSVPSUpdateManyArgs> = z.object({
  data: z.union([ RSVPSUpdateManyMutationInputSchema,RSVPSUncheckedUpdateManyInputSchema ]),
  where: RSVPSWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.RSVPSUpdateManyArgs>;

export const RSVPSDeleteManyArgsSchema: z.ZodType<Prisma.RSVPSDeleteManyArgs> = z.object({
  where: RSVPSWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.RSVPSDeleteManyArgs>;

export const UsersCreateArgsSchema: z.ZodType<Prisma.UsersCreateArgs> = z.object({
  select: UsersSelectSchema.optional(),
  include: UsersIncludeSchema.optional(),
  data: z.union([ UsersCreateInputSchema,UsersUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.UsersCreateArgs>;

export const UsersUpsertArgsSchema: z.ZodType<Prisma.UsersUpsertArgs> = z.object({
  select: UsersSelectSchema.optional(),
  include: UsersIncludeSchema.optional(),
  where: UsersWhereUniqueInputSchema,
  create: z.union([ UsersCreateInputSchema,UsersUncheckedCreateInputSchema ]),
  update: z.union([ UsersUpdateInputSchema,UsersUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.UsersUpsertArgs>;

export const UsersCreateManyArgsSchema: z.ZodType<Prisma.UsersCreateManyArgs> = z.object({
  data: z.union([ UsersCreateManyInputSchema,UsersCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.UsersCreateManyArgs>;

export const UsersCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UsersCreateManyAndReturnArgs> = z.object({
  data: z.union([ UsersCreateManyInputSchema,UsersCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.UsersCreateManyAndReturnArgs>;

export const UsersDeleteArgsSchema: z.ZodType<Prisma.UsersDeleteArgs> = z.object({
  select: UsersSelectSchema.optional(),
  include: UsersIncludeSchema.optional(),
  where: UsersWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UsersDeleteArgs>;

export const UsersUpdateArgsSchema: z.ZodType<Prisma.UsersUpdateArgs> = z.object({
  select: UsersSelectSchema.optional(),
  include: UsersIncludeSchema.optional(),
  data: z.union([ UsersUpdateInputSchema,UsersUncheckedUpdateInputSchema ]),
  where: UsersWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UsersUpdateArgs>;

export const UsersUpdateManyArgsSchema: z.ZodType<Prisma.UsersUpdateManyArgs> = z.object({
  data: z.union([ UsersUpdateManyMutationInputSchema,UsersUncheckedUpdateManyInputSchema ]),
  where: UsersWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.UsersUpdateManyArgs>;

export const UsersDeleteManyArgsSchema: z.ZodType<Prisma.UsersDeleteManyArgs> = z.object({
  where: UsersWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.UsersDeleteManyArgs>;