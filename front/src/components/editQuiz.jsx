import {
    Button,
    Dialog,
    DialogActions,
    DialogBody,
    DialogSurface,
    DialogTitle,
    DialogTrigger, Field, Input, Radio, RadioGroup
} from "@fluentui/react-components";
import {Add20Filled, Dismiss20Regular, Edit20Filled} from "@fluentui/react-icons";
import {api} from "~/services/api";
import {useState} from "react";
import {DatePicker} from "@fluentui/react-datepicker-compat";
import "~/styles/editQuizz.scss"

const EditQuiz = (props) => {
    const [response, setResponse] = useState(props.quizzes.filter((quiz) => quiz.Id === props.Id)[0])
    console.log({response})
    const handleUpdate = async () => {
        await api
            .patch("questionCatalog/"+ parseInt(props.Id), response)
            .then((response) => {
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
                    <Button disableButtonEnhancement appearance={"primary"} icon={<Edit20Filled/>} style={{marginLeft: "1vw"}}/>
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
                        Editar Questionário
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
                                value={new Date(response.StartDateTimeUTC)}
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
                        <br/>
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

export default EditQuiz
