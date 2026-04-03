import { z } from "zod"
import {
  businessCommitmentOneSchema,
  commitmentStatusEnum,
  valueEntrySchema,
  statusOptions,
} from "@/lib/schemas/schemas"

// Business Commitment One
export type BusinessCommitmentOne = z.infer<typeof businessCommitmentOneSchema>

// Business Commitment One DTOs
export type CreateBusinessCommitmentOneDTO = Omit<BusinessCommitmentOne, "id" | "createdAt" | "updatedAt">
export type UpdateBusinessCommitmentOneDTO = Partial<CreateBusinessCommitmentOneDTO>

// -- Helper Types -- //
export type CommitmentStatus = z.infer<typeof commitmentStatusEnum>
export const StatusMap: CommitmentStatus[] = statusOptions as CommitmentStatus[]
export type ValueEntry = z.infer<typeof valueEntrySchema>

// -- Empty Forms -- //
export const emptyBusinessCommitmentForm = (): CreateBusinessCommitmentOneDTO => ({
  workItem: "",
  dateStarted: "",
  dateCompleted: "",
  applicationContext: "",
  description: "",
  problem: "",
  whoBenefited: "",
  impact: "",
  valueEntryList: [],
  alignment: "",
  statusNotes: "",
  status: "IN_PROGRESS",
})
