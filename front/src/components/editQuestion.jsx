import {
    Badge,
    Button,
    Dialog,
    DialogActions,
    DialogBody,
    DialogSurface,
    DialogTitle,
    DialogTrigger, Field, Input, Radio, RadioGroup, Textarea
} from "@fluentui/react-components";
import {Add20Filled, Dismiss16Regular, Dismiss20Regular, Edit20Filled} from "@fluentui/react-icons";
import {api} from "~/services/api";
import {useEffect, useMemo, useState} from "react";
import {DatePicker} from "@fluentui/react-datepicker-compat";
import "~/styles/editQuestion.scss"

const EditQuestion = (props) => {
    const [response, setResponse] = useState(props.questions.filter((question) => question.Id === props.Id)[0])
    const [choices, setChoices] = useState(response.Choices ? response.Choices.split(",") : [])
    const [answerType, setAnswerType] = useState(response.Choices !== null ? "custom" : "default")

    const handleUpdate = async () => {
        await api
            .patch("questions/" + parseInt(props.Id), response)
            .then((response) => {
                // props.setQuestions(oldArray => [...oldArray, response.data])
                props.setRefreshQuestions(!props.refreshQuestions)
            })
            .catch((e) => {
                return e;
            })
    }
    const List = () => {
        return (
            <div>
                {choices.map((choice, index) => {
                    return (
                        <div>
                            <br/>
                            <Badge key={index} appearance={"tint"}> {choice}</Badge>
                            <Button disableButtonEnhancement icon={<Dismiss16Regular/>}
                                    onClick={() => setChoices(choices.filter(item => item !== choice))}
                                    size={"small"}
                                    shape={"circular"}
                                    style={{marginLeft: "1vw", float: "right"}}
                            />
                            <br/>
                        </div>
                    )
                })}
            </div>
        )
    }
    const memoList = useMemo(() => <List/>, [choices])

    useEffect(() => {

        if (answerType === "custom") {
            setResponse({...response, Choices: choices.toString()})
        } else {
            setResponse({...response, Choices: null})
        }
    }, [answerType, choices])

    return (
        <Dialog>
            <DialogTrigger>
                <Button disableButtonEnhancement appearance={"primary"} icon={<Edit20Filled/>}
                        style={{marginRight: "1vw"}}/>
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
                        <Field label={"Tipo de resposta"} className={"formInput"}>
                            <RadioGroup layout={"horizontal"}
                                        value={answerType}
                                        onChange={(ev, data) => setAnswerType(data.value)}
                            >
                                <Radio value={"default"} label={"Padrão (Sim ou não)"}/>
                                <Radio value={"custom"} label={"Customizada"}/>
                            </RadioGroup>
                        </Field>
                        <br/>
                        {answerType === "custom" &&
                        <div>
                            <Field label={"Respostas"}>
                                <Input
                                    onKeyPress={(event, data) => {
                                        if (event.key === 'Enter') {
                                            setChoices(oldArray => [...oldArray, event.target.value])
                                        }
                                    }
                                    }
                                />
                                {memoList}
                            </Field>
                        </div>
                        }
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
