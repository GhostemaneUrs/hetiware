import { PaginationProps, type RowProps, type TableProps } from '@/type/table'

export const Table: React.FC<TableProps> = ({ data, headers }) => {
  return (
    <div className='overflow-x-auto w-full max-h-[calc(100vh-258px)] hide-scrollbar'>
      <table className='w-full table-auto fold-table overflow-hidden border solid border-[#d7dfe8] rounded-tr-[24px] rounded-tl-[24px]'>
        <thead className='sticky top-0'>
          <tr>
            {headers?.length > 0 &&
              headers?.map((item, index: number) => {
                return (
                  <th key={`headers ${index}`} className={`${item?.className}`}>
                    {item?.title}
                  </th>
                )
              })}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 &&
            data?.map((item, index: number) => {
              return (
                <RowTable item={item} headers={headers} key={`row ${index}`} />
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export const RowTable: React.FC<RowProps> = ({ headers, item }) => {
  return (
    <tr className='view bg-white hover:bg-[#f2f4f7]'>
      {headers?.length > 0 &&
        headers?.map((key, index: number) => {
          if (key?.render != null) {
            return <td key={`${index}`}>{key?.render(item)}</td>
          } else {
            return (
              <td
                key={`dataIndex ${index}`}
                className='text-base text-left border-b border-gray-200 first:pl-[72px] last:pr-[72px] py-4 text-[#4F5B7B]'
              >
                {item[key?.dataIndex]}
              </td>
            )
          }
        })}
    </tr>
  )
}

export const Pagination: React.FC<PaginationProps> = ({
  pagination,
  setPagination
}) => {
  const { page, totalPages } = pagination

  const nextPage = (): void => {
    if (page < totalPages) {
      setPagination({ ...pagination, page: page + 1 })
    }
  }

  const previousPage = (): void => {
    if (page > 1) {
      setPagination({ ...pagination, page: page - 1 })
    }
  }

  return (
    <div className='bg-white border-b-[1px] border-r-[1px] border-l-[1px] solid border-light-gray-60 rounded-bl-[24px] rounded-br-[24px] w-full py-2 pr-[25px]'>
      <ul className='flex items-center justify-end gap-[10px]'>
        <li>
          <a
            onClick={previousPage}
            className='group flex items-center cursor-pointer'
          >
            <span className='material-icons text-[#a7adbd] group-hover:text-[#06919d]'>
              navigate_before
            </span>
          </a>
        </li>
        <li>
          <span className='text-[#a7adbd] text-[14px]'>
            {page} / {totalPages} pages
          </span>
        </li>
        <li>
          <a
            onClick={nextPage}
            className='flex items-center cursor-pointer group'
          >
            <span className='material-icons text-[#a7adbd] group-hover:text-[#06919d]'>
              navigate_next
            </span>
          </a>
        </li>
      </ul>
    </div>
  )
}
