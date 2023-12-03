import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';


// import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
import './style.css';

function Nav()
{
    return (
        <div>
        <div className='Header'>
          <div>Dictionary App</div>
          <div className='options'>
            <span><a href="index.js">Home</a></span>
            <span><a href="index.js">History</a></span>
          </div>
        </div>
        
        </div>
      );
}

// function Search() {
//   const [searchTerm, setSearchTerm] = useState(''); // State to store user input
//   const [apiData, setApiData] = useState(null); // State to store API response data

//   const handleSearch = (event) => {
//     event.preventDefault(); // Prevent the default form submission behavior

//     // Construct the API URL with the user's input
//     const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`;

//     fetch(apiUrl)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('API Response:', data);
//         console.log(`${data[0].word}`);
//         console.log(`${data[0].phonetics[0].text}`);
//         console.log(`${data[0].meanings[0].partOfSpeech}`);
//         console.log(`${data[0].meanings[0].definitions[0].definition}`);
//         Result(data,apiData);
//         setApiData(data); // Store API response data in state
//       })
//       .catch((error) => {
//         console.error("No Definitions found");
//       });
//   };

//   return (
//     <div>
//       <form onSubmit={handleSearch}>
//         <input
//           type="text"
//           className="search-bar"
//           name="words"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state
//         />
//         <button className="search-sub" name="words" type="submit">
//           Search
//         </button>
//       </form>
//       {apiData && <Result data={apiData} apiData={apiData}/>}
//     </div>
//   );
// }

// function Result({data,apiData})
// {

//   if (!data || !apiData || !apiData.data=== 0) {
//     return (
//     <div>
//       <div>No Definitions Found</div>
//       <div>Sorry pal, we couldn't find definitions for the word you were looking for.</div>
//       <div>You can try the search again at later time or head to the web instead.</div>
//     </div>
//     );
//   }
//      return(
//       <div>
//         <div className='loader'></div>
//      <div className='finding'>
//        <h2>{data[0].word}</h2>
//           <div>{data[0].phonetics[0].text}</div>
//           <div>
//           <audio controls key={data.world}>
//         <source src={data[0].phonetics[0].audio} type="audio/mpeg" /></audio>
//         </div>
//         <div>{data[0].phonetics[1].text}</div>
//           <div>
//           <audio controls key={data.world}>
//         <source src={data[0].phonetics[1].audio} type="audio/mpeg" /></audio>
//         </div>
//         <br />
//         <div>
//           <div className='pos'>{data[0].meanings[0].partOfSpeech}</div>
//           <ul>
//           <li>{data[0].meanings[0].definitions[0].definition}</li>
//           <li>{data[0].meanings[0].definitions[1].definition}</li>
//           </ul>
//         </div>
//         <br />
//         <div>
//           <div className='pos'>{data[0].meanings[1].partOfSpeech}</div>
//           <p>
//           {data[0].meanings[1].definitions[0].definition}
//           </p>
//         </div>
//      </div>
//      </div>
//         )
// }

// ReactDOM.render(<Nav />, document.getElementById('nav-bar'));
// ReactDOM.render(<Search />, document.getElementById('searching'));
// // ReactDOM.render(<Result />, document.getElementById('result'));

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false); // State to track loading state
  const [showResult, setShowResult] = useState(false); // State to control result display

  const handleSearch = (event) => {
    event.preventDefault();
    setLoading(true); // Set loading state to true when starting the search

    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data);
        setApiData(data);
        setLoading(false); // Set loading state to false when data is fetched
        setShowResult(true); // Set showResult to true when data is fetched
        getDisplay(data);
      })
      .catch((error) => {
        console.error("No Definitions found");
        setLoading(false); // Set loading state to false on error
      });
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
      <input
          type="text"
          className="search-bar"
          name="words"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state
        />
        <button className="search-sub" name="words" type="submit">Search</button>
      </form>
      {loading && <div className='loader'></div>} {/* Display loader when loading is true */}
      {showResult && <Result data={apiData} />} {/* Display result when showResult is true */}
    </div>
  );
}

function Result({ data }) {
  const [showResult, setShowResult] = useState(false); // State to control result display

  useEffect(() => {
    // Delay the display of result for 2 seconds
    const delayTimer = setTimeout(() => {
      setShowResult(true);
    }, 2000);

    return () => clearTimeout(delayTimer); // Clear the timer when unmounting
  }, []);

  if (data===0 || !showResult===0) {
    return (
      <div>
        <div>
       <div>No Definitions Found</div>
       <div>Sorry pal, we couldn't find definitions for the word you were looking for.</div>
       <div>You can try the search again at later time or head to the web instead.</div>
     </div>
      </div>
    );
  }
else
{
  return (
    <div>
      <div className='finding'>
      <h2>{data[0].word}</h2>
           <div>{data[0].phonetics[0].text}</div>
           <div>
           <audio controls key={data.world}>
         <source src={data[0].phonetics[0].audio} type="audio/mpeg" className='audio' /></audio>
         </div>
         <div>{data[0].phonetics[1].text}</div>
           <div>
           <audio controls key={data.world}>
         <source src={data[0].phonetics[1].audio} type="audio/mpeg" className='audio' /></audio>
         </div>
         <br />
         <div>
           <div className='pos'>{data[0].meanings[0].partOfSpeech}</div>
           <ul>
           <li>{data[0].meanings[0].definitions[0].definition}</li>
           <li>{data[0].meanings[0].definitions[1].definition}</li>
           </ul>
         </div>
         <br />
         <div>
           <div className='pos'>{data[0].meanings[1].partOfSpeech}</div>
           <p>
           {data[0].meanings[1].definitions[0].definition}
           </p>
         </div>
      </div>
    </div>
  );
}
}

function getDisplay(data)
{
    return data;
}
export {getDisplay};
ReactDOM.render(<Nav />, document.getElementById('nav-bar'));
ReactDOM.render(<Search />, document.getElementById('searching'));
ReactDOM.render(<Result />, document.getElementById('result'));

