import { useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostList,ChangeInput } from "./redux/modules/post";
import { RootState } from "./index";

function App() {
  const {posts}: any = useSelector<RootState>(state => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostList(2));
  }, []);
  const Chg = (e:any)=>{
    console.log("ee",e.target.value)
    dispatch(ChangeInput(e.target.value))
  }

  console.log("post=", posts);
  return (
    <>
      <input type={"text"} onChange={Chg}  />
      {posts?.map((item: any, index: number) => (
        <div>
          <p>{item.title}</p>
          <p>{item.body}</p>
        </div>
      ))}

    </>
  );
}

export default App;
