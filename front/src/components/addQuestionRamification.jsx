import {
    Button,
    Dialog,
    DialogActions,
    DialogBody,
    DialogSurface,
    DialogTitle,
    DialogTrigger, Field, Input, Radio, RadioGroup, Textarea
} from "@fluentui/react-components";
import {Add20Filled, Dismiss20Regular} from "@fluentui/react-icons";
import "~/styles/addQuestionRamification.scss"
import {useState} from "react";
import {api} from "~/services/api";

const AddQuestionRamification = (props) => {
    const [response, setResponse] = useState({QuestionId: "", QuestionTitle: "", AnswerType: "S"})

    const addQuestionRamification = async () => {
        await api
            .post("questionBranching/", response)
            .then((response) => {
                // props.setQuestionRamifications(oldArray => [...oldArray, response.data])
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
                <div style={{float: "right"}}>
                    <Button disableButtonEnhancement appearance={"primary"} icon={<Add20Filled/>} onClick={() => setResponse({...response, QuestionId: props.question.Id})}/>
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
                                      value={props.question.QuestionTitle}
                                      disabled
                                // onChange={(ev, data) => setResponse({...response, QuestionTitle: data.value})}
                            />
                        </Field>
                        <br/>
                        <Field label={"Resposta da questão associada à ramificação"} className={"formInput"}>
                            <RadioGroup layout={"horizontal"}
                                        value={response.AnswerType}
                                        onChange={(ev, data) => setResponse({...response, AnswerType: data.value})}
                            >
                                <Radio value={"S"} label={"Sim"}/>
                                <Radio value={"N"} label={"Não"}/>
                            </RadioGroup>
                        </Field>
                        <br/>
                        <Field label={"Questão ramificada"} className={"formInput"}>
                            <Input placeholder={"Digite a pergunta associada à resposta da questão"}
                                      value={response.QuestionTitle}
                                    onChange={(ev, data) => setResponse({...response, QuestionTitle: data.value})}
                            />
                        </Field>
                        <br/>
                    </div>

                    <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="primary" onClick={() => addQuestionRamification()}>Gravar</Button>
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

export default AddQuestionRamification
