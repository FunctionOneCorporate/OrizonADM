import {
    Button,
    Dialog,
    DialogActions,
    DialogBody,
    DialogSurface,
    DialogTitle,
    DialogTrigger, Field, Input, Textarea
} from "@fluentui/react-components";
import {Add20Filled, Dismiss20Regular, Edit20Filled} from "@fluentui/react-icons";
import {api} from "../services/api";
import {useState} from "react";
import {DatePicker} from "@fluentui/react-datepicker-compat";
import "../styles/editQuestion.scss"

const EditQuestion = (props) => {
    const [response, setResponse] = useState(props.questions.filter((question) => question.Id === props.Id)[0])
    console.log({response})
    const handleUpdate = async () => {
        await api
            .patch("questions/" + parseInt(props.Id), response)
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
                <Button disableButtonEnhancement appearance={"primary"} icon={<Edit20Filled/>}  style={{marginRight: "1vw"}}/>
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
                        Editar Questão
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
                            <Button appearance="primary" onClick={() => handleUpdate()}>Salvar</Button>
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

export default EditQuestion
