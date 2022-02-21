import BottomNav from "./components/BottomNav";
import Feed from "./components/Feed";
import Navbar from "./components/Navbar";
import Stories from "./components/Stories";

function App() {
  return (
    <div className="App relative flex flex-col w-full h-full bg-slate-50 shadow-xl overflow-x-hidden overflow-y-scroll ">
      <header>
        <Navbar />
      </header>
      <Stories />
      <Feed />
      <BottomNav />
    </div>
  );
}

export default App;
