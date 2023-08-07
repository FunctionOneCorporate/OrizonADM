import "~/styles/paginaInicial.scss"
import logo from "~/assets/logo-rodape.png"
const PaginaInicial = () => {

    return (
        <div className={"pagInicialContainer"}>
            <div className={"centered"}>
                <a href={"https://www.orizonbrasil.com.br/sobre-a-orizon.html"}>
                    <img src={logo}/>
                </a>
            </div>

        </div>
    )
}

export default PaginaInicial
