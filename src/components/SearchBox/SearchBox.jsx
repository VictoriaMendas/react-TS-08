import { useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import { useDispatch } from "react-redux";
import { selectNameFilter } from "../../redux/filters/selectors";

export default function SearchBox() {
  const filter = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  const onChangeFilter = (evt) => {
    const inputValue = evt.target.value;
    dispatch(changeFilter(inputValue));
  };
  return (
    <div>
      <label>
        Find contact by name
        <input type="text" value={filter} onChange={onChangeFilter} />
      </label>
    </div>
  );
}
