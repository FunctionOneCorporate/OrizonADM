import "~/styles/participants.scss"
import {
    Button,
    Divider,
    Input,
    Label, Menu, MenuButton, MenuItem, MenuList, MenuPopover, MenuTrigger, Table,
    TableBody, TableCell,
    TableHeader,
    TableHeaderCell,
    TableRow
} from "@fluentui/react-components";
import {
    AppsList20Filled,
    Checkmark20Filled, Checkmark20Regular,
    Dismiss20Regular,
    Filter20Filled,
    Search20Regular
} from "@fluentui/react-icons";
import {useEffect, useState} from "react";
import {api} from "~/services/api";
import EditUser from "~/components/editUser";
import Loading from "~/components/loading";

const Participantes = () => {

    const [searchInput, setSearchInput] = useState("")
    const [filter, setFilter] = useState("")
    const [users, setUsers] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(true)

    const columns = [
        {columnKey: "UserPrincipalName", label: "Nome"},
        {columnKey: "UserEmail", label: "Email"},
        // {columnKey: "SendOnlyToThis", label: "Somente Para"},
        {columnKey: "DontSendToThis", label: "Enviar Para"},
        {columnKey: "Action", label: ""},
    ];

    const getusers = async () => {
        await api
            .get("userConversation/all")
            .then((response) => {
                setUsers(response.data)
                setLoading(false)
            })
            .catch((e) => {
                return e;
            })

    }

    useEffect(() => {
        // getQuestions()
        getusers()
    }, [refresh])

    return (
        <div className={"participantsContainer"}>
            {loading ? <Loading/> : <>
                <div className={"title"}>
                    <h1>Participantes</h1>
                </div>
                <div className={"participantSelection"}>
                    <Input
                        className={"participantSearch"}
                        placeholder={"Nome ou email do participante"}
                        onChange={(ev, data) => setSearchInput(data.value)}
                        contentAfter={<Button appearance={"transparent"} icon={<Search20Regular/>} style={{pointerEvents: "none"}}/>}
                    />
                </div>
                <br/>
                <div className={"participantDropdown"}>
                    <Divider/>
                </div>
                <br/>
                <div className={"participantDropdown"}>
                    <Menu>
                        <MenuTrigger disableButtonEnhancement>
                            <MenuButton style={{float: "right"}} disableButtonEnhancement appearance={"primary"}
                                        icon={<Filter20Filled/>}/>
                        </MenuTrigger>
                        <MenuPopover>
                            <MenuList>
                                <MenuItem onClick={() => setFilter("")}>Listar Todos</MenuItem>
                                {/*<MenuItem onClick={() => setFilter("sendTo")}>Listar somente os*/}
                                {/*    que receberão questionário</MenuItem>*/}
                                <MenuItem onClick={() => setFilter("dontSend")}>Listar somente
                                    os que não receberão questionário</MenuItem>
                            </MenuList>
                        </MenuPopover>
                    </Menu>

                </div>
                <br/>
                <div className={"participantSelection"}>
                    <Table size={"medium"} className={"tableParticipants"}>
                        <TableHeader>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableHeaderCell key={column.columnKey}>
                                        <strong>{column.label}</strong>
                                    </TableHeaderCell>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users
                                .filter((item) => searchInput === "" ?
                                    item : item.UserPrincipalName.toLowerCase().includes(searchInput.toLowerCase()) ?
                                        item : item.UserEmail.toLowerCase().includes(searchInput.toLowerCase())
                                )
                                // .filter((item) => filter === "" ? item === item : filter === "sendTo" ? item.SendOnlyToThis : item.DontSendToThis)
                                .filter((item) => filter === "" ? item : item.DontSendToThis)
                                .map((item) => (
                                    <TableRow appearance={"neutral"}>
                                        <TableCell className={"tableCellQuestions"}>
                                            {item.UserPrincipalName}
                                        </TableCell>
                                        <TableCell className={"tableCellQuestions"}>
                                            {item.UserEmail}
                                        </TableCell>
                                        {/*<TableCell className={"tableCellQuestions"}>*/}
                                        {/*    {item.SendOnlyToThis ? <Checkmark20Regular/> : <Dismiss20Regular/>}*/}
                                        {/*</TableCell>*/}
                                        <TableCell className={"tableCellQuestions"}>
                                            {item.DontSendToThis ?  <Dismiss20Regular/> : <Checkmark20Regular/>}
                                        </TableCell>
                                        <TableCell className={"tableCellQuestionsIcon"}>
                                            <EditUser Id={item.UserId} users={users} setUsers={setUsers} refresh={refresh} setRefresh={setRefresh} setLoading={setLoading}/>
                                        </TableCell>
                                    </TableRow>

                                ))}
                        </TableBody>
                    </Table>
                </div>
            </>}

        </div>
    )
}

export default Participantes
