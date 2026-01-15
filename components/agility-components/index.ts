console.log(`\x1b[34mSTART: ${new Date().toString().slice(0, 24)} ${__filename}\x1b[0m`);
import RichTextArea from "./RichTextArea";
import FeaturedPost from "./FeaturedPost";
import PostsListing from "./PostsListing/PostsListing.server";
import PostDetails from "./PostDetails";
import Heading from "./Heading";
import TextBlockWithImage from "./TextBlockWithImage";
import NoComponentFound from "./NoComponentFound";
import nagComponentOne from "./nagComponentOne";
import nagComponentTwo from "./nagComponentTwo";


// All of the Agility Page Module Components that are in use in this site need to be imported into this index file.
// Place Page Modules in allModules array below, passing in a name and the component.

const allModules = [
	{ name: "TextBlockWithImage", module: TextBlockWithImage },
	{ name: "Heading", module: Heading },
	{ name: "FeaturedPost", module: FeaturedPost },
	{ name: "PostsListing", module: PostsListing },
	{ name: "PostDetails", module: PostDetails },
	{ name: "RichTextArea", module: RichTextArea },
	{ name: "nagComponentOne", module: nagComponentOne },
	{ name: "nagComponentTwo", module: nagComponentTwo },
];

/**
 * Get the Agility Component/Module by name.
 * If the component is not found, a default component will be returned.
 * @param moduleName
 * @returns
 */
export const getModule = (moduleName: string): any | null => {

	if (!moduleName) return null;
	const obj = allModules.find(
		(m) => m.name.toLowerCase() === moduleName.toLowerCase()
	);
	if (!obj) return NoComponentFound;
	return obj.module
};
console.log(`\x1b[32mEND  : ${new Date().toString().slice(0, 24)} ${__filename}\x1b[0m`);