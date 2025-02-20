import Card from "./Card";

function Items({ information, setUpdate, error }) {
  return (
    <>
      {information.map((entry: object) => {
        return (
          <>
            {!error && (
              <div
                key={entry.id}
                className="bg-gray-500 rounded m-3 p-3 w-2/3 mx-auto"
              >
                <Card
                  setUpdate={setUpdate}
                  entry={entry}
                  information={information}
                />
              </div>
            )}
            {error && <p>{error}</p>}
          </>
        );
      })}
    </>
  );
}

export default Items;
