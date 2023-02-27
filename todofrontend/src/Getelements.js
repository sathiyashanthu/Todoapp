import { patchname, deletename } from "./utility/fetch";
import "./Getelements.css";
function getelements(props) {
//   const [value, setValue] = useState([]);
//   //console.log(value);

//   async function getTasks() {
//     const response = await getname("http://localhost:3000/tasks");
//     setValue(response.data);
//     //console.log(response);
//   }
//   useEffect(() => {
//     // console.log(axios.get('http://localhost:3000/tasks'));
//     getTasks();
//   }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Task</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.name.map((items) => {
            if (items.completion_status === false) {
              return (
                <tr>
                  <td className="username">{items.username}</td>
                  <td className="task">{items.task}</td>
                  <td>
                    <input
                      type={"checkbox"}
                      onChange={async() => {
                        await patchname(
                          `${process.env.REACT_APP_API_URL}/task/${items._id}/${true}`
                        );
                        await props.functon()
                      }}
                      className="check"
                    ></input>
                  </td>
                  <td className="delete">
                    <button
                      onClick={async () => {
                        await deletename(
                          `${process.env.REACT_APP_API_URL}/del/${items.user_id}`
                        );
                        await props.functon()
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
        <tbody>
          {props.name.map((items) => {
            //console.log(items.completion_status);
            if (items.completion_status === true) {
              return (
                <tr>
                  <td>{items.username}</td>
                  <td>{items.task}</td>
                  <td>
                    <input
                      type={"checkbox"}
                      checked={true}
                      onChange={async () => {
                       await patchname(
                          `${process.env.REACT_APP_API_URL}/task/${items._id}/${false}`
                        );
                        await props.functon()
                      }}
                    ></input>
                  </td>
                  <td>
                    <button
                      onClick={ async() => {
                        await deletename(
                          `${process.env.REACT_APP_API_URL}/del/${items.user_id}`
                        );
                        await props.functon()
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
}
export default getelements;
