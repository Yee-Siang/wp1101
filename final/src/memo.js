import React, { useEffect, useState, useRef } from "react";
import "antd/dist/antd.css";
import { Input, DatePicker, Button, Space, Table, message, Tag, Tabs } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined, DeleteOutlined } from "@ant-design/icons";

function Memo(props) {
  const user = props.user;
  const axios = props.axios;
  //console.log(props.data);

  const [newTodo, setNewTodo] = useState("");
  const [newDate, setNewDate] = useState(Date());
  const [todos, setTodos] = useState(props.data);
  const [now, setNow] = useState("All");

  //新增 todo
  const handleNewTodo = async () => {
    console.log(newTodo);
    console.log(newDate);
    if (!newTodo || !newDate) {
      message.error("Missing Due date or Task");
      return
    }
    const { data } = await axios.post("/api/newTodo", { user: user, todo: newTodo, date: newDate });
    console.log(data);
    if (data.message === "Success") {
      const newT = [...todos, data];
      const newSort = newT.sort((a, b) => new Date(a.Day) - new Date(b.Day));
      setTodos(newSort);
      message.success("New task added");
    }
    else if (data.message === "Repeated Todo") {
      message.error("This task already exists");
    }
  }
  //刪除所有 todos
  const handleClear = async (range) => {
    const { data } = await axios.post("/api/clearAllTodos", { user: user, range: range });
    console.log(data);
    if (data.message === "clear all success") {
      setTodos([]);
      message.success("Clear all success");
    }
    else if (data.message === "clear complete success") {
      let afterDelete = todos.filter(t => t.State == "Active");
      setTodos(afterDelete);
      message.success("Clear complete success");
    }
    else {
      message.error("Clear tasks failed");
    }
  }
  //刪除指定 todo
  const deleteOne = async (task, date) => {
    //console.log(task);
    const { data } = await axios.post("/api/deleteOneTodo", { user: user, task: task, date: date });
    //console.log(data);
    if (data.message === "delete one success") {
      setTodos([]);
      message.success("Delete Todo success")
    }
    else {
      message.error("Delete Todo failed")
    }
    let afterDelete = todos.filter(t => t.Todo != task || t.Day != date);
    setTodos(afterDelete);
  }
  //變換 todo State
  const changeState = async (task, date) => {
    //console.log(task);
    const { data } = await axios.post("/api/changeTodoState", { user: user, task: task, date: date });
    //console.log(data);
    if (data.message == "change State success") {
      setTodos([]);
      message.success("Update success")
    }
    else {
      message.error("Updated failed")
    }
    setTodos(todos.map(t => {
      if (t.Todo === task) {
        if (t.State == "Active") return { ...t, State: "Complete" };
        else return { ...t, State: "Active" };
      }
      else return t
    }))
  }
  //顯示 todos
  const dataSource = [];
  for (let i = 0; i < todos.length; i++) {
    let t = todos[i];
    if (now === "All" || t.State == now) {
      dataSource.push({ task: t.Todo, date: t.Day, state: t.State, key: i });
    }
  };
  const columns = [
    {
      title: 'State', dataIndex: 'state', key: 'state', width: "8rem", render: (state, record) => (
        state == "Active" ?
          <Tag icon={<ClockCircleOutlined />} onClick={() => { changeState(record.task, record.date) }} style={{ cursor: "pointer", width: "5.5rem" }}>{state}</Tag> :
          <Tag icon={<CheckCircleOutlined />} color="success" onClick={() => { changeState(record.task, record.date) }} style={{ cursor: "pointer", width: "5.5rem" }}>{state}</Tag>
      )
    },
    {
      title: `Tasks-${now}`, dataIndex: 'task', key: 'task', render: (task, record) => (
        record.state == "Active" ?
          <span >{task}</span> :
          <span style={{ textDecoration: 'line-through', color: "gray" }}>{task}</span>
      )
    },
    {
      title: 'Due date', dataIndex: 'date', key: 'date', width: "9rem", render: (date, record) => (
        <span style={{ display: "flex" }}>{`${String(date).split("T")[0]}`}
          <Button type="primary" shape="circle" ghost={true} danger={true} size="small"
            icon={<DeleteOutlined />} style={{ marginLeft: "auto" }} onClick={() => { deleteOne(record.task, date) }} />
        </span>

      )
    },
  ];
  //render
  const [color, setColor] = useState([1,0,0]);
  return (
    <div style={{ display: "flex", flexDirection: "column"}}>
      <Input.Group compact style={{ width: '98%', margin: "1%" }}>
        <DatePicker
          style={{ width: '30%'}}
          onChange={(e) => {
            //console.log(String(e))
            setNewDate(e)
          }} />
        <Input.Search
          value={newTodo}
          style={{ width: '70%' }}
          placeholder="Type yous task here"
          onSearch={(e) => { handleNewTodo(); setNewTodo("") }}
          onChange={(e) => { setNewTodo(e.target.value) }}
          enterButton="Add" />
      </Input.Group>
      <Space style={{ width: '98%', marginLeft: "1%", marginBottom: "1%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <Space>
          <Button type={color[0]? "primary":"default"} style={{ width: '8rem' }} onClick={() => { setNow("All"); setColor([1,0,0])}}>All</Button>
          <Button type={color[1]? "primary":"default"} style={{ width: '8rem' }} onClick={() => { setNow("Active"); setColor([0,1,0])}}>Active</Button>
          <Button type={color[2]? "primary":"default"} style={{ width: '8rem' }} onClick={() => { setNow("Complete"); setColor([0,0,1])}}>Complete</Button>
        </Space>
        <Space>
          <Button type="default" ghost style={{ width: '8rem', color: "green", borderColor: "green"}} onClick={() => { handleClear("Complete") }}>Clear Complete</Button>
          <Button type="primary" ghost danger style={{ width: '8rem' }} onClick={() => { handleClear("All") }}>Clear All</Button>
        </Space>
      </Space>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 6 }} style={{ width: '98%', marginLeft: "1%", marginBottom: "1%" }}/>
    </div>
  )
}

export default Memo;