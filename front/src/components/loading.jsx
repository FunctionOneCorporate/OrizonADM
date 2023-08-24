import {
    Spinner,
} from "@fluentui/react-components";
import styles from "../styles/loading.scss"

const Loading = () => {
    return (
        <>
            <div className={"overlay"} >
                <div className={"center"}>
                    <Spinner size={"huge"}/>
                </div>
            </div>
        </>
    )
}

export default Loading
