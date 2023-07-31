import {
    Button,
    Dialog,
    DialogActions,
    DialogBody,
    DialogSurface,
    DialogTitle,
    DialogTrigger
} from "@fluentui/react-components";
import {Add20Filled, Delete20Filled, Dismiss20Regular, Edit20Filled} from "@fluentui/react-icons";
import {api} from "../services/api";


const DeleteQuiz = (props) => {

    const handleDelete = async () => {
        await api
            .delete("questionCatalog/"+ parseInt(props.Id))
            .then((response) => {
                props.setQuizzes(oldArray => [...oldArray, response.data])
                props.setRefresh(!props.refresh)
                console.log({response})
            })
            .catch((e) => {
                return e;
            })
    }

    return (
        <Dialog>
            <DialogTrigger>
                <div style={{float: "right"}}>
                    <Button disableButtonEnhancement appearance={"primary"} icon={<Delete20Filled/>}/>
                </div>
            </DialogTrigger>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle action={
                        <DialogTrigger action="close">
                            <Button
                                appearance="subtle"
                                aria-label="close"
                                icon={<Dismiss20Regular />}
                            />
                        </DialogTrigger>
                    }>
                        Deletar Questionário
                    </DialogTitle>
                    <span>Confirmar exclusão do questionário?</span>
                    <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="primary" onClick={() => handleDelete()}>Confirmar</Button>
                        </DialogTrigger>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary">Cancelar</Button>
                        </DialogTrigger>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    )
}

export default DeleteQuiz
