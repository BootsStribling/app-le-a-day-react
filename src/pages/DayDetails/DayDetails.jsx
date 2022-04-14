import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// The purpose of this function is to show the details of a single day.
// (This is Landing in our wireframe)
const DayDetails = (props) => {
  const [day, setDay] =useState(props.currentDay)

  useEffect(()=> {
    setDay(props.currentDay)
  }, [props.currentDay])
  // toggle editing state depending on the button clicked

  // Nav to forms
  const navigate = useNavigate()
  const navToJobForm = () => navigate(`/days/${day.id}/jerbs`)
  const navToStandDown = () => navigate(`/days/${day.id}/stand_down`)
  const navToStandUp = () => navigate(`/days/${day.id}/stand_up`)

  // Display message while loading state.
  if (!day) return <></>

  return (
    <div className='stand'>
      <p>{day.date}</p>

      {/* Stand up */}
      <div className='stand-header'>
        <h2>Stand up</h2>
        {day.stand_up 
          ? <button className='stand-edit-button' onClick={navToStandUp}><i className="fa-solid fa-pencil"></i></button>
          : <></>
        }
      </div>
      {day.stand_up
        ? <></>
        : <button onClick={navToStandUp}>+</button>
      }
      
      {/* Stand down */}
      <div className='stand-header'>
        <h2>Stand down</h2>
        {day.stand_down
          ? <button className='stand-edit-button' onClick={navToStandDown}><i className="fa-solid fa-pencil"></i></button>
          : <></>
        }
      </div>
      <p className='stand-text'>{day.stand_up}</p>
      {day.stand_down
        ? <></>
        : <button onClick={navToStandDown}>+</button>
      }
      <p className='stand-text'>{day.stand_down}</p>

      <p>Job #s:{day.jerbs?.length}</p>
      <button onClick={navToJobForm}>APPly yoself</button>
    </div>
  );
}
 
export default DayDetails;