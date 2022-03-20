import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Issues from "./pages/Issues";
import Projects from "./pages/Projects";
import AgileBoards from "./pages/AgileBoards";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Issue from "./pages/Issue";
import NewIssue from "./pages/NewIssue";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}>
                <Route index element={<Issues/>}/>
                <Route path="projects" element={<Projects/>}/>
                <Route path="agile-boards" element={<AgileBoards/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path=":issueId" element={<Issue/>}/>
                <Route path="new" element={<NewIssue/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
