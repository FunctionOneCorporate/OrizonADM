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
import {Add20Filled, Add20Regular, Dismiss16Regular, Dismiss20Regular, Search20Regular} from "@fluentui/react-icons";
import "~/styles/addQuestion.scss"
import {useEffect, useMemo, useRef, useState} from "react";
import { api } from "~/services/api";

const AddQuestion = (props) => {
    const [response, setResponse] = useState({
        QuestionTitle: "",
        QuestionCatalogId: "",
        Choices: null || []
    })
    const [choices, setChoices] = useState([])
    const [answerType, setAnswerType] = useState("default")
    const inputRef = useRef(null)
    const [disableButton, setDisableButton] = useState(false)

    const inputValidation = () => {
        if(inputRef.current !== null) {
            if(choices.indexOf(inputRef.current.value) !== -1) {
                setDisableButton(true)
            } else {
                setDisableButton(false)
            }
        }
    }

    const clearAnswers = () => {
        setResponse({
            QuestionTitle: "",
            QuestionCatalogId: "",
            Choices: null || []
        })
        setChoices([])
        setAnswerType("default")
    }

    const createQuestion = async () => {
        await api
            .post("questions/", response)
            .then((response) => {
                // props.setQuestions(oldArray => [...oldArray, response.data])
                clearAnswers()
                props.setRefreshQuestions(!props.refreshQuestions)
                console.log({ response })
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
                            <br />
                            <Badge key={index} appearance={"tint"} > {choice}</Badge>
                            <Button disableButtonEnhancement icon={<Dismiss16Regular />}
                                    onClick={() => setChoices(choices.filter(item => item !== choice))}
                                    size={"small"}
                                    shape={"circular"}
                                    style={{ marginLeft: "1vw", float: "right" }}
                            />
                            <br />
                        </div>
                    )
                })}
            </div>
        )
    }
    const memoList = useMemo(() => <List />, [choices])

    useEffect(() => {

        if (answerType === "custom") {
            setResponse({ ...response, Choices: choices })
        } else {
            setResponse({ ...response, Choices: null })
        }
        inputValidation()
    }, [answerType, choices])

    return (
        <Dialog>
            <DialogTrigger>
                <div style={{ float: "right" }}>
                    <Button disableButtonEnhancement appearance={"primary"} icon={<Add20Filled />}
                            onClick={() => setResponse({ ...response, QuestionCatalogId: props.questionCatalogId })} />
                </div>
            </DialogTrigger>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle action={
                        <DialogTrigger action="close">
                            <Button
                                appearance="subtle"
                                aria-label="close"
                                icon={<Dismiss20Regular onClick={clearAnswers}/>}
                            />
                        </DialogTrigger>
                    }>
                        Adicionando...
                    </DialogTitle>
                    <div className={"formContainer"}>
                        <Field label={"Questão"} className={"formInput"}>
                            <Textarea placeholder={"Digite a pergunta a ser inserida ao questionário"}
                                      value={response.QuestionTitle}
                                      onChange={(ev, data) => setResponse({ ...response, QuestionTitle: data.value })} />
                        </Field>
                        <br />
                        <Field label={"Tipo de resposta"} className={"formInput"}>
                            <RadioGroup layout={"horizontal"}
                                        value={answerType}
                                        onChange={(ev, data) => setAnswerType(data.value)}
                            >
                                <Radio value={"default"} label={"Padrão (Sim ou não)"} />
                                <Radio value={"custom"} label={"Customizada"} />
                            </RadioGroup>
                        </Field>
                        <br />
                        {answerType === "custom" &&
                        <div>
                            <Field label={"Respostas"}>
                                <Input
                                    ref={inputRef}
                                    onChange={inputValidation}
                                    contentAfter={<Button disabled={disableButton} appearance={"transparent"} icon={<Add20Regular/>} onClick={() => {
                                        // setChoices(oldArray => [...oldArray, inputRef.current.value])
                                        setChoices(oldArray => [...oldArray, inputRef.current.value])
                                        inputRef.current.value = ""
                                    }} />}
                                />
                                {memoList}
                            </Field>
                        </div>
                        }
                    </div>

                    <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                            <Button disabled={answerType === "custom" && choices.length <= 1} appearance="primary" onClick={() => createQuestion()}>Gravar</Button>
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
