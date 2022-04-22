import { useEffect } from "react";
import Index from "./pages/Index/Index";
import { useDispatch } from "react-redux";
import "swiper/css";
import { GET_ALLALBUMS_REQUEST } from "./store/actions/albums/albums.actions";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_ALLALBUMS_REQUEST });
  }, []);
  return (
    <div className="App" style={{ width: "100vw", height: "100vh", margin: 0 }}>
      <Index />
    </div>
  );
}

export default App;
const listViewStyle = {
  root: { paddingTop: "80px" },
  scrollContent: {
    width: "100%",
    height: "269px",
    marginBottom: "88px",
  },
  header: { position: "relative" },
  title: {
    fontSize: "22px",
    marginLeft: "16px",
    position: "relative",
    top: "10px",
  },
  subTitle: { color: "gray", marginLeft: "16px" },
  action: {
    minWidth: "80px",
    width: "max-content",
    position: "absolute",
    top: "100%",
    left: "100%",
    transform: "translate(-120%,-50%)",
    paddingRight: "22px",
    whiteSpace: "no-wrap",
  },
};
