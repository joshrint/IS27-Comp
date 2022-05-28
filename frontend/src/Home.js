import './App.css';
import { useFetch } from './utils/Hooks';

function Home() {
    const [data] = useFetch('https://is27-comp-backend.azurewebsites.net/boatAPI');
  return (
    <div>
      <h1>home Page</h1>
      {data.map((item) => {
          return(
              <div>
                  {item.boatName}
             </div>
          )
      })}
    </div>
  );
}

export default Home;
