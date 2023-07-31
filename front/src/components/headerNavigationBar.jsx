import "../styles/headerNavigationBar.scss"
import { Button } from "@fluentui/react-components";
const HeaderNavigationBar = () => {

    return (
        <div className={"headerContainer"}>
            <div className={"headerTextContainer"}>
                <a className={"headerTitle"} href={"/"}>Orizon-Meeting </a>
            </div>
            <div className={"headerTextContainer"}>
                <a className={"headerText"} href={"/questions"}> Questionários </a>
            </div>
            <div className={"headerTextContainer"}>
                <a className={"headerText"} href={"/participants"}> Participantes </a>
            </div>

        </div>
    )
}

export default HeaderNavigationBar
