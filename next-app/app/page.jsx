import LinkBtn from "./components/LinkBtn";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col gap-[32px] row-start-2 sm:items-start">
        <h1 className="text-2xl font-bold mt-12">
          IntelRoute - Intelligent Route <br /> Prediction and Prefetching
        </h1>
        <p className="text-md text-gray-600 w-[75%]">
          This project aims to develop and exhibit an{" "}
          <span className="font-bold">
            intelligent web routes prediction system
          </span>{" "}
          that uses a Linear Regression model to predict the next route{" "}
          <span className="font-bold">
            based on the user's current location and previous routes.{" "}
          </span>
          <br />
          <br />
          The system will also implement a prefetching mechanism to improve the
          performance of web applications by preloading resources for predicted
          routes. <br />
          <br />
          Meaning,{" "}
          <span className="font-bold">
            it will predict the next route and load it in the background
          </span>
          , behind the scenes so that when the user hits that particular route,
          it will be loaded instantly they don't have to wait for the server to
          respond. <br />
          <br />
          The project is divided into two main parts: <br />
          <br />
          <span className="font-bold">1. Nextjs App</span> - The frontend
          applications which stores the user session and route visits to a
          MongoDb database and calls the backend APi to get the next predicted
          route and prefetch it in the background. <br />
          <span className="italic inline-block pt-2">
            Tech Stack - Nextjs, Tailwind, Mongoose{" "}
          </span>
          <br />
          <br />
          <span className="font-bold">2. Python Backend</span> - This includes
          the machine learning model which is trained on the user route visit
          data and predicts the next route based on the current location and
          previous routes. This also has a FastAPI endpoint to serve the
          predicted route to the Nextjs application.
          <br />
          <span className="italic inline-block pt-2">
            Tech Stack - FastAPI, pymongo, uvicorn, Numpy, ScikitLearn{" "}
          </span>
          <br />
        </p>
        <LinkBtn route="/about" />
      </main>
      <br />
      <br />
    </div>
  );
}
