interface IEmployee {
  contentID: number
  fields: {
    employeeId: number
    name: string
    isAccountLocked: boolean
    dateOfJoining: string
  }
}

interface IEmployeesResponse {
  data: {
    employees: IEmployee[]
  }
}

const EMPLOYEES_GRAPHQL_QUERY = `
  query {
    employees {
      contentID
      fields {
        employeeId
        name
        dateOfJoining
        isAccountLocked
      }
    }
  }
`
const nagComponentEmployees = async () => {
  const res = await fetch(process.env.AGILITY_CMS_GRAPHQL_ENDPOINT!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apiKey": process.env.AGILITY_API_KEY!,
    },
    body: JSON.stringify({ query: EMPLOYEES_GRAPHQL_QUERY }),
    cache: "no-store", // preview-safe
  })

  if (!res.ok) {
    console.error("Failed to fetch employees", res.status)
    return null
  }

  const employeesResponse: IEmployeesResponse = await res.json()
  const employees = employeesResponse?.data?.employees ?? []

  if (!employees.length) return null

  return (
    <section>
      <p>
        <strong className="text-yellow-600 font-bold">Code Changes: </strong>
        github.com/nponnaganti/cms-nextjs-nag-dev/tree/cloud-cms-content-migration
      </p>
      <table>
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Full Name</th>
            <th>Date Of Joining</th>
            <th>Is Account Locked</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.contentID}>
              <td>{emp.fields.employeeId}</td>
              <td>{emp.fields.name}</td>
              <td>{new Date(emp.fields.dateOfJoining).toLocaleDateString()}</td>
              <td>{emp.fields.isAccountLocked ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
export default nagComponentEmployees