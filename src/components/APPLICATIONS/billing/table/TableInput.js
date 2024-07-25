import Input from "components/form/Input";

const TableInput = ({
  fieldName,
  type,
  filter: { filter = {}, setFilter },
}) => {
  // const dispatch = useDispatch();
  // const { filter } = useSelector((store) => store.filter);
  const value = filter[fieldName] || "";

  if (type === "range") {
    return (
      <>
        <Input
          value={filter[`${fieldName}_min`] || ""}
          type="number"
          className="mb-2"
          placeholder={"დან"}
          onChange={(e) =>
            setFilter({ ...filter, [`${fieldName}_min`]: e.target.value })
          }
        />
        <Input
          value={filter[`${fieldName}_max`] || ""}
          type="number"
          placeholder={"მდე"}
          onChange={(e) =>
            setFilter({ ...filter, [`${fieldName}_max`]: e.target.value })
          }
        />
      </>
    );
  } else if (type === "date") {
    return (
      <>
        <Input
          type={type}
          className="mb-2"
          onChange={(e) =>
            // setFilter({ ...filter, [`${fieldName}_start`]: e.target.value })
            setFilter({ ...filter, [`start`]: e.target.value })
          }
        />
        <Input
          type={type}
          onChange={(e) =>
            // setFilter({ ...filter, [`${fieldName}_end`]: e.target.value })
            setFilter({ ...filter, [`end`]: e.target.value })
          }
        />
      </>
    );
  } else {
    return (
      <Input
        value={value}
        placeholder="ძებნა..."
        onChange={(e) => setFilter({ ...filter, [fieldName]: e.target.value })}
      />
    );
  }
};

export default TableInput;
