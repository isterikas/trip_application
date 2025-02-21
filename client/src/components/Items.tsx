import Card from "./Card";
import { useItemContext } from "../context/ItemContext";

function Items() {
  const { items, loading, error } = useItemContext();

  return (
    <>
    {/* {console.log(items)}

    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name} - ${item.price}</li>
      ))}
    </ul> */}
    
      {items.map((entry: object) => {
        return (
          <>
            {!error && (

                <Card
          
                  entry={entry}
          
                />
    
            )}
            {error && <p>{error}</p>}
          </>
        );
      })}
    </>
  );
}

export default Items;
