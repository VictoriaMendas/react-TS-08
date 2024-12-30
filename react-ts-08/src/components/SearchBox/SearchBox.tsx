import { changeFilter } from "../../redux/filters/slice";

import { selectNameFilter } from "../../redux/filters/selectors";
import { useAppDispatch, useAppSelector } from "../../redux/store";

export default function SearchBox() {
  const filter = useAppSelector(selectNameFilter);
  const dispatch = useAppDispatch();

  const onChangeFilter = (evt: React.FormEvent<HTMLInputElement>) => {
    const inputValue = evt.currentTarget.value;
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
