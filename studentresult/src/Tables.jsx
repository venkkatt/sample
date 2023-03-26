import React, { useState, useEffect } from 'react'
import { useIsMount } from './useIsMount'
import './App.css'

function Tables({items}) {
  const [toggle, setToggle] = useState(true)
  const [textInput, setTextInput] = React.useState('')
  //  const [item, setItem] = useState(0)
  const [item, setItem] = useState([])
  //  const isMount = useIsMount()

  console.log('obj')
  console.log(items);

  const handleClick = () => {
    console.log(textInput)
     setItem(item)
  }

  const handleChange = (event) => {
    setTextInput(event.target.value)
  }

  // useEffect(() => {
  //   if (!isMount) {
  //        fetch('http://localhost:3002/student/'+item)
  //        .then((res) => res.json())
  //        .then(
  //          (result) => {
  //            setItem(result)
  //            console.log('test')
  //            console.log(result)
  //          },
  //          (error) => {
  //            console.log(error)
  //          }
  //        )
  //   }
  // },[item])

  useEffect(() => {
  fetch(`http://localhost:3002/student/${items.toString()}`)
    .then((res) => res.json())
    .then(
      (result) => {
        setItem(result)
        console.log('test')
        console.log(result)
      },
      (error) => {
        console.log(error)
      }
    )
  }, [item])

  return (
    <>
      <div style={{ margin: '0 auto', marginTop: '10%' }}>
        <label>Search: </label>
        <input
          type='number'
          pattern='[0-9]*'
          id='search'
          min='0'
          onChange={handleChange}
          placeholder='Enter Rollno'
        />
        <button type='button' onClick={handleClick}>
          Search
        </button>
      </div>

      <br></br>

          <table>
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Gender</th>
              <th>English</th>
              <th>Maths</th>
              <th>Science</th>
              <th>Social</th>
              <th>Tamil</th>
            </tr>
          </thead>
          <tbody>
            {items.rows.map(i => (
              <tr key={i.rollno}>
                <td>{i.rollno}</td>
                <td>{i.name}</td>
                <td>{i.gender}</td>
                <td>{i.english}</td>
                <td>{i.maths}</td>
                <td>{i.science}</td>
                <td>{i.social}</td>
                <td>{i.tamil}</td>
              </tr>
            ))}
          </tbody>
        </table>
     
    </>
    // <Table>
    //   <tr>
    //     <th>Roll No</th>
    //     <th>Name</th>
    //     <th>Gender</th>
    //     {/* <th>English</th>
    //     <th>Maths</th>
    //     <th>Science</th>
    //     <th>Social</th>
    //     <th>Tamil</th> */}
    //   </tr>
    //   {items.map((item) => {
    //     <tr key={item.rollno}>
    //         <td>{item.rollno}</td>
    //         <td>{item.name}</td>
    //         <td>{item.gender}</td>
    //       </tr>

    //   })}
    // </Table>
  )
}

export default Tables
