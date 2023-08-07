import {
    Button,
    Dialog,
    DialogActions,
    DialogBody,
    DialogSurface,
    DialogTitle,
    DialogTrigger
} from "@fluentui/react-components";
import { Delete20Filled, Dismiss20Regular } from "@fluentui/react-icons";
import { api } from "~/services/api";


const DeleteQuestion = (props) => {

    const handleDelete = async () => {
        await api
            .delete("questions/" + parseInt(props.Id))
            .then((response) => {
                // props.setQuestions(oldArray => [...oldArray, response.data])
                props.setRefreshQuestions(!props.refreshQuestions)
                console.log({ response })
            })
            .catch((e) => {
                return e;
            })
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Button disableButtonEnhancement appearance={"primary"} icon={<Delete20Filled />} style={{ marginRight: "1vw" }} />
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
                        Deletar Questão
                    </DialogTitle>
                    <span>Confirmar exclusão da questão?</span>
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

export default DeleteQuestion
