import ItemCard from "../components/ItemCard";
import { useItemContext } from "../context/ItemContext";

function ItemsPage() {
  const { items, loading, error, setItems } = useItemContext();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full">
        {!error &&
          items.map((item) => (
            <ItemCard item={item} setItems={setItems} key={item.id} />
          ))}
      </div>
    </>
  );
}

export default ItemsPage;
