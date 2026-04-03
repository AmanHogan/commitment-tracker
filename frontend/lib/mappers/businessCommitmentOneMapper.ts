import type { BusinessCommitmentOne, CreateBusinessCommitmentOneDTO } from "@/types/types"

/**
 * Maps a BusinessCommitmentOne (API response) to a CreateBusinessCommitmentOneDTO,
 * normalising null/undefined fields to safe form defaults.
 */
export function toCreateBusinessCommitmentOneDTO(commitment: BusinessCommitmentOne): CreateBusinessCommitmentOneDTO {
  return {
    workItem: commitment.workItem ?? "",
    dateStarted: commitment.dateStarted ?? "",
    dateCompleted: commitment.dateCompleted ?? "",
    applicationContext: commitment.applicationContext ?? "",
    description: commitment.description ?? "",
    problem: commitment.problem ?? "",
    whoBenefited: commitment.whoBenefited ?? "",
    impact: commitment.impact ?? "",
    valueEntryList: commitment.valueEntryList ?? [],
    alignment: commitment.alignment ?? "",
    statusNotes: commitment.statusNotes ?? "",
    status: commitment.status ?? "IN_PROGRESS",
  }
}
