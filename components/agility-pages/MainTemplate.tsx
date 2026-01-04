console.log(`\x1b[34mSTART: ${new Date().toString().slice(0, 24)} ${__filename}\x1b[0m`);
import React from "react"
import {ContentZone} from "@agility/nextjs"
import {getModule} from "../agility-components"

const MainTemplate = (props: any) => {
	return (
		<div>
			<ContentZone name="MainContentZone" {...props} getModule={getModule} />
		</div>
	)
}

console.log(`\x1b[32mEND  : ${new Date().toString().slice(0, 24)} ${__filename}\x1b[0m`);
export default MainTemplate
