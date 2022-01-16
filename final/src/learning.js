import React, { useEffect, useState, useRef } from "react";
import "antd/dist/antd.css";
import {Input, Button, Space, Table, message, Modal, Radio} from "antd";
import {CheckCircleOutlined, ClockCircleOutlined, DeleteOutlined} from "@ant-design/icons";

const data_test = [
  {word: "apple", answer: "蘋果", key:1},
  {word: "banana", answer: "香蕉", key:2},
  {word: "cherry", answer: "櫻桃", key:3},
  {word: "coconut", answer: "椰子", key:4},
  {word: "grape", answer: "葡萄", key:5},
  {word: "lemon", answer: "檸檬", key:6},
  {word: "papaya", answer: "木瓜", key:7}
]

function Learning(props) {
  const user = props.user;
  const axios = props.axios;
  //console.log(props.data);
  //所有單字
  const [allData, setAllData] = useState(props.data);
  //目前在哪個功能
  const [feature, setFeature] = useState("dictionary");
  //目前展示的單字
  const [showData, setShowData] = useState(props.data);
  const [find, setFind] = useState();
  const [newWord, setNewWord] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  //////////////////////測驗功能//////////////////////
  //測驗題目數
  const [problemsNum, setProblemsNum] = useState(5);
  //是否彈出選擇測驗題目數量視窗
  const [isModalVisible, setIsModalVisible] = useState(false);
  //隨機選題目
  const [problemsList, setProblemsList] = useState([]);
  //隨機選3個正確答案外的選項
  const [answerList, setAnswerList] = useState([]);
  //目前在哪一題
  const [currentP, setCurrentP] = useState(0);
  const [p, setP] = useState("");
  //選擇的答案
  const [choosenAns, setChoosenAns] = useState(0);
  const [score, setScore] = useState(0);
  //是否彈出測驗結束視窗
  const [isModalVisible_2, setIsModalVisible_2] = useState(false);
  const handleTest = async() => {
    setIsModalVisible(true);
  }

  const handleOk = () => {
    setIsModalVisible(false);
    if (problemsNum > allData.length) {
      message.error("Problems number out of range")
    }
    else {
      //隨機選題目
      let problemsList_temp = [];
      while (problemsList_temp.length < problemsNum) {
        const newNum = Math.floor(Math.random()*allData.length);
        if (!problemsList_temp.includes(newNum)) {
          problemsList_temp.push(newNum);
        }
      }
      setProblemsList(problemsList_temp);
      console.log(problemsList_temp);
      setP(allData[problemsList_temp[0]].word);
      //隨機選答案
      let ans_temp = [problemsList_temp[0]];
      while (ans_temp.length < 4) {
        const newNum = Math.floor(Math.random()*allData.length);
        if (!ans_temp.includes(newNum)) {
          ans_temp.push(newNum);
        }
      }
      setAnswerList(ans_temp.sort());
      setFeature("test");
      setCurrentP(0);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //測驗結束視窗的按鈕
  const handleCancel_2 = () => {
    setScore(0);
    setIsModalVisible_2(false);
    setFeature("dictionary");
  };

  const handleOk_2 = () => {
    setScore(0);
    setIsModalVisible_2(false);
    handleOk();
  }

  const handleSubmit = () => {
    if (currentP < problemsNum-1) {
      if (choosenAns == problemsList[currentP]) {
        message.success("Correct!");
        setScore(score + 1);
      }
      else {
        message.error(`Sorry, the answer is ${allData[problemsList[currentP]].answer}`);
      }
      setCurrentP(currentP + 1);
      //console.log(problemsList[currentP+1]);
      setP(allData[problemsList[currentP+1]].word);
      //隨機選答案
      let ans_temp = [problemsList[currentP+1]];
      while (ans_temp.length < 4) {
        const newNum = Math.floor(Math.random()*allData.length);
        if (!ans_temp.includes(newNum)) {
          ans_temp.push(newNum);
        }
      }
      setAnswerList(ans_temp.sort());
    }
    else if (currentP == problemsNum-1) {
      if (choosenAns == problemsList[currentP]) {
        message.success("Correct!");
        setScore(score + 1);
      }
      else {
        message.error(`Sorry, the answer is ${allData[problemsList[currentP]].answer}`);
      }
      setIsModalVisible_2(true);
    }
    setChoosenAns(-1);
  };
  const test = (
    <>
      <p style={{fontSize:"2rem", fontWeight:"100", lineHeight: "2rem", marginLeft: "1rem", marginBottom: "1rem"}}>What does {p} mean ?</p>
      <Radio.Group name="radiogroup" value={choosenAns} style={{marginLeft: "1rem"}} onChange={(e) => {setChoosenAns(e.target.value)}}>
        <Space direction="vertical">
          {answerList.map((p,i) => <Radio value={p}>{allData[p].answer}</Radio>)}
          <Button onClick={handleSubmit} type="primary">Submit</Button>
        </Space>
      </Radio.Group>
      
    </>
  )
  ////////////////////////////////////////////////////
  //搜尋單字
  const handleSearch = () => {
    const dataFilter = allData.filter((data) => {return data.word.includes(find) || data.answer.includes(find)});
    //onsole.log(dataFilter);
    setShowData(dataFilter);
    setFind("");
  };
  //新增單字
  const handleAdd = async() => {
    const {data} = await axios.post("/api/newWord", {user: user, word: newWord, answer: newAnswer});
    console.log(data.message);
    if (data.message == "adding success") {
      message.success("adding success");
      const newD = [{word: newWord, answer: newAnswer, key: newWord}, ...allData];
      setAllData(newD);
      setShowData(newD);
    }
    else  {
      message.error(data.message);
      setShowData(allData);
    }
    setNewWord("");
    setNewAnswer("");
  };
  //刪除單字
  const handleDelete = async(word) => {
    console.log(word);
    const {data} = await axios.post("/api/deleteWord", {user: user, word: word});
    console.log(data.message);
    if (data.message == "delete success") {
      const dataFilter = allData.filter((data) => {return data.word != word});
      setAllData(dataFilter);
      setShowData(dataFilter);
      message.success(data.message);
    }
    else {
      message.error(data.message);
    }
  };
  //用 Table 顯示
  const columns = [
    {title: 'Words',dataIndex: 'word',key: 'word', width: "50%"},
    {title: 'Translation',dataIndex: 'answer',key: 'answer', width: "50%", render: (answer, record) => (
      <span style={{display: "flex"}}>{answer}
      <Button type="primary" shape="circle" ghost={true} danger={true} size="small"
              icon={<DeleteOutlined />} style={{marginLeft: "auto"}} onClick={() => {handleDelete(record.word)}}/>
      </span>
    )}
  ];
  //字典功能頁面
  const dictionary = (
    <>
      <Input.Search
          value={find}
          style={{ width: '100%' }}
          placeholder="Search a word"
          onSearch={handleSearch}
          onChange={(e) => {setFind(e.target.value)}}
          style={{ width: "98%", marginLeft: "1%", marginBottom: "0.2rem"}}
          enterButton/>
      <Input.Group compact style={{ width: "98%", marginLeft: "1%", marginBottom: "0.2rem"}}>
        <Input
          value={newWord}
          style={{ width: '50%' }}
          onChange={(e) => {setNewWord(e.target.value)}}
          placeholder="Add a new word"/>
        <Input.Search
          value={newAnswer}
          style={{ width: '50%' }}
          onChange={(e) => {setNewAnswer(e.target.value)}}
          onSearch={handleAdd}
          enterButton="Add"
          placeholder="What does it mean?"/>
      </Input.Group>
      <Table dataSource={showData} columns={columns} pagination={{pageSize: 6}} style={{ width: "98%", marginLeft: "1%", marginBottom: "1rem"}}/>
    </>
  )

  return (
    <>
      <Space style={{ width: "98%", margin: "1%"}}>
        <Button style={{ width: '8rem' }} onClick={() => {setFeature("dictionary")}}>Dictionary</Button>
        <Button style={{ width: '8rem' }} onClick={handleTest}>Quiz</Button>
        {feature=="dictionary"? <Button type="primary" onClick={() => {setShowData(allData)}}>Show all words</Button>: <></>}
      </Space>
      <Modal title="How many problems do you want" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Input value={problemsNum} onChange={(e) => {setProblemsNum(e.target.value)}}></Input>
      </Modal>
      <Modal title="Quiz finished" visible={isModalVisible_2} onOk={handleOk_2} onCancel={handleCancel_2} okText={"again!"} cancelText={"back to dictionary"}>
        <h1>{`Congratulations! Your score is ${score}/${problemsNum}`}</h1>
      </Modal>
      {feature=="dictionary"? dictionary: test}
    </>
  )
}

export default Learning;