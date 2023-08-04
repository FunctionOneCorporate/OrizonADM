import "../styles/headerNavigationBar.scss"
import { Link } from "react-router-dom";

const HeaderNavigationBar = () => {

    return (
        <header className={"headerContainer"}>
            <div className={"headerTextContainer"}>
                <Link className={"headerTitle"} to={"/"}>Orizon-Meeting </Link>
            </div>
            <div className={"headerTextContainer"}>
                <Link className={"headerText"} to={"/questions"}> Questionários </Link>
            </div>
            <div className={"headerTextContainer"}>
                <Link className={"headerText"} to={"/participants"}> Participantes </Link>
            </div>
        </header>
    )
}

export default HeaderNavigationBar
