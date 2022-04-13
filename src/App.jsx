import * as styles from './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import date from 'date-and-time';

// ------- Components
import NavBar from './components/NavBar/NavBar'

// ------- Pages
import DayDetails from './pages/DayDetails/DayDetails'
import Landing from './pages/Landing/Landing'
import JobForm from './pages/Forms/JobForm'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'


// -------- Services
import * as authService from './services/authService'
import * as daysService from './services/daysService'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [days, setDays] = useState([])
  const [currentDay, setCurrentDay] = useState([])

  useEffect(()=> {
    if(user){
      daysService.getAllDays()
      .then(res => {
        console.log('RECIEVED', res)
        setDays(res)
      })
    }
  }, [user])

  useEffect(()=> {
    setCurrentDay(days[days.length -1])
  }, [days])

  
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/login')
  }

  const handleSignupOrLogin = () => setUser(authService.getUser())

  // Add a new jerb
  const addJerb = (formData) => {
    daysService.createJob(formData)
    .then(updatedDay => setCurrentDay(updatedDay))
  }

  const updateCurrentDay = (day) => setCurrentDay(day) 

  const createDay = () => {
    let day = new Date().toString()
    daysService.createDay({"date": day })
    .then(res => {
      setDays([res, ...days])
      setCurrentDay(res)
    })
  }

  // Update day
  const updateDay = (formData) => {
    console.log(formData)
    daysService.editDay(formData)
    // .then(updatedDay => setCurrentDay(updatedDay))
    .then(updatedDay => {
      let index = days.findIndex(day => day.id === updatedDay.id)
      days[index] = updatedDay
      setDays([...days])
    })
  }

  return (
    <>
        <div className='phone-overlay'>
            <div className='app-area'>
              <NavBar user={user} handleLogout={handleLogout} />


              <Routes>
                {/* For now routing to the first day in the index. */}
                <Route path="/" element={<Landing updateDay={updateDay} currentDay={currentDay} updateCurrentDay={updateCurrentDay} createDay={createDay} user={user} days={days} />} />
                {/* Show a day */}
                {/* <Route path="/days/:id" element={<DayDetails updateDay={updateDay} key={currentDay} user={user} />} /> */}
                {/* Create a new job */}
                <Route path="/days/:id/jerbs" element={<JobForm addJerb={addJerb} user={user} />} />
                <Route
                  path="/signup"
                  element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
                  />
                <Route
                  path="/login"
                  element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
                  />
              </Routes>
            </div>
        </div>
        <div className='background'>
          <div className='btm-nav'></div>
        </div>
    </>
  )
}

export default App
