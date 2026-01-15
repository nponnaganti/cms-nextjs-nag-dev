// step 01
import { UnloadedModuleProps } from "@agility/nextjs"
import { getContentItem } from "lib/cms/getContentItem"

// step 02
interface IComponentTwo {
  backgroundColor: any
  title: string
  [key: string]: any // allows dynamic iteration for rendering table
}

// step 03
const nagComponentTwo = async ({ module, languageCode }: UnloadedModuleProps) => {

  // step 04: Fetch the content item from Agility CMS using contentID and language
  if (!module?.contentid) return null
  const { fields, contentID } = await getContentItem<IComponentTwo>({
    contentID: module.contentid,
    languageCode,
  })

  // step 05:Render the UI using the CMS fields and Agility editing attributes
  if (!fields) return null
  return (
    <section className={`py-1 ${fields.backgroundColor}`}>
      <div className="relative px-8" data-agility-component={contentID}>
        <div className="max-w-(--breakpoint-xl) mx-auto my-0 md:mt-12 lg:mt-5">
          <h1 data-agility-field={"title"}
            className="font-display text-secondary-500 text-4xl font-black tracking-wide dark:text-secondary-200"
          >
            {fields.title}
          </h1>

          {/* Step 06: Render all fields in a table */}
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left border-b border-gray-300">S.No.</th>
                  <th className="px-4 py-2 text-left border-b border-gray-300">Field Name</th>
                  <th className="px-4 py-2 text-left border-b border-gray-300">Field Raw Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(fields).map(([key, value], index) => (
                  <tr key={key}>
                    <td>{index + 1}</td>
                    <td>{key}</td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      {value !== null && typeof value === "object"
                        ? JSON.stringify(value, null, 2)
                        : String(value ?? "")}
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

// step 06
export default nagComponentTwo