function StatementCard({ item }) {
  const date = new Date(item.date);
  const today = new Date();
  return (
    <>
      <div
        key={item.id}
        className="m-3 p-2 rounded flex flex-col justify-center items-center bg-[#1a8f70]"
      >
        <p>{item.name}</p>
        <p>{item.date}</p>
        {date < today ? (
          <>
            <p>{item.comment}</p>
            <p>{item.rating}</p>{" "}
          </>
        ) : (
          <p>{item.status}</p>
        )}
      </div>
    </>
  );
}

export default StatementCard;
