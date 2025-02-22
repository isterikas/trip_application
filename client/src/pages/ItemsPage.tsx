import Card from "../components/Card";
import { useItemContext } from "../context/ItemContext";

function ItemsPage() {
  const { items, loading, error } = useItemContext();

  return (
    <>
      {/* {console.log(items)}

    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name} - ${item.price}</li>
      ))}
    </ul> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full">
        {!error && items.map((entry) => <Card entry={entry} />)}
        {error && <div>error</div>}
        {loading && <div>loading ...</div>}
      </div>
    </>
  );
}

export default ItemsPage;
