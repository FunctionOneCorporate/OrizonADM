import {
    Button,
    Dialog,
    DialogActions,
    DialogBody, DialogContent,
    DialogSurface,
    DialogTitle,
    DialogTrigger, Field, Input, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, Textarea
} from "@fluentui/react-components";
import {BranchFork20Regular, Dismiss20Regular} from "@fluentui/react-icons";
import "~/styles/dialogQuestionRamification.scss"
import {useEffect, useState} from "react";
import {api} from "~/services/api";
import AddQuestionRamification from "./addQuestionRamification";
import EditQuiz from "./editQuiz";
import DeleteQuiz from "./deleteQuiz";
import EditQuestionRamification from "./editQuestionRamification";
import DeleteQuestionRamification from "./deleteQuestionRamification";

const DialogQuestionRamification = (props) => {
    const [questionRamifications, setQuestionRamifications] = useState([])
    const [refreshQuestionRamifications, setRefreshQuestionRamifications] = useState(false)
    const columns = [
        {columnKey: "CatalogName", label: "Ramificações"},
        {columnKey: "StartDateTimeUTC", label: "Resposta"},
        {columnKey: "Action", label: ""},
    ];

    const getQuestionRamifications = async () => {
        await api
            .get("questionBranching/" + props.question.Id)
            .then((response) => {
                setQuestionRamifications(response.data)
                console.log({response})
            })
            .catch((e) => {
                return e;
            })

    }

    useEffect(() => {
        getQuestionRamifications()
    }, [refreshQuestionRamifications])

    return (
        <Dialog>
            <DialogTrigger>
                    <Button disableButtonEnhancement appearance={"primary"} icon={<BranchFork20Regular/>}/>
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
                        Questão Ramificada
                    </DialogTitle>
                    <DialogContent>
                        <h3>{props.question.QuestionTitle}</h3>
                        <AddQuestionRamification question={props.question} questionRamifications={questionRamifications} setQuestionRamifications={setRefreshQuestionRamifications} refreshQuestionRamifications={refreshQuestionRamifications} setRefreshQuestionRamifications={setRefreshQuestionRamifications}/>
                        <div className={"formContainer"}>
                            <br/><br/>
                            <Table size={"medium"} className={"table"}>
                                <TableHeader >
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableHeaderCell key={column.columnKey}>
                                                <strong>{column.label}</strong>
                                            </TableHeaderCell>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {questionRamifications.map((item) => (
                                        <TableRow appearance={"neutral"} >
                                            <TableCell as={"div"} className={"tableCell"}>
                                                {item.QuestionTitle}
                                            </TableCell>
                                            <TableCell className={"tableCell"}>
                                                {item.AnswerType === "S" ? "Sim":"Não"}
                                            </TableCell>
                                            <TableCell className={"tableCellIcons"}>
                                                <EditQuestionRamification questionRamification={item} question={props.question} questionRamifications={questionRamifications} setQuestionRamifications={setRefreshQuestionRamifications} refreshQuestionRamifications={refreshQuestionRamifications} setRefreshQuestionRamifications={setRefreshQuestionRamifications}/>
                                                <DeleteQuestionRamification questionRamification={item} question={props.question} questionRamifications={questionRamifications} setQuestionRamifications={setRefreshQuestionRamifications} refreshQuestionRamifications={refreshQuestionRamifications} setRefreshQuestionRamifications={setRefreshQuestionRamifications}/>
                                                {/*<EditQuiz/>*/}
                                                {/*<DeleteQuiz Id={item.Id} quizzes={props.quizzes} setQuizzes={props.setQuizzes} refresh={props.refresh} setRefresh={props.setRefresh}/>*/}
                                                {/*<DeleteQuiz/>*/}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <br/>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary">Fechar</Button>
                        </DialogTrigger>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    )
}

export default DialogQuestionRamification
