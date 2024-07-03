//This is used for the the checkboxes in the filter sidebar
const CheckedItem = ({id, checked, onChange, labelName}) => {
    return (
        <li className="accordion-item">
            <input
              type="checkbox"
              id={id}
              name={id}
              checked={checked}
              onChange={onChange}
            />
            <label htmlFor={id}>{labelName ? labelName : id}</label>
          </li>
    );
};

export default CheckedItem;