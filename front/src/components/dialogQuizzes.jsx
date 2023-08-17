import {
    Button,
    Dialog, DialogActions,
    DialogBody,
    DialogContent,
    DialogSurface,
    DialogTitle,
    DialogTrigger, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow
} from "@fluentui/react-components";
import {Add20Filled, AppsList20Filled, Delete20Filled, Dismiss20Regular, Edit20Filled} from "@fluentui/react-icons";
import "~/styles/dialogQuizzes.scss"
import AddQuiz from "./addQuiz";
import EditQuiz from "./editQuiz";
import DeleteQuiz from "./deleteQuiz";
import {useState} from "react";

const DialogQuizzes = (props) => {
    const columns = [
        {columnKey: "CatalogName", label: "Nome"},
        {columnKey: "StartDateTimeUTC", label: "Início"},
        {columnKey: "Status", label: "Situação"},
        // {columnKey: "IsAnonymous", label: "Anônimo"},
        {columnKey: "Action", label: ""},
    ];
    const sortedQuizzesByDate = props.quizzes.sort((a,b) => new Date(b.StartDateTimeUTC).getTime() - new Date(a.StartDateTimeUTC).getTime())

    return (
        <Dialog>
            <DialogTrigger>
                <Button disableButtonEnhancement appearance={"primary"} icon={<AppsList20Filled/>}/>
            </DialogTrigger>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle
                        action={
                            <DialogTrigger action="close">
                                <Button
                                    appearance="subtle"
                                    aria-label="close"
                                    icon={<Dismiss20Regular />}
                                />
                            </DialogTrigger>
                        }>Questionários
                            </DialogTitle>
                    <DialogContent>
                        <br/>
                        {/*dialog para adicionar questionario*/}
                        <AddQuiz quizzes={props.quizzes} setQuizzes={props.setQuizzes} refresh={props.refresh} setRefresh={props.setRefresh}/>
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
                                {props.quizzes.map((item, index) => (
                                    <TableRow appearance={"neutral"} key={index} >
                                        <TableCell as={"div"} className={"tableCell"}>
                                            {item.CatalogName}
                                        </TableCell>
                                        <TableCell className={"tableCell"}>
                                            {new Date(item.StartDateTimeUTC).toLocaleDateString() + " " + new Date(item.StartDateTimeUTC).toLocaleTimeString()}
                                        </TableCell>
                                        <TableCell style={item.Status === "A" && item.Id === sortedQuizzesByDate[0].Id ? {background: "#3fb618", color: "white"} : {}} className={"tableCell"}>
                                            {item.Status === "A" && item.Id === sortedQuizzesByDate[0].Id ? "Ativo" : "Inativo"}
                                        </TableCell>
                                        {/*<TableCell as={"div"} className={"tableCell"}>*/}
                                        {/*    {item.IsAnonymous}*/}
                                        {/*</TableCell>*/}
                                        <TableCell className={"tableCell"}>
                                            <EditQuiz Id={item.Id} quizzes={props.quizzes} setQuizzes={props.setQuizzes} refresh={props.refresh} setRefresh={props.setRefresh}/>
                                            <DeleteQuiz Id={item.Id} quizzes={props.quizzes} setQuizzes={props.setQuizzes} refresh={props.refresh} setRefresh={props.setRefresh}/>
                                        </TableCell>
                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>
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

export default DialogQuizzes
