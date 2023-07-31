import "../styles/quizzes.scss"
import {
    Dropdown,
    Option,
    Divider, Table, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell
} from "@fluentui/react-components";
import {api} from "../services/api";
import {useEffect, useState} from "react";
import DialogQuizzes from "../components/dialogQuizzes";
import AddQuiz from "../components/addQuiz";
import EditQuiz from "../components/editQuiz";
import DeleteQuiz from "../components/deleteQuiz";
import AddQuestion from "../components/addQuestion";
import DeleteQuestion from "../components/deleteQuestion";
import EditQuestion from "../components/editQuestion";
import DialogQuestionRamification from "../components/dialogQuestionRamification";


const Questionarios = () => {
    const [quizzes, setQuizzes] = useState([])
    const [questions, setQuestions] = useState([])
    const [selectedQuiz, setSelectedQuiz] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const [refreshQuestions, setRefreshQuestions] = useState(false)

    const columns = [
        {columnKey: "QuestionTitle", label: "Questões"},
        {columnKey: "Action", label: ""},
    ];

    const getQuestionCatalog = async () => {
        await api
            .get("questionCatalog/all")
            .then((response) => {
                setQuizzes(response.data)
            })
            .catch((e) => {
                return e;
            })

    }

    const getQuestions = async () => {
        await api
            .get("questions/" + parseInt(selectedQuiz))
            .then((response) => {
                setQuestions(response.data)
                // props.setRefresh(!props.refresh)
                console.log({response})
            })
            .catch((e) => {
                return e;
            })
    }

    useEffect(() => {
        // getQuestions()
        getQuestionCatalog()
    }, [refresh])

    useEffect(() => {
        getQuestions()
    }, [selectedQuiz, refreshQuestions])

    console.log({quizzes})
    console.log({questions})
    return (
        <div className={"questionsContainer"}>
            <div className={"title"}>
                <h1>Questionários</h1>
            </div>
            <div className={"quizSelection"}>
                <h2>Selecione o Questionário</h2>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <Dropdown placeholder={"Selecione um questionário"} className={"quizDropdown"}
                              onOptionSelect={(ev, data) => setSelectedQuiz(data.optionValue)}>
                        {quizzes.map((quiz) => (
                            <Option key={quiz.Id} value={quiz.Id}>
                                {quiz.CatalogName}
                            </Option>
                        ))}
                    </Dropdown>
                    {/*dialog com a lista de questionários*/}
                    <DialogQuizzes quizzes={quizzes} setQuizzes={setQuizzes} refresh={refresh} setRefresh={setRefresh}/>
                </div>

                <br/><br/>
                <div className={"quizDropdown"}>
                    <Divider/>
                </div>
            </div>
            {selectedQuiz && <div className={"questionSelection"}>
                <br/>
                <AddQuestion questionCatalogId={selectedQuiz} questions={questions} setQuestions={setQuestions} refreshQuestions={refreshQuestions} setRefreshQuestions={setRefreshQuestions}/>
                <br/><br/>
                <Table size={"medium"} className={"tableQuestions"}>
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
                        {questions.map((item) => (
                            <TableRow appearance={"neutral"}>
                                <TableCell className={"tableCellQuestions"}>
                                    {item.QuestionTitle}
                                </TableCell>
                                <TableCell className={"tableCellQuestionsIcon"}>
                                    <EditQuestion Id={item.Id} questions={questions} setQuestions={setQuestions} refreshQuestions={refreshQuestions} setRefreshQuestions={setRefreshQuestions}/>
                                    <DeleteQuestion Id={item.Id} questions={questions} setQuestions={setQuestions} refreshQuestions={refreshQuestions} setRefreshQuestions={setRefreshQuestions}/>
                                    <DialogQuestionRamification Id={item.Id} question={item} refreshQuestions={refreshQuestions} setRefreshQuestions={setRefreshQuestions}/>
                                </TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </div>}

        </div>
    )
}

export default Questionarios
