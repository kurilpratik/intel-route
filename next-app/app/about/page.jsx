export default function About() {
  return (
    <section>
      <h1 className="font-bold mt-8 text-2xl">How does IntelRoute work?</h1>
      <br />
      <h3 className="font-bold text-lg pb-2">⭐ Machine Learning + Backend:</h3>
      <p className="pb-8 text-md text-gray-600 w-[75%]">
        We used Python for machine learning and backend infrastructure. <br />
        <br />
        <span className="font-bold">Data collection</span> - The pages (routes)
        visited by the user are stored in a MongoDB database and fetched. The
        data is collected using a custom-built API that tracks user interactions
        with the app. The data is then preprocessed and used to train a machine
        learning model. <br />
        <br />
        <span className="font-bold">Data Preprocessing</span> - We generate
        n-grams for the data that was collected and grouped by sessionId. The
        n-grams stores the sequences of pages visited by the user in the
        following trend:
        <br />
        <span className="pl-4 italic inline-block pt-4">
          x = [ ['/page1', '/page2'], ['/page2', '/page3'] ]
        </span>
        <br />
        <span className="pl-4 italic inline-block pb-4">
          y = [ '/page3', '/page1' ]
        </span>
        <br />x is the input data (sequence of visits by the user) and y (visit
        after x) is the output data. The model is trained using this data to
        predict the next page that the user will visit based on their previous
        interactions. <br />
        <br />
        <span className="font-bold">Training</span> - All the routes are
        tokenized and converted into a sequence of numbers so that ML operations
        can be performed on it. We encode the x and y data using LabelEncoder
        and then split the data into training (80%) and testing (20%) sets using
        train_test_split. We then run a Logistic Regression and the model is
        stored in a joblib file. <br />
        <br />
        We have 2 API endpoints written in FastAPI, predictNextRoute and retrain
        that are used to predict the next route and retrain the model
        respectively. The predictNextRoute endpoint takes the current route as
        input and returns the predicted next route based on the trained model.
        The retrain endpoint is used to retrain the model with new data. <br />
      </p>
      <h3 className="font-bold text-lg pb-2">⭐ Web App (Nextjs):</h3>
      <p className="pb-8 text-md text-gray-600 w-[75%]">
        The web app is built using Nextjs and React. <br />
        <br />
        <span className="font-bold">Data Collection</span> - The app tracks the
        routes visited by the user and stores them in a MongoDB database. The
        data is then sent to the backend API for training. <br />
        <br />
        <span className="font-bold">Route Prediction</span> - The app uses the
        predictNextRoute API endpoint to get the predicted next route based on
        the current route visited by the user. The predicted route is then used
        to prefetch the data for that route in the background. <br />
        <br />
        <span className="font-bold">Prefetching</span> - The app uses the
        prefetching mechanism to load the data for the predicted next route in
        the background so that when the user clicks on that route, it loads
        instantly without any delay. This is done using Nextjs's built-in
        prefetching capabilities. <br />
        <br />
        <span className="font-bold">Retrain Model</span> - The user can choose
        to retrain the model on the updated data using the retrain API endpoint.
        This is done to improve the accuracy of the predictions based on new
        data. The retrain button is available in the sidebar of the app. <br />
      </p>
    </section>
  );
}
