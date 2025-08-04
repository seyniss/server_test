const express = require("express")
const app = express()

const PORT = 3000

app.use(express.json())



let boards=[
    {title: "title 1", id: 1, content: "content 1"},
    {title: "title 2", id: 2, content: "content 2"},
    {title: "title 3", id: 3, content: "content 3"}
]
let initId=4

app.post("/boards",(req,res)=>{
    try {
        const newBoard={
            id : initId++,
            idsplayId : boards.length+1,
            title: req.body.title,
            content: req.body.content,
            createdAt:new Date().toISOString()
        }
        boards.push(newBoard)

        res.status(201).json({message:"게시글 생성 완료",boards})
    } catch (error) {
        console.error("게시글 생성 중 오류",error)
        res.status(500).json({message:"서버 오류"})

    }
})

app.get("/boards",(req,res)=>{
    try {
            res.status(200).json({
            message: "전체 조회",
            boards
        });
    } catch (error) {
        console.error("사용자 조회중 오류",error)
        res.status(500).json({message:"서버 내부 오류 발생"})
    }
})

app.get("/boards/:id", (req, res) => {
    try {
        const boardId = Number(req.params.id)

        const index = boards.findIndex(b => b.id === boardId)

        if (index === -1) {
            return res.status(404).json({ message: "조회할 게시판이 없습니다" })
        }
        res.status(200).json({ message: "게시판 1개 조회 완료", title: boards[index] })
    } catch (error) {
        console.error("게시판 조회 중 오류", error)
        res.status(500).json({ message: "서버 내부 오류 발생" })
    }
})

app.put("/boards/:id", (req, res) => {
    try {
        const boardId = Number(req.params.id)
        const index = boards.findIndex(b => b.id === boardId)

        if (index === -1) {
            return res.status(404).json({ message: "해당 게시판이 존재하지 않습니다." })
        }

        const { id, ...updateData } = req.body // id는 무시
        boards[index] = {
            ...boards[index],
            ...updateData
        }

        res.status(200).json({ message: "게시판 수정 완료", data: boards[index] })
    } catch (error) {
        console.error("게시판 수정 중 오류", error)
        res.status(500).json({ message: "서버 내부 오류 발생" })
    }
})

app.delete("/boards/:id", (req, res) => {
    try {
        const boardId = Number(req.params.id)
        const index = boards.findIndex(b => b.id === boardId)

        if (index === -1) {
            return res.status(404).json({ message: "해당 게시판이 존재하지 않습니다." })
        }
        boards.splice(index,1)
        res.status(200).json({ message: "게시판 삭제 완료", data: boards})
    } catch (error) {
        console.error("게시판 수정 중 오류", error)
        res.status(500).json({ message: "서버 내부 오류 발생" })
    }
})
app.patch("/boards/:id/title",(req,res)=>{
    try {
        const boardId = Number(req.params.id)
        const index = boards.findIndex(b => b.id === boardId)

        if (index === -1) {
            return res.status(404).json({ message: "게시글 부분 수정 중 ID가 없음." })
        }
        const {title} = req.body


        if(typeof title !== 'string' || title.trim()===""){
            return res.status(400).json({message:"비어있지 않는 문자열이어야 합니다"})
        }

        boards[index]={
            ...boards[index],
            title:title.trim()
        }

        res.status.json({message:"게시글 제목 수정 완료",board:boards[index]})


    } catch (error) {
        console.error("게시판 제목 수정 중 오류", error)
        res.status(500).json({ message: "서버 내부 오류 발생" })
    }
})

app.patch("/boards/:id/content",(req,res)=>{
    try {
        const boardId = Number(req.params.id)
        const index = boards.findIndex(b => b.id === boardId)

        if (index === -1) {
            return res.status(404).json({ message: "게시글 부분 수정 중 ID가 없음." })
        }
        const {title} = req.body


        if(typeof content !== 'string' || content.trim()===""){
            return res.status(400).json({message:"비어있지 않는 문자열이어야 합니다"})
        }

        boards[index]={
            ...boards[index],
            content:content.trim()
        }

        res.status.json({message:"게시글 제목 수정 완료",board:boards[index]})


    } catch (error) {
        console.error("게시판 제목 수정 중 오류", error)
        res.status(500).json({ message: "서버 내부 오류 발생" })
    }
})


app.listen(PORT,()=>{
    console.log(`${PORT}에서 서버 실행 중`)
})