// step 01: Import required components and types from Agility CMS and local helpers
import { UnloadedModuleProps } from "@agility/nextjs"
import { getContentItem } from "lib/cms/getContentItem"

// step 02: Define a TypeScript interface that matches the CMS content model fields
interface IComponentOne {
  title: string
  description: string
  gitHubBranchName: string
}

// step 03: Create an async React Server Component that receives module data from Agility
const nagComponentOne = async ({ module, languageCode }: UnloadedModuleProps) => {

  // step 04: Fetch the content item from Agility CMS using contentID and language
  if (!module?.contentid) return null
  const { fields, contentID } = await getContentItem<IComponentOne>({
    contentID: module.contentid,
    languageCode,
  })

  // step 05:Render the UI using the CMS fields and Agility editing attributes
  if (!fields) return null
  return (
    <section className="py-1 bg-blue-50">
      <div className="relative px-8" data-agility-component={contentID}>
        <div className="max-w-(--breakpoint-xl) mx-auto my-0 md:mt-12 lg:mt-5">
          <h1 data-agility-field={"title"}
            className="font-display text-secondary-500 text-4xl font-black tracking-wide dark:text-secondary-200"
          >
            {fields.title}
          </h1>

          <br />
          <p>{fields.description}</p>

          <br />
          <p>{fields.gitHubBranchName}</p>
        </div>
      </div>
    </section>
  )
}

// step 06: Export the component so Agility CMS can render it
export default nagComponentOne