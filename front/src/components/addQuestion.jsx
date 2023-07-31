import {
    Button,
    Dialog,
    DialogActions,
    DialogBody,
    DialogSurface,
    DialogTitle,
    DialogTrigger, Field, Input, Textarea
} from "@fluentui/react-components";
import {Add20Filled, Dismiss20Regular} from "@fluentui/react-icons";
import "../styles/addQuestion.scss"
import {useState} from "react";
import {api} from "../services/api";

const AddQuestion = (props) => {
    const [response, setResponse] = useState({
        QuestionTitle: "",
        QuestionCatalogId: ""
    })

    const createQuestion = async () => {
        await api
            .post("questions/", response)
            .then((response) => {
                // props.setQuestions(oldArray => [...oldArray, response.data])
                props.setRefreshQuestions(!props.refreshQuestions)
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
                    <Button disableButtonEnhancement appearance={"primary"} icon={<Add20Filled/>} onClick={() => setResponse({...response, QuestionCatalogId: props.questionCatalogId})}/>
                </div>
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
                        Adicionando...
                    </DialogTitle>
                    <div className={"formContainer"}>
                        <Field label={"Questão"} className={"formInput"}>
                            <Textarea placeholder={"Digite a pergunta a ser inserida ao questionário"}
                                   value={response.QuestionTitle}
                                   onChange={(ev, data) => setResponse({...response, QuestionTitle: data.value})}/>
                        </Field>
                        <br/>
                    </div>

                    <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="primary" onClick={() => createQuestion()}>Gravar</Button>
                        </DialogTrigger>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary">Fechar</Button>
                        </DialogTrigger>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    )
}

export default AddQuestion
