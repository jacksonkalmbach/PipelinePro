import React from "react";

import "./SearchBox.styles.scss";

interface SearchBoxProps {
  className: string;
  placeholder: string;
  onChangeHandler: any;
}

const SearchBox = ({
  className,
  placeholder,
  onChangeHandler,
}: SearchBoxProps) => (
  <input
    className="search-box"
    type="search"
    placeholder={placeholder}
    onChange={onChangeHandler}
  />
);

export default SearchBox;
