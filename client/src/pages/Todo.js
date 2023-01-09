import { useState, useEffect } from "react";
import axios from "axios";
import "./Todo.css";
import moment from "moment";
import {
  MdOutlineModeEditOutline,
  MdOutlineDeleteOutline,
  MdDelete,
  MdModeEdit,
  MdAddCircle,
} from "react-icons/md";
import { account } from "../services/appwriteConfig";
import { toast } from "react-hot-toast";
import TodoLogo from "../assets/todologo.png";

// Components
import Username from "../components/Username";
import Logout from "../components/Logout";
import Theme from "../components/Theme";
import TimeandOptions from "../components/TimeandOptions";
import Login from "../pages/Login";

export const Todo = () => {
  // User Todo Data

  const [todoTitle, setTodoTitle] = useState("");
  const [todoTasks, setTodoTasks] = useState("");
  const [userId, setUserId] = useState("");
  const [userTasks, setUserTasks] = useState("");

  const data = {
    todo: todoTitle,
    task: todoTasks,
    userId: userId,
  };

  const createTodo = async () => {
    try {
      const resp = await axios.post("/createTodo", data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const submitTodo = () => {
    createTodo();
    setTodoTitle("");
    setTodoTasks("");
  };

  // Fetching User data

  const fetchData = async () => {
    try {
      const abc = await account.get();
      setUserId(abc.$id);

      const resp = await axios.get(`/getUserTodos/${abc.$id}`);

      var ops = document.getElementById("sort");
      var selected = ops.options[ops.selectedIndex];

      if (selected.text === "Name") {
        setUserTasks(resp.data.sortName);
      } else if (selected.text === "Time") {
        setUserTasks(resp.data.sortLatest);
      } else if (selected.text === "Modification Time") {
        setUserTasks(resp.data.sortUpdated);
      } else {
        setUserTasks(resp.data.todos);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Editing Todo Title

  const doEdit = async (todoId) => {
    const newTodo = prompt("Enter your new task");

    if (!newTodo) {
      alert("Please enter task to edit");
    } else {
      const resp = await axios.put(`/editTodo/${todoId._id}`, {
        todo: newTodo.toUpperCase(),
      });
    }
  };

  // Deleting Todo

  const doDelete = async (todo) => {
    const resp = await axios.delete(`/deleteTodo/${todo._id}`);
  };

  // Adding Todo Task

  const createTask = async (todo) => {
    const todoTask = prompt("Enter task here");

    if (!todoTask) {
      alert("Please enter task to add");
    } else {
      const tsk = todoTask.charAt(0).toUpperCase() + todoTask.slice(1);
      const resp = await axios.put(`/addTask/${todo._id}`, {
        task: tsk,
      });
    }
  };

  // Deleting Todo Task

  const dTask = async (todo, task) => {
    const resp = await axios.put(`/deleteTask/${todo._id}/${task._id}`);
  };

  // Editing Todo Task

  const eTask = async (todo, task) => {
    const newTask = prompt("Enter your new task");

    if (!newTask) {
      alert("Please enter task to edit");
    } else {
      const resp = await axios.put(`/editTask/${todo._id}/${task._id}`, {
        updatedTask: newTask,
      });
    }
  };

  useEffect(() => {
    fetchData();
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        submitTodo();
      }
    };
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [userTasks]);

  if (userId) {
    return (
      <>
        <div className="section-one pt-5 bg-[#C8DBBB] dark:bg-[#0F0C29]">
          <div className="main p-6">
            <div className="top flex flex-col items-center gap-9 ">
              <div className="top-top mt-10 sm:mt-0">
                <img src={TodoLogo} className="h-[35px]" alt="" />
              </div>

              <Theme />
              <Logout />

              <div className="section-2 w-full flex flex-col gap-5 justify-center items-center">
                <div className="inps flex gap-5 border-2 border-[#020204] dark:border-[#553FE6] rounded-md p-2 w-[65%] flex-col md:flex-row">
                  <div className="top-bottom flex w-[100%] md:w-[40%] justify-start">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="border-2 py-2 border-[#020204] dark:border-[#553FE6] rounded-md text-center w-full text-[17px] bg-transparent placeholder-[#020204]  dark:placeholder-[#aea4f1] placeholder-opacity-70 placeholder:text-lg text-[#020204] dark:text-white outline-none"
                      placeholder="Enter Your Todo Title"
                      value={todoTitle}
                      onChange={(event) => setTodoTitle(event.target.value)}
                    />
                  </div>
                  <div className="top-bottom flex gap-4 justify-between w-[100%] md:w-[60%]">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="border-2 py-2 border-[#020204] rounded-md text-center w-full text-[17px] bg-transparent placeholder-[#020204] placeholder-opacity-70 placeholder:text-lg text-[#020204] outline-none  dark:placeholder-[#aea4f1] dark:border-[#553FE6] dark:text-white"
                      placeholder="Enter Your Tasks"
                      value={todoTasks}
                      onChange={(event) => setTodoTasks(event.target.value)}
                    />
                  </div>
                </div>
                <div className="submit">
                  <p
                    className="text-white text-lg p-2 rounded-lg bg-[#2926A7] flex justify-center cursor-pointer font-extrabold dark:bg-[#3129d4]"
                    onClick={submitTodo}
                    id="addbtn"
                  >
                    Add Todo
                  </p>
                </div>
              </div>
            </div>
          </div>
          <TimeandOptions />
        </div>

        <Username />

        <div className="sectiontwo darko flex flex-wrap justify-center lg:justify-between gap-10 mb-20 mt-14 max-w-[85%] mx-auto dark:bg-none">
          {userTasks &&
            userTasks.map((userT) => (
              <div className="card relative w-[400px] max-w-[450px] py-7 rounded-md h-max bg-[#FCFDFF] dark:border-2 dark:border-[#2926A7] dark:bg-[#0F0C29]   px-4">
                <div className="upper flex items-center justify-between gap-8 mb-8">
                  <div className="up-top bg-[#00FE06] dark:bg-[#553FE6]  px-3 py-1 rounded-full ">
                    <h2 className=" text-center text-[17px] dark:text-white font-bold">
                      {userT.todo}
                    </h2>
                  </div>
                  <div className="eda gap-5 text-xl flex items-center">
                    <p
                      className="text-2xl text-[#0f4110] cursor-pointer dark:text-[#ddddff]"
                      onClick={() => {
                        createTask(userT);
                      }}
                    >
                      <MdAddCircle />
                    </p>
                    <p
                      className="cursor-pointer text-[#0f4110] text-[22px] dark:text-[#ddddff]"
                      onClick={() => doEdit(userT)}
                    >
                      <MdModeEdit />
                    </p>
                    <span
                      className="cursor-pointer text-[#0f4110] text-2xl dark:text-[#ddddff]"
                      onClick={() => doDelete(userT)}
                    >
                      <MdDelete />
                    </span>
                  </div>
                </div>

                <div className="tasks text-[17px] space-y-2">
                  <div className="tasks text-[#020204] flex flex-col gap-4 text-lg">
                    {userT.tasks &&
                      userT.tasks.map((task) => (
                        <div className="flex justify-between border-[#020204] items-center border-2 px-2 py-1 rounded-md text-[#020204] gap-2  dark:border-[#2926A7] dark:border-2 dark:text-white">
                          <div className="">
                            <p className="text-[17px]">{task.task}</p>
                          </div>

                          <div className="flex gap-5">
                            <div
                              className="text-xl cursor-pointer"
                              onClick={() => eTask(userT, task)}
                            >
                              <MdOutlineModeEditOutline />
                            </div>
                            <div
                              className="font-bold text-xl cursor-pointer dtosk"
                              onClick={() => dTask(userT, task)}
                            >
                              <MdOutlineDeleteOutline />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="timestamps flex justify-between">
                  <div className="cat mt-7 bg-[#ccd8ff] px-3 py-1 rounded-full max-w-max">
                    <p className="text-[15px]">
                      {new Date(userT.createdAt).toDateString()}
                    </p>
                  </div>
                  <div className="cat mt-7 bg-[#ccd8ff] px-3 py-1 rounded-full max-w-max">
                    <p className="text-[15px]">
                      {moment(userT.createdAt).format("h:mm A")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </>
    );
  } else {
    return (
      <>
        <Login />
      </>
    );
  }
};
