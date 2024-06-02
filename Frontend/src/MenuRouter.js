import React from 'react'
import { Route,Routes } from 'react-router-dom'
import MainContent from './components/Maincontent/MainContent'
import AccInfo from './components/Pages/AccInfo/AccInfo';
import Dashboard from './components/Pages/Dashboard/Dashboard';
import NewLoan from './components/Pages/NewLoan/NewLoan';
import Profile from './components/Pages/Profile/Profile';
import EditUser from './components/Pages/EditUser/EditUser';
import Error_page from './components/Pages/Error/Error_page';
import SubmittedTable from './components/Pages/SubmiitedData/SubmittedTable';


function MenuRouter() {
  return (
    <Routes>
        <Route element={<MainContent></MainContent>}>
        <Route path='/' element={<Dashboard></Dashboard>}></Route>
        <Route path={`/profile/:_id`} element={<Profile></Profile>}></Route>
        <Route path={`/accinfo/:_id`} element={<AccInfo></AccInfo>}></Route>
        <Route path='/newloan' element={<NewLoan></NewLoan>}></Route>
        <Route path={`/edituser/:_id`} element={<EditUser></EditUser>}></Route>
        <Route path={`/submitted/:_id`} element={<SubmittedTable></SubmittedTable>}></Route>
        <Route path={`/profile/undefined`} element={<Error_page></Error_page>}></Route>
        <Route path={`/accinfo/undefined`} element={<Error_page></Error_page>}></Route>
        <Route path={`/edituser/undefined`} element={<Error_page></Error_page>}></Route>
        <Route path={`/submitted/undefined`} element={<Error_page></Error_page>}></Route>
        </Route>
        <Route path={'/*'} element={<Error_page></Error_page>}></Route>
    </Routes>
  )
}

export default MenuRouter