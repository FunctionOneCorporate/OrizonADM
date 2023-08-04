import "../styles/headerNavigationBar.scss"

const HeaderNavigationBar = () => {

    return (
        <header className={"headerContainer"}>
            <div className={"headerTextContainer"}>
                <a className={"headerTitle"} href={"/"}>Orizon-Meeting </a>
            </div>
            <div className={"headerTextContainer"}>
                <a className={"headerText"} href={"/questions"}> Questionários </a>
            </div>
            <div className={"headerTextContainer"}>
                <a className={"headerText"} href={"/participants"}> Participantes </a>
            </div>
        </header>
    )
}

export default HeaderNavigationBar
