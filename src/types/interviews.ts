export interface Interview {
  id: string
  candidate: {
    name: string
    avatar?: string
  }
  position: string
  company: string
  status: "hot" | "medium" | "low" | "not-interested"
  interestLevel: number // 1-5
  date: string
}
