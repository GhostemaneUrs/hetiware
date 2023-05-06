interface Headers {
  title: string | React.ReactNode
  dataIndex: string
  className?: string
}

type Rows = Record<string, string>

export interface RowProps {
  item: Rows
  headers: Array<{
    dataIndex: string
    render?: (item: object) => React.ReactNode
  }>
}

export interface TableProps {
  headers: Headers[]
  data: Array<Record<string, string | number | date>>
}

export type Pagination = {
  limit: number
  page: number
  totalPages: number
}

export interface PaginationProps {
  pagination: {
    limit: number
    page: number
    totalPages: number
  }
  setPagination: Dispatch<SetStateAction<PaginationProps>>
}
