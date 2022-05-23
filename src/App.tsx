
import * as React from 'react';
import axios from 'axios';
import './App.css';

const {useEffect, useState} = React

// part 3
interface UserName {
  first: string
  last: string
  title: string
}

interface UserPicture {
  medium: string
}

interface UserInfo {
  name: UserName
  picture: UserPicture
}

// part 2
// fetch API data 
// normally imported from another file for best practice
const fetchRandomData = (pageNumber: number) => {
  return axios
    .get(`https://randomuser.me/api?page=${pageNumber}`)
    .then(({data}) => {
      // success
      console.log(data)
      return data
    })
    .catch(error => {
      // catch error
      console.error(error)
    })
}

// part 3
const getUserName = (info: UserInfo) => {
  const {name: {first, last}} = info
  return `${first} ${last}`
}


export default function App() {
  // part 1
  const[counter, setCounter] = useState(0)
  // part 2
  const[randomUserDataJSON, setRandomUserDataJSON] = useState('')
  // part 3
  const[userInfo, setUserInfo] = useState([])
  // part 4
  const[nextPageNumber, setNextPageNumber] = useState(1)

  // part 4
  const fetchNextUser = () => {
    fetchRandomData(nextPageNumber).then(randomData => {
      // // remove comment to see JSON on page
      // setRandomUserDataJSON(JSON.stringify(randomData, null, 2))

      // added to prevent page break on click spam
      if (randomData === undefined) return

      const newUserInfo = [
        ...userInfo,
        ...randomData.results,
      ]
      setUserInfo(newUserInfo)
      setNextPageNumber(randomData.info.page + 1)
    })
  }

  // part 2
  useEffect(() => {
    fetchNextUser()
  }, [])

  return (
    <div className="App">
      <h1>Beginner React.js Coding Interview</h1>

      {/* part 1 */}
      <p>
        {counter}
      </p>
      <button onClick={() => {
        setCounter(counter + 1)
      }}>Click to Increase Counter</button>

      {/* part 4 */}
      <button onClick={() => {
        fetchNextUser()
      }}>Click to Fetch Next User</button>

      {/* part 3 */}
      {
        userInfo.map((info: UserInfo, index: number) => (
          <div key={index}>
            <p>{getUserName(info)}</p>
            <img src={info.picture.medium} />
          </div>
        ))
      }

      {/* part 2 */}
      <pre>
        {randomUserDataJSON}
      </pre>
      
    </div>
  );
}
