import { z } from "zod";

// Creator
export const creatorSchema = z.object({
  id: z.string(),
});

// Permission Constraint
export const constraintSchema = z.object({
  type: z.literal("odrl:LogicalConstraint"),
  leftOperand: z.object({ id: z.string() }),
  operator: z.object({ id: z.string() }),
  rightOperand: z.string(),
  name: z.string(),
  line: z.string(),
});

// Permission
export const permissionSchema = z.object({
  action: z.object({ id: z.string() }),
  constraint: z.array(constraintSchema),
  name: z.string(),
});

// Policy
export const policySchema = z.object({
  type: z.enum(["odrl:Offer", "odrl:Set", "odrl:Agreement"]),
  id: z.string(),
  permission: z.array(permissionSchema),
  prohibition: z.array(permissionSchema).optional(),
  obligation: z.array(permissionSchema).optional(),
  name: z.string(),
});

// Distribution
export const distributionSchema = z.object({
  type: z.literal("dcat:Distribution"),
  id: z.string(),
  format: z.object({ id: z.string() }),
  accessService: z.object({
    type: z.literal("dcat:DataService"),
    id: z.string(),
  }),
});

export const datasetSchema = z.object({
  type: z.literal("dcat:Dataset"),
  id: z.string().min(1, "5 plz"),
  title: z.string(),
  description: z.string(),
  creator: creatorSchema,
  keyword: z.array(z.string()),
  hasPolicy: z.array(policySchema),
  distribution: z.array(distributionSchema),
  detailDescription: z.string(),
});

export type DatasetFormType = z.infer<typeof datasetSchema>;
export type OdrlPolicy = z.infer<typeof policySchema>;
export type Distribution = z.infer<typeof distributionSchema>;
