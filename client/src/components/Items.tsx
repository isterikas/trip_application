import Card from "./Card";
import { useItemContext } from "../context/ItemContext";

function Items() {
  const { items, loading, error } = useItemContext();

  return (
    <>
    {console.log(items)}

    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name} - ${item.price}</li>
      ))}
    </ul>
    
      {/* {information.map((entry: object) => {
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
      })} */}
    </>
  );
}

export default Items;
