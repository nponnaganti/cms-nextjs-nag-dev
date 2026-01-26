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
      "apiKey": process.env.AGILITY_API_GRAPHQL_FETCH_KEY!,
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
    <section className="py-1 bg-blue-50">
      <div
        className="relative px-8"
      >
        <div className="max-w-(--breakpoint-xl) mx-auto my-0 md:mt-12 lg:mt-5">

          <p className="mb-4 text-sm text-gray-700">
            <strong className="text-yellow-600 font-semibold">
              workshop:
            </strong>{" "}
            <span className="break-all">
              content migration from SQL to Agility CMS (Headless Cloud SaaS)
            </span>
          </p>
          <p className="mb-4 text-sm text-gray-700">
            <strong className="text-yellow-600 font-semibold">
              feat:
            </strong>{" "}
            <span className="break-all">
              set-up GraphQL-based rendering of Agility CMS content in Next.js
            </span>
          </p>
          <p className="mb-4 text-sm text-gray-700">
            <strong className="text-yellow-600 font-semibold">
              Code Changes:
            </strong>{" "}
            <span className="break-all">
              github.com/nponnaganti/cms-nextjs-nag-dev/tree/cloud-cms-content-migration
            </span>
          </p>

          <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
            <table className="min-w-full border-collapse">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                    Employee Id
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                    Full Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                    Date Of Joining
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                    Is Account Locked
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {employees.map((emp) => (
                  <tr
                    key={emp.contentID}
                    className="hover:bg-blue-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {emp.fields.employeeId}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {emp.fields.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {new Date(emp.fields.dateOfJoining).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs ${emp.fields.isAccountLocked
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                          }`}
                      >
                        {emp.fields.isAccountLocked ? "Yes" : "No"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </section>
  )
}
export default nagComponentEmployees