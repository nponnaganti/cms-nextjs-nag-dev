console.log(`\x1b[34mSTART: ${new Date().toString().slice(0, 24)} ${__filename}\x1b[0m`);
import {CgSpinner} from "react-icons/cg"
interface Props {
	message: string
}

const Widget = ({message}: Props) => {
	return (
		<section className="flex flex-col items-center justify-center h-screen">
			<CgSpinner className="animate-spin text-2xl mb-2" />
			<p>{message}</p>
		</section>
	)
}
console.log(`\x1b[32mEND  : ${new Date().toString().slice(0, 24)} ${__filename}\x1b[0m`);
export default Widget
