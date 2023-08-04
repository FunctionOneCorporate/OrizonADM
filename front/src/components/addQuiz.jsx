import {
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogBody,
    DialogSurface,
    DialogTitle,
    DialogTrigger, Field, Input, Radio, RadioGroup
} from "@fluentui/react-components";
import {DatePicker} from "@fluentui/react-datepicker-compat";
import {Add20Filled, Dismiss20Regular} from "@fluentui/react-icons";
import "../styles/addQuiz.scss"
import {useState} from "react";
import {api} from "../services/api";
import {useNavigate} from 'react-router-dom';

const AddQuiz = (props) => {
    const [response, setResponse] = useState({
        CatalogName: "",
        Description: "",
        StartDateTimeUTC: "",
        MinParticipantsToSend: "",
        IsAnonymous: "false",
        IgnoreWhenHasExternals: "false"
    })
    const navigate = useNavigate();
    const goTo = (url) => {
        navigate(url)
    }
    console.log({response})

    const createQuestionCatalog = async () => {
        await api
            .post("questionCatalog/", response)
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
                    <Button disableButtonEnhancement appearance={"primary"} icon={<Add20Filled/>}/>
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
                        <Field label={"Nome do Questionário"} className={"formInput"}>
                            <Input placeholder={"Insira o nome do questionário"}
                                   value={response.CatalogName}
                                   onChange={(ev, data) => setResponse({...response, CatalogName: data.value})}
                            />
                        </Field>
                        <br/>
                        <Field label={"Descrição"} className={"formInput"}>
                            <Input placeholder={"Insira uma descrição que justifique a criação do questionário"}
                                   value={response.Description}
                                   onChange={(ev, data) => setResponse({...response, Description: data.value})}/>
                        </Field>
                        <br/>
                        <Field label={"Usar esse questionário a partir de"} className={"formInput"}>
                            <DatePicker
                                onSelectDate={(ev) => setResponse({...response, StartDateTimeUTC: ev})}
                            />
                        </Field>
                        <br/>
                        <Field label={"Número mínimo de participantes para envio do questionário"}
                               className={"formInput"}>
                            <Input type={"number"}
                                   value={response.MinParticipantsToSend}
                                   onChange={(ev, data) => setResponse({
                                       ...response,
                                       MinParticipantsToSend: data.value
                                   })}/>
                        </Field>
                        <Field label={"Questionário anônimo?"} className={"formInput"}>
                            <RadioGroup layout={"horizontal"}
                                        value={response.IsAnonymous.toString()}
                                        onChange={(ev, data) => setResponse({...response, IsAnonymous: data.value})}
                            >
                                <Radio value={"true"} label={"Sim"}/>
                                <Radio value={"false"} label={"Não"}/>
                            </RadioGroup>
                        </Field>
                        <Field label={"Ignorar usuários externos?"} className={"formInput"}>
                            <RadioGroup layout={"horizontal"}
                                        value={response.IgnoreWhenHasExternals.toString()}
                                        onChange={(ev, data) => setResponse({...response, IgnoreWhenHasExternals: data.value})}
                            >
                                <Radio value={"true"} label={"Sim"}/>
                                <Radio value={"false"} label={"Não"}/>
                            </RadioGroup>
                        </Field>
                        <br/>
                    </div>

                    <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="primary" onClick={() => createQuestionCatalog()}>Gravar</Button>
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

export default AddQuiz
