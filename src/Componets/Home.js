import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="p-6 py-16 bg-sky-100">
      <div className="container grid gap-6 mx-auto text-center lg:grid-cols-2 xl:grid-cols-5">
        <div className="w-full px-6 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-2">
          <h1 className="text-4xl font-extrabold">Task Management</h1>
          <p className="my-8">
            Task Management is smart task list for everyday use. It is truly
            usable with great user experience.
          </p>
          <form
            novalidate=""
            action=""
            className="self-stretch space-y-3 ng-untouched ng-pristine ng-valid"
          >
            <div>
              <Link to="/signup">
                <button
                  type="submit"
                  className="w-full py-3 font-semibold rounded bg-sky-300 hover:bg-sky-200"
                >
                  See Details
                </button>
              </Link>
            </div>
          </form>
        </div>
        <img
          src="https://t3.ftcdn.net/jpg/03/72/05/14/240_F_372051409_bBBjCY4YyvuGSjWat7geVwsFcOC0vnkN.jpg"
          alt=""
          className="object-cover w-full rounded-md xl:col-span-3 dark:dark:bg-gray-500"
        />
      </div>
    </section>
  );
};

export default Home;
