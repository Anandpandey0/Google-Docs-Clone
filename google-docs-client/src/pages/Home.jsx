import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="p-4 px-6 mt-4 text-center flex flex-col gap-6 items-center">
      <h1 className="text-4xl font-norma l">
        Build your best ideas together, in Google Docs
      </h1>
      <h3 className="">
        Create and collaborate on online documents in real-time and from any
        device.
      </h3>
      <button className="bg-blue-600 p-3 px-8 rounded-sm  text-white w-3/5">
        Try Docs for Work
      </button>
      <Link
        to="/drive"
        className="bg-white border-2 border-solid border-gray-200 p-3 px-8 rounded-sm  text-blue-600 w-3/5"
      >
        Go to Docs
      </Link>
      <p>Don&apos;t have an account?</p>
      <Link to="/login" className="text-blue-600 font-semibold">
        Sign up for free
      </Link>
    </main>
  );
};

export default Home;
