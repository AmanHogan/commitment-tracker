export type CommitmentStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"

export type ValueEntry = {
  label: string
  value: string
}

export type BusinessCommitmentOne = {
  id?: string
  workItem: string
  dateStarted?: string // LocalDate serialized as "YYYY-MM-DD"
  dateCompleted?: string
  applicationContext?: string
  description?: string
  problem?: string
  whoBenefited?: string
  impact?: string
  valueEntryList?: ValueEntry[]
  alignment?: string
  statusNotes?: string
  status?: CommitmentStatus
  createdAt?: string // Instant serialized as ISO string
  updatedAt?: string
}

export type CreateBusinessCommitmentOnePayload = Omit<
  BusinessCommitmentOne,
  "id" | "createdAt" | "updatedAt"
>

export type UpdateBusinessCommitmentOnePayload =
  Partial<CreateBusinessCommitmentOnePayload>
