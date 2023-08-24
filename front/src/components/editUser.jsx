import {
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogBody,
    DialogSurface,
    DialogTitle,
    DialogTrigger, Field, Input, Textarea
} from "@fluentui/react-components";
import {Add20Filled, Dismiss20Regular, Edit20Filled} from "@fluentui/react-icons";
import {api} from "~/services/api";
import {useState} from "react";
import {DatePicker} from "@fluentui/react-datepicker-compat";
import "~/styles/editUser.scss"

const EditUser = (props) => {
    const [response, setResponse] = useState(props.users.filter((user) => user.UserId === props.Id)[0])

    const handleUpdate = async () => {
        await api
            .patch("userConversation/" + (props.Id), response)
            .then((response) => {
                // props.setQuestions(oldArray => [...oldArray, response.data])
                props.setRefresh(!props.refresh)
                props.setLoading(true)
                console.log({response})
            })
            .catch((e) => {
                return e;
            })
    }

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
                        Envio de Questionário
                    </DialogTitle>
                    <div className={"formContainer"}>
                        <Field label={"Participante"} className={"formInput"}>
                            <Input placeholder={"Digite a pergunta a ser inserida ao questionário"}
                                      value={response.UserPrincipalName}
                                      disabled
                            />
                        </Field>
                        <br/>
                        {/*<Checkbox*/}
                        {/*    className={"formInput"}*/}
                        {/*    checked={response.SendOnlyToThis}*/}
                        {/*    onChange={() => setResponse({...response, SendOnlyToThis: !response.SendOnlyToThis})}*/}
                        {/*    label="Enviar questionário somente para este participante"*/}
                        {/*/>*/}
                        <Checkbox
                            className={"formInput"}
                            checked={!response.DontSendToThis}
                            onChange={() => setResponse({...response, DontSendToThis: !response.DontSendToThis})}
                            label="Enviar questionário para este participante"
                        />
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

export default EditUser
