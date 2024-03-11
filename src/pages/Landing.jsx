import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className=" opacity-80 rounded flex items-center justify-center" style={{ height: '30vh' }}>
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white mb-8">Hey, welcome</h1>
      <Link to="/todo" className="inline-block">
        <button className="bg-white text-yellow-500 hover:text-yellow-600 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
          Go to Todo List
        </button>
      </Link>
    </div>
  </div>
  

  );
}
