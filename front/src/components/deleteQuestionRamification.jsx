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


const DeleteQuestionRamification = (props) => {

    const handleDelete = async () => {
        await api
            .delete("questionBranching/" + parseInt(props.questionRamification.Id))
            .then((response) => {
                // props.setQuestions(oldArray => [...oldArray, response.data])
                props.setRefreshQuestionRamifications(!props.refreshQuestionRamifications)
                console.log({response})
            })
            .catch((e) => {
                return e;
            })
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Button disableButtonEnhancement appearance={"primary"} icon={<Delete20Filled/>} style={{marginRight: "1vw"}}/>
            </DialogTrigger>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle action={
                        <DialogTrigger action="close">
                            <Button
                                appearance="subtle"
                                aria-label="close"
                                icon={<Dismiss20Regular/>}
                            />
                        </DialogTrigger>
                    }>
                        Deletar Ramificação da Questão
                    </DialogTitle>
                    <span>Confirmar exclusão?</span>
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

export default DeleteQuestionRamification
