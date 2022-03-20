export type Issue = {
    id: number
    name: string
    description: string
    project_id: number
    status: string
    created_at: string
    updated_at: string
}
export type Project = {
    id: number
    name: string
    description: string
    created_at: string
    updated_at: string
    url: string
}
export type ProjectStats = Project & {
    open_issues: number
    wip_issues: number
    closed_issues: number
}
export type Comment = {
    id: number
    text: string
    created_at: string
    updated_at: string
    issue_id: number
    author_id: number
}