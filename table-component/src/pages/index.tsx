import { useEffect, useState } from 'react'
import { Pagination, Table } from '@/component/Table'
import { type Pagination as PaginationType } from '@/type/table'

export default function Home() {
  const [users, setUsers] = useState<Record<string, string>[]>([])
  const [fetchValues, setFetchValues] = useState<Record<string, string>[]>([])

  const [headers] = useState([
    {
      title: <>&nbsp;</>,
      dataIndex: 'id',
      className: 'py-4 w-[100px] font-semibold text-[#4f5b7b] text-[17px]'
    },
    {
      title: 'Name',
      dataIndex: 'firstName',
      className: 'py-4 w-[120px] font-semibold text-[#4f5b7b] text-[17px]'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      className: 'py-4 w-[40px] font-semibold text-[#4f5b7b] text-[17px]'
    },
    {
      title: 'University',
      dataIndex: 'university',
      className: 'py-4 w-[280px] font-semibold text-[#4f5b7b] text-[17px]'
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      className: 'py-4 w-[120px] font-semibold text-[#4f5b7b] text-[17px]'
    },
    {
      title: 'Age',
      dataIndex: 'age',
      className:
        'py-4 w-[40px] font-semibold text-[#4f5b7b] text-[17px] cursor-pointer'
    }
  ])

  const [filters, setFilters] = useState({
    sort: '',
    gender: ''
  })

  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    limit: 5,
    totalPages: 0
  })

  useEffect(() => {
    fetch('https://dummyjson.com/users?limit=100', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => setFetchValues(data.users))
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    let filterData = fetchValues
    // filter sort by age ascending or descending
    if (filters.sort) {
      filterData = filterData.sort(
        (a: Record<string, string>, b: Record<string, string>) => {
          if (filters.sort === 'asc') {
            return Number(a.age) - Number(b.age) // ascending order by age
          } else if (filters.sort === 'desc') {
            return Number(b.age) - Number(a.age) // descending order by age
          } else {
            return 0
          }
        }
      )
    } else {
      filterData = filterData.sort(
        (a: Record<string, string>, b: Record<string, string>) => {
          return Number(a.id) - Number(b.id) // ascending order by id
        }
      )
    }
    // filter gender male or female
    if (filters.gender !== '') {
      filterData = filterData.filter(
        (user: Record<string, string>) => user.gender === filters.gender
      )
    }
    const totalRows = filterData.length
    const totalPages = Math.ceil(totalRows / pagination.limit)
    setPagination({ ...pagination, totalPages })
    const paginatedData = filterData.slice(
      (pagination.page - 1) * pagination.limit,
      (pagination.page - 1) * pagination.limit + pagination.limit
    )
    setUsers(paginatedData)
  }, [fetchValues, filters, pagination.page, pagination.limit])

  return (
    <main className='flex min-h-screen flex-col p-10'>
      <div className='mb-9 text-center'>
        <h1 className='text-[#23315A] text-4xl font-bold'>Table component</h1>
      </div>
      <div className='flex gap-5'>
        <div className='w-full max-w-[320px] mb-5'>
          <select
            className='bg-white border border-[#d7dfe8] text-[#23315A] font-medium text-sm rounded-lg outline-none block w-full p-3 cursor-pointer'
            onChange={event => {
              setFilters({
                ...filters,
                gender: event.target.value
              })
              setPagination({ ...pagination, page: 1 })
            }}
            value={filters.gender}
          >
            <option value=''>Gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
        </div>
        <div className='w-full max-w-[320px] mb-5'>
          <select
            className='bg-white border border-[#d7dfe8] text-[#23315A] font-medium text-sm rounded-lg outline-none block w-full p-3 cursor-pointer'
            onChange={event => {
              setFilters({
                ...filters,
                sort: event.target.value
              })
              setPagination({ ...pagination, page: 1 })
            }}
            value={filters.sort}
          >
            <option value=''>Age by</option>
            <option value='asc'>Ascending order</option>
            <option value='desc'>Descending order</option>
          </select>
        </div>
      </div>
      <Table data={users} headers={headers} />
      <Pagination pagination={pagination} setPagination={setPagination} />
    </main>
  )
}
