import { CustomerType } from "../api/types";

type CustomerItemProps = CustomerType & {
  onClickEdit: () => void;
  onClickDelete: () => void;
};

function CustomerItem({
  id,
  name,
  createdDate,
  email,
  phoneNumber,
  status,
  onClickEdit,
  onClickDelete,
}: CustomerItemProps) {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{createdDate}</td>
      <td>{email}</td>
      <td>{phoneNumber}</td>
      <td>{status}</td>
      <td>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={onClickEdit}
        >
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
          type="button"
          onClick={onClickDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default CustomerItem;
