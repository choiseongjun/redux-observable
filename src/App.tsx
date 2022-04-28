import { useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostList } from "./redux/modules/post";
import { RootState } from "./index";

function App() {
  const post: any = useSelector<RootState>((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostList(1));
  }, []);
  return (
    <>
      {post.data.map((item: any) => (
        <div>
          <div>{item.title}</div>
          <div>{item.body}</div>
        </div>
      ))}
    </>
  );
}

export default App;
