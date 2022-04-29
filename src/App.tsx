import { useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostList } from "./redux/modules/post";
import { RootState } from "./index";

function App() {
  const post: any = useSelector<RootState>(state => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostList(2));
  }, []);

  console.log("post=", post);
  return (
    <>
      {post.data.map((item: any, index: number) => (
        <div>
          <p>{item.title}</p>
          <p>{item.body}</p>
        </div>
      ))}
    </>
  );
}

export default App;
